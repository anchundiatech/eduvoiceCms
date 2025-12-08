import { NextResponse } from "next/server";
import { PersonService } from "@/models/person/personService";

const personService = new PersonService();

/**
 * @openapi
 * /api/persons:
 *   get:
 *     summary: Obtiene todas las personas
 *     tags:
 *       - Persona
 *     responses:
 *       200:
 *         description: Personas obtenidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonCreateSchema'
 */
// Obtiene todas las personas
export async function GET() {
    const persons = await personService.getAllPersons();
    return NextResponse.json(persons, { status: 200 });
};