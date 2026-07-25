# Jejum de Ester — projeto React + Vite + Framer Motion

Testado localmente com `npm install` + `npm run build` sem erros.

## Como subir no GitHub (sem usar terminal)

1. Entre em github.com, clique em **New repository**, dê um nome (ex: `jejum-de-ester`) e crie (pode ser privado).
2. Na página do repositório vazio, clique em **"uploading an existing file"**.
3. Arraste TODOS os arquivos e pastas deste zip (menos a pasta `node_modules`, se existir) pra dentro da área de upload.
4. Clique em **Commit changes**.

## Como colocar no ar via Vercel (sem usar terminal)

1. Entre em vercel.com (login com a mesma conta do GitHub).
2. Clique em **Add New... > Project**.
3. Selecione o repositório `jejum-de-ester` que você acabou de criar.
4. A Vercel detecta automaticamente que é um projeto Vite — não precisa mudar nada, só clicar em **Deploy**.
5. Em 1-2 minutos você recebe um link tipo `jejum-de-ester.vercel.app` com o site no ar.

## Editar depois

- Troque o link de pagamento em `src/App.jsx`, na constante `PAY_LINK` no topo do arquivo.
- Textos, cores e seções também estão em `src/App.jsx` (cada seção é uma função, ex: `Hero`, `Problem`, `Offer`).
- Qualquer alteração que você enviar pro GitHub (novo commit) faz a Vercel atualizar o site sozinha.

## Rodar localmente (opcional, precisa de Node.js instalado)

```
npm install
npm run dev
```
