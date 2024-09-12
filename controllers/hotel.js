import Hotel from "../models/Hotel.js";
import Quarto from "../models/Quarto.js";

export const criarHotel = async (req, res, next) => {
    const novoHotel = new Hotel(req.body);

    try {
        const hotelSalvo = await novoHotel.save();
        res.status(200).json(hotelSalvo);
    } catch (error) {
        next(err);
    }
};

export const atualizarHotel = async (req, res, next) => {
    try {
        const hotelAtualizado = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(hotelAtualizado);
    } catch (error) {
        next(err);
    }
};

export const deletarHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel deletado com sucesso.");
    } catch (error) {
        next(err);
    }
};

export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (error) {
        next(err);
    }
};

export const getHoteis = async (req, res, next) => {
    const {min, max, ...others} = req.query;
    try {
        const hoteis = await Hotel.find({
            ...others,
            taxa_base: { $gt: min || 1, $lt: max || 999 },
          }).limit(req.query.limit);
        res.status(200).json(hoteis);
    } catch (error) {
        next(err);
    }
};

export const countByCity = async (req, res, next) => {
    const cidades = req.query.cidades.split(",");
    try {
        const list = await Promise.all(cidades.map(cidade => {
            return Hotel.countDocuments({cidade: cidade});
        }));
        res.status(200).json(list);
    } catch (error) {
        next(err);
    }
};

export const countByType = async (req, res, next) => {
    try {
        const interioranoCount = await Hotel.countDocuments({ tipo: "interiorano" });
        const praianoCount = await Hotel.countDocuments({ tipo: "praiano" });
        const cambalachoCount = await Hotel.countDocuments({ tipo: "cambalacho" });

        res.status(200).json([
            { tipo: "Hotel interiorano", count: interioranoCount },
            { tipo: "Hotel praiano", count: praianoCount },
            { tipo: "Hotel cambalacho", count: cambalachoCount },
        ]);
    } catch (err) {
        next(err);
    }
};

export const getQuartosHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(hotel.quartos.map(quarto => {
            return Quarto.findById(quarto);
        }))
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
}
