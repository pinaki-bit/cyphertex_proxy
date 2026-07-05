FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

# Install all dependencies including devDependencies for TypeScript compiler
RUN npm install

# Copy source and prisma schema
COPY prisma ./prisma
COPY prisma.config.ts ./
COPY src ./src

# Generate prisma client
RUN npx prisma generate

# Build TypeScript
RUN npx tsc

EXPOSE 3001

CMD ["npm", "start"]
