import { conexao } from "../config/db.js";

export async function listarPlayer() {
    const [resultado] = await conexao.query(
        "SELECT id, nickname, plataforma, criado_em FROM player"
    );
    return resultado;
}

export async function buscarPlayerPorId(id) {
    const [resultado] = await conexao.query(
        `SELECT id, nickname, plataforma, criado_em FROM player WHERE id = ?`, [id]
    );
    return resultado[0];
}

export async function criarPlayer({ nickname, plataforma }) {
    const [resultado] = await conexao.query(
        `INSERT INTO player (nickname, plataforma) VALUES (?, ?)`,
        [nickname, plataforma]
    );
    return resultado.insertId;
}

export async function atualizarPlayer(id, { nickname, plataforma }) {
    const [resultado] = await conexao.query(
        `UPDATE player SET nickname = ?, plataforma = ? WHERE id = ?`,
        [nickname, plataforma, id]
    );
    return resultado.affectedRows;
}

export async function deletarPlayer(id) {
    const [resultado] = await conexao.query(
        `DELETE FROM player WHERE id = ?`, [id]
    );
    return resultado.affectedRows;
}

export async function buscarPlayerPorNickname(nickname) {
    const [resultado] = await conexao.query(
        `SELECT id, nickname, plataforma, criado_em FROM player WHERE nickname = ?`, [nickname]
    );
    return resultado[0];
}