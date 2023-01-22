// import bcrypt
import bcrypt from 'bcryptjs';

// import jwt
import jwt from 'jsonwebtoken';

// import app config
import { JWT, PEPPER, SALT_ROUND } from '../config/app.config';

// import client
import Client from '../db/database';

// create interface
export interface PersonInterface {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  tokens?: string[];
}

// create class
export class PersonClass {
  // handles functions
  // updateHandleFun
  updateHandleFun(id: string, cols: PersonInterface) {
    const updates = Object.keys(cols);
    let sql: string[] = ['Update persons SET'];
    let set: string[] = [];
    updates.forEach((key, i) => {
      set.push(`${key} = ($${i + 1})`);
    });
    sql.push(set.join(', '));
    sql.push(`WHERE id=${id} RETURNING *`);
    return sql.join(' ');
  }
  // generateToken
  async generateToken(person: PersonInterface) {
    const token = jwt.sign({ id: person.id }, JWT as string);
    person.tokens = person.tokens?.concat(token);
    await Client.query('UPDATE persons SET tokens=($1) WHERE id=($2)', [
      person.tokens,
      person.id
    ]);
    return token;
  }
  // sanitizer method to hide sensitive information
  async sanitizer(person: PersonInterface) {
    person.password = '********';
    person.tokens = ['********'];
  }

  // model functions
  // create instance
  async create(person: PersonInterface): Promise<PersonInterface | any> {
    const connect = await Client.connect();
    const sql =
      'INSERT INTO persons (first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *';
    if (person.password) {
      person.password = bcrypt.hashSync(
        (person.password as string) + PEPPER,
        Number(SALT_ROUND)
      );
    }
    const result = await connect.query(sql, [
      person.first_name,
      person.last_name,
      person.email,
      person.password
    ]);
    const user: PersonInterface = result.rows[0];
    let token: any;
    if (user) {
      token = await this.generateToken(user);
    }
    connect.release();
    this.sanitizer(user);
    return { user, token };
  }
  // all instances
  async index(): Promise<PersonInterface[]> {
    const connect = await Client.connect();
    const sql = 'SELECT * FROM persons';
    const result = await connect.query(sql);
    const users: PersonInterface[] = result.rows;
    connect.release();
    users.forEach((user) => this.sanitizer(user));
    return users;
  }
  // return specific instance based on id
  async show(id: string): Promise<PersonInterface> {
    const connect = await Client.connect();
    const sql = 'SELECT * FROM persons WHERE id=($1)';
    const result = await connect.query(sql, [id]);
    const user: PersonInterface = result.rows[0];
    connect.release();
    return user;
  }
  // update instance
  async update(id: string, person: any): Promise<PersonInterface> {
    const connect = await Client.connect();
    const sql = this.updateHandleFun(id, person);
    if (person.password) {
      person.password = bcrypt.hashSync(
        person.password + PEPPER,
        Number(SALT_ROUND)
      );
    }
    const colValues = Object.keys(person).map((key) => {
      return person[key];
    });
    const result = await connect.query(sql, colValues);
    const user: PersonInterface = result.rows[0];
    connect.release();
    return user;
  }
  // delete instance
  async delete(id: string): Promise<PersonInterface | undefined> {
    const connect = await Client.connect();
    const sql = 'DELETE FROM persons WHERE id=($1)';
    const result = await connect.query(sql, [id]);
    const user: PersonInterface = result.rows[0];
    connect.release();
    return user;
  }
  // authentication method
  async authentication(
    person: PersonInterface
  ): Promise<PersonInterface | any> {
    const connect = await Client.connect();
    const sql = 'SELECT * FROM persons WHERE email=($1)';
    const result = await connect.query(sql, [person.email]);
    const user: PersonInterface = result.rows[0];
    let token: any;
    if (user) {
      const isMatched = bcrypt.compareSync(
        (person.password as string) + PEPPER,
        user.password as string
      );
      if (isMatched) {
        token = await this.generateToken(user);
      }
    }
    connect.release();
    this.sanitizer(user);
    return { user, token };
  }
  // authorization method
  async authorization(auth: any): Promise<PersonInterface> {
    const connect = await Client.connect();
    const sql = 'SELECT * FROM persons WHERE id=($1) AND ($2)=ANY(tokens)';
    const result = await connect.query(sql, [auth.decode.id, auth.token]);
    const user: PersonInterface = result.rows[0];
    connect.release();
    return user;
  }
  // logout method
  async logout(
    id: string,
    person: PersonInterface,
    token: string
  ): Promise<PersonInterface> {
    const connect = await Client.connect();
    const sql = 'UPDATE persons SET tokens=($1) WHERE id=($2)';
    person.tokens = person.tokens?.filter((TK) => TK !== token);
    const result = await connect.query(sql, [person.tokens, id]);
    const user: PersonInterface = result.rows[0];
    connect.release();
    return user;
  }
  // logoutAll method
  async logoutAll(id: string): Promise<PersonInterface> {
    const connect = await Client.connect();
    const sql = 'UPDATE persons SET tokens=($1) WHERE id=($2)';
    const tokens: any = [];
    const result = await connect.query(sql, [tokens, id]);
    const user: PersonInterface = result.rows[0];
    connect.release();
    return user;
  }
}
