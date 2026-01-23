FROM node:20-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar archivos del proyecto
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando para desarrollo
CMD ["npm", "run", "dev"]
