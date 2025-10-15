// arquivo com dois métodos: para salvar e deletar arquivos. vai mover o arquivo da pasta temporária para a de upload, e também vai conseguir deletar o arquivo, caso ele não atenda algum critério da validação.

import fs from "node:fs" 
import path from "node:path"

import uploadConfig from "@/configs/upload"

class DiskStorage {
    async saveFile(file: string){
        const tmpPath = path.resolve(uploadConfig.TMP_FOLDER, file) // caminho do arquivo na pasta temporária.
        const destPath = path.resolve(uploadConfig.UPLOADS_FOLDER, file) // caminho do arquivo na pasta de upload. 

        try {
          await fs.promises.access(tmpPath) // verifica se o arquivo existe na pasta temporária.  
        } catch (error) {
            console.log(error)
            throw new Error(`Arquivo não encontrado: ${tmpPath}`)
        }

        await fs.promises.mkdir(uploadConfig.UPLOADS_FOLDER, { recursive: true}) // cria a pasta de upload, caso ela não exita.
        await fs.promises.rename(tmpPath, destPath) // move o arquivo da pasta temporária para a de upload. 

        return file // retorna o nome do arquivo.
    }
    async deleteFile(file: string, type: "tmp" | "upload"){
        const pathFile = 
        type === "tmp" ? uploadConfig.TMP_FOLDER : uploadConfig.UPLOADS_FOLDER // verifica se o arquivo está na pasta temporária ou na de upload.

        const filePath = path.resolve(pathFile, file) // caminho completo do arquivo.

        try{
            await fs.promises.stat(filePath) // verifica se o arquivo existe.
        } catch {
            return // se não existir, sai da função.
        }

        await fs.promises.unlink(filePath) // deleta o arquivo.
    }
}

export { DiskStorage }