import { conexao } from "../config/db.js";

export async function listarPartidas() {
    const [resultado] = await conexao.query(
        `SELECT p.id, j.nome AS jogo, pl.nickname AS player, p.pontos, p.data_partida
         FROM partidas p
         JOIN jogos j ON p.jogo_id = j.id
         JOIN player pl ON p.player_id = pl.id`
    );
    return resultado;
}

export async function buscarPartidaPorId(id) {
    const [resultado] = await conexao.query(
        `SELECT p.id, j.nome AS jogo, pl.nickname AS player, p.pontos, p.data_partida
         FROM partidas p
         JOIN jogos j ON p.jogo_id = j.id
         JOIN player pl ON p.player_id = pl.id
         WHERE p.id = ?`, [id]
    );
    return resultado[0];
}

export async function criarPartida({ jogo_id, player_id, pontos }) {
    const [resultado] = await conexao.query(
        `INSERT INTO partidas (jogo_id, player_id, pontos) VALUES (?, ?, ?)`,
        [jogo_id, player_id, pontos]
    );
    return resultado.insertId;
}

export async function atualizarPartida(id, { jogo_id, player_id, pontos }) {
    const [resultado] = await conexao.query(
        `UPDATE partidas SET jogo_id = ?, player_id = ?, pontos = ? WHERE id = ?`,
        [jogo_id, player_id, pontos, id]
    );
    return resultado.affectedRows;
}

export async function deletarPartida(id) {
    const [resultado] = await conexao.query(
        `DELETE FROM partidas WHERE id = ?`, [id]
    );
    return resultado.affectedRows;
}