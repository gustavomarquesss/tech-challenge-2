# Imagem base
FROM node:20

# Criar diretório de app
WORKDIR /app

# Copiar arquivos
COPY package*.json ./
RUN npm install

# Copiar o resto do código
COPY . .

# Expor porta e iniciar
EXPOSE 3000
CMD ["npm", "start"]