
/* ==========================================================================
   PASSO 1: CONFIGURAÇÃO DE CONEXÃO
   Definimos onde está o banco e como chegar nele.
   ========================================================================== */
const DATABASE_URL = "postgresql://neondb_owner:npg_n1PmpbcBkhG7@ep-round-math-aczngb9r-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

// Extraímos apenas o domínio da URL para montar o endereço HTTP correto do Neon
const host = new URL(DATABASE_URL).host;
const neonHttpEndpoint = `https://${host}/sql`;

// CORREÇÃO: o endpoint HTTP do Neon exige autenticação via Bearer token,
// não via Neon-Connection-String. O token é gerado no painel do projeto
// em: Settings → API Keys → Create new API key.
const NEON_API_TOKEN = "https://ep-round-math-aczngb9r.apirest.sa-east-1.aws.neon.tech/neondb/rest/v1"; // Substitua pelo token do painel do Neon


/* ==========================================================================
   PASSO 2: O "MOTOR" DO BANCO DE DADOS (Função Auxiliar)
   Criamos uma função central para não precisarmos repetir o comando "fetch"
   e o tratamento de erros em toda santa consulta!
   ========================================================================== */
async function executarQueryNeon(querySQL, parametros = []) {
    try {
        console.log(querySQL)
        const resposta = await fetch(neonHttpEndpoint, {
            method: 'POST',
            headers: {
                // Passamos a URL de conexão completa neste cabeçalho específico do Neon
                'Neon-Connection-String': DATABASE_URL,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: querySQL,
                params: parametros // Passar parâmetros assim evita SQL Injection!
            })
        });
         // Se a requisição deu erro (ex: token errado, tabela não existe)
        if (!resposta.ok) {
            const erroTexto = await resposta.text();
            throw new Error(`Erro HTTP ${resposta.status}: ${erroTexto}`);
        }

        // Se deu certo, transforma a resposta em JSON e pega as "linhas" (rows)
        const dados = await resposta.json();
        return dados.rows;

    } catch (erro) {
        console.error("Falha ao comunicar com o banco de dados:", erro);
        return null; // Retorna nulo para o arquivo script.js saber que deu erro
    }
}


/* ==========================================================================
   PASSO 3: FUNÇÕES CRUD (Create, Read, Update, Delete)
   Agora, graças ao nosso "Motor", só precisamos nos preocupar com o SQL!

   CORREÇÃO: todas as funções de escrita retornam true/false em vez do objeto,
   pois é isso que o script.js verifica com "if (sucesso)".
   ========================================================================== */

// --- R (READ / LER) ---
export async function consultarDiretoComFetch() {
    console.log("Buscando todos os dados no banco...");
    const query = 'SELECT * FROM tarefas ORDER BY criado_em DESC';
    

    const linhas = await executarQueryNeon(query);
    console.log(linhas)
    return linhas || []; // Se retornar null (erro), devolvemos array vazio para não quebrar a tela
}

// --- C (CREATE / CRIAR) ---
export async function insertTarefa(titulo, descricao, urgencia) {
    console.log("Cadastrando tarefa no banco:", { titulo, descricao, urgencia});
    const query = 'INSERT INTO tarefas (titulo, descricao, urgencia) VALUES ($1, $2, $3) RETURNING *';
    const params = [titulo, descricao, urgencia];
    console.log(urgencia)

    const linhas = await executarQueryNeon(query, params);
    return linhas !== null;
}

// --- U (UPDATE / ATUALIZAR) ---
export async function sqlAtualizarTarefa(id, titulo, descricao, urgencia) {
    console.log("Atualizando tarefa no banco. ID:", id);
    const query = 'UPDATE tarefas SET titulo = $1, descricao = $2, urgencia = $3 WHERE id = $4 RETURNING *';
    const params = [titulo, descricao, urgencia, id]; // A ordem importa! O ID é o $3

    const linhas = await executarQueryNeon(query, params);
    return linhas !== null; // CORREÇÃO: retorna true (sucesso) ou false (erro)
}

// --- D (DELETE / DELETAR) ---
export async function sqlDeletarTarefa(id) {
    console.log("Deletando tarefa do banco. ID:", id);
    const query = 'DELETE FROM tarefas WHERE id = $1 RETURNING *';
    const params = [id];

    const linhas = await executarQueryNeon(query, params);
    return linhas !== null; // CORREÇÃO: retorna true (sucesso) ou false (erro)
}


    
    export async function filtrar(urgencia) {
    console.log('filtrar')
    limparFormulario();

     if (tarefas.urgencia === "Não Urgente"){
         const query =`SELECT * FROM tarefas WHERE urgencia = 'Não Urgente';`
    limparFormulario();
    }
     else if (tarefas.urgencia === "Urgente"){
         const query =`SELECT * FROM tarefas WHERE urgencia = 'Urgente';`
    limparFormulario();
    }
    else if (tarefas.urgencia == "Normal"){
         const query =`SELECT * FROM tarefas WHERE urgencia = 'Normal';`
    limparFormulario();
    }
    else {
         const query =`SELECT * FROM tarefas`
    }
    const params = [urgencia];
    const linhas = await executarQueryNeon(query, params);
    return linhas !== null; // CORREÇÃO: retorna true (sucesso) ou false (erro)

}