import express from "express";
import { atualizarUser, deletarUser, getUser, getUsers } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// Atualizar User
router.put("/:id", verifyUser, atualizarUser);
// Deletar User
router.delete("/:id", verifyUser, deletarUser);
// Get User
router.get("/:id", verifyUser, getUser);
// Get todos Users
router.get("/", verifyAdmin, getUsers);

// // Autenticar o usuário
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("Usuário autenticado com sucesso.");
// });
// // Verificar o usuário para deletar a conta
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("Usuário autenticado com sucesso. Pode deletar sua conta.");
// });
// // Verificar o admin para poder deletar qualquer conta
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Admin autenticado com sucesso. Pode deletar todas as contas que quiser.");
// });

export default router;
