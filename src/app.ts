// arquivo de entrada da aplicação
import express from "express" //importando todo o express do noe_modules

const app = express() //cria a instância app que usa de molde o express(classe)

app.use(express.json())

app.get("/", (req, res) => { 
    res.send("Hello,World!")
})

export { app }