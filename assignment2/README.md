# 1. What is PostgreSQL?

PostgreSQL is a object-relational database management system (ORDMS). It is more than traditional relational database system. PostgeSQL has more features than MySQL and other relational databse. It has some advanced data type that other database donot provide and some NoSQL fetures also included.

# 2. What is the purpose of a database schema in PostgreSQL?

In PostgreSQL (and most other relational database management systems), a database schema serves as a container or a namespace for database objects. Its primary purpose is to organize, manage, and isolate related database objects within a single database.

# 3. Explain the **Primary Key** and **Foreign Key** concepts in PostgreSQL

Not only PostgreSQL Primary Key and Foreign Key is concepts for all relational databse.

- [ ] Primary Key: A **Primary Key** is a column or a set of columns in a table that uniquely identifies each row in that table.
- [ ] Foreign Key: A **Foreign Key** is a column or a set of columns in one table (the **referencing table** or **child table**) that refers to the Primary Key (or a unique key) in another table (the **referenced table** or **parent table**). Its purpose is to establish and enforce a link between data in two tables, maintaining **referential integrity**.

# 4. 1. What is the difference between the `VARCHAR` and `CHAR` data types?

`CHAR(n)` specifies a **fixed-length** character string.
`VARCHAR(n)` specifies a **variable-length** character string with an optional maximum length `n`.

# 5. 1. What are the `LIMIT` and `OFFSET` clauses used for?

The `LIMIT` clause restricts the number of rows returned by a query to a specified maximum.

    SELECT column1, column2 FROM table_name
    ORDER BY some_column [ASC | DESC]
    LIMIT row_count;

The `OFFSET` clause skips a specified number of rows from the beginning of the result set before returning the remaining rows. It's typically used in conjunction with `LIMIT` for pagination.

    SELECT column1, column2 FROM table_name
    ORDER BY some_column [ASC | DESC]
    LIMIT row_count OFFSET skip_rows;
