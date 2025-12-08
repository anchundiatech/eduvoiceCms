import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { QuestionService } from "@/models/question/questionService";

const questionService = new QuestionService();

/**
 * @openapi
 * /api/questions:
 *   get:
 *     summary: Obtiene todas las preguntas
 *     tags:
 *       - Pregunta
 *     responses:
 *       200:
 *         description: Preguntas obtenidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuestionCreateSchema'
 */
// Obtiene todas las preguntas
export async function GET() {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const questions = await questionService.getAllQuestions();
    return NextResponse.json(questions, { status: 200 });
};