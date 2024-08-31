/*
  Warnings:

  - A unique constraint covering the columns `[dbName]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dbName` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "dbName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "File_dbName_key" ON "File"("dbName");
