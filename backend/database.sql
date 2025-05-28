DROP TABLE IF EXISTS tokens;
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
	created TIMESTAMP DEFAULT current_date,
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
CREATE TABLE IF NOT EXISTS tokens (
	user_id INTEGER, 
	token TEXT UNIQUE NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(users_id)
); 

INSERT INTO users (username, email, password) 
VALUES 
('sakura123', 'sakura@example.com', 'hashed_pw1'),
('travelerjoe', 'joe@example.com', 'hashed_pw2'),
('miyuki', 'miyuki@example.com', 'hashed_pw3');

INSERT INTO places (name, region, city, category, description, image_url, avg_rating, lat, lon)
VALUES 
('Fushimi Inari Shrine', 'Kansai', 'Kyoto', 'History',
 'A famous shrine in Kyoto with thousands of red torii gates.',
 'https://images.unsplash.com/photo-1613487691352-7d9b4ee5045b?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.8, 34.9671, 135.7727),

('Mount Fuji', 'Chubu', 'Fujinomiya', 'Nature',
 'Japan’s highest mountain and a symbol of natural beauty.',
 'https://images.unsplash.com/photo-1683995195422-e76d588d1cd1?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.9, 35.3606, 138.7274),

('Akihabara', 'Kanto', 'Tokyo', 'Anime',
 'Tokyo district famous for anime, manga, and electronics.',
 'https://images.unsplash.com/photo-1580094573009-7a220cc896b2?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.5, 35.6984, 139.7730),

('Gion Matsuri', 'Kansai', 'Kyoto', 'Events',
 'Kyoto’s most famous festival held every July, with traditional floats and performances.',
 'https://images.unsplash.com/photo-1570157020562-3e62493b77ca?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.7, 35.0037, 135.7788),

('Dotonbori', 'Kansai', 'Osaka', 'Shopping',
 'Lively Osaka district known for neon lights, shopping, and street food.',
 'https://images.unsplash.com/photo-1559866105-63d346cc87f3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.6, 34.6687, 135.5012),

('TeamLab Planets', 'Kanto', 'Tokyo', 'Culture',
 'Immersive digital art museum in Tokyo blending light, water, and space.',
 'https://images.unsplash.com/photo-1556173251-cab2c1e8abe2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.9, 35.6199, 139.7801),

('Ichiran Ramen', 'Kyushu', 'Fukuoka', 'Food',
 'Famous solo-booth ramen experience in Fukuoka.',
 'https://images.unsplash.com/photo-1584255717248-c5737a381c4b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.4, 33.5894, 130.4208),

('Hakone Onsen', 'Chubu', 'Hakone', 'Relaxation',
 'Hot spring town surrounded by mountains and views of Mt. Fuji.',
 'https://www.agoda.com/wp-content/uploads/2024/01/Hotel-Green-Plaza-Hakone.jpg', 4.8, 35.2329, 139.1067),

('Itsukushima Shrine', 'Chugoku', 'Hatsukaichi', 'Culture',
 'Famous floating torii gate on Miyajima island.',
 'https://images.unsplash.com/photo-1693246049389-9fecc67938c1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.7, 34.2956, 132.3199),

('Takeshita Street', 'Kanto', 'Tokyo', 'Shopping',
 'Trendy street in Harajuku known for youth fashion and snacks.',
 'https://cdn.prod.rexby.com/image/3bc2c8a7dafe4c2187183ebf6e1b84ff?format=webp&width=1080&height=1350', 4.3, 35.6702, 139.7021),

('Kuromon Market', 'Kansai', 'Osaka', 'Food',
 'Vibrant food market offering street food, fresh seafood, and local delicacies.',
 'https://images.unsplash.com/photo-1608516494623-2df85572e673?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.5, 34.6645, 135.5075),

('Himeji Castle', 'Kansai', 'Himeji', 'History',
 'Japan’s most spectacular surviving feudal castle.',
 'https://images.unsplash.com/photo-1708656376421-8db46939bcfe?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.9, 34.8394, 134.6939),

('Beppu Onsen', 'Kyushu', 'Beppu', 'Relaxation',
 'One of Japan’s most famous hot spring resorts.',
 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/56/db/72/beppu-onsen.jpg?w=1200&h=1200&s=1', 4.6, 33.2795, 131.4970),

('Ghibli Museum', 'Kanto', 'Mitaka', 'Anime',
 'Charming museum dedicated to Studio Ghibli’s animations.',
 'https://media.cntraveler.com/photos/5c866698ff5475304621749f/master/pass/Ghibli%20Museum_R061NH.jpg', 4.8, 35.6962, 139.5703),

('Nikko National Park', 'Kanto', 'Nikko', 'Nature',
 'Mountainous park with waterfalls, lakes, and ornate shrines.',
 'https://www.tripsavvy.com/thmb/jH1i3agcfa0lknPhFmeAbRhEhjk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1062521144-bbfb5292093140b9be61921d2a182bfa.jpg', 4.7, 36.7575, 139.5987),

('Sapporo Snow Festival', 'Hokkaido', 'Sapporo', 'Events',
 'Annual winter event with huge snow and ice sculptures.',
 'https://gaijinpot.scdn3.secure.raxcdn.com/app/uploads/sites/6/2018/02/Sapporo-1024x680-1024x680.jpg', 4.9, 43.0618, 141.3545);

INSERT INTO reviews (user_id, place_id, rating, comment)
VALUES 
(1, 1, 5, 'Magiskt! Torii-portarna var fantastiska.'),
(2, 2, 5, 'Så mäktig vy från toppen. Rekommenderas.'),
(3, 3, 4, 'Bra shopping men lite för mycket folk.');

INSERT INTO favourites (user_id, place_id)
VALUES 
(1, 2), -- sakura123 gillar Fuji
(2, 1), -- joe gillar Fushimi Inari
(3, 3); -- miyuki gillar Akihabara

