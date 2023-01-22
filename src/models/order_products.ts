// import client
import Client from '../db/database';

// create interface
export interface OrderProductsInterface {
  id?: number;
  quantity?: number;
  order_id?: number | string;
  product_id?: number | string;
}

// create class
export class OrderProductsClass {
  // handles functions
  // updateHandleFun
  updateHandleFun(pID: string, oID: string, cols: OrderProductsInterface) {
    const updates = Object.keys(cols);
    let sql: string[] = ['Update order_products SET'];
    let set: string[] = [];
    updates.forEach((key, i) => {
      set.push(`${key} = ($${i + 1})`);
    });
    sql.push(set.join(', '));
    sql.push(`WHERE product_id=${pID} AND order_id=${oID} RETURNING *`);
    return sql.join(' ');
  }

  // model functions
  // create instance
  async create(
    oProducts: OrderProductsInterface
  ): Promise<OrderProductsInterface> {
    const connect = await Client.connect();
    const sql =
      'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
    const result = await connect.query(sql, [
      oProducts.quantity || 1,
      oProducts.order_id,
      oProducts.product_id
    ]);
    const oProductsX: OrderProductsInterface = result.rows[0];
    connect.release();
    return oProductsX;
  }
  // return current oProducts details
  async show(pID: string, oID: string): Promise<OrderProductsInterface> {
    const connect = await Client.connect();
    const sql =
      'SELECT * FROM order_products WHERE product_id=($1) AND order_id=($2)';
    const result = await connect.query(sql, [pID, oID]);
    const oProductsX: OrderProductsInterface = result.rows[0];
    connect.release();
    return oProductsX;
  }
  // return current cart details
  async cart(id: string): Promise<any[]> {
    const connect = await Client.connect();
    const sql =
      'SELECT * FROM products INNER JOIN order_products ON products.id = order_products.product_id WHERE order_products.order_id=($1)';
    const result = await connect.query(sql, [id]);
    const oProductsX: OrderProductsInterface[] = result.rows;
    connect.release();
    return oProductsX;
  }
  // update instance
  async update(
    pID: string,
    oID: string,
    oProducts: any
  ): Promise<OrderProductsInterface> {
    const connect = await Client.connect();
    const sql = this.updateHandleFun(pID, oID, oProducts);
    const colValues = Object.keys(oProducts).map((key) => {
      return oProducts[key];
    });
    const result = await connect.query(sql, colValues);
    const oProductsX: OrderProductsInterface = result.rows[0];
    connect.release();
    return oProductsX;
  }
  // delete instance
  async delete(
    pID: string,
    oID: string
  ): Promise<OrderProductsInterface | undefined> {
    const connect = await Client.connect();
    const sql =
      'DELETE FROM order_products WHERE product_id=($1) AND order_id=($2)';
    const result = await connect.query(sql, [pID, oID]);
    const oProductsX: OrderProductsInterface = result.rows[0];
    connect.release();
    return oProductsX;
  }
}
