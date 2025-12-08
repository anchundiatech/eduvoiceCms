import { NextRequest, NextResponse } from "next/server";
import { PersonService } from "@/models/person/personService";
import { PersonUpdateSchema } from "@/models/person/dto/person";

const personService = new PersonService();

/**
 * @openapi
 * /api/persons/{id}:
 *   get:
 *     summary: Obtiene una persona por su ID
 *     tags:
 *       - Persona
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la persona
 *     responses:
 *       200:
 *         description: Persona obtenida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonCreateSchema'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Persona no encontrada
 *       500:
 *         description: Error interno
 */
//Obtiene una persona por su ID
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const person = await personService.getPersonById(id);
        if (!person) return NextResponse.json({ error: "Person not found" }, { status: 404 });

        return NextResponse.json(person, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

/**
 * @openapi
 * /api/persons/{id}:
 *   put:
 *     summary: Actualiza una persona por su ID
 *     tags:
 *       - Persona
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la persona
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PersonUpdateSchema'
 *     responses:
 *       200:
 *         description: Persona actualizada
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No autorizado
 *       404:
 *          description: Persona no encontrada
 *       500:
 *         description: Error interno
 */
// Actualiza una persona por su ID
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const personFounded = await personService.getPersonById(id);
        if (!personFounded) return NextResponse.json({ error: "Person not found" }, { status: 404 });

        const body = await request.json();
        const dto = PersonUpdateSchema.parse(body);
        const updatedPerson = await personService.updatePerson(id, dto);

        return NextResponse.json(updatedPerson, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

/**
 * @openapi
 * /api/persons/{id}:
 *   delete:
 *     summary: Elimina una persona por su ID
 *     tags:
 *       - Persona
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la persona
 *     responses:
 *       204:
 *         description: Persona eliminada
 *       400:
 *         description: Error de validación
 *       404:
 *          description: Persona no encontrada
 *       500:
 *          description: Error interno
 */
// Elimina una persona por su ID
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const personFounded = await personService.getPersonById(id);
        if (!personFounded) return NextResponse.json({ error: "Person not found" }, { status: 404 });

        await personService.deletePerson(id);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}