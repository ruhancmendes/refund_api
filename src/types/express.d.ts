// arquivo para estender a tipagem do express e adicionar o user na requisição.

declare namespace Express {
    // estende a interface Request do express para adicionar o user
    export interface Request {
        user?: {
            id: string
            role: string
        }
    } // o ? indica que o user é opcional, pois nem todas as requisições terão essa propriedade.
}