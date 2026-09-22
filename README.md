# copyguru-web

Landing page do [CopyGuru](https://github.com/valb-mig/copyguru), o app de bolinha
flutuante com textos prontos para Android.

**No ar:** https://valb-mig.github.io/copyguru-web/

## O que é

Uma página estática: HTML, CSS e um arquivo JS. Sem build, sem dependência, sem
node_modules. O deploy é o próprio conteúdo do repositório, servido pelo GitHub
Pages a cada push na `main`.

```
index.html      a página inteira
styles.css      estilos, com as cores da marca em custom properties
app.js          busca o release mais recente e aponta o botão para o APK
assets/         ícone e screenshots
```

## Botão de download

O `app.js` consulta a API do GitHub pelo release mais recente do repositório do app
e troca o link do botão pelo `.apk` daquele release, mostrando versão e tamanho.

Se a API falhar, estiver fora do ar ou estourar o limite de requisições, nada quebra:
o `href` que já está no HTML aponta para `/releases/latest`, então o download continua
funcionando. A página nunca depende do JavaScript para entregar o APK.

## Rodando local

Qualquer servidor estático serve:

```bash
python3 -m http.server 8765
```

Depois abra http://localhost:8765.

Abrir o `index.html` direto pelo `file://` também funciona, mas a chamada à API do
GitHub é bloqueada por CORS nesse modo, então o botão fica no link de fallback.

## Publicando

Push na `main` publica. O GitHub Pages serve a raiz do repositório.
