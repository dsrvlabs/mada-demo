-- CreateTable
CREATE TABLE "TxHistory" (
    "id" SERIAL NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "item" TEXT[],
    "count" INTEGER[],
    "amount" DOUBLE PRECISION[],
    "total" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TxHistory_pkey" PRIMARY KEY ("id")
);
