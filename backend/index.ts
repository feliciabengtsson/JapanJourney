import cors from "cors";
import express, { Request, Response } from "express";
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

app.get("/api", async (_request, response) => {
    console.log("test");
    response.send("ok");

    /* const { rows } = await client.query(
      'SELECT * FROM cities WHERE name = $1',
      ['Stockholm']
    )
  
    response.send(rows) */
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
