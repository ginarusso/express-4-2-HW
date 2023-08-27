const express = require("express");

const app = express();
const port = 1111;
app.use(express.json());

//Data
let fruits = [
    {
        id : 1,
        name : "banana"
    },
    {
        id : 2,
        name : "mango"
    }
]

//Basic Routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/login", (req, res) => {
    res.send("POST request at /login");
});

app.put("/cart", (req, res) => {
    res.send("PUT request at /cart");
});

app.delete("/cart", (req, res) => {
    res.send("DELETE request at /cart");
});
  
//Route Paramters
app.get("/items/:id", (req, res) => {
    res.json(req.params);
});

//Request Body
app.post("/register", (req, res)=>{
    res.json(req.body);
});

//REST routes

//GET /fruits
app.get("/fruits", (req, res) => {
    res.json(fruits);
});

//GET /fruits/:id
app.get("/fruits/:id", (req, res) => {
    for (let fruit of fruits) {
        console.log(req.params.id);
        if (fruit.id == req.params.id) {
          res.status(200);
          return res.send(fruit);
        }
    }
    res.status(404);
    res.send("Fruit not found");
})

//POST /fruits
app.post("/fruits", function (req, res) {
    if (fruits.length > 0 && fruits.some((f) => f.name === req.body.name)) {
        res.status(409);
        return res.send("Fruit already exists");
    }
    let index = fruits[fruits.length - 1].id + 1;
    const newFruit = {
        id : index,
        name : req.body.name
    }
    fruits.push(newFruit);
    res.json(newFruit);
    });

//PUT /fruits/:id
app.put("/fruits/:id", function (req, res) {
    for (let fruit of fruits) {
        if (fruit.id == req.params.id) {
        fruit.name = req.body.name;
        res.status(200);
        return res.send("Update successful");
        }
    }
    res.status(404);
    res.send("Fruit not found");
});

app.delete("/fruits/:id", (req, res) => {

    let fruitToDelete = parseInt(req.params.id)
    // console.log(fruitToDelete)
    // let initialLength = fruits.length

    // let filtered = fruits.filter(fruit => fruit.id !== fruitToDelete)
    let indexToDelete = fruits.findIndex(fruit => fruit.id === fruitToDelete)
    console.log(indexToDelete)
    // The indexOf() method returns -1 if the value is not found.
    // https://www.w3schools.com/jsref/jsref_indexof.asp
    // string.indexOf(searchvalue, start)
    if (indexToDelete !== -1) {
        fruits.splice(indexToDelete, 1)
        console.log(fruits)
        res.status(200).json(fruits)
    } else {
        res.status(404).json({ message: "Fruit was not found" })
    }

    // if (filtered.length === initialLength) {
    //     res.status(404).json({ message: "Fruit was not found."})
    // } else {

    //     fruits = [...filtered]
        // console.log(fruits)
        // res.status(200).json(fruits);
    // }
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});