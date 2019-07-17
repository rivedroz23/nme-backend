const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Pizza = require('./models/pizza');
const Topping = require('./models/topping');


app.use(express.urlencoded({extended: false}));
app.use(express.json());

mongoose.connect('mongodb://localhost/nme-backend');

/*Pizza.create({
    type: "Meat",
    toppings: "pepperoni"
}, function(err, pizza) {
    if (err) console.log(err);
    console.log("Pizza created!", pizza)
})*/


app.get('/pizza', (req,res) => {
    Pizza.find({}, function(err,pizzas){
        if (err) res.json(err)
        res.json(pizzas)
    })
    
})

app.get('pizza/:id', (req,res) => {
    Pizzas.findById(req.params.id).populate('topping').exec( (err, pizzas) => {
    if (err) {
        res.json(err)
    }
    res.json(pizzas)
 })
})


app.post('/pizza', (req,res) => {
    Pizza.create({
    type: req.body.type,
    }, function(err, pizzas) {
        res.json(pizzas)
  })
})

app.post("/pizza/:id", (req,res) => {
    Pizza.findById(req.params.id, function(err, pizza) {
        pizza.save( function(err) {
        pizza.push({topping: "pep"})
            res.json(pizza)
        })
    })
})


app.put("/pizza/:id", (req,res) => {
Pizza.findByIdAndUpdate(req.params.id, {
    type: req.body.type
}, {
    new: true
}, (err, pizza) => {
    res.json(pizza);
});
});


 


app.delete("/pizza/:id", (req,res) => {
    Pizza.findByIdAndRemove({type: "Cheese"}, function(err){
        if (err) res.json(err);
        res.json({message: "Delete"})
    })
})


app.get('/toppings', (req,res) => {
    Topping.find({}, function(err,toppings){
        if (err) res.json(err)
        res.json(toppings)
    })
    
})


app.get('/pizza/:pid/topping/:tid', (req,res) => {
    Topping.findById(req.params.id, function(err, toppings) {
    if (err) {
        res.json(err)
    }
    res.json(toppings)
 })
})

app.post("/pizza/:pid/topping", (req,res) => {
    
    Topping.create({
        topping:req.body.topping
    }, (err, topping) => {

        Pizza.findById(req.params.pid, (err, pizza) => {
            pizza.save( function(err) {
            pizza.push({topping: "pep"})
                res.json(pizza)
                })
        })
    })
});


app.delete("/pizza/:pid/topping/:tid", (req,res) => {
Pizza.findById(req.params.qid, (err, pizza) => {
    pizza.topping.pull(req.params.tid)
    pizza.save( err => {
        if (err) res.json(err)
        Topping.deleteOne({_id: req.params.tid}, err => {
            if (err) res.json(err)
            res.json(1);
        })
    })
 })
})


// make this available to our other files
app.listen(3001, () => {
console.log("Listening")
});
