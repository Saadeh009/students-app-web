const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const { json } = require('body-parser');
const { nanoid } = require('nanoid');
const jwt = require("jsonwebtoken")

dotenv.config({ path: './config.env' });

const app = express();

app.use(cors());
app.use(json());


let listings = [
	{
		id: nanoid(),
		imgUrl: "https://a0.muscache.com/im/pictures/8d8208ae-f8f3-4ce8-ba16-0745ac3c6203.jpg",
		bedrooms: 3,
		price: 200,
		title: "Nice home in Beirut",
		desc: "Experience the comfort and elegance of our delightful home nestled in the vibrant city of Beirut. Relax in style and embrace the warmth and charm of this inviting residence.",
		address: "Saideh street, near church, Zalka",
		city: "beirut",
		isBooked: false,
		isFavorite: false,
		bookedDate: "",
	},
	{
		id: nanoid(),
		imgUrl: "https://www.michigandaily.com/wp-content/uploads/2022/02/online_jeh.opinion.Dormroom.02.22.22.0105.jpg",
		bedrooms: 2,
		price: 300,
		title: "Beautiful seaside view Beirut",
		desc: "Immerse yourself in the captivating beauty of Beirut with our exquisite property offering a stunning seaside view. Enjoy the mesmerizing sights and sounds of the coast right from your doorstep.",
		address: "Riyadi, Manara, Beirut",
		city: "beirut",
		isBooked: false,
		isFavorite: false,
		bookedDate: "",
	},
	{
		id: nanoid(),
		imgUrl: "https://st.hzcdn.com/fimgs/pictures/living-rooms/brooklyn-heights-eclectic-transitional-design-furnish-studio-apartment-b-moore-design-inc-img~8df1007c03c063ff_1641-1-0fc6a71-w360-h360-b0-p0.jpg",
		bedrooms: 4,
		price: 250,
		title: "Nice house, garden, Beirut",
		desc: "Discover the perfect oasis in the heart of Beirut with our beautiful house boasting a serene garden. Experience the harmonious blend of nature and urban living in this charming residence.",
		address: "Saideh street, Mar Mikhael",
		city: "beirut",
		isBooked: false,
		isFavorite: false,
		bookedDate: "",
	},
	{
		id: nanoid(),
		imgUrl: "https://rlp.jumplisting.com/photos/19/60/0/61/19600061_18_lg.jpg",
		bedrooms: 3,
		price: 220,
		title: "Amazing interior, pool, Beirut",
		desc: "Experience the epitome of luxury and relaxation with our stunning Beirut property. Indulge in the breathtaking interior design and take a refreshing dip in the pool. Unforgettable moments await you.",
		address: "Zeituna bay, Downtown, Beirut",
		city: "beirut",
		isBooked: false,
		isFavorite: false,
		bookedDate: "",
	},
];

app.get('/listings', (req, res) => {
	return res.status(200).send(listings)
} )

app.get('/listing/:id', (req, res) => {
	res.send(listings.find(s => s.id === req.params.id))
} )

app.put('/listing/:id/book', (req, res) => {
	const id = req.params.id;
	const index = listings.findIndex((l) => l.id === id);
	const isBooked = Boolean(req.body.isBooked);
	const bookedDate = req.body.bookedDate;
	if (index > -1) {
		listings[index].isBooked = isBooked;
		listings[index].bookedDate = bookedDate;
	}
	return res.send(listings[index]);
});
app.put('/listing/:id/favorite', (req, res) => {
	const id = req.params.id;
	const index = listings.findIndex((l) => l.id === id);
	const isFavorite = Boolean(req.body.isFavorite);
	if (index > -1) {
		listings[index].isFavorite = isFavorite;
	}
	return res.send(listings[index]);
});

const PORT = 3030;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));
