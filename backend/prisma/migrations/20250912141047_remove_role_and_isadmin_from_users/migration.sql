/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."TeamRole" AS ENUM ('ADMIN', 'EDITOR', 'MODERATOR');

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "isAdmin",
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "public"."team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."TeamRole" NOT NULL DEFAULT 'EDITOR',
    "avatar" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."affiliates" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "buttonName" TEXT NOT NULL,
    "imageUrl" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "affiliates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "team_email_key" ON "public"."team"("email");
