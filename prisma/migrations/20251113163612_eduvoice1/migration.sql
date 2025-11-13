/*
  Warnings:

  - Added the required column `organizacionId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rol` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EstadoTestimonio" AS ENUM ('borrador', 'en_revision', 'aprobado', 'publicado', 'rechazado', 'archivado');

-- CreateEnum
CREATE TYPE "TipoMedio" AS ENUM ('imagen', 'video');

-- CreateEnum
CREATE TYPE "TipoCategoria" AS ENUM ('producto', 'evento', 'cliente', 'industria', 'servicio');

-- CreateEnum
CREATE TYPE "DecisionRevision" AS ENUM ('aprobar', 'rechazar');

-- CreateEnum
CREATE TYPE "ModalidadTestimonio" AS ENUM ('texto_imagen', 'video');

-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('admin', 'editor');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "organizacionId" TEXT NOT NULL,
ADD COLUMN     "rol" "Rol" NOT NULL;

-- CreateTable
CREATE TABLE "Organizacion" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Organizacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Persona" (
    "id" TEXT NOT NULL,
    "nombreCompleto" TEXT NOT NULL,
    "correo" TEXT,
    "fotoUrl" TEXT,

    CONSTRAINT "Persona_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Espacio" (
    "id" TEXT NOT NULL,
    "organizacionId" TEXT NOT NULL,
    "creadoPorId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "titulo" TEXT,
    "mensaje" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Espacio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pregunta" (
    "id" TEXT NOT NULL,
    "espacioId" TEXT NOT NULL,
    "texto" TEXT NOT NULL,

    CONSTRAINT "Pregunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonio" (
    "id" TEXT NOT NULL,
    "espacioId" TEXT NOT NULL,
    "personaId" TEXT NOT NULL,
    "modalidad" "ModalidadTestimonio" NOT NULL DEFAULT 'texto_imagen',
    "titulo" TEXT NOT NULL,
    "texto" TEXT,
    "estado" "EstadoTestimonio" NOT NULL DEFAULT 'borrador',
    "destacado" BOOLEAN NOT NULL DEFAULT false,
    "calificacion" INTEGER NOT NULL DEFAULT 5,
    "publicadoEn" TIMESTAMP(3),
    "actualizadoPorId" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medio" (
    "id" TEXT NOT NULL,
    "organizacionId" TEXT NOT NULL,
    "testimonioId" TEXT NOT NULL,
    "tipo" "TipoMedio" NOT NULL,
    "url" TEXT NOT NULL,
    "ancho" INTEGER NOT NULL,
    "alto" INTEGER NOT NULL,
    "duracionSegundos" INTEGER,
    "bytes" BIGINT,
    "leyenda" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Medio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL,
    "organizacionId" TEXT NOT NULL,
    "espacioId" TEXT NOT NULL,
    "tipo" "TipoCategoria" NOT NULL,
    "nombre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "padreId" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Etiqueta" (
    "id" TEXT NOT NULL,
    "organizacionId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Etiqueta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Revision" (
    "id" TEXT NOT NULL,
    "testimonioId" TEXT NOT NULL,
    "revisorId" TEXT NOT NULL,
    "decision" "DecisionRevision" NOT NULL,
    "notas" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Revision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoriaToEspacio" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoriaToEspacio_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_EtiquetaToTestimonio" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EtiquetaToTestimonio_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organizacion_slug_key" ON "Organizacion"("slug");

-- CreateIndex
CREATE INDEX "Espacio_organizacionId_idx" ON "Espacio"("organizacionId");

-- CreateIndex
CREATE INDEX "Espacio_creadoPorId_idx" ON "Espacio"("creadoPorId");

-- CreateIndex
CREATE INDEX "Pregunta_espacioId_idx" ON "Pregunta"("espacioId");

-- CreateIndex
CREATE INDEX "Testimonio_espacioId_idx" ON "Testimonio"("espacioId");

-- CreateIndex
CREATE INDEX "Testimonio_personaId_idx" ON "Testimonio"("personaId");

-- CreateIndex
CREATE INDEX "Testimonio_actualizadoPorId_idx" ON "Testimonio"("actualizadoPorId");

-- CreateIndex
CREATE INDEX "Medio_organizacionId_idx" ON "Medio"("organizacionId");

-- CreateIndex
CREATE INDEX "Medio_testimonioId_idx" ON "Medio"("testimonioId");

-- CreateIndex
CREATE INDEX "Categoria_organizacionId_idx" ON "Categoria"("organizacionId");

-- CreateIndex
CREATE INDEX "Etiqueta_organizacionId_idx" ON "Etiqueta"("organizacionId");

-- CreateIndex
CREATE INDEX "Revision_testimonioId_idx" ON "Revision"("testimonioId");

-- CreateIndex
CREATE INDEX "Revision_revisorId_idx" ON "Revision"("revisorId");

-- CreateIndex
CREATE INDEX "_CategoriaToEspacio_B_index" ON "_CategoriaToEspacio"("B");

-- CreateIndex
CREATE INDEX "_EtiquetaToTestimonio_B_index" ON "_EtiquetaToTestimonio"("B");

-- CreateIndex
CREATE INDEX "User_organizacionId_idx" ON "User"("organizacionId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Espacio" ADD CONSTRAINT "Espacio_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Espacio" ADD CONSTRAINT "Espacio_creadoPorId_fkey" FOREIGN KEY ("creadoPorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pregunta" ADD CONSTRAINT "Pregunta_espacioId_fkey" FOREIGN KEY ("espacioId") REFERENCES "Espacio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonio" ADD CONSTRAINT "Testimonio_espacioId_fkey" FOREIGN KEY ("espacioId") REFERENCES "Espacio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonio" ADD CONSTRAINT "Testimonio_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonio" ADD CONSTRAINT "Testimonio_actualizadoPorId_fkey" FOREIGN KEY ("actualizadoPorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medio" ADD CONSTRAINT "Medio_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medio" ADD CONSTRAINT "Medio_testimonioId_fkey" FOREIGN KEY ("testimonioId") REFERENCES "Testimonio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categoria" ADD CONSTRAINT "Categoria_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categoria" ADD CONSTRAINT "Categoria_padreId_fkey" FOREIGN KEY ("padreId") REFERENCES "Categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Etiqueta" ADD CONSTRAINT "Etiqueta_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revision" ADD CONSTRAINT "Revision_testimonioId_fkey" FOREIGN KEY ("testimonioId") REFERENCES "Testimonio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revision" ADD CONSTRAINT "Revision_revisorId_fkey" FOREIGN KEY ("revisorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriaToEspacio" ADD CONSTRAINT "_CategoriaToEspacio_A_fkey" FOREIGN KEY ("A") REFERENCES "Categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriaToEspacio" ADD CONSTRAINT "_CategoriaToEspacio_B_fkey" FOREIGN KEY ("B") REFERENCES "Espacio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EtiquetaToTestimonio" ADD CONSTRAINT "_EtiquetaToTestimonio_A_fkey" FOREIGN KEY ("A") REFERENCES "Etiqueta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EtiquetaToTestimonio" ADD CONSTRAINT "_EtiquetaToTestimonio_B_fkey" FOREIGN KEY ("B") REFERENCES "Testimonio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
