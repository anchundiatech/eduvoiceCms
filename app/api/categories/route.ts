import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { CategoryService } from "@/models/category/categoryService";
import { OrganizationService } from "@/models/organization/organizationService";
import { CategoryCreateSchema } from "@/models/category/dto/category";

const categoryService = new CategoryService();
const organizationService = new OrganizationService();

/**
 * @openapi
 * /api/categories:
 *   post:
 *     summary: Crea una categoría
 *     tags:
 *       - Categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                   type: string
 *               titulo:
 *                   type: string
 *               mensaje:
 *                   type: string
 *             required:
 *               - nombre
 *               - titulo
 *               - mensaje
 *     responses:
 *       201:
 *         description: Categoría creada
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno
 */
// Crea una nueva categoría
export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = session.user.id;
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await request.json();

        // Extraer solo los datos de la categoría si vienen anidados
        const categoryData = body.category || body;
        const dto = CategoryCreateSchema.parse(categoryData);

        const organizacionId = await organizationService.getOrganizationIdByUserId(userId);
        if (!organizacionId) return NextResponse.json({ error: "Organization not found for user" }, { status: 404 });

        const newCategory = await categoryService.createCategory(dto, userId, organizacionId);

        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

/**
 * @openapi
 * /api/categories:
 *   get:
 *     summary: Obtiene todas las categorías
 *     tags:
 *       - Categoría
 *     responses:
 *       200:
 *         description: Categorías obtenidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryCreateSchema'
 */
// Obtiene todas las categorías
export async function GET() {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const categories = await categoryService.getAllCategories();
    return NextResponse.json(categories, { status: 200 });
};