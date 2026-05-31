import React from 'react';

function StatCard({ label, value, color, cardBg }: { label: string; value: number; color?: string; cardBg?: string }) {
    return (
        <div style={{ background: cardBg || 'var(--ermc-light)', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
            <p style={{ margin: '8px 0 0', fontSize: 'var(--font-size-xl)', fontWeight: 700, color: color }}>{value}</p>
        </div>
    );
}


export default function DashboardPage() {
    const stats = [
        { label: 'Total Requests', value: 128, color: 'var(--text-primary)' },
        { label: 'Pending Approvals', value: 24, color: 'var(--status-pending-text)', cardBg: 'var(--status-pending-bg)' },
        { label: 'Approved Requests', value: 84, color: 'var(--status-approved-text)', cardBg: 'var(--status-approved-bg)' },
        { label: 'Rejected Requests', value: 20, color: 'var(--status-rejected-text)', cardBg: 'var(--status-rejected-bg)' },
    ];

    const orderStatus = [
        { label: 'Ordered', value: 56, color: 'var(--status-ordered-text)', cardBg: 'var(--status-ordered-bg)' },
        { label: 'Received', value: 48, color: 'var(--status-received-text)', cardBg: 'var(--status-received-bg)' },
    ];

    return (

        <div style={{ padding: '24px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '32px', fontSize: 'var(--font-size-xl)', color: 'var(--text-primary)' }}>Dashboard</div>

            <div style={{ marginBottom: '8px', fontSize: 'var(--font-size-lg)', color: 'var(--text-primary)', fontStyle: 'italic' }}>RFP Overview</div>
            <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '24px' }}>

                {stats.map((stat, index) => (
                    <StatCard key={index} label={stat.label} value={stat.value} color={stat.color} cardBg={stat.cardBg} />
                ))}
            </div>

            <div style={{ marginBottom: '12px', fontSize: 'var(--font-size-lg)', color: 'var(--text-primary)', fontStyle: 'italic' }}>Order Status</div>
            <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '24px' }}>

                {orderStatus.map((stat, index) => (
                    <StatCard key={index} label={stat.label} value={stat.value} color={stat.color} cardBg={stat.cardBg} />
                ))}
            </div>

            <div style={{ marginBottom: '12px', fontSize: 'var(--font-size-lg)', color: 'var(--text-primary)', fontStyle: 'italic' }}>Recent Activity</div>
            <div style={{ display: 'table', width: '100%', borderCollapse: 'collapse', background: 'var(--bg-surface)', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ display: 'table-header-group', background: 'var(--ermc-light)' }}>
                    <div style={{ display: 'table-row' }}>
                        <div style={{ display: 'table-cell', padding: '12px 16px', fontWeight: 600, color: 'var(--text-primary)' }}>Request ID</div>
                        <div style={{ display: 'table-cell', padding: '12px 16px', fontWeight: 600, color: 'var(--text-primary)' }}>Requester</div>
                        <div style={{ display: 'table-cell', padding: '12px 16px', fontWeight: 600, color: 'var(--text-primary)' }}>Status</div>
                        <div style={{ display: 'table-cell', padding: '12px 16px', fontWeight: 600, color: 'var(--text-primary)' }}>Date</div>
                    </div>
                </div>
                <div style={{ display: 'table-row-group' }}>
                    {/* Placeholder rows */}
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} style={{ display: 'table-row', background: i % 2 === 0 ? 'rgba(0,0,0,0.02)' : 'transparent' }}>
                            <div style={{ display: 'table-cell', padding: '12px 16px' }}>#RFP-{1000 + i}</div>
                            <div style={{ display: 'table-cell', padding: '12px 16px' }}>User {i}</div>
                            <div style={{ display: 'table-cell', padding: '12px 16px', color: i % 3 === 0 ? 'var(--status-approved-text)' : (i % 3 === 1 ? 'var(--status-pending-text)' : 'var(--status-rejected-text)') }}>
                                {i % 3 === 0 ? 'Approved' : (i % 3 === 1 ? 'Pending' : 'Rejected')}
                            </div>
                            <div style={{ display: 'table-cell', padding: '12px 16px' }}>{new Date(Date.now() - i * 86400000).toLocaleDateString()}</div>
                        </div>
                    ))}
            </div>
            </div>
        </div>
    )
}