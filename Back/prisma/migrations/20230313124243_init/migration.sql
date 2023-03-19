-- CreateTable
CREATE TABLE "Users" (
    "id" VARCHAR(30) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profiles" (
    "id" VARCHAR(30) NOT NULL,
    "firstName" VARCHAR(25) NOT NULL,
    "lastName" VARCHAR(20) NOT NULL,
    "city" VARCHAR(20) NOT NULL,
    "province" VARCHAR(20) NOT NULL,
    "adress" VARCHAR(50) NOT NULL,
    "dni" VARCHAR(8) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" VARCHAR(30) NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "description" VARCHAR NOT NULL,
    "price" DECIMAL(15,2) NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "categoryId" VARCHAR(30) NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImagesProduct" (
    "id" VARCHAR(30) NOT NULL,
    "photo" BYTEA,
    "productId" VARCHAR(30) NOT NULL,

    CONSTRAINT "ImagesProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryProduct" (
    "id" VARCHAR(30) NOT NULL,
    "name" VARCHAR(25) NOT NULL,

    CONSTRAINT "CategoryProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" VARCHAR(30) NOT NULL,
    "status" VARCHAR(15) NOT NULL,
    "paymentMethod" VARCHAR(15) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseProduct" (
    "id" VARCHAR(30) NOT NULL,
    "quantityProduct" INTEGER NOT NULL DEFAULT 1,
    "purchaseId" VARCHAR(30) NOT NULL,
    "productId" VARCHAR(30) NOT NULL,

    CONSTRAINT "PurchaseProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_userId_key" ON "Profiles"("userId");

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesProduct" ADD CONSTRAINT "ImagesProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseProduct" ADD CONSTRAINT "PurchaseProduct_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseProduct" ADD CONSTRAINT "PurchaseProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
