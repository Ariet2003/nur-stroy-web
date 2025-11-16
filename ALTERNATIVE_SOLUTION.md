# 🔄 Альтернативное решение проблемы с Prisma

Если основное решение не работает, попробуйте один из этих вариантов:

## Вариант 1: Использовать Prisma Data Proxy (Рекомендуется)

### Преимущества:
- Не нужен Query Engine на Vercel
- Работает через HTTP
- Решает проблему с бинарными файлами

### Шаги:

1. **Зарегистрируйтесь на Prisma Data Platform:**
   - https://cloud.prisma.io/
   - Создайте проект
   - Подключите вашу базу данных

2. **Получите Data Proxy URL:**
   - В Prisma Cloud получите connection string
   - Формат: `prisma://...`

3. **Обновите `prisma/schema.prisma`:**
```prisma
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["dataProxy"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

4. **Обновите переменные окружения в Vercel:**
```
DATABASE_URL=prisma://aws-us-east-1.prisma-data.com/?api_key=...
```

5. **Обновите `package.json`:**
```json
{
  "scripts": {
    "build": "prisma generate --data-proxy && next build",
    "postinstall": "prisma generate --data-proxy"
  }
}
```

## Вариант 2: Использовать другую ORM

Если Prisma продолжает создавать проблемы, рассмотрите альтернативы:

### Drizzle ORM (Рекомендуется)

```bash
npm install drizzle-orm postgres
npm install -D drizzle-kit
```

**Преимущества:**
- Легче, чем Prisma
- Нет проблем с бинарными файлами
- Отличная TypeScript поддержка
- Работает везде

### Kysely

```bash
npm install kysely pg
```

**Преимущества:**
- Типобезопасный SQL builder
- Очень легкий
- Нет кодогенерации

## Вариант 3: Использовать Vercel Postgres напрямую

Если используете Vercel Postgres:

```typescript
// lib/db.ts
import { sql } from '@vercel/postgres';

export async function getPortfolios() {
  const { rows } = await sql`SELECT * FROM portfolios ORDER BY created_at DESC`;
  return rows;
}

export async function createPortfolio(title: string, description: string, images: string[]) {
  const { rows } = await sql`
    INSERT INTO portfolios (title, description, images)
    VALUES (${title}, ${description}, ${images})
    RETURNING *
  `;
  return rows[0];
}
```

**Преимущества:**
- Нативная интеграция с Vercel
- Нет проблем с деплоем
- Простой API

## Вариант 4: Откат на Prisma 5.x

Prisma 5.x более стабильна на Vercel:

```bash
npm install @prisma/client@5.19.1 prisma@5.19.1
```

**`prisma/schema.prisma`:**
```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "rhel-openssl-1.0.x"]
}
```

## Вариант 5: Использовать Edge Runtime

Измените API роуты на Edge Runtime:

```typescript
// src/app/api/portfolio/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; // Используем Edge Runtime

export async function GET(request: NextRequest) {
  // Ваш код
}
```

**Но потребуется:**
- Использовать Prisma Data Proxy
- Или другую ORM, совместимую с Edge

## Вариант 6: Serverless Functions вместо Edge

Создайте отдельные serverless функции:

**`api/portfolio.js`** (в корне проекта):
```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    const portfolios = await prisma.portfolio.findMany();
    res.json({ success: true, data: portfolios });
  }
};
```

## Вариант 7: Использовать Docker на Vercel

Создайте `Dockerfile`:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Но Vercel может не поддерживать Docker на бесплатном плане.

## 🎯 Моя рекомендация:

1. **Сначала попробуйте основное решение** (redeploy без кэша)
2. **Если не работает** → Используйте **Prisma Data Proxy** (Вариант 1)
3. **Если нужно быстрое решение** → Откатитесь на **Prisma 5.x** (Вариант 4)
4. **Для долгосрочного решения** → Переходите на **Drizzle ORM** (Вариант 2)

## 📞 Нужна помощь?

Если выберете один из вариантов, я помогу с реализацией!

