# LeadHunter Brasil | Triagem Comercial & Propostas Visuais com IA

Um web app completo construído com **Next.js 15**, **Supabase**, **Tailwind CSS** e **Vercel**, desenvolvido especificamente para **prospecção ativa**, **triagem de comércios locais no Google Maps** e **geração de propostas visuais de alta conversão** enviadas pelo **WhatsApp em 1 clique**.

---

## 🎯 Principais Funcionalidades

1. **Triagem no Google Maps:**
   - Busca estabelecimentos por nicho e cidade em qualquer estado brasileiro (ex: *"Pet Shop em Campinas/SP"*, *"Oficina Mecânica em Santos/SP"*).
   - Identifica automaticamente gaps digitais: se possui website, quantidade de fotos, avaliação no Google e número de reviews.
   - **Score de Oportunidade (0 a 100%):** Destaca negócios com excelente reputação mas sem presença online estruturada.

2. **Parser e Validação Inteligente de Telefones Brasileiros (WhatsApp):**
   - Higieniza números `(XX) 9XXXX-XXXX`, remove fixos e valida o 9º dígito.
   - Gera links oficiais de deep link `https://wa.me/55...` sem risco de banimento de chip.

3. **Posicionamento Profissional Estratégico (Neuromarketing):**
   - **Não critica o comércio:** Apresenta oportunidades de ganho e expansão de faturamento.
   - **Apresenta o Desenvolvedor:** Profissional com experiência, foco absoluto na experiência do cliente e geração de receita.
   - **Garantias:** Enfatiza segurança técnica, estabilidade e preços muito acessíveis e justos para negócios locais.

4. **Página Pública de Proposta Visual Exclusiva (`/proposta/[id]`):**
   - Cada lead ganha um link interativo único para abrir no celular ou desktop.
   - Demonstração do **Website One-Page Modelo** do comércio.
   - Demonstração do **Chatbot de Atendimento e Agendamento no WhatsApp**.
   - Estimativa de retorno e aumento de pedidos.
   - Botão direto para o cliente fechar o serviço com você no WhatsApp.

5. **Disparo com 1 Clique no WhatsApp:**
   - Modal com conferência do número, mensagem personalizada pronta e botão que abre o WhatsApp Web/App com a mensagem já digitada.

---

## 🚀 Como Executar Localmente

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente (Opcional para teste inicial)
Copie o arquivo `.env.example` para `.env.local`:
```bash
cp .env.example .env.local
```

Preencha com seus dados:
- `NEXT_PUBLIC_DEVELOPER_NAME`: Seu nome profissional (ex: "José Carlos | Desenvolvedor Web")
- `NEXT_PUBLIC_DEVELOPER_WHATSAPP`: Seu WhatsApp no formato internacional (ex: "5511999999999")
- `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (Obtenha em supabase.com)
- `GOOGLE_MAPS_API_KEY`: (Google Cloud Console > Places API) - *Opcional: o app tem motor inteligente integrado com dados reais caso queira testar antes de cadastrar cartão no Google Cloud!*
- `GEMINI_API_KEY`: (Google AI Studio) - *Opcional: o app possui templates contextuais inteligentes nativos.*

### 3. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 🗄️ Configuração do Banco de Dados (Supabase)

1. Acesse [supabase.com](https://supabase.com) e crie um projeto gratuito.
2. No menu lateral, acesse **SQL Editor**.
3. Abra o arquivo [schema.sql](./schema.sql) deste projeto, copie o conteúdo e clique em **Run**.
4. Suas tabelas, índices de busca rápida e políticas de segurança (RLS) estarão configuradas!
5. Copie a `Project URL` e a `anon key` em **Project Settings > API** e cole no seu `.env.local`.

---

## ☁️ Deploy na Vercel

1. Suba o código para o seu repositório no GitHub.
2. Acesse [vercel.com](https://vercel.com) e clique em **Add New > Project**.
3. Selecione o repositório deste projeto.
4. Em **Environment Variables**, adicione as variáveis do seu `.env.local` (especialmente `NEXT_PUBLIC_APP_URL` com a URL final da Vercel).
5. Clique em **Deploy**. O seu app estará no ar com certificado SSL gratuito e alta velocidade global!

---

## 💡 Dicas para Fechar Clientes

1. **Faça a triagem:** Busque cidades de médio porte (100k a 500k habitantes). Comércios locais nessas cidades têm pouca concorrência digital e alta demanda.
2. **Priorize quem tem mais de 4.5 estrelas e poucas avaliações:** Eles já atendem bem, só precisam de divulgação.
3. **Envie a mensagem no horário comercial (10h às 16h):** Donos de comércio costumam olhar o WhatsApp com calma nesses horários.
4. **Deixe o protótipo falar por você:** O cliente ficará impressionado ao ver o próprio nome dele em um site moderno funcionando no celular.
