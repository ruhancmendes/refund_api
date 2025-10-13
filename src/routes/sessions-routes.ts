// rota para sessões (login)
import { Router } from "express"
import { SessionsController } from "@/controllers/sessions-controller"

const sessionsRoutes = Router() // criando a instância do roteador
const sessionsController = new SessionsController() // criando a instância do controller

sessionsRoutes.post("/", sessionsController.create) // rota para criar uma nova sessão (login)

export { sessionsRoutes}