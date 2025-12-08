import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { Persona } from "@/app/generated/prisma/client";

/**
 * @openapi
 * /api/respuestas-formulario:
 *   post:
 *     summary: Crea una respuesta de un formulario
 *     tags:
 *       - Respuesta Formulario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               formularioId:
 *                   type: string
 *               slugPublico:
 *                   type: string
 *               nombreCompleto:
 *                   type: string
 *               correo:
 *                   type: boolean
 *               titulo:
 *                   type: boolean
 *               texto:
 *                   type: boolean
 *               calificacion:
 *                   type: boolean
 *               organizacionId:
 *             required:
 *               - formularioId
 *               - slugPublico
 *               - nombreCompleto
 *               - correo
 *               - titulo
 *               - texto
 *               - calificacion
 *               - organizacionId
 *     responses:
 *       201:
 *         description: Respuesta formulario creada
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno
 */
// ======================================================
// POST → Crear una respuesta de formulario (testimonio)
// ======================================================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      formularioId,
      slugPublico,
      nombreCompleto,
      correo,
      titulo,
      texto,
      calificacion,
      organizacionId,
    } = body;

    console.log(" Body recibido:", { formularioId, slugPublico, nombreCompleto, correo, titulo, organizacionId });

    // Validación básica
    if (!formularioId && !slugPublico) {
      return NextResponse.json(
        { error: "Formulario no especificado" },
        { status: 400 }
      );
    }

    if (!titulo?.trim() || !texto?.trim()) {
      console.warn(" Validación fallida: titulo o texto vacío");
      return NextResponse.json(
        { error: "Título y texto son requeridos" },
        { status: 400 }
      );
    }

    // Obtener formulario
    let formulario;
    if (slugPublico) {
      console.log(" Buscando formulario por slug:", slugPublico);
      formulario = await prisma.formulario.findUnique({
        where: { slugPublico },
        select: { id: true, categoriaId: true, estado: true, organizacionId: true },
      });
    } else {
      console.log(" Buscando formulario por ID:", formularioId);
      formulario = await prisma.formulario.findUnique({
        where: { id: formularioId },
        select: { id: true, categoriaId: true, estado: true, organizacionId: true },
      });
    }

    console.log(" Formulario encontrado:", formulario?.id);

    if (!formulario) {
      console.error(" Formulario no encontrado");
      return NextResponse.json(
        { error: "Formulario no encontrado" },
        { status: 404 }
      );
    }

    console.log(" Estado del formulario:", formulario.estado);

    if (formulario.estado !== "publicado") {
      console.warn(" Formulario no publicado:", formulario.estado);
      return NextResponse.json(
        { error: "Este formulario no está disponible actualmente" },
        { status: 403 }
      );
    }

    // Buscar o crear persona
    let persona: Persona | null = null;

    if (correo?.trim()) {
      console.log("👤 Buscando persona por email:", correo);

      persona = await prisma.persona.findUnique({
        where: { correo: correo.trim() },
      });

      if (!persona) {
        console.log(" Creando nueva persona:", correo);

        persona = await prisma.persona.create({
          data: {
            nombreCompleto: nombreCompleto?.trim() || "Anónimo",
            correo: correo.trim(),
          },
        });

        console.log(" Persona creada:", persona.id);
      } else {
        console.log(" Persona existente encontrada:", persona.id);
      }
    } else {
      console.log(" Sin correo proporcionado, creando respuesta anónima");
    }

    // Guardar respuesta
    console.log(" Guardando respuesta...");
    const respuesta = await prisma.respuestaFormulario.create({
      data: {
        formularioId: formulario.id,
        personaId: persona?.id || null,
        nombreCompleto: nombreCompleto?.trim() || null,
        correo: correo?.trim() || null,
        titulo: titulo.trim(),
        texto: texto.trim(),
        calificacion: calificacion || 5,
        estado: "pendiente",
        imagenUrl: body.imagenUrl || null,
        videoUrl: body.videoUrl || null,
        imagenPublicId: body.imagenPublicId || null,
        videoPublicId: body.videoPublicId || null,
      },
      include: {
        formulario: {
          select: {
            id: true,
            nombreFormulario: true,
            categoriaId: true,
            categoria: { select: { id: true, nombre: true } },
          },
        },
        persona: {
          select: { id: true, nombreCompleto: true, correo: true, fotoUrl: true },
        },
      },
    });

    console.log(" Respuesta guardada:", respuesta.id);

    return NextResponse.json(
      {
        success: true,
        message: "Testimonio enviado exitosamente",
        respuesta,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(" Error en POST /api/respuestas-formulario:", error);
    const errorMsg =
      error instanceof Error ? error.message : "Error desconocido";

    return NextResponse.json(
      { error: `Error interno del servidor: ${errorMsg}` },
      { status: 500 }
    );
  }
}

/**
 * @openapi
 * /api/respuestas-formulario:
 *   get:
 *     summary: Obtiene todas las respuestas de un formulario
 *     tags:
 *       - Respuesta Formulario
 *     parameters:
 *       - in: query
 *         name: formularioId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del formulario para filtrar las respuestas
 *     responses:
 *       '200':
 *         description: Respuestas de formularios obtenidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 total:
 *                   type: integer
 *                   example: 3
 *                 respuestas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       formularioId:
 *                         type: string
 *                       personaId:
 *                         type: string
 *                         nullable: true
 *                       nombreCompleto:
 *                         type: string
 *                         nullable: true
 *                       correo:
 *                         type: string
 *                         nullable: true
 *                       titulo:
 *                         type: string
 *                       texto:
 *                         type: string
 *                       calificacion:
 *                         type: integer
 *                         example: 5
 *                       estado:
 *                         type: string
 *                         example: pendiente
 *                       imagenUrl:
 *                         type: string
 *                         nullable: true
 *                       videoUrl:
 *                         type: string
 *                         nullable: true
 *                       creadoEn:
 *                         type: string
 *                         format: date-time
 *                       persona:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           nombreCompleto:
 *                             type: string
 *                           correo:
 *                             type: string
 *                           fotoUrl:
 *                             type: string
 *                             nullable: true
 *       '400':
 *         description: Parámetros inválidos (p. ej., falta formularioId)
 *       '500':
 *         description: Error interno del servidor
 */
// ======================================================
// GET → Obtener todas las respuestas de un formulario
// ======================================================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const formularioId = searchParams.get("formularioId");

    if (!formularioId) {
      return NextResponse.json(
        { error: "formularioId requerido" },
        { status: 400 }
      );
    }

    // Obtener respuestas
    const respuestas = await prisma.respuestaFormulario.findMany({
      where: { formularioId },
      include: {
        persona: {
          select: {
            id: true,
            nombreCompleto: true,
            correo: true,
            fotoUrl: true,
          },
        },
      },
      orderBy: { creadoEn: "desc" },
    });

    return NextResponse.json(
      {
        success: true,
        total: respuestas.length,
        respuestas,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error en GET /api/respuestas-formulario:", error);

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
