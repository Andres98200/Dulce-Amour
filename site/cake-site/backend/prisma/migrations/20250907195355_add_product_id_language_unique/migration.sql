/*
  Warnings:

  - A unique constraint covering the columns `[productId,language]` on the table `ProductTranslation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductTranslation_productId_language_key" ON "public"."ProductTranslation"("productId", "language");
