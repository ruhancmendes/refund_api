//tratamento de erros 

import { AppError } from "@/utils/AppError";
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod"

export const errorHandling: ErrorRequestHandler = (
    error,
    request,
    response,
    next
) => {
    if (error instanceof AppError) {
        //verifica se é um erro lançado pelo desenvolvimento
        response.status(error.statusCode).json({ message: error.message})
        return
    }

    if (error instanceof ZodError) {
        //verifica se o erro é de validação do Zod
        response.status(400).json({ 
            message: "validation error",
            issues: error.format()
        })
        return
    }

    response.status(500).json({ message: error.message}) //se o erro não for de nenhuma das opções anteriores, devolve o próprio erro
    return
}