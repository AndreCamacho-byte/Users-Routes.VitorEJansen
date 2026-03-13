 import * as jogoModel from "../models/jogoModels.js"

export async function listar(req, res) {
    const jogos = await jogoModel.listarJogos()
    res.status(200).json(jogos);
}

export async function buscarPorId(req, res) {
    const id = req.params.id;
    const jogo = await jogoModel.buscarJogoPorId(id)

    if (!jogo) {
        return res.status(404).json({ msg: "Jogo não encontrado" })
    }
    res.status(200).json(jogo);
}

export async function criar(req, res) {
    const { nome, genero } = req.body

    if (!nome || !genero) {
        return res.status(400).json({ msg: "Nome e gênero são obrigatórios." })
    }

    await jogoModel.criarJogo({ nome, genero });

    return res.status(201).json({ msg: "Jogo criado com sucesso!" });
}

export async function atualizar(req, res) {
    const id = req.params.id;
    const { nome, genero } = req.body;

    if (!nome || !genero) {
        return res.status(400).json({ msg: "Nome e gênero são obrigatórios." });
    }

    const jogo = await jogoModel.buscarJogoPorId(id);
    if (!jogo) {
        return res.status(404).json({ msg: "Jogo não encontrado" });
    }

    await jogoModel.atualizarJogo(id, { nome, genero });

    return res.status(200).json({ msg: "Jogo atualizado com sucesso!" });
}

export async function deletar(req, res) {
    const id = req.params.id;

    const jogo = await jogoModel.buscarJogoPorId(id);
    if (!jogo) {
        return res.status(404).json({ msg: "Jogo não encontrado" });
    }

    await jogoModel.deletarJogo(id);

    return res.status(200).json({ msg: "Jogo deletado com sucesso!" });
}