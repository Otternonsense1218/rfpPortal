import 'dotenv/config';
import bcrypt from 'bcryptjs';
import prisma from '../utils/prisma';

async function main() {
  // ── Admin user ──────────────────────────────────────────────────────────────
  const password = process.argv[2] || 'changeme123';
  const hash = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { adUsername: 'admin' },
    update: { passwordHash: hash },
    create: {
      adUsername: 'admin',
      email: 'admin@ermc.local',
      displayName: 'Administrator',
      passwordHash: hash,
      role: 'ADMIN',
      isActive: true,
    },
  });
  console.log(`✓ Admin user: ${user.adUsername} / ${password}`);

  // ── Approval thresholds ──────────────────────────────────────────────────────
  // These come directly from the Excel form's signature approval section.
  // upsert = insert if it doesn't exist, update if it does — safe to run repeatedly.
  //
  // How it works: when a request is submitted, the system looks at the total
  // amount, finds which threshold(s) apply, and creates Approval records for
  // those roles. Every tier below the amount also signs off (cumulative).
  const thresholds = [
    { role: 'MANAGER',  minAmount: 0.01,      maxAmount: 5000.00    },  // ≤ $5,000
    { role: 'CFO',      minAmount: 5000.01,   maxAmount: 25000.00   },  // $5,001–$25,000
    { role: 'BOARD',    minAmount: 25000.01,  maxAmount: 99999999   },  // $25,001+
  ] as const;

  for (const t of thresholds) {
    await prisma.approvalThreshold.upsert({
      where: { role: t.role },
      update: { minAmount: t.minAmount, maxAmount: t.maxAmount },
      create: { role: t.role, minAmount: t.minAmount, maxAmount: t.maxAmount },
    });
    console.log(`✓ Threshold: ${t.role} ($${t.minAmount}–$${t.maxAmount})`);
  }

  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
