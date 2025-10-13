// define a rota de usuários. ela mapeia as requisições HTTP para os métodos do controller de usuários. é o mecanismo que direciona as requisições de um usuário para a parte correta da aplicação.

// nesse caso, quando uma requisição POST é feita para a rota "/users", o método create do UsersController é chamado.

import { Router } from "express"
import { UsersController } from "@/controllers/users-controller"

const usersRoutes = Router() // cria uma instância do roteador do express
const usersController = new UsersController() // cria uma instância do controller de usuários

usersRoutes.post("/", usersController.create) // define a rota POST /users que chama o método create do controller

export { usersRoutes } // exporta o roteador para ser usado em outras partes da aplicação