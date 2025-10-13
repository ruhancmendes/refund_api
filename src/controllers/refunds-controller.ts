// controller de solicitação de reembolso

import { Request, Response } from "express"
import { z } from "zod"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"

const CategoriesEnum = z.enum([
    // categorias possíveis para o reembolso.
    "food", 
    "services", 
    "transport", 
    "accommodation", 
    "others"
])

class RefundsController {
    async create(request: Request, response: Response){
        // Lógica para criar uma solicitação de reembolso

        const BodySchema = z.object({
            // validação dos dados recebidos
            name: z
            .string()
            .trim()
            .min(1, { message: "Informe o nome da solicitação" }),
            category: CategoriesEnum,
            amount: z.number().positive({ message: "O valor precisa ser positivo."}),
            filename: z.string().min(20, { message: "O nome do arquivo precisa ter no mínimo 20 caracteres."}),
        })

        const { name, category, amount, filename } = BodySchema.parse(request.body) // validação de dados.

        if(!request.user?.id){
            throw new AppError("Usuário não autorizado!", 401)
        }

        const refund = await prisma.refunds.create({
            // criação da solicitação no banco de dados.
            data: {
                name,
                category,
                amount,
                filename,
                userId: request.user.id,
            },
        })

        response.status(201).json(refund)
    }

    async index(request: Request, response: Response){
        // lógica para listar todas as solicitações de reembolso.
        response.json({ message: "OK!"})
    } 
}

export { RefundsController}