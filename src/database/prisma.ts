//este arquivo é usado para consumir o banco de dados dentro da aplicação 
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
    log: ["query"], // Enable query logging for debugging purposes
});