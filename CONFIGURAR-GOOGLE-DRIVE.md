# Ativar a atualização automática do catálogo

A pasta usada pelo projeto é `1S0GkaBaMGhH4-ZD44TeeN75l8WmPd9vC`.

## Importante

O link comum da pasta do Google Drive serve para abrir a pasta, mas não entrega ao site uma lista JSON de arquivos. Por isso, apenas colar o link da nuvem no JavaScript não atualiza o catálogo.

O arquivo `apps-script/Codigo.gs` cria gratuitamente essa lista. Depois de publicado, ele gera uma segunda URL, terminada em `/exec`. É essa URL que deve entrar no `script.js`.

## Organização recomendada

O nome de cada subpasta vira automaticamente a categoria mostrada no site. As pastas atuais já são reconhecidas:

- Outros
- Argamassa polimérica
- Manta asfáltica aluminizada
- Manta asfáltica

O Clélio pode colocar as fotos e vídeos nas pastas sem renomear. O nome original do arquivo será usado apenas como título da obra.

## Publicar a leitura da pasta

1. Entre em `script.google.com` usando a conta que tem acesso à pasta.
2. Crie um novo projeto.
3. Apague o código inicial e cole o conteúdo de `apps-script/Codigo.gs`.
4. Clique em **Implantar > Nova implantação**.
5. Selecione **Aplicativo da Web**.
6. Em **Executar como**, escolha **Eu**.
7. Em **Quem pode acessar**, escolha **Qualquer pessoa**.
8. Autorize o acesso ao Drive e copie a URL terminada em `/exec`.
9. Abra `script.js`.
10. No começo do arquivo, localize `APPS_SCRIPT_URL`.
11. Substitua somente `COLE_AQUI_A_URL_DO_APPS_SCRIPT` pela URL copiada, mantendo as aspas.

Exemplo:

```js
APPS_SCRIPT_URL: "https://script.google.com/macros/s/SEU_CODIGO/exec"
```

12. Salve o arquivo e recarregue o site usando `Ctrl + F5`.

Para as miniaturas aparecerem aos visitantes, a pasta do catálogo deve estar como **Qualquer pessoa com o link - Leitor**. Não dê permissão de edição pública.

## Como confirmar que funcionou

Abra a URL `/exec` no navegador. O resultado deve começar com `{"ok":true` e conter uma lista em `"items"`. Quando o Clélio adicionar uma nova foto em qualquer subpasta, ela aparecerá no site na próxima atualização da página.
