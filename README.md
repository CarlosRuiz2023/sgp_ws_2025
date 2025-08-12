
<div style="padding:10px; background-color:#073763;">
  <p align="center" style="margin:0px">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png" width="90" alt="MongoDocker" />
  </p>
</div>

<div style="padding:5px; background-color:#073763; text-align:center;color:white">
    <h1 align="center">API-NODE-TS-DOCKER</h1>
    <p align="center">PLANTILLA PARA APIS EN NODE CON TYPESCRIPT Y USO DE DOCKER</p>
</div>

<div style="padding:5px; background-color:#073763; text-align:center;color:white">
    <p align="center" style="margin:0px">AUTOR: JUAN CARLOS RUIZ GOMEZ</p>
</div>

## Requisitos

 Instalar typescript:

    npm install -g typescript

## Iniciar aplicativo

#### 1- Ejecutar npm install

    npm install

#### 2- Abrir primera terminal del proyecto y ejecutar el comando

Este comando se encargara de transpilar la aplicacion de typescript a javascript en tiempo real ante cualquier cambio y se vera reflejado en la carpeta dist.

    tsc -w

#### 3- Iniciar la aplicación

Abrir una segunda terminal del mismo aplicativo y ejecutar el siguiente comando (correra el ambiente local por default):

    npm start     // inicia ambiente local .env.local.ts

## AMBIENTES

package.json

Comandos para iniciar aplicacion de manera local (Windows). npm run comando
```json
"scripts": {
    "start": "tsc&&set NODE_ENV=LOCAL&&nodemon dist/index.js",
    "dev": "tsc&&set NODE_ENV=DEV&&node dist/index.js",
    "qa": "tsc&&set NODE_ENV=QA&&node dist/index.js",
    "prod": "tsc&&set NODE_ENV=PROD&&node dist/index.js"
  }
```
Comandos para iniciar un contenedor de docker (npm run comando).

 - Estos comandos requieren de Docker en tu equipo de trabajo.
```json
"scripts": {
    "docker-local": "docker build -t api_ts_demo . && docker run -p 9000:9000 --env NODE_ENV=LOCAL -d api_ts_demo",
    "docker-dev": "docker build -t api_ts_demo . && docker run -p 9000:9000 --env NODE_ENV=DEV -d api_ts_demo",
    "docker-qa": "docker build -t api_ts_demo . && docker run -p 9000:9000 --env NODE_ENV=QA -d api_ts_demo",
    "docker-prod": "docker build -t api_ts_demo . && docker run -p 9000:9000 --env NODE_ENV=PROD -d api_ts_demo"
  }
```

# DOCKER

## Docker-Compose

Ejemplo Ambiente DEV

```yml
version: "3.3"

services:

  #DESARROLLO
  node-typescript-example-dev:
    container_name: 'node-typescript-example-dev'
    build:
      context: ../../../
      dockerfile: Dockerfile
    restart: always
    environment:
      - NODE_ENV=DEV

networks:
  default:
    external:
      name: br0
```

## Dockerfile

```yml
# Ubicacion de nuestra ruta de guardado
# Recibe argumeto para modificar la version de node dinamicamente con gitlab
ARG NODE_VERSION=latest
FROM node:${NODE_VERSION}
RUN echo "VERSION DE NODE: $NODE_VERSION"

# Configuracion de zona horaria
ENV TZ America/Mexico_City
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Ubicacion de nuestra ruta de guardado
RUN mkdir /usr/src/node
WORKDIR /usr/src/node
COPY . /usr/src/node

# Instalamos los paquetes para el proyecto
RUN npm install -f
RUN npm install -D nodemon
RUN npm install -g typescript

# Compilamos la aplicacion
RUN tsc

# Iniciamos la aplicación
CMD ["npm", "run", "start-docker"]

```


# INTEGRACION CONTINUA GITLAB  

