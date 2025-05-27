/* https://dev.to/achukka/add-postgresql-to-express-server-2f0k */
/* https://dev.to/brettfishy/the-easiest-way-to-use-query-parameters-in-react-1ioe
https://dev.to/alexmercedcoder/expressjs-handling-cross-origin-cookies-38l9
https://www.postgresql.org/docs/current/tutorial-join.html
https://medium.com/@bobjunior542/how-to-use-usesearchparams-in-react-router-6-for-url-search-parameters-c35b5d1ac01c
https://www.npmjs.com/package/@types/pg
https://medium.com/geekculture/eslint-with-node-js-in-simple-words-cee0a0cf9167
https://dev.to/devland/set-up-a-nodejs-app-with-eslint-and-prettier-4i7p
https://medium.com/@sindhujad6/setting-up-eslint-and-prettier-in-a-node-js-project-f2577ee2126f*/
import cors from 'cors'
import express, { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { Client } from 'pg'
import path from 'path'
dotenv.config()

const client = new Client({
    connectionString: process.env.PGURI
})
client.connect()

const app = express()
const port = process.env.PORT || 8080

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
)
app.use(express.json())
app.use(cookieParser())

interface Reviews {
    reviews_id: number
    user_id: number
    place_id: number
    rating: number
    comment: string
}
interface Users {
    users_id: number
    username: string
    email: string
    password: string
}
interface Places {
    places_id: number
    name: string
    region: string
    city: string
    category: string
    description: string
    image_url: string
    avg_rating: number
    lat: number
    lon: number
}
interface Favourites {
    user_id: number
    place_id: number
}
interface Tokens {
    user_id: number
    token: string
}
interface LoginInfo {
    username: string
    email: string
    password: string
}

