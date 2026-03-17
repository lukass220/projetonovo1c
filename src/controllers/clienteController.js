// Importar as funções do Model
const ClienteModel = require('../models/clienteModel');

// ============================================================
// FUNÇÃO: listarTodos (ASSÍNCRONA)
// ROTA: GET /clientes
// ============================================================
async function listarTodos(req, res) {
  try {
    const clientes = await ClienteModel.listarTodos();
    res.status(200).json(clientes);
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao listar clientes',
      erro: erro.message
    });
  }
}

// ============================================================
// FUNÇÃO: buscarPorId (ASSÍNCRONA)
// ROTA: GET /clientes/:id
// ============================================================
async function buscarPorId(req, res) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ mensagem: 'ID inválido' });
    }

    const cliente = await ClienteModel.buscarPorId(id);

    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ mensagem: `Cliente ${id} não encontrado` });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao buscar cliente',
      erro: erro.message
    });
  }
}

// ============================================================
// FUNÇÃO: criar (ASSÍNCRONA)
// ROTA: POST /clientes
// ============================================================
async function criar(req, res) {
  try {
    const { nome, cpf, email, telefone, endereco } = req.body;

    // Validações obrigatórias
    if (!nome || !cpf || !email || !telefone || !endereco) {
      return res.status(400).json({
        mensagem: 'Todos os campos são obrigatórios: nome, cpf, email, telefone, endereco'
      });
    }

    // Validações extras recomendadas (opcionais, mas muito úteis)
    if (typeof cpf !== 'string' || cpf.length < 11) {
      return res.status(400).json({ mensagem: 'CPF inválido (deve ser string com pelo menos 11 caracteres)' });
    }

    if (!email.includes('@') || !email.includes('.')) {
      return res.status(400).json({ mensagem: 'Email inválido' });
    }

    if (typeof telefone !== 'string' || telefone.length < 8) {
      return res.status(400).json({ mensagem: 'Telefone inválido (mínimo 8 caracteres)' });
    }

    const novoCliente = await ClienteModel.criar({
      nome,
      cpf,
      email,
      telefone,
      endereco
    });

    res.status(201).json(novoCliente);
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao criar cliente',
      erro: erro.message
    });
  }
}

// ============================================================
// FUNÇÃO: atualizar (ASSÍNCRONA)
// ROTA: PUT /clientes/:id
// ============================================================
async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { nome, cpf, email, telefone, endereco } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ mensagem: 'ID inválido' });
    }

    // Para atualização, todos os campos continuam obrigatórios
    // (se quiser permitir atualização parcial, remova esta validação)
    if (!nome || !cpf || !email || !telefone || !endereco) {
      return res.status(400).json({
        mensagem: 'Todos os campos são obrigatórios: nome, cpf, email, telefone, endereco'
      });
    }

    const clienteAtualizado = await ClienteModel.atualizar(id, {
      nome,
      cpf,
      email,
      telefone,
      endereco
    });

    if (clienteAtualizado) {
      res.status(200).json(clienteAtualizado);
    } else {
      res.status(404).json({ mensagem: `Cliente ${id} não encontrado` });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao atualizar cliente',
      erro: erro.message
    });
  }
}

// ============================================================
// FUNÇÃO: deletar (ASSÍNCRONA)
// ROTA: DELETE /clientes/:id
// ============================================================
async function deletar(req, res) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ mensagem: 'ID inválido' });
    }

    const deletado = await ClienteModel.deletar(id);

    if (deletado) {
      res.status(200).json({ mensagem: `Cliente ${id} removido com sucesso` });
    } else {
      res.status(404).json({ mensagem: `Cliente ${id} não encontrado` });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao deletar cliente',
      erro: erro.message
    });
  }
}

// ============================================================
// FUNÇÃO: buscarPorCidade (mantida, mas pode ser removida se não usar)
// ROTA: GET /clientes/cidade/:cidade
// ============================================================
async function buscarPorCidade(req, res) {
  try {
    const { cidade } = req.params;
    const clientes = await ClienteModel.buscarPorCidade(cidade);
    res.status(200).json(clientes);
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao buscar clientes por cidade',
      erro: erro.message
    });
  }
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
  buscarPorCidade   // ← pode remover se não for mais usada
};