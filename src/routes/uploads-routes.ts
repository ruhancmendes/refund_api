// rota para uploads.
import { Router } from "express"
import multer from "multer"

import uploadConfig from "@/configs/upload"
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization"
import { UploadsController } from "@/controllers/uploads-controller"

const uploadsRoutes = Router()
const uploadsController = new UploadsController()

const upload = multer(uploadConfig.MULTER) // configuração do multer

uploadsRoutes.use(verifyUserAuthorization(["employee"]))
uploadsRoutes.post("/", upload.single("file"),uploadsController.create)

export { uploadsRoutes }