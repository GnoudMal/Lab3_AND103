const express = require('express');

const router = express.Router();

module.exports = router;

router.get('/', (req, res) => {
    res.send('Đã Vào API của Mobile')
})

const mongoose = require('mongoose')
const foodModel = require('./foodModel')
const uri = 'mongodb+srv://duonghgvt:duonghg04@cluster0.5s1crlw.mongodb.net/MD18402_ASM';

router.get('/list', async (req, res) => {
    await mongoose.connect(uri);

    let foods = await foodModel.find();

    console.log(foods);

    res.send(foods)
})

router.post('/add', async (req, res) => {
    await mongoose.connect(uri);

    const newFood = new foodModel(req.body);
    try {
        const savedFood = await newFood.save();
        res.status(201).send(savedFood);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/delete/:id', async (req, res) => {
    await mongoose.connect(uri);

    try {
        const deletedFood = await foodModel.findByIdAndDelete(req.params.id);
        if (!deletedFood) {
            return res.status(404).send('Food not found');
        }
        res.status(200).send(deletedFood);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.put('/update/:id', async (req, res) => {
    await mongoose.connect(uri);

    try {
        const updatedFood = await foodModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedFood) {
            return res.status(404).send('Food not found');
        }
        res.status(200).send(updatedFood);
    } catch (err) {
        res.status(400).send(err);
    }
});
