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
RUN npm install --force
RUN npm install -D nodemon
RUN npm install -g typescript

# Compilamos la aplicacion
RUN tsc

# Iniciamos la aplicación
CMD ["npm", "run", "start-docker"]
