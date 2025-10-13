// Arquivo de configuração de autenticação.

// Aqui você pode configurar estratégias de autenticação, como JWT, OAuth, etc.

export const authConfig = {
    jwt:{
        secret: "ruhan", // chave secreta para assinar os tokens JWT
        expiresIn: "1d", // tempo de expiração do token
    }
}