/*
  Warnings:

  - You are about to drop the column `content_en` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `content_fr` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `excerpt_en` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `excerpt_fr` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `pitch_en` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `pitch_fr` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `title_en` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `title_fr` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `articleId` on the `Commentary` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Commentary` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Commentary` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Commentary` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `excerpt` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Commentary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Commentary` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Commentary" DROP CONSTRAINT "Commentary_articleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Commentary" DROP CONSTRAINT "Commentary_userId_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "content_en",
DROP COLUMN "content_fr",
DROP COLUMN "excerpt_en",
DROP COLUMN "excerpt_fr",
DROP COLUMN "pitch_en",
DROP COLUMN "pitch_fr",
DROP COLUMN "title_en",
DROP COLUMN "title_fr",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "excerpt" TEXT NOT NULL,
ADD COLUMN     "pitch" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Commentary" DROP COLUMN "articleId",
DROP COLUMN "content",
DROP COLUMN "userId",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Commentary_title_key" ON "Commentary"("title");
