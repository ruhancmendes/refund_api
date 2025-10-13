// Controller de autenticação de usuários
import { Request, Response } from "express"
import { z } from "zod"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"
import { compare } from "bcrypt"
import { authConfig } from "@/configs/auth"
import { sign } from "jsonwebtoken"

class SessionsController {
    // Método para criar uma nova sessão (login)
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            // validação dos dados para login
            email: z.string().email({ message: "E-mail inválido!"}),
            password: z.string(),
        })

        const { email, password } = bodySchema.parse(request.body) //extrai o email e senha do corpo da requisição.

        const user = await prisma.user.findFirst({ where: { email }}) // procura o usuário no banco de dados pelo email.

        if(!user){
            // se o usuário não for encontrado, lança o erro.
            throw new AppError("E-mail ou senha inválidos!", 401)
        }

        const passwordMatched = await compare(password, user.password) // compara a senha fornecida com a senha armazenada no banco de dados.

        if(!passwordMatched){
            // se as senhas não coincidirem, lança o erro.
            throw new AppError("E-mail ou senha inválidos!", 401)
        }

        const { secret, expiresIn } = authConfig.jwt // extrai a chave secreta e o tempo dde expiração do token das configurações de autenticação.

        const token = sign({ role: user.role }, secret, {
            // payload do token
            subject: user.id, // id do usuário como assunto do token
            expiresIn, // tempo de expiração do token
        })

        const { password: _, ...userWithoutPassword} = user // remove a senha do objeto user para não enviá-la na resposta.

        response.json({ token, user: userWithoutPassword }) //envia a resposta como o token e os dados do usuário (sem a senha)
    }
}

export { SessionsController}