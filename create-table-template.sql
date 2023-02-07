-- Active: 1675741841497@@149.129.241.190@5432@lidiya02@public
CREATE TABLE table_name(  
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    create_time DATE,
    name VARCHAR(255)
);
COMMENT ON TABLE  IS '';
COMMENT ON COLUMN .name IS '';

-- Active: 1675741841497@@149.129.241.190@5432@lidiya02@public
CREATE TABLE table_name(  
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    create_time DATE,
    name VARCHAR(255)
);
COMMENT ON TABLE  IS '';
COMMENT ON COLUMN .name IS '';

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    fullname varchar(64) NOT NULL,
    email varchar(64) NOT NULL,
    password varchar(64) NOT NULL, 
    phone varchar(64),
    photo varchar(255), 
    role varchar(255),  
    gender varchar(64), 
    birth varchar(64), 
    user_addresss varchar(255), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   
);

CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);

CREATE TABLE
    products (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        price INT NOT NULL,
        stock INT NOT NULL,
        category_id INT REFERENCES category(id),
        photo VARCHAR (255),
        description VARCHAR (255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP
    );

CREATE TABLE
    transaction(
        id SERIAL PRIMARY KEY,
        products_id INT REFERENCES products(id),
        email VARCHAR NOT NULL,
        amount INT NOT NULL,
        total INT NOT NULL,
        users_id INT REFERENCES users(id),
        seller_id INT REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP
    );

CREATE TABLE
    status(
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL
    );

 SELECT transaction.*,products.name,products.price,products.photo,products.description FROM transaction INNER JOIN products ON transaction.id=products.id;
    SELECT transaction.id,transaction.products_id,transaction.amount,transaction.total,transaction.users_id,transaction.seller_id,products.name,products.photo,products.price FROM transaction INNER JOIN products ON transaction.products_id=products.id WHERE users_id = '${users_id}'
