// import client
import Client from '../db/database';

// create interface
export interface OrderInterface {
  id?: number;
  status?: string;
  totalprice?: number;
  person_id?: number | string;
}

// create class
export class OrderClass {
  // handles functions
  // updateHandleFun
  updateHandleFun(id: string, cols: OrderInterface) {
    const updates = Object.keys(cols);
    let sql: string[] = ['Update orders SET'];
    let set: string[] = [];
    updates.forEach((key, i) => {
      set.push(`${key} = ($${i + 1})`);
    });
    sql.push(set.join(', '));
    sql.push(`WHERE status='Active' AND person_id=${id} RETURNING *`);
    return sql.join(' ');
  }

  // model functions
  // create instance
  async create(id: string): Promise<OrderInterface> {
    const connect = await Client.connect();
    const sql = 'INSERT INTO orders (person_id) VALUES($1) RETURNING *';
    const result = await connect.query(sql, [id]);
    const orderX: OrderInterface = result.rows[0];
    connect.release();
    return orderX;
  }
  // all instances
  async index(id: string): Promise<OrderInterface[]> {
    const connect = await Client.connect();
    const sql = 'SELECT * FROM orders WHERE person_id=($1)';
    const result = await connect.query(sql, [id]);
    const orderX: OrderInterface[] = result.rows;
    connect.release();
    return orderX;
  }
  // return specific instance based on id
  async show(id: string, uID: string): Promise<OrderInterface> {
    const connect = await Client.connect();
    const sql = 'SELECT * FROM orders WHERE id=($1) AND person_id=($2)';
    const result = await connect.query(sql, [id, uID]);
    const orderX: OrderInterface = result.rows[0];
    connect.release();
    return orderX;
  }
  // return current order details
  async currentRecord(id: string): Promise<OrderInterface> {
    const connect = await Client.connect();
    const sql = "SELECT * FROM orders WHERE status='Active' AND person_id=($1)";
    const result = await connect.query(sql, [id]);
    const orderX: OrderInterface = result.rows[0];
    connect.release();
    return orderX;
  }
  // update instance
  async update(id: string, order: any): Promise<OrderInterface> {
    const connect = await Client.connect();
    const sql = this.updateHandleFun(id, order);
    const colValues = Object.keys(order).map((key) => {
      return order[key];
    });
    const result = await connect.query(sql, colValues);
    const orderX: OrderInterface = result.rows[0];
    connect.release();
    return orderX;
  }
}
