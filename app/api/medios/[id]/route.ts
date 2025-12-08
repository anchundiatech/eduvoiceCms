import { NextResponse, NextRequest } from "next/server";
import { MedioService } from "@/models/medio/medioService";
import { MedioUpdateSchema } from "@/models/medio/dto/medio";
import { sanitizeBigInt } from "@/lib/sanitizeBigInt";

const medioService = new MedioService();

/**
 * @openapi
 * /api/medios/{id}:
 *   get:
 *     summary: Obtiene un medio por su ID
 *     tags:
 *       - Medio
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del medio
 *     responses:
 *       200:
 *         description: Medio obtenido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MedioCreateSchema'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Medio no encontrado
 *       500:
 *         description: Error interno
 */
// =========================
// GET /api/medios/[id]
// =========================
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const medio = await medioService.getMedioById(id);
    if (!medio) {
      return NextResponse.json({ error: "Medio not found" }, { status: 404 });
    }

    return NextResponse.json(sanitizeBigInt(medio), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * @openapi
 * /api/medios/{id}:
 *   put:
 *     summary: Actualiza un medio por su ID
 *     tags:
 *       - Medio
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del medio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MedioUpdateSchema'
 *     responses:
 *       200:
 *         description: Medio actualizado
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No autorizado
 *       404:
 *          description: Medio no encontrado
 *       500:
 *         description: Error interno
 */
// =========================
// PUT /api/medios/[id]
// =========================
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const medio = await medioService.getMedioById(id);
    if (!medio) {
      return NextResponse.json({ error: "Medio not found" }, { status: 404 });
    }

    const body = await request.json();
    const dto = MedioUpdateSchema.parse(body);

    const updated = await medioService.updateMedio(id, dto);

    return NextResponse.json(sanitizeBigInt(updated), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * @openapi
 * /api/medios/{id}:
 *   delete:
 *     summary: Elimina un medio por su ID
 *     tags:
 *       - Medio
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del medio
 *     responses:
 *       204:
 *         description: Medio eliminada
 *       400:
 *         description: Error de validación
 *       404:
 *          description: Medio no encontrada
 *       500:
 *          description: Error interno
 */
// =========================
// DELETE /api/medios/[id]
// =========================
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const medio = await medioService.getMedioById(id);
    if (!medio) {
      return NextResponse.json(
        { error: "Medio not found" },
        { status: 404 }
      );
    }

    await medioService.deleteMedio(id);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
