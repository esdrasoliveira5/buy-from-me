-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "zipcode" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "statesId" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_statesId_fkey" FOREIGN KEY ("statesId") REFERENCES "States"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
