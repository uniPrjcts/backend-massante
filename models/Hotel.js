import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
    },
    cidade: {
        type: String,
        required: true,
    },
    endereco: {
        type: String,
        required: true,
    },
    distancia: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    quartos: {
        type: [String],
    },
    taxa_base: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    fotos: {
        type: [String],
    },
    featured: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.model("Hotel", HotelSchema);
