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

app.get("/jj/places", async (_request, response) => {
    try {
		const { rows } = await client.query(
			'SELECT * FROM places'
		  )
		  response.status(200).send(rows)
	} catch (error) {
        console.error(error);
        response.status(500).send("error");
    }
});
app.get("/jj/places/:id", async (_request, response) => {
    console.log("test");
    response.send("ok");

    /* const { rows } = await client.query(
      'SELECT * FROM cities WHERE name = $1',
      ['Stockholm']
    )
  
    response.send(rows) */
});
app.get("/jj/places/:id/category", async (_request, response) => {
    console.log("test");
    response.send("ok");

    /* const { rows } = await client.query(
      'SELECT * FROM cities WHERE name = $1',
      ['Stockholm']
    )
  
    response.send(rows) */
});
app.get("/jj/", async (_request, response) => {
    console.log("test");
    response.send("ok");

});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
