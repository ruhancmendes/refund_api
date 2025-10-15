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
        
        const querySchema = z.object({
            // validando dados recebidos
            name: z.string().optional().default(""),
            page: z.coerce.number().optional().default(1), // página atual
            perPage: z. coerce.number().optional().default(10), // itens por página.
        })

        const { name, page, perPage } = querySchema.parse(request.query) // validação de dados;

        // Cálculo para pular os itens das páginas anteriores. skip.
        const skip = (page-1) * perPage

        const refunds = await prisma.refunds.findMany({
            // buscando as solicitações no banco de dados. 
            skip,
            take: perPage,
            where: {
                user: {
                    name: {
                       contains: name.trim(), 
                    }
                }
            },
            orderBy: { createdAt: "desc" }, // ordenando a lista da mais recente para a mais antiga.
            include: { user: true }, // incluindo dados do usuário que fez a solicitação.
        })
        
        // Obter o total dde registros para calcular o número de páginas.
        const totalRecords = await prisma.refunds.count({
            where: {
                user: {
                    name: {
                        contains: name.trim(),
                    }
                }
            }
        })

        const totalPages = Math.ceil(totalRecords / perPage) // cálculo do total de páginas.

        response.json({
            refunds,
            pagination: {
                page,
                perPage,
                totalRecords,
                totalPages: totalPages > 0 ? totalPages : 1, //garantir que sempre haja pelo menos uma página.
            }
        })
    } 

    async show(request: Request, response: Response){
       // lógica para obter os detalhes de uma solicitação específica.
        const paramsSchema = z.object({ 
            id: z.string().uuid(), // validação do ID como UUID.
        })

        const { id } = paramsSchema.parse(request.params) // validação de dados.

        const refund = await prisma.refunds.findFirst({
            where: { id },
            include: { user: true }, // incluindo dados do usuário que fez a solicitação.
        })

        response.json(refund)
    }
}

export { RefundsController}