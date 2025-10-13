// middleware para garantir que o usuário está autenticado para acessar certas rotas.

import { verify } from "jsonwebtoken";
import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";

interface TokenPayload {
    // interface para o payload do token JWT
    role: string
    sub: string
}

function ensureAuthenticated( request: Request, response: Response, next: NextFunction) {
    // middleware para garantir que o usuário está autenticado

    try {
        const authHeader = request.headers.authorization // obtém o cabeçalho de autorização da requisição.

        if(!authHeader){
            throw new AppError("JWT token not found", 401) // se o cabeçalho não existir, lança um erro de autenticação.
        }

        // o token chega assim: "Bearer 12343344ijfadsjjskkjdsi1124u23192839". com a const abaixo ele é dividido em duas partes, o bearer é ignorado e o token é pego.
        const [, token] = authHeader.split(" ") // divide o cabeçalho para obter o token.

        const { role, sub: user_id } = verify(token, authConfig.jwt.secret) as TokenPayload // verifica o token usando a chave secreta definida na configuração de autenticação.

        request.user = {
            id: user_id,
            role,
        } // adiciona as informações do usuário autenticado ao objeto de requisição. Como ele não reconhece user é preciso criar uma tipagem personalizada. 

        return next() // chama o próximo middleware ou rota. 
    } catch (error) {
        throw new AppError("Invalid JWT token", 401) // se houver um erro na verificação do token.
    }
}

export { ensureAuthenticated } // exporta o middleware para ser usado em outras partes da aplicação.