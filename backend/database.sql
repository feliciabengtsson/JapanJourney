PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS places;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS favourites;

CREATE TABLE IF NOT EXISTS users (
	users_id serial PRIMARY KEY,
	username TEXT UNIQUE NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS places (
	places_id serial PRIMARY KEY,
	name TEXT UNIQUE NOT NULL,
	region TEXT,
	category TEXT,
	description TEXT,
	img_url TEXT,
	avg_rating REAL DEFAULT 0,
	lat REAL,
	lon REAL
);

CREATE TABLE IF NOT EXISTS reviews (
	reviews_id serial PRIMARY KEY,
	user_id INTEGER ON DELETE CASCADE,
	place_id INTEGER ON DELETE CASCADE,
	rating INTEGER CHECK (rating BETWEEN 1 AND 5),
	comment TEXT,
	created TIMESTAMP DEFAULT NOW(),
	PRIMARY KEY (user_id, place_id),
	FOREIGN KEY(user_id) REFERENCES users(users_id),
	FOREIGN KEY(place_id) REFERENCES places(places_id)
);

CREATE TABLE IF NOT EXISTS favourites (
	user_id INTEGER ON DELETE CASCADE,
	place_id INTEGER ON DELETE CASCADE,
	PRIMARY KEY (user_id, place_id),
	FOREIGN KEY(user_id) REFERENCES users(users_id),
	FOREIGN KEY(place_id) REFERENCES places(places_id)
);

INSERT users (username, email, password) 
VALUES 
('sakura123', 'sakura@example.com', 'hashed_pw1'),
('travelerjoe', 'joe@example.com', 'hashed_pw2'),
('miyuki', 'miyuki@example.com', 'hashed_pw3');
SELECT * FROM users;

INSERT INTO places (name, region, category, description, image_url, avg_rating, lat, lon)
VALUES 
('Fushimi Inari Shrine', 'Kansai', 'History',
 'A famous shrine in Kyoto with thousands of red torii gates.',
 'https://example.com/fushimi.jpg', 4.8, 34.9671, 135.7727),

('Mount Fuji', 'Chubu', 'Nature',
 'Japan’s highest mountain and a symbol of natural beauty.',
 'https://example.com/fuji.jpg', 4.9, 35.3606, 138.7274),

('Akihabara', 'Kanto', 'Anime',
 'Tokyo district famous for anime, manga, and electronics.',
 'https://example.com/akihabara.jpg', 4.5, 35.6984, 139.7730);
SELECT * FROM places;

INSERT INTO reviews (user_id, place_id, rating, comment)
VALUES 
(1, 1, 5, 'Magiskt! Torii-portarna var fantastiska.'),
(2, 2, 5, 'Så mäktig vy från toppen. Rekommenderas.'),
(3, 3, 4, 'Bra shopping men lite för mycket folk.');
SELECT * FROM reviews;

INSERT INTO favorites (user_id, place_id)
VALUES 
(1, 2), -- sakura123 gillar Fuji
(2, 1), -- joe gillar Fushimi Inari
(3, 3); -- miyuki gillar Akihabara
SELECT * FROM favourites;

