import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export interface Portfolio {
  id: string;
  title: string;
  description: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export async function getPortfolios(): Promise<Portfolio[]> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM portfolios ORDER BY "createdAt" DESC');
    return result.rows;
  } finally {
    client.release();
  }
}

export async function createPortfolio(title: string, description: string, images: string[]): Promise<Portfolio> {
  const client = await pool.connect();
  try {
    const id = generateId();
    const now = new Date();
    
    const result = await client.query(
      'INSERT INTO portfolios (id, title, description, images, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [id, title, description, images, now, now]
    );
    
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function updatePortfolio(id: string, title: string, description: string, images: string[]): Promise<Portfolio> {
  const client = await pool.connect();
  try {
    const now = new Date();
    
    const result = await client.query(
      'UPDATE portfolios SET title = $2, description = $3, images = $4, "updatedAt" = $5 WHERE id = $1 RETURNING *',
      [id, title, description, images, now]
    );
    
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function deletePortfolio(id: string): Promise<boolean> {
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM portfolios WHERE id = $1', [id]);
    return (result.rowCount || 0) > 0;
  } finally {
    client.release();
  }
}

export async function getPortfolioById(id: string): Promise<Portfolio | null> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM portfolios WHERE id = $1', [id]);
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}

// Простой генератор ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
