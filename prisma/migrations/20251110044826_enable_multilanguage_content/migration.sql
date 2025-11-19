/*
  Warnings:

  - You are about to drop the column `content` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `excerpt` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `pitch` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Commentary` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Commentary` table. All the data in the column will be lost.
  - Added the required column `content_fr` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `excerpt_fr` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_fr` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `articleId` to the `Commentary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Commentary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Commentary` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Commentary_title_key";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "content",
DROP COLUMN "excerpt",
DROP COLUMN "pitch",
DROP COLUMN "title",
ADD COLUMN     "content_en" TEXT,
ADD COLUMN     "content_fr" TEXT NOT NULL,
ADD COLUMN     "excerpt_en" TEXT,
ADD COLUMN     "excerpt_fr" TEXT NOT NULL,
ADD COLUMN     "pitch_en" TEXT,
ADD COLUMN     "pitch_fr" TEXT,
ADD COLUMN     "title_en" TEXT,
ADD COLUMN     "title_fr" TEXT NOT NULL,
ALTER COLUMN "videoUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Commentary" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "articleId" INTEGER NOT NULL,
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Commentary" ADD CONSTRAINT "Commentary_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentary" ADD CONSTRAINT "Commentary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
