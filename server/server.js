const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 5050;

// mongoose.connect("mongodb+srv://preethic:2358%40Pce@merncluster.kazzug7.mongodb.net/?retryWrites=true&w=majority&appName=mernCluster")

mongoose.connect("mongodb://localhost/employees");


const userSchema = new mongoose.Schema({
    name:String,
    position:String,
    level: String
})

const usermodel = mongoose.model('User', userSchema);

app.get('/record', function(req,res){
    usermodel.find().then(function(newusers, err){
        if(err){
            console.log(err);
        }else{
            res.send({'records': newusers});
        }
    })
})

app.post('/record/add', function(req,res){
    usermodel.create(req.body).then(function(newrecord, err){
        if(err){
            console.log(err);
        }else{
            console.log(newrecord);
        }
    })
})

app.delete('/:id', function(req, res){
    usermodel.findByIdAndDelete(req.params.id).then(function(deleted, err){
        if(err){
            console.log('err',err)
        }else{
            console.log(deleted);
            res.send({'deleted':deleted});
        }
    })
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});