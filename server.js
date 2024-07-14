const express = require('express');
// const { default: mongoose } = require('mongoose');
const mongoose = require('mongoose')
const bodyParser = require("body-parser");



const app = express();
const port = 8080
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.listen(port, () => {
    console.log(`Server dang chay cong ${port}`)
})


const uri = 'mongodb+srv://duonghgvt:duonghg04@cluster0.5s1crlw.mongodb.net/MD18402';

const foodModel = require('./foodModel')

app.get('/', async (req, res) => {
    await mongoose.connect(uri);

    let foods = await foodModel.find();

    console.log(foods);

    res.send(foods)
})

app.post('/add_food', async (req, res) => {
    await mongoose.connect(uri);

    // let food = {
    //     name: 'Bun Bo Hue',
    //     price: 90000,
    //     category: 'Dac San'
    // }

    let food = req.body;

    let result = await foodModel.create(food);
    console.log(result);

    let foods = await foodModel.find();
    res.send(foods)
})

app.delete('/delete/:id', async (req, res) => {
    await mongoose.connect(uri);

    let id = req.params.id;
    console.log(id);
    await foodModel.deleteOne({ _id: id });
    res.send('Đã xóa món ăn thành công');
})

app.put('/update/:id', async (req, res) => {

    await mongoose.connect(uri);

    console.log('Ket noi DB thanh cong');

    let id = req.params.id;
    let newName = req.body.name


    await foodModel.updateOne({ _id: id }, { name: newName });

    let foods = await foodModel.find({});

    res.send(foods);
}) 