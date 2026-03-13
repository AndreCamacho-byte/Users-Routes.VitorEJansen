import * as partidaModel from "../models/partidasModels.js";

export async function listar(req, res) {
    const partidas = await partidaModel.listarPartidas();
    res.status(200).json(partidas);
}

export async function buscarPorId(req, res) {
    const id = req.params.id;
    const partida = await partidaModel.buscarPartidaPorId(id);

    if (!partida) {
        return res.status(404).json({ msg: "Partida não encontrada" });
    }
    res.status(200).json(partida);
}

export async function criar(req, res) {
    const { jogo_id, player_id, pontos } = req.body;

    if (!jogo_id || !player_id || !pontos) {
        return res.status(400).json({ msg: "jogo_id, player_id e pontos são obrigatórios." });
    }

    await partidaModel.criarPartida({ jogo_id, player_id, pontos });

    return res.status(201).json({ msg: "Partida criada com sucesso!" });
}

export async function atualizar(req, res) {
    const id = req.params.id;
    const { jogo_id, player_id, pontos } = req.body;

    if (!jogo_id || !player_id || !pontos) {
        return res.status(400).json({ msg: "jogo_id, player_id e pontos são obrigatórios." });
    }

    const partida = await partidaModel.buscarPartidaPorId(id);
    if (!partida) {
        return res.status(404).json({ msg: "Partida não encontrada" });
    }

    await partidaModel.atualizarPartida(id, { jogo_id, player_id, pontos });

    return res.status(200).json({ msg: "Partida atualizada com sucesso!" });
}

export async function deletar(req, res) {
    const id = req.params.id;

    const partida = await partidaModel.buscarPartidaPorId(id);
    if (!partida) {
        return res.status(404).json({ msg: "Partida não encontrada" });
    }

    await partidaModel.deletarPartida(id);

    return res.status(200).json({ msg: "Partida deletada com sucesso!" });
}