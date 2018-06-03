var express = require('express');
var bodyParser = require('body-parser');

const _= require('lodash');

const {ObjectId} = require('mongodb'); 
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT ||30000;
app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
	var todo = new Todo({
		text:req.body.text
	});

	todo.save().then((doc)=>{
		res.send(doc);
	},(e)=>{
		res.status(400).send(e);
	});
});

app.post('/users',(req,res)=>{
	var body = _.pick(req.body,['email','password']);
	var user = new User(body);

	user.save().then(()=>{
		return user.generateAuthToken();
		//res.send(user);
	}).then((token)=>{
		res.header('x-auth',token).send(user);
	}).catch((e)=>{
		res.status(404).send(e);
	})
});

app.patch('/todos:id',(req,res)=>{
	var id = req.params.id;
	var body = _.pick(req.body,['text','completed']);

	if(!ObjectId.isValid(id)){
		return res.status(404).send();
	}

	if(__.isBoolean(body.completed) && body.completed){
		body.completedAt = new Date().getTime();		
	}else{
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
		if(!todo){
			return res.status(404).send();
		}
		res.send({todo});
	}).catch((e)=>{
		res.status(400).send();
	})
});

app.listen(port,(req,res)=>{
	console.log('Started');
});
//mongoose is a ORM for mongoclient/mongodb 
//Mongoose makes connection by itself and dnt wait for things to hapeen likee if we have a save documnet query write below the connection line then to save document we have to first make a connection then save it in traditional approach but in mongoose this happen by itself


/*var newTodo = new Todo({
	text:'Cook donner done'
});

newTodo.save().then((doc)=>{
	console.log('Saved Todo',doc);
},(err)=>{	
	console.log('Unable to save Todo');
});*/