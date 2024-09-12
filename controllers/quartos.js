import Quarto from "../models/Quarto.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const criarQuarto = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const novoQuarto = new Quarto(req.body);

    try {
        const quartoSalvo = await novoQuarto.save();
        try {
            await Hotel.findByIdAndUpdate(
                hotelId,
                {$push: { quartos: quartoSalvo._id }},
                { new: true});
        } catch (err) {
            next(err);
        }
        res.status(200).json(quartoSalvo);
    } catch (err) {
        next(err);
    }
};

export const atualizarQuarto = async (req, res, next) => {
    try {
        const quartoAtualizado = await Quarto.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(quartoAtualizado);
    } catch (error) {
        next(err);
    }
};

export const atualizarQuartoDisponibilidade = async (req, res, next) => {
    try {
        const { datasOcupado } = req.body;

        if (!Array.isArray(datasOcupado) || datasOcupado.length === 0) {
            return res.status(400).json({ message: "datasOcupado deve ser um array não vazio de datas" });
        }

        const resultado = await Quarto.updateOne(
            { _id: req.params.id },
            {
                $push: {
                    datasOcupado: {
                        $each: datasOcupado
                    }
                }
            }
        );

        if (resultado.matchedCount === 0) {
            return res.status(404).json({ message: "Quarto não encontrado" });
        }

        if (resultado.modifiedCount === 0) {
            return res.status(400).json({ message: "Nenhuma atualização foi feita" });
        }

        res.status(200).json({ message: "Disponibilidade do quarto atualizada com sucesso" });
    } catch (error) {
        next(error);
    }
};

export const deletarQuarto = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        await Quarto.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$pull: {quartos: req.params.id}});
        } catch (err) {
            next(err);
        }
        res.status(200).json("Quarto deletado com sucesso.");
    } catch (error) {
        next(err);
    }
};

export const getQuarto = async (req, res, next) => {
    try {
        const quarto = await Quarto.findById(req.params.id);
        res.status(200).json(quarto);
    } catch (error) {
        next(err);
    }
};

export const getQuartos = async (req, res, next) => {
    try {
        const quartos = await Quarto.find();
        res.status(200).json(quartos);
    } catch (error) {
        next(err);
    }
};
