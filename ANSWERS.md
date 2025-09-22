# Parte 1: Respostas Técnicas

## 1) Node.js + Express escalável
Eu separo por camadas (routes → controllers → services → repos), config por ambiente, logs/validação, testes e CI. Modularizo por domínio e deixo tudo 12-factor, com observabilidade e linting.

## 2) Context API vs props drilling
Props drilling é ficar passando prop de componente em componente. Com Context eu exponho o valor de cima e consumo onde precisar, sem repasse (bom pra tema, auth, i18n).

## 3) Erros de API no frontend
Centralizo num client (fetch/axios) com interceptors, padronizo o formato do erro e mapeio de códigos para mensagens amigáveis. Registro no Sentry e uso um padrão de toast/modal.

## 4) Middlewares no Express (o que são + 2 usos)
São funções no “meio do caminho” que inspecionam/alteram req/res. Ex.: autenticação/autorização (popular `req.user`) e validação de payload/rate-limit/logging.

## 5) JWT numa SPA React
Faço login, recebo access (curto) + refresh (httpOnly). Guardo o access em memória e injeto via interceptor; renovo silenciosamente com o refresh e no logout limpo tudo/invalido no backend.

## 6) Bug urgente na main (fluxo Git)
Dou `git commit -m 'wip'` na feature → volto pra `main` e abro uma branch de hotfix, corrijo, subo, faço release, depois dou um `git pull` na `main` e faço um `merge` da `main` com a minha branch de feature.

## 7) AWS Lambda (como funciona + usos)
É compute por invocação, escala automático e cobra por tempo/memória; stateless e integra com API Gateway, S3, SQS, EventBridge. Uso pra APIs event-driven, processar arquivos, ETL/cron e webhooks.
