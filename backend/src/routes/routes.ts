import { atualizarConvidado, registrarConvidado, deletarConvidado, listarConvidados, procurarConvidado, checkIN } from '@/controllers/convidado.controller'
import { login } from '@/controllers/login.controller'
import { atualizarUsuario, criarUsuario, deletarUsuario, listarUsuarios, pesquisarUsuario } from '@/controllers/usuarios.controller'
import { adminMiddleware } from '@/middlewares/admin.middleware'
import { authMiddleware } from '@/middlewares/auth.middleware'
import {Router} from 'express'

const router = Router()

// Rotas do usuario
router.get("/usuarios", authMiddleware, adminMiddleware, listarUsuarios)
router.get("/usuarios/:id", authMiddleware, adminMiddleware, pesquisarUsuario)
router.post("/usuarios/criar", authMiddleware, adminMiddleware, criarUsuario)
router.put("/usuarios/:id", authMiddleware, adminMiddleware, atualizarUsuario)
router.delete("/usuarios/:id", authMiddleware, adminMiddleware, deletarUsuario)


//Rotas do convidado
router.get("/convidados", authMiddleware, listarConvidados)
router.get("/convidados/:id", authMiddleware, procurarConvidado)
router.post("/convidados/registrar", authMiddleware, adminMiddleware, registrarConvidado)
router.put("/convidados/:id/checkin", authMiddleware, checkIN)
router.put("/conviados/:id", authMiddleware, adminMiddleware, atualizarConvidado)
router.delete("/convidados/:id", authMiddleware, adminMiddleware, deletarConvidado)

// Login
router.post("/login", login)

export default router