DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS favourites;
DROP TABLE IF EXISTS places;
DROP TABLE IF EXISTS users;

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
	city TEXT,
	category TEXT,
	description TEXT,
	image_url TEXT,
	avg_rating REAL DEFAULT 0,
	lat REAL,
	lon REAL
);

CREATE TABLE IF NOT EXISTS reviews (
	reviews_id serial,
	user_id INTEGER,
	place_id INTEGER,
	rating INTEGER CHECK (rating BETWEEN 1 AND 5),
	comment TEXT,
	created TIMESTAMP DEFAULT NOW(),
	PRIMARY KEY (reviews_id, user_id, place_id),
	FOREIGN KEY(user_id) REFERENCES users(users_id),
	FOREIGN KEY(place_id) REFERENCES places(places_id)
);

CREATE TABLE IF NOT EXISTS favourites (
	user_id INTEGER,
	place_id INTEGER,
	PRIMARY KEY (user_id, place_id),
	FOREIGN KEY(user_id) REFERENCES users(users_id),
	FOREIGN KEY(place_id) REFERENCES places(places_id)
);

INSERT INTO users (username, email, password) 
VALUES 
('sakura123', 'sakura@example.com', 'hashed_pw1'),
('travelerjoe', 'joe@example.com', 'hashed_pw2'),
('miyuki', 'miyuki@example.com', 'hashed_pw3');
SELECT * FROM users;

INSERT INTO places (name, region, city, category, description, image_url, avg_rating, lat, lon)
VALUES 
('Fushimi Inari Shrine', 'Kansai', 'Kyoto', 'History',
 'A famous shrine in Kyoto with thousands of red torii gates.',
 'https://example.com/fushimi.jpg', 4.8, 34.9671, 135.7727),

('Mount Fuji', 'Chubu', 'Fujinomiya', 'Nature',
 'Japan’s highest mountain and a symbol of natural beauty.',
 'https://example.com/fuji.jpg', 4.9, 35.3606, 138.7274),

('Akihabara', 'Kanto', 'Tokyo', 'Anime',
 'Tokyo district famous for anime, manga, and electronics.',
 'https://example.com/akihabara.jpg', 4.5, 35.6984, 139.7730),

('Gion Matsuri', 'Kansai', 'Kyoto', 'Events',
 'Kyoto’s most famous festival held every July, with traditional floats and performances.',
 'https://example.com/gionmatsuri.jpg', 4.7, 35.0037, 135.7788),

('Dotonbori', 'Kansai', 'Osaka', 'Shopping',
 'Lively Osaka district known for neon lights, shopping, and street food.',
 'https://example.com/dotonbori.jpg', 4.6, 34.6687, 135.5012),

('TeamLab Planets', 'Kanto', 'Tokyo', 'Culture',
 'Immersive digital art museum in Tokyo blending light, water, and space.',
 'https://example.com/teamlab.jpg', 4.9, 35.6199, 139.7801),

('Ichiran Ramen', 'Kyushu', 'Fukuoka', 'Food',
 'Famous solo-booth ramen experience in Fukuoka.',
 'https://example.com/ichiran.jpg', 4.4, 33.5894, 130.4208),

('Hakone Onsen', 'Chubu', 'Hakone', 'Relaxation',
 'Hot spring town surrounded by mountains and views of Mt. Fuji.',
 'https://example.com/hakone.jpg', 4.8, 35.2329, 139.1067),

('Itsukushima Shrine', 'Chugoku', 'Hatsukaichi', 'Culture',
 'Famous floating torii gate on Miyajima island.',
 'https://example.com/itsukushima.jpg', 4.7, 34.2956, 132.3199),

('Takeshita Street', 'Kanto', 'Tokyo', 'Shopping',
 'Trendy street in Harajuku known for youth fashion and snacks.',
 'https://example.com/takeshita.jpg', 4.3, 35.6702, 139.7021),

('Kuromon Market', 'Kansai', 'Osaka', 'Food',
 'Vibrant food market offering street food, fresh seafood, and local delicacies.',
 'https://example.com/kuromon.jpg', 4.5, 34.6645, 135.5075),

('Himeji Castle', 'Kansai', 'Himeji', 'History',
 'Japan’s most spectacular surviving feudal castle.',
 'https://example.com/himeji.jpg', 4.9, 34.8394, 134.6939),

('Beppu Onsen', 'Kyushu', 'Beppu', 'Relaxation',
 'One of Japan’s most famous hot spring resorts.',
 'https://example.com/beppu.jpg', 4.6, 33.2795, 131.4970),

('Ghibli Museum', 'Kanto', 'Mitaka', 'Anime',
 'Charming museum dedicated to Studio Ghibli’s animations.',
 'https://example.com/ghibli.jpg', 4.8, 35.6962, 139.5703),

('Nikko National Park', 'Kanto', 'Nikko', 'Nature',
 'Mountainous park with waterfalls, lakes, and ornate shrines.',
 'https://example.com/nikko.jpg', 4.7, 36.7575, 139.5987),

('Sapporo Snow Festival', 'Hokkaido', 'Sapporo', 'Events',
 'Annual winter event with huge snow and ice sculptures.',
 'https://example.com/sapporosnow.jpg', 4.9, 43.0618, 141.3545);
SELECT * FROM places;

INSERT INTO reviews (user_id, place_id, rating, comment)
VALUES 
(1, 1, 5, 'Magiskt! Torii-portarna var fantastiska.'),
(2, 2, 5, 'Så mäktig vy från toppen. Rekommenderas.'),
(3, 3, 4, 'Bra shopping men lite för mycket folk.');
SELECT * FROM reviews;

INSERT INTO favourites (user_id, place_id)
VALUES 
(1, 2), -- sakura123 gillar Fuji
(2, 1), -- joe gillar Fushimi Inari
(3, 3); -- miyuki gillar Akihabara
SELECT * FROM favourites;

