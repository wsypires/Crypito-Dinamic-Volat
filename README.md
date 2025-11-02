# Crypto Volatility Tracker
Sit View - Render Deploy = https://crypito-dinamic-volat.onrender.com/
Um dashboard dinâmico e moderno que exibe o ranking dos **30 principais ativos de criptomoedas com maior volatilidade nas últimas 24 horas**.

## 🎯 Características

✅ **Ranking Dinâmico**: Top 30 criptomoedas ordenadas por volatilidade  
✅ **Atualização Automática**: Dados atualizados a cada 10 segundos  
✅ **API CoinGecko**: Integração com dados em tempo real  
✅ **Interface Moderna**: Design responsivo com Mantine UI  
✅ **Indicadores Visuais**: Cores dinâmicas para volatilidade (vermelho/amarelo/verde)  
✅ **Estatísticas**: Volatilidade média, máxima e total de ativos  
✅ **Tabela Interativa**: Informações detalhadas de cada ativo  

## 📊 Dados Exibidos

Para cada criptomoeda, o dashboard mostra:

| Campo | Descrição |
|-------|-----------|
| **Rank** | Posição no ranking de volatilidade |
| **Ativo** | Nome e símbolo da criptomoeda |
| **Preço** | Preço atual em USD |
| **Variação 24h** | Mudança percentual nas últimas 24 horas |
| **Volatilidade 24h** | Variação entre máximo e mínimo (%) |
| **Máx/Mín 24h** | Preço máximo e mínimo do período |

## 🧮 Fórmula de Volatilidade

```
Volatilidade = ((Preço Máximo 24h - Preço Mínimo 24h) / Preço Mínimo 24h) × 100
```

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **UI Framework**: Mantine UI
- **Styling**: CSS Modules + Tailwind
- **API**: CoinGecko (gratuita)
- **Hospedagem**: Cloudflare Pages
- **Versionamento**: Git + GitHub

## 📦 Estrutura do Projeto

```
crypto_volatility_tracker/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── CryptoTracker.tsx    # Página principal
│   │   │   ├── Dashboard.tsx        # Dashboard alternativo
│   │   │   └── ...
│   │   ├── components/              # Componentes reutilizáveis
│   │   ├── layouts/                 # Layouts (sidebar, header)
│   │   ├── App.tsx                  # Roteamento
│   │   └── main.tsx                 # Entry point
│   ├── index.html
│   └── vite.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Como Usar

### Instalação Local

```bash
# Clonar o repositório
git clone https://github.com/SEU_USUARIO/crypto_volatility_tracker.git
cd crypto_volatility_tracker

# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

O site estará disponível em `http://localhost:5173`

### Deploy no Cloudflare Pages

Veja o arquivo `DEPLOYMENT_GUIDE.md` para instruções detalhadas.

## 📡 API Utilizada

**CoinGecko API** (Gratuita)
- Endpoint: `https://api.coingecko.com/api/v3/coins/markets`
- Limite: 30 chamadas/minuto
- Autenticação: Não necessária
- Documentação: https://docs.coingecko.com/

## ⚙️ Configuração

O projeto não requer variáveis de ambiente. A API CoinGecko é pública e gratuita.

Se você quiser adicionar funcionalidades que exijam autenticação, atualize o arquivo `.env`:

```env
VITE_API_URL=https://api.coingecko.com/api/v3
```

## 🎨 Customização

### Mudar o número de ativos exibidos

Edite `client/src/pages/CryptoTracker.tsx`:

```typescript
.slice(0, 30)  // Mude 30 para o número desejado
```

### Mudar o intervalo de atualização

Edite `client/src/pages/CryptoTracker.tsx`:

```typescript
setInterval(fetchCryptoData, 10000)  // 10000ms = 10 segundos
```

### Mudar cores de volatilidade

Edite a função `volatilityColor` em `CryptoTracker.tsx`:

```typescript
const volatilityColor = (crypto.volatility || 0) > 10 ? "red" : ...
```

## 📱 Responsividade

O dashboard é totalmente responsivo e funciona em:
- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 767px)

## 🔒 Segurança

- ✅ Sem backend ou banco de dados
- ✅ Sem credenciais sensíveis no código
- ✅ Dados vêm diretamente da API pública CoinGecko
- ✅ Hospedado em CDN global seguro (Cloudflare)

## 📊 Performance

- **Tamanho do bundle**: ~150KB (gzipped)
- **Tempo de carregamento**: < 2 segundos
- **Atualização de dados**: 10 segundos
- **Taxa de requisições**: 6 por minuto (bem abaixo do limite de 30)

## 🐛 Troubleshooting

### Dados não carregam

1. Verifique sua conexão com a internet
2. Verifique se a API CoinGecko está acessível: https://api.coingecko.com/api/v3/ping
3. Abra o console do navegador (F12) para ver erros

### Site carrega lentamente

1. Limpe o cache do navegador
2. Verifique sua conexão com a internet
3. Tente em outro navegador

### Números não fazem sentido

A volatilidade é calculada como a variação percentual entre o preço máximo e mínimo nas últimas 24 horas. Valores altos indicam maior volatilidade (mais risco/oportunidade).

## 📝 Licença

Este projeto é fornecido como está, sem garantias. Sinta-se livre para usar, modificar e distribuir.

## 🙏 Créditos

- **Dados**: [CoinGecko](https://www.coingecko.com/)
- **UI**: [Mantine](https://mantine.dev/)
- **Build**: [Vite](https://vitejs.dev/)
- **Hospedagem**: [Cloudflare Pages](https://pages.cloudflare.com/)

## 📧 Contato

Para dúvidas ou sugestões, abra uma issue no repositório GitHub.

---

**Desenvolvido com ❤️ usando Manus AI**
