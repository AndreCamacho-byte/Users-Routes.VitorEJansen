import * as playerModel from "../models/playerModels.js";
import crypto from "crypto";

export async function listarPlayer(req,res){
    const [player] = await playerModel.listarUsuarios();
    res.status(200).json(player);
}

export async function buscarPorId(req, res){
    const id = req.params.id;
    const player = await playerModel.buscarPlayerPorId(id);

if(!player){
    return res.status(404).json({msg:"Player não encontrado"})
    }
    res.status(200).json(player);
}

export async function criar(req, res) {
    const { nickname, plataforma } = req.body;

    if (!nickname || !plataforma) {
        return res.status(400).json({ msg: "Nickname e plataforma são obrigatórios" });
    }

    await playerModel.criarPlayer({ nickname, plataforma });

    return res.status(201).json({ msg: "Player criado com sucesso!" });
}

export async function atualizar(req, res) {
    const id = req.params.id;
    const { nickname, plataforma } = req.body;

    if (!nickname || !plataforma) {
        return res.status(400).json({ msg: "Nickname e plataforma são obrigatórios" });
    }

    const player = await playerModel.buscarPlayerPorId(id);
    if (!player) {
        return res.status(404).json({ msg: "Player não encontrado" });
    }

    await playerModel.atualizarPlayer(id, { nickname, plataforma });

    return res.status(200).json({ msg: "Player atualizado com sucesso!" });
}

export async function deletar(req, res) {
    const id = req.params.id;

    const player = await playerModel.buscarPlayerPorId(id);
    if (!player) {
        return res.status(404).json({ msg: "Player não encontrado" });
    }

    await playerModel.deletarPlayer(id);

    return res.status(200).json({ msg: "Player deletado com sucesso!" });
}

export async function login(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ msg: "Email e senha são obrigatórios" });
    }

    const usuario = await playerModel.buscarUsuarioPorEmail(email);
    if (!usuario) {
        return res.status(401).json({ msg: "Credenciais inválidas" });
    }

    const senha_hash = crypto
        .createHash("sha256")
        .update(senha)
        .digest("hex");

    if (senha_hash !== usuario.senha_hash) {
        return res.status(401).json({ msg: "Credenciais inválidas" });
    }

    const token = crypto.randomBytes(24).toString("hex");

    return res.status(200).json({
        msg: "Login realizado com sucesso!",
        token,
        usuario: {
            id: usuario.id,
            email: usuario.email,
            nome: usuario.nome
        }
    });
}