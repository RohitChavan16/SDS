import express from "express"

const app = express();
const PORT = 5000;
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Jai Shri Ram");
} );

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});