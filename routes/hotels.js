import express from "express";
import { atualizarHotel, countByCity, countByType, criarHotel, deletarHotel, getHoteis, getHotel, getQuartosHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Criar hotel
router.post("/", verifyAdmin, criarHotel);
// Atualizar hotel
router.put("/:id", verifyAdmin, atualizarHotel);
// Deletar hotel
router.delete("/:id", verifyAdmin, deletarHotel);
// Get Hotel
router.get("/find/:id", getHotel);
// Get todos hoteis
router.get("/", getHoteis);
// Contar por cidade
router.get("/countByCity", countByCity);
// Contar por tipo
router.get("/countByType", countByType);
// Quartos
router.get("/quarto/:id", getQuartosHotel);

export default router;
