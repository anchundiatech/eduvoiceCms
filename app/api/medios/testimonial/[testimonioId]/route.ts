import { NextRequest, NextResponse } from "next/server";
import { MedioService } from "@/models/medio/medioService";
import { TestimonialService } from "@/models/testimonial/testimonialService";
import { sanitizeBigInt } from "@/lib/sanitizeBigInt";

const medioService = new MedioService();
const testimonialService = new TestimonialService();

/**
 * @openapi
 * /api/medios/testimonial/{testimonioId}:
 *   get:
 *     summary: Obtiene una organización por el ID del usuario
 *     tags:
 *       - Medio
 *     parameters:
 *       - in: path
 *         name: testimonioId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del testimonio
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
 *         description: Medio o testimonio no encontrado
 *       500:
 *         description: Error interno
 */
// Obtiene medios por testimonioId
export async function GET(request: NextRequest, { params }: { params: Promise<{ testimonioId: string }> }) {
    try {
        const { testimonioId } = await params;

        const testimonialFounded = await testimonialService.getTestimonialById(testimonioId);
        if (!testimonialFounded) return NextResponse.json({ message: "Testimonial not found" }, { status: 404 });

        const medios = await medioService.getMedioByTestimonioId(testimonioId);
        return NextResponse.json(sanitizeBigInt(medios), { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });

        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}