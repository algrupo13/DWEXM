# Eco Pilgua

Sitio web de Eco Pilgua, un emprendimiento de productos personalizados, papeleria creativa y disenos hechos a mano.

El proyecto usa Vite para desarrollo local y build de produccion. Tambien incluye configuracion de Netlify para publicar el sitio.

## Datos academicos

Asignatura: Diseno Web

Docente: Felipe Igor Flores Valdebenito

## Integrantes

- Ernesto Michael Ravest Pereira.
- Israel Salomon Riveros Luna.
- Paz Belen Rojas Gonzalez.
- Rodrigo Ariel Quilodran Nunez.
- Cesar Gerardo Ramos Olivares.

## Sitio publicado

```text
https://ecopilguav1.netlify.app/
```

## Requisitos para ejecutar el proyecto

- Node.js 20 o superior
- npm

## Instalacion de dependencias

```bash
npm install
```

## Desarrollo local

Para levantar solo Vite:

```bash
npm run dev
```

La web queda disponible en:

```text
http://localhost:5173
```

Para probar el sitio con la configuracion local de Netlify:

```bash
npm run netlify:dev
```

La web queda disponible en:

```text
http://localhost:8888
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
