// arquivo de entrada da aplicação
import express from "express" //importando todo o express do noe_modules
import "express-async-errors" //importa o express-async-errors para lidar com erros em funções assíncronas
import cors from "cors"
import { errorHandling } from "@/middlewares/error-handling"

import { routes } from "./routes"
import uploadConfig from "@/configs/upload"

// import { AppError } from "@/utils/AppError" (PARA TESTE)
// import { z } from "zod" (PARA TESTE)

const app = express() //cria a instância app que usa de molde o express(classe)

app.use(express.json())
app.use(cors()) //habilita o uso do cors pela aplicação.

app.use("/uploads", express.static(uploadConfig.UPLOADS_FOLDER)) // habilita o acesso aos arquivos da pasta de upload via URL.

app.use(routes) //habilita o uso das rotas pela aplicação.

/*(APENAS PARA TESTE) app.get("/", (req, res) => { 
     throw new AppError("Erro de teste!") 
    const bodySchema = z.object({
        age:z.number().min(18)
    })

    const { age } = bodySchema.parse(req.body) -teste de validação-
    res.send("Hello,World!")
}) */

app.use(errorHandling) //habilita o uso do middleware de tratamento de erros

export { app }