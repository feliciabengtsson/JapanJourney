/* https://dev.to/achukka/add-postgresql-to-express-server-2f0k */
/* https://dev.to/brettfishy/the-easiest-way-to-use-query-parameters-in-react-1ioe */

import cors from "cors";
import express, { Request, Response } from "express";
import { request } from "http";
const dotenv = require("dotenv"),
    { Client } = require("pg");

dotenv.config();

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
        const { region, city, category } = request.query;
        console.log(region, "region");
        console.log(city, "city");
        console.log(category, "category");

        if (region) {
            const { rows } = await client.query(
                "SELECT * FROM places WHERE region = $1",
                [region]
            );
            response.status(200).send(rows);
        } else if (city) {
            const { rows } = await client.query(
                "SELECT * FROM places WHERE city = $1",
                [city]
            );
            response.status(200).send(rows);
        } else if (category) {
            const { rows } = await client.query(
                "SELECT * FROM places WHERE category = $1",
                [category]
            );
            response.status(200).send(rows);
        } else {
            const { rows } = await client.query("SELECT * FROM places");

            console.log(rows, "places");
            response.status(200).send(rows);
        }
    } catch (error) {
        console.error(error);
        response.status(500).send("error");
    }
});
app.get("/jj/places/:id", async (request, response) => {
    try {
        const placeId = request.params.id;

        const { rows } = await client.query(
            "SELECT * FROM places WHERE places_id = $1",
            [placeId]
        );
		console.log(rows, "placeId");

        response.status(200).send(rows[0]);
    } catch (error) {
        console.error(error);
        response.status(500).send("error");
    }
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
        return;
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
