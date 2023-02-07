SELECT products.name,products.stock,products.price,category.name as category
FROM products
INNER JOIN category
ON products.category_id = category.id;

SELECT carts.qty,products.stock,products.price,category.name as category
FROM products
INNER JOIN category
ON products.category_id = category.id;

    NNER JOIN users ON transactions.users_id=users.id;

SELECT carts.id,carts.id_product.carts.qty.carts.id_users
CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    name varchar(64) NOT NULL,
    email varchar(64) NOT NULL,
    password varchar(64) NOT NULL, 
    phone varchar(64),
    status INT DEFAULT 0,
    photo varchar(255),  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    activated_at TIMESTAMP
    
);
CREATE TABLE
    category(
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL
    );

CREATE TABLE
    category(
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL
    );

CREATE TABLE
    products (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        stock INT NOT NULL,
        price INT NOT NULL,
        category_id INT REFERENCES category(id)
    );

CREATE TABLE
    transactions(
        id SERIAL PRIMARY KEY,
        email VARCHAR NOT NULL,
        products_id INT REFERENCES products(id),
        amount INT NOT NULL,
        total INT NOT NULL,
        status INT REFERENCES payment_status(id)
    );

CREATE TABLE
    transaction(
        id SERIAL PRIMARY KEY,
        email VARCHAR NOT NULL,
        products_id INT REFERENCES products(id),
        users_id  REFERENCES users(id),
        amount INT NOT NULL,
        total INT NOT NULL,
        qty INT NOT NULL,
        status VARCHAR NOT NULL
    );

CREATE TABLE
    payment_status(
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL
    );

INSERT INTO category(id,name) VALUES(1,'nasi'),(2,'roti');

INSERT INTO
    products(name, stock, price, category_id)
VALUES ('nasi kebuli', 12, 19000, 1);

ALTER TABLE users RENAME COLUMN id_gender TO gender;
ALTER TABLE users RENAME COLUMN name TO fullname;
ALTER TABLE users ALTER COLUMN id TYPE INTEGER PRIMARY;

ALTER TABLE users DROP COLUMN gender;
ALTER TABLE transactions DROP COLUMN id_cart;
ALTER TABLE carts DROP COLUMN id_user;
ALTER TABLE transactions ADD COLUMN users_id INT REFERENCES users(id);
aLTER TABLE users ADD COLUMN user_address VARCHAR;
ALTER TABLE users ALTER COLUMN id TYPE INTEGER;


ALTER TABLE carts ADD COLUMN id_users INT REFERENCES users(id);

ALTER TABLE carts ADD COLUMN id_products INT REFERENCES products(id);

SELECT transactions.email,transactions.status,transactions.amount,transactions.total,transactions.kode,transactions.email as products FROM transactions INNER JOIN products ON transactions.products_id=products.id  INNER JOIN users ON transactions.users_id=users.id;

Select carts.qty as products FROM carts INNER JOIN products on carts.id_products=products.id INNER JOIN users on carts.id_users=users.id;


SELECT transactions.email,transactions.status,transactions.amount,transactions.total,transactions.kode,transactions.email as products FROM transactions INNER JOIN products ON transactions.products_id=products.id  INNER JOIN users ON transactions.users_id=users.id;

INSERT INTO carts (id_users,id_product,qty)VALUES(1,1,3);

SELECT transactions.id, transactions.email, products.name as products_name, transactions.amount, transactions transactions.total FROM transactions JOIN products ON transactions.products_id = products.id INNER JOIN users ON transactions.users_id=users.id;

INSERT INTO transactions(id,email,products_id,amount,total,kode,users_id,status) VALUES(5,'${email}',1,4,3,'${kode}',2, '${status}')

const {email, fullname, phone, gender, birth, photo, user_address} = data;
    UPDATE users SET email='${email}', fullname='${fullname}', phone='${phone}', gender='${gender}', birth='${birth}', photo='${photo}', user_address='${user_address}' WHERE id=3;


INSERT INTO products(name,price,stock,category_id,photo,description)VALUES ('${name}',21000,9,1,'${photo}', '${description}');


UPDATE products SET name='${name}',price=1000,stock=2,category_id=1,photo='${photo}',description='${description}' WHERE id=1;