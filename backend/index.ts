/* https://dev.to/achukka/add-postgresql-to-express-server-2f0k */

import cors from "cors";
import express, { Request, Response } from "express";
import { request } from "http";
const dotenv = require("dotenv"),
    { Client } = require("pg");

dotenv.config();

interface Book {
    find: any;
    books_id: number;
    title: string;
    author: string;
    genre: string;
    year: number;
    cover_url: string;
    summary: string;
}

const client = new Client({
    connectionString: process.env.PGURI,
});

client.connect();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/jj/places", async (request, response) => {
    try {
        const { rows } = await client.query("SELECT * FROM places");
        response.status(200).send(rows);
    } catch (error) {
        console.error(error);
        response.status(500).send("error");
    }
});
app.get("/jj/places/:id", async (request, response) => {
    console.log("test");
    response.send("ok");

    /* const { rows } = await client.query(
      'SELECT * FROM cities WHERE name = $1',
      ['Stockholm']
    )
  
    response.send(rows) */
});
app.get("/jj/places/:id/category", async (request, response) => {
    console.log("test");
    response.send("ok");

    /* const { rows } = await client.query(
      'SELECT * FROM cities WHERE name = $1',
      ['Stockholm']
    )
  
    response.send(rows) */
});
app.post("/jj/login", async (request, response) => {
    const { email, password } = request.body;

    if (!email || !password) {
        response.status(400).send("Bad Request");
		return
    }

    try {
        const user = await client.query(
            "SELECT * FROM users WHERE email = $1 AND password = $2",
            [email, password]
        );

        if (user.rows.length > 0) {
            response.status(200).send("success");
        } else {
            response.status(401).send("Unauthorized");
        }
    } catch (error) {
        console.error(error);
        response.status(500).send("error");
    }
});
app.post("/jj/signup", async (request, response) => {
    const { username, email, password } = request.body;

    if (!username || !email || !password) {
        response.status(400).send("Bad Request");
		return;
    }

    try {
        await client.query(
            `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`
        );
		response.status(200).send("success");
    } catch (error) {
        console.error(error);
        response.status(500).send("error");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
