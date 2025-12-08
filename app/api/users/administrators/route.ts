import { NextResponse } from "next/server";
import { UserService } from "@/models/user/userService";

const userService = new UserService();

/**
 * @openapi
 * /api/users/administrators:
 *   get:
 *     summary: Obtiene todos los usuarios con el rol de administrador
 *     tags:
 *       - Usuario
 *     responses:
 *       200:
 *         description: Usuarios con rol administrador obtenidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuestionCreateSchema'
 */
// Obtiene usuarios con rol administrador
export async function GET() {
    const usersAdmins = await userService.getUserByAdminRol();
    return NextResponse.json(usersAdmins, { status: 200 });
}