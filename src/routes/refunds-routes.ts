// rota de solicitação de reembolso

import { Router } from "express";
import { RefundsController } from "@/controllers/refunds-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const refundsRoutes = Router() // criando uma instância do roteador
const refundsController = new RefundsController() // criando uma instância do controlador

refundsRoutes.post("/", 
    verifyUserAuthorization(["employee"]), // middleware de verificação de autorização do usuário.
    refundsController.create) // definindo a rota POST para criar uma solicitação de reembolso

refundsRoutes.get("/",
    verifyUserAuthorization(["manager"]), // middleware de verificação de autorização do usuário.
    refundsController.index
)

refundsRoutes.get(
    "/:id",
    verifyUserAuthorization(["employee", "manager"]), // middleware de verificação de autorização do usuário.
    refundsController.show
)

export { refundsRoutes } // exportando as rotas de reembolso