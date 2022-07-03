import {dataAccess} from './databaseConnection';
import {Client, QueryResult} from 'pg';
import {CreateProductPayload} from '../handlers/createProduct';

export interface ProductFullModel {
    id: string,
    title: string,
    description: string,
    price: number,
    count: number,
}

export class ProductsRepository {
    constructor(private readonly db: Client) {}

    public async getAllProducts(): Promise<ProductFullModel[]> {
        const query: string = `
            SELECT p.id, p.title, p.description, p.price, s.count
                FROM products p
            JOIN stocks s ON p.id = s.product_id;
        `;
        const result: QueryResult = await this.db.query(query);
        return result.rows;
    }

    public async getProductById(id: string): Promise<ProductFullModel | null> {
        const query: string = `
            SELECT p.id, p.title, p.description, p.price, s.count
                FROM products p
            JOIN stocks s ON p.id = s.product_id
            WHERE 
                p.id = $1;
        `;

        const { rows } = await this.db.query(query, [id]);

        return rows?.length ? rows[0] : null;
    }

    public async createProduct(payload: CreateProductPayload): Promise<string> {
        await this.db.query('BEGIN');
        const productQuery = 'INSERT INTO products(title, description, price) VALUES($1, $2, $3) RETURNING id';
        const {rows} = await this.db.query(productQuery, [payload.title, payload.description, payload.price]);
        const productId: string = rows[0].id;

        const stockQuery: string = 'INSERT INTO stocks(product_id, count) VALUES ($1, $2)';
        await this.db.query(stockQuery, [productId, payload.count]);
        await this.db.query('COMMIT');

        return productId;
    }
}

export const productsRepository = new ProductsRepository(dataAccess);