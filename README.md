# Placas Avaliação

Site novo para gerar uma imagem de placa profissional personalizada a partir do nome informado pelo visitante.

## Como funciona

- O visitante digita o nome da empresa.
- Clica em **Gerar minha placa com IA**.
- O navegador chama o endpoint seguro `/api/generate`.
- O endpoint usa a API de imagens da OpenAI e devolve a imagem para o site.
- A imagem aparece somente depois de gerada e pode ser baixada.

## Publicar na Vercel

1. Entre em https://vercel.com e importe o repositório `luisdaroca100-a11y/Placas-avaliacao`.
2. Nas configurações do projeto, abra **Settings → Environment Variables**.
3. Crie a variável `OPENAI_API_KEY` com sua chave de API da OpenAI. Nunca coloque essa chave no HTML ou em código público.
4. Faça o deploy. Se já houver um deploy, redeploy após salvar a variável.

## Observações

- A geração exige uma chave de API válida e acesso/créditos disponíveis na plataforma de API da OpenAI; uma assinatura do ChatGPT não inclui automaticamente créditos de API.
- Modelos de imagem podem ocasionalmente escrever nomes incorretamente. Confira o resultado antes de usar comercialmente.
