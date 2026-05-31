-- AlterTable
ALTER TABLE "LineItem" ADD COLUMN     "accountCode" TEXT,
ADD COLUMN     "eocNumber" TEXT;

-- AlterTable
ALTER TABLE "RfpRequest" ADD COLUMN     "budgetItem" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "dateNeeded" TIMESTAMP(3),
ADD COLUMN     "isAsap" BOOLEAN NOT NULL DEFAULT false;
