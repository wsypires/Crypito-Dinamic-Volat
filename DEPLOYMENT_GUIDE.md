# Guia de Deployment - Crypto Volatility Tracker

Este guia fornece instruções passo-a-passo para fazer o push do projeto no GitHub e hospedar no Cloudflare Pages.

---

## 📋 Pré-requisitos

- Git instalado no seu computador
- Conta GitHub com um repositório já criado
- Conta Cloudflare (gratuita ou paga)
- Node.js 18+ instalado (para testes locais)

---

## 1️⃣ Preparar o Projeto Localmente

### 1.1 Extrair o arquivo ZIP

```bash
unzip crypto_volatility_tracker.zip
cd crypto_volatility_tracker
```

### 1.2 Instalar dependências

```bash
npm install
# ou
pnpm install
```

### 1.3 Testar localmente (opcional)

```bash
npm run dev
# ou
pnpm dev
```

O site estará disponível em `http://localhost:5173`

---

## 2️⃣ Fazer Push no GitHub

### 2.1 Inicializar o repositório Git (se ainda não estiver)

```bash
git init
git add .
git commit -m "Initial commit: Crypto Volatility Tracker"
```

### 2.2 Adicionar o repositório remoto

Substitua `SEU_USUARIO` e `SEU_REPOSITORIO` pelos seus dados:

```bash
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
```

### 2.3 Fazer push para o GitHub

```bash
git branch -M main
git push -u origin main
```

**Nota**: Se receber erro de autenticação, use um **Personal Access Token (PAT)**:
1. Acesse https://github.com/settings/tokens
2. Clique em "Generate new token (classic)"
3. Selecione permissões: `repo` (full control)
4. Copie o token
5. Use o token como senha quando solicitado

---

## 3️⃣ Hospedar no Cloudflare Pages

### 3.1 Conectar o repositório ao Cloudflare Pages

1. Acesse https://dash.cloudflare.com/
2. Selecione sua conta
3. Clique em **"Pages"** no menu lateral
4. Clique em **"Create a project"**
5. Selecione **"Connect to Git"**
6. Autorize o Cloudflare a acessar sua conta GitHub
7. Selecione o repositório `SEU_REPOSITORIO`
8. Clique em **"Begin setup"**

### 3.2 Configurar o build

Na página de configuração do Cloudflare Pages:

**Framework preset**: Selecione **"Vite"**

**Build command**: 
```
npm run build
```

**Build output directory**: 
```
dist
```

**Environment variables** (opcional):
- Nenhuma variável obrigatória para este projeto

### 3.3 Deploy

Clique em **"Save and Deploy"**

O Cloudflare irá:
1. Fazer clone do seu repositório
2. Instalar dependências
3. Executar o build
4. Fazer deploy automático

**Seu site estará disponível em**: `https://seu-projeto.pages.dev`

---

## 4️⃣ Configurar Domínio Personalizado (Opcional)

Se você tem um domínio no Cloudflare:

1. Na página do projeto no Cloudflare Pages
2. Clique em **"Custom domains"**
3. Clique em **"Add a custom domain"**
4. Digite seu domínio (ex: `crypto-tracker.com`)
5. Siga as instruções para configurar os registros DNS

---

## 5️⃣ Atualizações Futuras

Sempre que você fizer mudanças no código:

```bash
git add .
git commit -m "Descrição das mudanças"
git push origin main
```

O Cloudflare Pages irá **automaticamente**:
- Detectar o novo push
- Fazer build do projeto
- Fazer deploy da nova versão

---

## 🔧 Troubleshooting

### Erro: "Build failed"

**Solução**: Verifique se:
- O `package.json` existe na raiz do projeto
- O comando `npm run build` funciona localmente
- Todas as dependências estão listadas em `package.json`

### Erro: "Cannot find module"

**Solução**: 
```bash
rm -rf node_modules
npm install
npm run build
```

### Site não atualiza após push

**Solução**: 
1. Aguarde 2-3 minutos
2. Limpe o cache do navegador (Ctrl+Shift+Del)
3. Verifique o status do build em Cloudflare Pages → "Deployments"

---

## 📊 Estrutura do Projeto

```
crypto_volatility_tracker/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/         # Páginas (CryptoTracker.tsx)
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── App.tsx        # Arquivo principal
│   │   └── main.tsx       # Entry point
│   ├── index.html         # HTML template
│   └── vite.config.ts     # Configuração Vite
├── package.json           # Dependências do projeto
├── tsconfig.json          # Configuração TypeScript
└── README.md              # Documentação
```

---

## 🚀 Recursos Úteis

- **Documentação Vite**: https://vitejs.dev/
- **Documentação Cloudflare Pages**: https://developers.cloudflare.com/pages/
- **Documentação Mantine UI**: https://mantine.dev/
- **API CoinGecko**: https://docs.coingecko.com/

---

## 📝 Notas Importantes

1. **API CoinGecko**: O projeto usa a API gratuita do CoinGecko (30 chamadas/minuto)
   - Sem autenticação necessária
   - Dados atualizados a cada 10 segundos

2. **Performance**: O site é totalmente estático e será servido via CDN global do Cloudflare
   - Carregamento rápido em qualquer lugar do mundo
   - Cache automático de assets

3. **Segurança**: Não há backend ou banco de dados
   - Todos os dados vêm diretamente da API CoinGecko
   - Sem credenciais sensíveis no código

---

## ✅ Checklist de Deployment

- [ ] Arquivo ZIP extraído
- [ ] Dependências instaladas (`npm install`)
- [ ] Projeto testado localmente (`npm run dev`)
- [ ] Repositório criado no GitHub
- [ ] Código feito push para GitHub
- [ ] Cloudflare Pages conectado ao repositório
- [ ] Build configurado corretamente
- [ ] Deploy realizado com sucesso
- [ ] Site acessível em `https://seu-projeto.pages.dev`
- [ ] (Opcional) Domínio personalizado configurado

---

## 🆘 Suporte

Se encontrar problemas:

1. Verifique os logs de build no Cloudflare Pages
2. Teste o build localmente: `npm run build`
3. Verifique se o `dist/` foi criado corretamente
4. Consulte a documentação oficial do Cloudflare Pages

---

**Sucesso no deployment! 🎉**
