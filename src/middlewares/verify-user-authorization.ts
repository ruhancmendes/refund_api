// middleware para verificar a autorização do usuário para executar certas ações.

import { Request, Response, NextFunction } from "express"
import { AppError } from "@/utils/AppError"

function verifyUserAuthorization(role: string[]) {
    return ( request: Request, response: Response, next: NextFunction ) => {
        // verifica se o usuário está autenticado e se o papel do usuário está na lista de papéis permitidos
        if(!request.user || !role.includes(request.user.role)){
            throw new AppError("Usuário não autorizado!", 401)
        }

        return next()
    }
}

export { verifyUserAuthorization}