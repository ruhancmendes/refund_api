// servidor que irá iniciar a aplicação

import { app } from "@/app"

const PORT = 3333 //definindo a porta do servidor

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))