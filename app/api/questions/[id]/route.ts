import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { QuestionService } from "@/models/question/questionService";
import { QuestionUpdateSchema } from "@/models/question/dto/question";

const questionService = new QuestionService();

/**
 * @openapi
 * /api/questions/{id}:
 *   get:
 *     summary: Obtiene una pregunta por su ID
 *     tags:
 *       - Pregunta
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la pregunta
 *     responses:
 *       200:
 *         description: Pregunta obtenida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuestionCreateSchema'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Pregunta no encontrada
 *       500:
 *         description: Error interno
 */
// Obtiene una pregunta por ID
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { id } = await params;

        const question = await questionService.getQuestionById(id);
        if (!question) return NextResponse.json({ error: "Question not found" }, { status: 404 });

        return NextResponse.json(question, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

/**
 * @openapi
 * /api/questions/{id}:
 *   put:
 *     summary: Actualiza una pregunta por su ID
 *     tags:
 *       - Pregunta
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la pregunta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuestionUpdateSchema'
 *     responses:
 *       200:
 *         description: Pregunta actualizada
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No autorizado
 *       404:
 *          description: Pregunta no encontrada
 *       500:
 *         description: Error interno
 */
// Actualiza una pregunta por ID
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { id } = await params;

        const questionFounded = await questionService.getQuestionById(id);
        if (!questionFounded) return NextResponse.json({ error: "Question not found" }, { status: 404 });

        const body = await request.json();
        const dto = QuestionUpdateSchema.parse(body);
        const updatedQuestion = await questionService.updateQuestion(id, dto);

        return NextResponse.json(updatedQuestion, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

/**
 * @openapi
 * /api/questions/{id}:
 *   delete:
 *     summary: Elimina una pregunta por su ID
 *     tags:
 *       - Pregunta
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la pregunta
 *     responses:
 *       204:
 *         description: Pregunta eliminada
 *       400:
 *         description: Error de validación
 *       404:
 *          description: Pregunta no encontrada
 *       500:
 *          description: Error interno
 */
// Elimina una pregunta por ID
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { id } = await params;

        const questionFounded = await questionService.getQuestionById(id);
        if (!questionFounded) return NextResponse.json({ error: "Question not found" }, { status: 404 });

        await questionService.deleteQuestion(id);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};