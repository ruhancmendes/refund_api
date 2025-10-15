// configuração de upload de arquivos.

import multer from "multer";
import path from "node:path"
import crypto from "node:crypto"

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp") // caminho da pasta temporária
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads") // caminho da pasta de uploads


const MAX_SIZE = 3 // tamanho máximo do arquivo 
const MAX_FILE_SIZE = 1024 * 1024 * MAX_SIZE // tamanho máximo do arquivo (3MB)
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"] // tipos de arquivos aceitos

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER, // destino dos arquivos.
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString("hex") // gera um hash aleatório para o nome do arquivo.
            const fileName = `${fileHash}-${file.originalname}`

            return callback(null, fileName)
        }
    })
}

export default {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MAX_FILE_SIZE,
    MAX_SIZE,
    MULTER,
    ACCEPTED_IMAGE_TYPES,
}