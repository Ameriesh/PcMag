/*
  Warnings:

  - Added the required column `pitch` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "pitch" TEXT NOT NULL;
