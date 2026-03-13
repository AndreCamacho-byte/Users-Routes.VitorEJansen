import { conexao } from "../config/db.js";

export async function listarUsuarios() {
    const [resultado] = await conexao.query(
        "SELECT id, nome, email, criado_em FROM usuarios"
    );
    return resultado;
}

export async function buscarUsuarioPorId(id) {
    const [resultado] = await conexao.query(
        `SELECT id, nome, email, criado_em FROM usuarios WHERE id = ?`, [id]
    );
    return resultado[0];
}

export async function criarUsuario({ nome, email, senha_hash }) {
    const [resultado] = await conexao.query(
        `INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)`,
        [nome, email, senha_hash]
    );
    return resultado.insertId;
}

export async function atualizarUsuario(id, { nome, email, senha_hash }) {
    const [resultado] = await conexao.query(
        `UPDATE usuarios SET nome = ?, email = ?, senha_hash = ? WHERE id = ?`,
        [nome, email, senha_hash, id]
    );
    return resultado.affectedRows;
}

export async function deletarUsuario(id) {
    const [resultado] = await conexao.query(
        `DELETE FROM usuarios WHERE id = ?`, [id]
    );
    return resultado.affectedRows;
}

export async function buscarUsuarioPorEmail(email) {
    const [resultado] = await conexao.query(
        `SELECT id, nome, email, senha_hash, criado_em FROM usuarios WHERE email = ?`, [email]
    );
    return resultado[0];
}