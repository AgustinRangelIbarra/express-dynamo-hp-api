/* 
Setup your own .env file
With the following data.

Create an IAM user and copy the data you need

.env file
-----------------------------
AWS_ACCEES_KEY_ID= 
AWS_SECRET_ACCESS_KEY= 
AWS_DEFAULT_REGION= 
-----------------------------


*/

const express = require("express");
const {
	getAllCharacters,
	getCharacterById,
	deleteCharacter,
	addOrUpdateCharacter,
} = require("./dynamo");
const app = express();

// parse data that comes from a post request
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello world");
});

app.get("/characters", async (req, res) => {
	try {
		const cahracters = await getAllCharacters();
		res.json(cahracters);
	} catch (error) {
		console.log(error);
		res.status(500).json({ err: "something went wrong" });
	}
});

app.get("/characters/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const cahracters = await getCharacterById(id);
		res.json(cahracters);
	} catch (error) {
		console.log(error);
		res.status(500).json({ err: "something went wrong" });
	}
});

app.post("/characters", async (req, res) => {
	const character = req.body;
	try {
		const newCharacter = await addOrUpdateCharacter(character);
		res.json(newCharacter);
	} catch (error) {
		console.log(error);
		res.status(500).json({ err: "something went wrong" });
	}
});

app.put("/character/:id", async (req, res) => {
	const character = req.body;
	const { id } = req.params;
	character.id = id;
	try {
		const updatedCharacter = await addOrUpdateCharacter(character);
		res.json(updatedCharacter);
	} catch (error) {
		console.log(error);
		res.status(500).json({ err: "something went wrong" });
	}
});

app.delete("/characters/:id", async (req, res) => {
	const { id } = req.params;

	try {
		res.json(await deleteCharacter(id));
	} catch (error) {
		console.error(error);
		res.status(500).json({ err: "Something went wrong" });
	}
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
