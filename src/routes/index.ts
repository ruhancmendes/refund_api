// centraliza todas as rotas da aplicação. ela importa os roteadores específicos (como o de usuários) e os monta na aplicação principal do express.

import { Router } from "express"
import { usersRoutes } from "./users-routes"
const routes = Router()
import { sessionsRoutes } from "./sessions-routes"
import { refundsRoutes } from "./refunds-routes"
import { uploadsRoutes } from "./uploads-routes"

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"

// Rotas públicas.
routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)

// Rotas privadas (somente para usuários autenticados)
routes.use(ensureAuthenticated) // aplica o middleware de autenticação para as rotas abaixo.
routes.use("/refunds", refundsRoutes)
routes.use("/uploads", uploadsRoutes)

export { routes }