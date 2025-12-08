import { createSwaggerSpec } from "next-swagger-doc";
import schemas from "@/openapi/schemas.json";

export const getSwaggerSpec = () => {
    return createSwaggerSpec({
        apiFolder: "app/api",
        definition: {
            openapi: "3.0.0",
            info: {
                title: "EduVoiceCMS API",
                version: "1.0.0",
                description: "Documentación de todos los endpoints utilizados en la plataforma de EduVoice. En cada endpoint se menciona lo que hace.",
            },
            components: {
                schemas,
                securitySchemes: {
                    // bearerAuth: {
                    //     type: "http",
                    //     scheme: "bearer",
                    //     bearerFormat: "JWT",
                    // }
                    nextAuthSession: {
                        type: "apiKey",
                        in: "cookie",
                        name: "next-auth.session-token"
                    }
                },
                parameters: {
                    SwaggerRequestHeader: {
                        name: "x-requested-with",
                        in: "header",
                        required: false,
                        schema: { type: "string", default: "XMLHttpRequest" },
                    }
                }
            },
            security: [{ nextAuthSession: [] }]
        },
        globalParameters: [
            { $ref: "#/components/parameters/SwaggerRequestHeader" }
        ],
    });
};