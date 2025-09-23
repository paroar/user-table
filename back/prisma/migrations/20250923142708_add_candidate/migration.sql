-- CreateTable
CREATE TABLE "Candidate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "seniority" TEXT NOT NULL,
    "years" INTEGER NOT NULL,
    "availability" BOOLEAN NOT NULL
);
