// controller de usuários, atua como intermediário que gerencia o fluxo da aplicação. nesse caso, ele recebe as requisições HTTP, chama os serviços apropriados para processar os dados e retorna as respostas HTTP.

// sua principal função então é receber as requisições do usuário, processá-las (geralmente chamando serviços) e enviar as respostas de volta ao cliente.

import { Request, Response } from "express"
import { z } from "zod"
import { UserRole } from "@prisma/client"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"
import { hash } from "bcrypt"

class UsersController {
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            // validação dos dados recebidos na requisição
            name: z.string().trim().min(2, { message: "Nome é obrigatório! "}),
            email: z
            .string()
            .trim()
            .email({ message: "E-mail inválido! "})
            .toLowerCase(),
            password: z
            .string()
            .min(6, { message: "A senha deve conter pelo menos 6 dígitos!" }),
            role: z
            .enum([UserRole.employee, UserRole.manager])
            .default(UserRole.employee),
        })

        const { name, email, password, role } = bodySchema.parse(request.body)

        const userWithSameEmail = await prisma.user.findFirst({ where: { email }})

        if(userWithSameEmail){
            throw new AppError("Já existe um usuário cadastrado com esse e-mail!")
        }

        const hashedPassword = await hash(password, 8) // 8 é o custo do hash, ou seja, o número de vezes que o algoritmo vai processar a senha. quanto maior o custo, mais seguro, mas também mais lento. Aqui aa senha será criptografada 8 vezes. 

        await prisma.user.create({
            // criação do usuário no banco de dados
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            }
        })

        response.status(201).json()
    }
}

export { UsersController}