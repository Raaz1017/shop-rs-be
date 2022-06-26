create extension if not exists "uuid-ossp";

create table if not exists products(
id uuid primary key default uuid_generate_v4(),
title VARCHAR ( 255 ) not null ,
description VARCHAR ( 255 ),
price Int
);

create table if not exists stocks (
id uuid primary key default uuid_generate_v4(),
product_id uuid,
   CONSTRAINT fk_products
      FOREIGN KEY(product_id)
	  REFERENCES products(id)
	  ON DELETE cascade,
	"count" Int
);

INSERT INTO products(id, title, description, price) VALUES('7567ec4b-b10c-48c5-9345-fc73c48a80aa', 'Mazda 2','Mazda 2 description', 1200);
INSERT INTO stocks (product_id, "count") VALUES('7567ec4b-b10c-48c5-9345-fc73c48a80aa', 4);

INSERT INTO products(id, title, description, price) VALUES('7567ec4b-b10c-48c5-9345-fc73c48a80a0', 'Mazda 3','Mazda 3 description', 1500);
INSERT INTO stocks (product_id, "count") VALUES('7567ec4b-b10c-48c5-9345-fc73c48a80a0', 6);

INSERT INTO products(id, title, description, price) VALUES('7567ec4b-b10c-48c5-9345-fc73c48a80a2', 'Mazda 6','Mazda 6 description', 2100);
INSERT INTO stocks (product_id, "count") VALUES('7567ec4b-b10c-48c5-9345-fc73c48a80a2', 7);

INSERT INTO products(id, title, description, price) VALUES('7567ec4b-b10c-48c5-9345-fc73c48a80a1', 'Mazda CX-3','Mazda CX-3 description', 2500);
INSERT INTO stocks (product_id, "count") VALUES('7567ec4b-b10c-48c5-9345-fc73c48a80a1', 12);

INSERT INTO products(id, title, description, price) VALUES('7567ec4b-b10c-48c5-9345-fc73c48a80a3', 'Mazda CX-8','Mazda CX-8 description', 2700);
INSERT INTO stocks (product_id, "count") VALUES('7567ec4b-b10c-48c5-9345-fc73c48a80a3', 7);

INSERT INTO products(id, title, description, price) VALUES('7567ec4b-b10c-48c5-9345-fc73348a80a1', 'Mazda MX-5','Mazda MX-5 description', 3100);
INSERT INTO stocks (product_id, "count") VALUES('7567ec4b-b10c-48c5-9345-fc73348a80a1', 8);

INSERT INTO products(id, title, description, price) VALUES('7567ec4b-b10c-48c5-9445-fc73c48a80a2', 'Mazda CX-9','Mazda CX-9 description', 3400);
INSERT INTO stocks (product_id, "count") VALUES('7567ec4b-b10c-48c5-9445-fc73c48a80a2', 2);

INSERT INTO products(id, title, description, price) VALUES('7567ec4b-b10c-45c5-9345-fc73c48a80a1', 'Mazda BT-50','Mazda BT-50 description', 3120);
INSERT INTO stocks (product_id, "count") VALUES('7567ec4b-b10c-45c5-9345-fc73c48a80a1', 3);