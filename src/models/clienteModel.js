// Importar a conexão com o banco de dados
const db = require('../config/database');

// ============================================================
// FUNÇÃO: listarTodos
// DESCRIÇÃO: Retorna todos os clientes do banco
// RETORNO: Promise que resolve com array de clientes
// ============================================================
function listarTodos() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM clientes';
    
    db.all(sql, [], (erro, linhas) => {
      if (erro) {
        reject(erro);
      } else {
        resolve(linhas);
      }
    });
  });
}

// ============================================================
// FUNÇÃO: buscarPorId
// DESCRIÇÃO: Busca um cliente específico pelo ID
// PARÂMETRO: id (número) - identificador do cliente
// RETORNO: Promise que resolve com o cliente ou undefined
// ============================================================
function buscarPorId(id) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM clientes WHERE id = ?';
    
    db.get(sql, [id], (erro, linha) => {
      if (erro) {
        reject(erro);
      } else {
        resolve(linha);  // undefined se não encontrar
      }
    });
  });
}

// ============================================================
// FUNÇÃO: criar
// DESCRIÇÃO: Insere um novo cliente no banco
// PARÂMETRO: dados (objeto) - contém nome, email, telefone, cidade
// RETORNO: Promise que resolve com o cliente criado (com ID)
// ============================================================
function criar(dados) {
  return new Promise((resolve, reject) => {
    const { nome, email, telefone, cidade } = dados;
    
    const sql = `
      INSERT INTO clientes (nome, cpf, email, telefone, endereco)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    db.run(sql, [nome, cpf, email, telefone, endereco], function(erro) {
      if (erro) {
        reject(erro);
      } else {
        resolve({
          id: this.lastID,
          nome,
          cpf,      
          email,
          telefone,
          cidade
        });
      }
    });
  });
}

// ============================================================
// FUNÇÃO: atualizar
// DESCRIÇÃO: Atualiza todos os dados de um cliente
// PARÂMETROS:
//   - id (número): identificador do cliente
//   - dados (objeto): novos dados
// RETORNO: Promise com cliente atualizado ou null
// ============================================================
function atualizar(id, dados) {
  return new Promise((resolve, reject) => {
    const { nome, email, telefone, cidade } = dados;
    
    const sql = `
      UPDATE clientes 
      SET nome = ?, email = ?, telefone = ?, cidade = ?
      WHERE id = ?
    `;
    
    db.run(sql, [nome, email, telefone, cidade, id], function(erro) {
      if (erro) {
        reject(erro);
      } else if (this.changes === 0) {
        resolve(null);
      } else {
        resolve({ id, nome, email, telefone, cidade });
      }
    });
  });
}

// ============================================================
// FUNÇÃO: deletar
// DESCRIÇÃO: Remove um cliente do banco
// PARÂMETRO: id (número) - identificador do cliente
// RETORNO: Promise com true (sucesso) ou false (não encontrado)
// ============================================================
function deletar(id) {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM clientes WHERE id = ?';
    
    db.run(sql, [id], function(erro) {
      if (erro) {
        reject(erro);
      } else {
        resolve(this.changes > 0);
      }
    });
  });
}

// ============================================================
// FUNÇÃO: buscarPorCidade
// DESCRIÇÃO: Filtra clientes por cidade
// PARÂMETRO: cidade (string)
// RETORNO: Promise com array de clientes
// ============================================================
function buscarPorCidade(cidade) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM clientes WHERE cidade LIKE ?';
    
    db.all(sql, [`%${endereco}%`], (erro, linhas) => {
      if (erro) {
        reject(erro);
      } else {
        resolve(linhas);
      }
    });
  });
}

// ============================================================
// EXPORTAR TODAS AS FUNÇÕES
// ============================================================
module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
  buscarPorCidade
};