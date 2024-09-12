import User from "../models/User.js";

export const atualizarUser = async (req, res, next) => {
    try {
        const userAtualizado = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(userAtualizado);
    } catch (error) {
        next(err);
    }
};

export const deletarUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deletado com sucesso.");
    } catch (error) {
        next(err);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(err);
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(err);
    }
};
