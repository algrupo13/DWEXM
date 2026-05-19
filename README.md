# Eco Pilgua

Sitio web de Eco Pilgua, un emprendimiento de productos personalizados, papeleria creativa y disenos hechos a mano.

El proyecto usa Vite para desarrollo local y build de produccion. Tambien incluye configuracion de Netlify para publicar el sitio y simular funciones serverless durante el desarrollo.

## Requisitos

- Node.js 20 o superior
- npm

## Instalacion

```bash
npm install
```

## Desarrollo local

Para levantar solo Vite:

```bash
npm run dev
```

La web queda disponible normalmente en:

```text
http://localhost:5173
```

Para simular el entorno de Netlify, incluyendo funciones:

```bash
npm run netlify:dev
```

La web queda disponible normalmente en:

```text
http://localhost:8888
```

## Funcion de prueba

El proyecto incluye una funcion Netlify de estado:

```text
/api/status
```

En desarrollo local con Netlify Dev:

```text
http://localhost:8888/api/status
```

## Build

Para generar la version de produccion:

```bash
npm run build
```

El resultado se genera en la carpeta:

```text
dist/
```

## Estructura principal

```text
public_html/            Sitio web y assets visibles
public_html/index.html  Pagina principal
public_html/css/        Estilos personalizados
public_html/js/         JavaScript del sitio
public_html/img/        Imagenes del sitio
netlify/functions/      Funciones serverless de Netlify
netlify.toml            Configuracion de build y desarrollo Netlify
vite.config.js          Configuracion de Vite
```

## Despliegue

Netlify usa esta configuracion:

- Comando de build: `npm run build`
- Carpeta publicada: `dist`
- Carpeta de funciones: `netlify/functions`

