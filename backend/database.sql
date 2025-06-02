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
	avg_rating REAL DEFAULT 0
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
('Felicia', 'Felicia@example.com', 'fb123'),
('miyuki', 'miyuki@example.com', 'hashed_pw3');

INSERT INTO places (name, region, city, category, description, image_url, avg_rating)
VALUES 
('Fushimi Inari Shrine', 'Kansai', 'Kyoto', 'History',
 'A famous shrine in Kyoto with thousands of red torii gates.',
 'https://images.unsplash.com/photo-1613487691352-7d9b4ee5045b?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.8),

('Mount Fuji', 'Chubu', 'Fujinomiya', 'Nature',
 'Japan’s highest mountain and a symbol of natural beauty.',
 'https://images.unsplash.com/photo-1683995195422-e76d588d1cd1?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.9),

('Akihabara', 'Kanto', 'Tokyo', 'Anime',
 'Tokyo district famous for anime, manga, and electronics.',
 'https://images.unsplash.com/photo-1580094573009-7a220cc896b2?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.5),

('Gion Matsuri', 'Kansai', 'Kyoto', 'Events',
 'Kyoto’s most famous festival held every July, with traditional floats and performances.',
 'https://images.unsplash.com/photo-1570157020562-3e62493b77ca?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.7),

('Dotonbori', 'Kansai', 'Osaka', 'Shopping',
 'Lively Osaka district known for neon lights, shopping, and street food.',
 'https://images.unsplash.com/photo-1559866105-63d346cc87f3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.6),

('TeamLab Planets', 'Kanto', 'Tokyo', 'Culture',
 'Immersive digital art museum in Tokyo blending light, water, and space.',
 'https://images.unsplash.com/photo-1556173251-cab2c1e8abe2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.9),

('Ichiran Ramen', 'Kyushu', 'Fukuoka', 'Food',
 'Famous solo-booth ramen experience in Fukuoka.',
 'https://images.unsplash.com/photo-1584255717248-c5737a381c4b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.4),

('Hakone Onsen', 'Chubu', 'Hakone', 'Relaxation',
 'Hot spring town surrounded by mountains and views of Mt. Fuji.',
 'https://www.agoda.com/wp-content/uploads/2024/01/Hotel-Green-Plaza-Hakone.jpg', 4.8),

('Itsukushima Shrine', 'Chugoku', 'Hatsukaichi', 'Culture',
 'Famous floating torii gate on Miyajima island.',
 'https://images.unsplash.com/photo-1693246049389-9fecc67938c1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.7),

('Takeshita Street', 'Kanto', 'Tokyo', 'Shopping',
 'Trendy street in Harajuku known for youth fashion and snacks.',
 'https://cdn.prod.rexby.com/image/3bc2c8a7dafe4c2187183ebf6e1b84ff?format=webp&width=1080&height=1350', 4.3),

('Kuromon Market', 'Kansai', 'Osaka', 'Food',
 'Vibrant food market offering street food, fresh seafood, and local delicacies.',
 'https://images.unsplash.com/photo-1608516494623-2df85572e673?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.5),

('Himeji Castle', 'Kansai', 'Himeji', 'History',
 'Japan’s most spectacular surviving feudal castle.',
 'https://images.unsplash.com/photo-1708656376421-8db46939bcfe?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.9),

('Beppu Onsen', 'Kyushu', 'Beppu', 'Relaxation',
 'One of Japan’s most famous hot spring resorts.',
 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/56/db/72/beppu-onsen.jpg?w=1200&h=1200&s=1', 4.6),

('Ghibli Museum', 'Kanto', 'Mitaka', 'Anime',
 'Charming museum dedicated to Studio Ghibli’s animations.',
 'https://media.cntraveler.com/photos/5c866698ff5475304621749f/master/pass/Ghibli%20Museum_R061NH.jpg', 4.8),

('Nikko National Park', 'Kanto', 'Nikko', 'Nature',
 'Mountainous park with waterfalls, lakes, and ornate shrines.',
 'https://www.tripsavvy.com/thmb/jH1i3agcfa0lknPhFmeAbRhEhjk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1062521144-bbfb5292093140b9be61921d2a182bfa.jpg', 4.7),

('Sapporo Snow Festival', 'Hokkaido', 'Sapporo', 'Events',
 'Annual winter event with huge snow and ice sculptures.',
 'https://gaijinpot.scdn3.secure.raxcdn.com/app/uploads/sites/6/2018/02/Sapporo-1024x680-1024x680.jpg', 4.9),

('Shirakawa-go', 'Chubu', 'Shirakawa', 'Culture',
 'A UNESCO-listed village known for traditional thatched-roof farmhouses (gassho-zukuri).',
 'https://plus.unsplash.com/premium_photo-1661947436461-a9ab4ecdd37a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.8),

('Nara Park', 'Kansai', 'Nara', 'Nature',
 'A scenic park where friendly deer roam freely among historic temples.',
 'https://images.unsplash.com/photo-1723569199334-c702187819e0?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.7),

('Okinawa Churaumi Aquarium', 'Okinawa', 'Motobu', 'Culture',
 'One of the world’s largest aquariums, famous for its whale sharks.',
 'https://images.unsplash.com/photo-1614071659313-fd1bb53ce2a9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8T2tpbmF3YSUyMENodXJhdW1pJTIwQXF1YXJpdW18ZW58MHx8MHx8fDA%3D', 4.9),

('Tsukiji Outer Market', 'Kanto', 'Tokyo', 'Food',
 'An outdoor market full of fresh seafood, Japanese street food, and culinary specialties.',
 'https://images.unsplash.com/photo-1729126042712-679e6c1b0808?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.4),

('Kumano Kodo', 'Kansai', 'Wakayama', 'Nature',
 'Ancient pilgrimage trails through forests, mountains, and sacred shrines – a UNESCO site.',
 'https://images.unsplash.com/photo-1698659161486-e3feffbfc89f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.8),

('Kawagoe', 'Kanto', 'Kawagoe', 'Culture',
 'Known as “Little Edo” for its preserved Edo-period streets and traditional shops.',
 'https://images.unsplash.com/photo-1719933465517-3ff1b46901cf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.6),

('Naoshima Island', 'Chugoku', 'Naoshima', 'Culture',
 'A contemporary art island filled with museums and outdoor installations.',
 'https://images.unsplash.com/photo-1746688518923-9a4df68d3c20?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.9),

('Takayama Old Town', 'Chubu', 'Takayama', 'History',
 'A beautifully preserved town with traditional wooden buildings and sake breweries.',
 'https://plus.unsplash.com/premium_photo-1723983555759-552bc3ad6481?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.7),

('Matsumoto Castle', 'Chubu', 'Matsumoto', 'History',
 'A striking black castle from the 1500s, known as “Crow Castle.”',
 'https://images.unsplash.com/photo-1653961187606-f90b707fd4e6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.8),

('Yanaka Ginza', 'Kanto', 'Tokyo', 'Shopping',
 'A retro-style shopping street with old-school charm and local treats.',
 'https://images.unsplash.com/photo-1623733769741-7a1466644e69?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.3),

('Meguro River', 'Kanto', 'Tokyo', 'Nature',
 'A riverside lined with cherry blossoms, especially popular in spring.',
 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.6),

('Kanazawa Kenroku-en', 'Chubu', 'Kanazawa', 'Nature',
 'One of Japan’s three most beautiful gardens, famous for its seasonal changes.',
 'https://images.unsplash.com/photo-1705333079221-3f0a238bac32?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.9),

('Tokyo Skytree', 'Kanto', 'Tokyo', 'Landmark',
  'The tallest structure in Japan, offering panoramic views from its observation decks.',
  'https://images.unsplash.com/photo-1581269430027-73c853960333?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.7),

('Meiji Shrine', 'Kanto', 'Tokyo', 'Culture',
  'A peaceful Shinto shrine dedicated to Emperor Meiji and Empress Shoken, surrounded by a forested area.',
  'https://images.unsplash.com/photo-1703443371292-0d9081cc4787?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.6),

('Shibuya Crossing', 'Kanto', 'Tokyo', 'Landmark',
  'Famous for being the world’s busiest pedestrian crossing, surrounded by neon lights and bustling activity.',
  'https://plus.unsplash.com/premium_photo-1661902398022-762e88ff3f82?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.5),

('Ueno Park', 'Kanto', 'Tokyo', 'Nature',
  'A spacious public park home to museums, a zoo, and cherry blossoms in spring.',
  'https://images.unsplash.com/photo-1565011718874-ece2c844ccf7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.4),

('Kiyomizu-dera', 'Kansai', 'Kyoto', 'Culture',
  'A historic temple known for its wooden stage that offers stunning views of the city.',
  'https://images.unsplash.com/photo-1711490553971-4065c2531a21?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4.8),

('Arashiyama Bamboo Grove', 'Kansai', 'Kyoto', 'Nature',
  'A serene path through towering bamboo stalks, offering a unique and tranquil experience.',
  'https://images.unsplash.com/photo-1511364033374-07ffa0c99c4c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QXJhc2hpeWFtYSUyMEJhbWJvbyUyMEdyb3ZlfGVufDB8fDB8fHww', 4.7),

('Pokémon Center Mega Tokyo', 'Kanto', 'Tokyo', 'Anime',
  'A flagship Pokémon store offering exclusive merchandise, themed decor, and special events for fans of all ages.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Pokemon_Center_Tohoku_in_SENDAI_PARCO.jpg/1920px-Pokemon_Center_Tohoku_in_SENDAI_PARCO.jpg', 4.8);

INSERT INTO reviews (user_id, place_id, rating, comment)
VALUES 
(1, 1, 5, 'Magical! The Torii-gates were fantastic.'),
(2, 2, 5, 'Så mäktig vy från toppen. Rekommenderas.'),
(3, 3, 4, 'Bra shopping men lite för mycket folk.');

INSERT INTO favourites (user_id, place_id)
VALUES 
(1, 2), -- sakura123 gillar Fuji
(2, 1), -- Felicia gillar Fushimi Inari
(3, 3); -- miyuki gillar Akihabara

