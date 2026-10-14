# Testes de performance — banco-api-performance

## Introdução

Este repositório reúne testes de performance para endpoints da API bancária. Os cenários são escritos em JavaScript e executados com o [k6](https://grafana.com/docs/k6/latest/).

Os testes atualmente cobrem o login e a realização de transferências. A URL da API é configurada pela variável de ambiente `BASE_URL`.

## Tecnologias utilizadas

- **JavaScript** — linguagem dos cenários de teste.
- **k6** — execução dos testes, coleta de métricas e geração de relatórios.
- **API bancária** — serviço que deve estar disponível para receber as requisições.

## Estrutura do repositório

```text
banco-api-performance/
├── config/
│   └── config.local.json
├── fixtures/
│   └── post.login.json
├── helpers/
│   └── authentication.js
├── test/
│   ├── login.test.js
│   └── transfers.test.js
├── utils/
│   └── variables.js
├── .gitignore
└── README.md
```

## Objetivo dos grupos de arquivos

- **`test/`** — contém os cenários executáveis pelo k6. `login.test.js` testa o endpoint de login e verifica o status, o corpo da resposta e o token; `transfers.test.js` testa o endpoint de transferências.
- **`helpers/`** — reúne funções reutilizáveis pelos cenários. `authentication.js` faz o login e obtém o token.
- **`fixtures/`** — armazena dados de entrada usados nos testes. `post.login.json` contém o payload do login.
- **`utils/`** — contém utilitários compartilhados. `variables.js` resolve a URL base da API.
- **`config/`** — guarda a configuração local padrão. `config.local.json` define `http://localhost:3000` como URL base de fallback quando `BASE_URL` não é informada.
- **Relatório HTML** — o arquivo gerado pelo dashboard do k6 pode ser salvo na raiz do projeto; `html-reportError.html` é ignorado pelo Git.

## Instalação e execução

### Pré-requisitos

1. Tenha a API bancária em execução e acessível.
2. Instale o k6 seguindo as instruções para seu sistema operacional na [documentação oficial](https://grafana.com/docs/k6/latest/set-up/install-k6/).
3. Clone o repositório e entre na pasta:

   ```powershell
   git clone https://github.com/RebecaCamilo/banco-api-performance.git
   Set-Location banco-api-performance
   ```

Não é necessário instalar dependências com npm para executar os testes.

### Configurar a URL da API

Informe `BASE_URL` antes de executar o k6. O valor deve ser a URL base da API, **sem barra no final**, pois os testes acrescentam os caminhos dos endpoints.

No PowerShell:

```powershell
$env:BASE_URL = "http://localhost:3000"
```

Se a variável não for informada, o projeto usa o valor de `config/config.local.json` (`http://localhost:3000`).

### Executar os testes

Execute os comandos a partir da raiz do repositório:

```powershell
k6 run test/login.test.js
k6 run test/transfers.test.js
```

### Acompanhar a execução e exportar o relatório HTML

Para abrir o dashboard durante a execução e exportar o relatório ao final, configure as variáveis do dashboard e execute o teste:

```powershell
$env:K6_WEB_DASHBOARD = "true"
$env:K6_WEB_DASHBOARD_EXPORT = "html-reportError.html"
k6 run test/login.test.js
```

Durante o teste, acesse o endereço exibido pelo k6 no terminal (normalmente `http://localhost:5665`) para acompanhar as métricas em tempo real. Ao final, o arquivo `html-reportError.html` será exportado para o diretório atual.

Para exportar o relatório de outro cenário, substitua `test/login.test.js` pelo caminho do teste desejado.