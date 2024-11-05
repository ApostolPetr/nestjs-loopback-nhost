-- CreateTable
CREATE TABLE "SomeEntity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "UserEntity" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "tokensId" INTEGER,
    CONSTRAINT "UserEntity_tokensId_fkey" FOREIGN KEY ("tokensId") REFERENCES "UserTokensEntity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "UserTokensEntity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "refreshToken" TEXT,
    "accessToken" TEXT
);

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_user_entity_1" ON "UserEntity"("tokensId");
Pragma writable_schema=0;
