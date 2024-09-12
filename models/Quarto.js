import mongoose from "mongoose";

const QuartoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    preco: {
        type: Number,
        required: true,
    },
    capacidade: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    numeroQuarto: {
        type: Number,
        required: true,
        unique: true
    },
    datasOcupado: {
        type: [Date],
        default: []
    },
},
{timestamps: true});

export default mongoose.model("Quarto", QuartoSchema);
