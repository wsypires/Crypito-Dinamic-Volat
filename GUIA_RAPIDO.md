# 🚀 Guia Rápido - Crypto Volatility Tracker

## 📥 Passo 1: Extrair e Preparar

```bash
unzip crypto_volatility_tracker.zip
cd crypto_volatility_tracker
npm install
```

## 🔗 Passo 2: Fazer Push no GitHub

```bash
git init
git add .
git commit -m "Initial commit: Crypto Volatility Tracker"
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git branch -M main
git push -u origin main
```

## ☁️ Passo 3: Hospedar no Cloudflare Pages

1. Acesse: https://dash.cloudflare.com/
2. Clique em **"Pages"** → **"Create a project"** → **"Connect to Git"**
3. Selecione seu repositório
4. Configure:
   - **Framework**: Vite
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
5. Clique em **"Save and Deploy"**

## ✅ Pronto!

Seu site estará em: `https://seu-projeto.pages.dev`

---

Para instruções detalhadas, veja `DEPLOYMENT_GUIDE.md`