app.get('/jj/places', async (request: Request, response: Response) => {
    try {
        const { region, city, category } = request.query

        if (region) {
            const { rows } = await client.query<Places>(
                'SELECT * FROM places WHERE region = $1',
                [region]
            )

            if (rows.length === 0) {
                response.status(404).send({ STATUS_CODES: 404 })
            } else {
                response.status(200).send(rows)
            }
        } else if (city && category === undefined) {
            const { rows } = await client.query<Places>(
                'SELECT * FROM places WHERE city = $1',
                [city]
            )
            response.status(200).send(rows)
        } else if (category && city) {
            const { rows } = await client.query<Places>(
                'SELECT * FROM places WHERE category = $1 AND city = $2',
                [category, city]
            )
            response.status(200).send(rows)
        } else if (category && city === undefined) {
            const { rows } = await client.query<Places>(
                'SELECT * FROM places WHERE category = $1',
                [category]
            )
            response.status(200).send(rows)
        } else {
            const { rows } = await client.query<Places>('SELECT * FROM places')
            response.status(200).send(rows)
        }
    } catch (error) {
        console.error(error)
        response.status(500).send('error')
    }
})
app.get('/jj/places/:id', async (request: Request, response: Response) => {
    try {
        const placeId = request.params.id

        const { rows } = await client.query<Places>(
            'SELECT * FROM places WHERE places_id = $1',
            [placeId]
        )

        response.status(200).send(rows[0])
    } catch (error) {
        console.error(error)
        response.status(500).send('error')
    }
})
app.get('/jj/favourites/:id', async (request: Request, response: Response) => {
    const token: string = request.cookies.token
    if (!token) {
        response.status(401).send('Unauthorized')
        return
    }
    try {
        const placeId: string = request.params.id

        const users = await client.query<Tokens>(
            'SELECT user_id FROM tokens WHERE token = $1',
            [token]
        )
        const userId = users.rows[0].user_id

        const { rows } = await client.query<Favourites>(
            `SELECT p.* FROM favourites f
			JOIN places p ON f.place_id = p.places_id
			WHERE f.user_id = $1 AND f.place_id = $2`,
            [userId, placeId]
        )

        response.status(200).send(rows)
    } catch (error) {
        console.error(error)
        response.status(500).send('error')
    }
})
app.delete(
    '/jj/favourites/:id',
    async (request: Request, response: Response) => {
        const placeId: string = request.params.id
        try {
            await client.query('DELETE FROM favourites WHERE place_id = $1', [
                placeId
            ])
            response.status(200).send({ STATUS_CODES: 201 })
        } catch (error) {
            console.error(error)
            response.status(500).send('error')
        }
    }
)
app.post('/jj/favourites', async (request: Request, response: Response) => {
    const token: string = request.cookies.token
    if (!token) {
        response.status(401).send('Unauthorized')
        return
    }

    try {
        const placeId: number = request.body.place_id

        const users = await client.query<Tokens>(
            'SELECT user_id FROM tokens WHERE token = $1',
            [token]
        )
        const userId = users.rows[0].user_id

        if (placeId !== null && userId !== null) {
            await client.query(
                'INSERT INTO favourites (user_id, place_id) VALUES ($1, $2)',
                [userId, placeId]
            )
            response.status(201).send({ STATUS_CODES: 201 })
        } else {
            response.status(400).send('Bad Request')
        }
    } catch (error) {
        console.error(error)
        response.status(500).send('error')
    }
})
app.post('/jj/reviews', async (request: Request, response: Response) => {
    try {
        const userId: number = request.body.user_id
        const placeId: number = request.body.place_id
        const rating: number = request.body.rating
        const comment: string = request.body.comment

        if (rating !== null && comment !== null) {
            await client.query(
                'INSERT INTO reviews (user_id, place_id, rating, comment) VALUES ($1, $2, $3, $4)',
                [userId, placeId, rating, comment]
            )
            response.status(201).send('Created')
        } else {
            response.status(400).send('Bad Request')
        }
    } catch (error) {
        console.error(error)
        response.status(500).send('error')
    }
})
app.get('/jj/reviews/:id', async (request: Request, response: Response) => {
    try {
        const reviewId = request.params.id

        const { rows } = await client.query<Reviews>(
            `SELECT r.*, p.* FROM reviews r JOIN places p ON r.place_id = p.places_id WHERE r.reviews_id = $1`,
            [reviewId]
        )

        response.status(200).send(rows[0])
    } catch (error) {
        console.error(error)
        response.status(500).send('error')
    }
})
app.get(
    '/jj/profile/reviews/',
    async (request: Request, response: Response) => {
        const token: string = request.cookies.token
        if (!token) {
            response.status(401).send('Unauthorized')
            return
        }

        try {
            const users = await client.query<Tokens>(
                'SELECT user_id FROM tokens WHERE token = $1',
                [token]
            )
            const user = users.rows[0].user_id

            const { rows } = await client.query<Reviews>(
                `SELECT p.*, r.reviews_id FROM reviews r
			JOIN places p ON r.place_id = p.places_id
			WHERE r.user_id = $1`,
                [user]
            )

            response.status(200).send(rows)
        } catch (error) {
            console.error(error)
            response.status(500).send('error')
        }
    }
)
app.get('/jj/profile', async (request: Request, response: Response) => {
    const token: string = request.cookies.token
    if (!token) {
        response.status(401).send('Unauthorized')
        return
    }

    try {
        const { rows } = await client.query<Users>(
            'SELECT * FROM users JOIN tokens ON users.users_id = tokens.user_id WHERE tokens.token = $1',
            [token]
        )
        response.status(200).send(rows[0])
    } catch (error) {
        console.error(error)
        response.status(500).send('error')
    }
})
app.post(
    '/jj/login',
    async (request: Request<object, object, LoginInfo>, response: Response) => {
        const { email, password } = request.body

        if (!email || !password) {
            response.status(400).send('Bad Request')
            return
        }

        try {
            const userSearch = await client.query<Users>(
                'SELECT * FROM users WHERE email = $1 AND password = $2',
                [email, password]
            )
            const user = userSearch.rows[0]

            if (!user) {
                response.status(401).send('Unauthorized')
                return
            }

            const token = uuidv4()
            await client.query(
                'INSERT INTO tokens (user_id, token) VALUES ($1, $2)',
                [user.users_id, token]
            )
            console.log(token, 'token created')
            response.cookie('token', token, { maxAge: 3600000 }) // Cookie expires in 1 hour (3600000 milliseconds)
            response.status(200).send({
                users_id: user.users_id,
                username: user.username,
                email: user.email
            })
        } catch (error) {
            console.error(error)
            response.status(500).send('error')
        }
    }
)
app.post(
    '/jj/signup',
    async (request: Request<object, object, LoginInfo>, response: Response) => {
        const { username, email, password } = request.body

        if (!username || !email || !password) {
            response.status(400).send('Bad Request')
            return
        }

        try {
            await client.query(
                'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
                [username, email, password]
            )
            response.status(201).send('success')
        } catch (error) {
            console.error(error)
            response.status(500).send('error')
        }
    }
)
app.post('/jj/logout', async (request: Request, response: Response) => {
    const token: string = request.cookies.token
    if (token) {
        const findToken = await client.query<Tokens>(
            'SELECT * FROM tokens WHERE token = $1',
            [token]
        )

        if (findToken.rows.length > 0) {
            const logout = await client.query<Tokens>(
                'DELETE FROM tokens WHERE token = $1',
                [token]
            )
            response.clearCookie('token')
            response.send(logout)
        } else {
            response.status(401).send('Unauthorized')
        }
    } else {
        response.status(401).send('Unauthorized')
    }
})

app.use(express.static(path.join(path.resolve(), 'dist')))

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
