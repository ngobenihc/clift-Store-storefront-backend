import Client from '../db/database';


export interface ProductInterface {
  id?: number;
  name?: string;
  price?: number;
}

export class ProductClass {
  
  updateHandleFun(id: string, cols: ProductInterface) {
    const updates = Object.keys(cols);
    let sql: string[] = ['Update products SET'];
    let set: string[] = [];
    updates.forEach((key, i) => {
      set.push(`${key} = ($${i + 1})`);
    });
    sql.push(set.join(', '));
    sql.push(`WHERE id = ${id} RETURNING *`);
    return sql.join(' ');
  }

  async create(product: ProductInterface): Promise<ProductInterface> {
    const connect = await Client.connect();
    const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
    const result = await connect.query(sql, [product.name, product.price]);
    const productX: ProductInterface = result.rows[0];
    connect.release();
    return productX;
  }
  
  async index(): Promise<ProductInterface[]> {
    const connect = await Client.connect();
    const sql = 'SELECT * FROM products';
    const result = await connect.query(sql);
    const productX: ProductInterface[] = result.rows;
    connect.release();
    return productX;
  }
  
  async show(id: string): Promise<ProductInterface> {
    const connect = await Client.connect();
    const sql = 'SELECT * FROM products WHERE id=($1)';
    const result = await connect.query(sql, [id]);
    const productX: ProductInterface = result.rows[0];
    connect.release();
    return productX;
  }
  
  async update(id: string, product: any): Promise<ProductInterface> {
    const connect = await Client.connect();
    const sql = this.updateHandleFun(id, product);
    const colValues = Object.keys(product).map((key) => {
      return product[key];
    });
    const result = await connect.query(sql, colValues);
    const productX: ProductInterface = result.rows[0];
    connect.release();
    return productX;
  }
  
  async delete(id: string): Promise<ProductInterface | undefined> {
    const connect = await Client.connect();
    const sql = 'DELETE FROM products WHERE id=($1)';
    const result = await connect.query(sql, [id]);
    const productX: ProductInterface = result.rows[0];
    connect.release();
    return productX;
  }
}
