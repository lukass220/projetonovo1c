// ============================================================
// APP.JS - Arquivo Principal da Aplicação (SQLite)
// ============================================================

// Importar o Express
const express = require('express');
const app = express();
const PORT = 3000;

// ============================================================
// MIDDLEWARES
// ============================================================

// Middleware para processar JSON no body das requisições
app.use(express.json());

// ============================================================
// IMPORTAR ROTAS
// ============================================================

// Importar as rotas de clientes
const clienteRoutes = require('./src/routes/clienteRoutes');

// ============================================================
// REGISTRAR ROTAS
// ============================================================

// Todas as rotas de clientes ficarão disponíveis em /clientes
app.use('/clientes', clienteRoutes);

// ============================================================
// ROTA RAIZ (Boas-vindas)
// ============================================================

app.get('/', (req, res) => {
  res.json({ 
    mensagem: 'API de Clientes com SQLite - Bem-vindo!',
    versao: '2.0',
    banco: 'SQLite',
    rotas_disponiveis: {
      listar_todos: 'GET /clientes',
      buscar_por_id: 'GET /clientes/:id',
      buscar_por_cidade: 'GET /clientes/cidade/:cidade',
      criar: 'POST /clientes',
      atualizar: 'PUT /clientes/:id',
      deletar: 'DELETE /clientes/:id'
    }
  });
});

// ============================================================
// INICIAR O SERVIDOR
// ============================================================

app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 Servidor rodando!');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`💾 Banco de Dados: SQLite`);
  console.log(`📂 Arquivo do banco: database.db`);
  console.log('='.repeat(50));
  console.log('📋 Rotas disponíveis:');
  console.log(`   GET    http://localhost:${PORT}/clientes`);
  console.log(`   GET    http://localhost:${PORT}/clientes/:id`);
  console.log(`   GET    http://localhost:${PORT}/clientes/cidade/:cidade`);
  console.log(`   POST   http://localhost:${PORT}/clientes`);
  console.log(`   PUT    http://localhost:${PORT}/clientes/:id`);
  console.log(`   DELETE http://localhost:${PORT}/clientes/:id`);
  console.log('='.repeat(50));
});