## DESPLIEGUES
| Servidor    | Ramas          | Integracion  CI/CD                   | Runners          |
| -------     | -------        | ------------------------------- |------------------|
| Registry    |     -          | repositorio de imagenes de docker          | regishubleon |
| Desarrollo  | develop        | push directo en rama                       | desarrollo |
| Calidad     | qa             | merge de rama develop hacia qa             | calidad |
|             | main / master           | merge de rama qa hacia main/master         |
| Productivo  | tags | crear tag (v1.0.0) a partir de la rama main/master  | productivo |


# ALTA DE VARIABLES EN GITLAB

Solo usuarios con rol de Maitainer tienen acceso

Settings ---> CI/DI ---> Variables

Actualizar o dar de alta las variables en el repositorio de GitLab


| Ambiente    | Variables      | Descripcion                     |
| -------     | -------        | ------------------------------- |
| Desarrollo  | NO        | Obtiene las variables desde codigo          |
| Calidad     | NO        | Obtiene las variables desde codigo               |
| Productivo  | SI        | Obtiene las variables desde gitlab e integracion continua |  

# VARIABLES BASE PARA INICIAR API EN SERVER

| Key    | Value          | Descripción                     |
| -------     | -------        | ------------------------------- |
| APP_NAME  | mi_app  | Nombre de nuestra aplicacion informativa |
| DEV_API_PORT  | 3000  | Puerto de la imagen de Docker para desarrollo |
| QA_API_PORT  | 3000  | Puerto de la imagen de Docker para calidad |
| PROD_API_PORT  | 3020  | Puerto de la imagen de Docker para productivo (debe de ser unico ya estando en produccion, revisar disponibilidad) |
| REGISTRY_IMAGE_PATH | mi_aplicativo/api  | Ruta donde se guardará la imagen generada en el repositorio de Docker |
| REGISTRY_URL        | munregistry.leon.gob.mx| Dominio del repositorio de imagenes de Docker |
| REGISTRY_IMAGE_DEV  | dev_mi_aplicativo  | Nombre de la imagen de Docker para desarrollo |
| REGISTRY_IMAGE_QA   | qa_mi_aplicativo   | Nombre de la imagen de Docker para calidad         |
| REGISTRY_IMAGE_PROD | prod_mi_aplicativo | Nombre de la imagen de Docker para productivo |
| REGISTRY_IMAGE_VERSION | version_mi_aplicativo | Nombre de la imagen de Docker para crear versionamientos |
| DOCKER_NETWORK_DEV  | br0 | Subred del servidor, por default es la br0 |
| DOCKER_NETWORK_QA   | br0 | Subred del servidor, por default es la br0 |
| DOCKER_NETWORK_PROD | br0 | Subred del servidor, por default es la br0 |
| VERSION_NODE | 18 | Version de node a usar [Ver lista de versiones](https://hub.docker.com/_/node/) |
| TOKEN_REPO | adMi_BL_TOKEN_#$ | Token de acceso generado dentro del repositorio de GitLab|
| USER_RUNNER | gitlab-runner | Usuario utilizado para ejecutar los comandos de GitLab en el servidor |


 - Una vez configurada esta parte, solamente serán necesarias dar de alta las nuevas variables referentes a produccion.

--------

 # PASE A PRODUCTIVO

  1. Emparejar archivo config/environments/env.prod.ts con variables de ambiente
  2. Dar de alta las mismas variables en archivo .gitlab-ci.yml en la seccion cargar-variables-prod-vers
  3. Asignar variables en repositorio de Gitlab
  4. Crear tag de la version a publicar


# INFRAESTRUCTURA

 1. Solicitar servidor de despliegue junto con un dominio dns
 2. Registrar Runner segun el ambiente
 3. Verificar variables de entorno
 4. Iniciar despliegue
 5. Verificar estatus del contenedor ya desplegado
 6. Si el contenedor se encuentra arriba, dar de alta en el servicio de nginx
 7. Verificar si el servicio responde