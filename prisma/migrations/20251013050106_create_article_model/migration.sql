-- CreateEnum
CREATE TYPE "ArticleType" AS ENUM ('NEWS', 'TEST', 'VIDEO');

-- CreateTable
CREATE TABLE "articles" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "badge" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "readTime" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "type" "ArticleType" NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);
