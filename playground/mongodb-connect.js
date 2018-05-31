const mongoClient = require('mongodb').MongoClient;

const {ObjectID} = require('mongodb');

mongoClient.connect('mongodb://localhost:27017',(err,client)=>{
	if(err){
		return console.log('Unable to connect');
	}
	console.log('connect to mongodb server');
	var db = client.db('toDoApp');

	/*db.collection('Todos').insertOne({
		text:'Something to do',
		completed:false
	},(err,result)=>{
		if(err){
			return console.log('Unable to connect');
		}
		console.log(JSON.stringify(result.ops,undefined,2));
	});*/


	
	/*db.collection('Todos').find({
		_id:new ObjectID('5b0cbd003185cc1b08b91246')
	}).toArray().then((docs)=>{
		console.log(JSON.stringify(docs,undefined,2));
	},(err)=>{
		console.log('Unable to fetch todos',err);
	});*/

	db.collection('Todos').count().then((count)=>{
		console.log(count);
		//console.log(JSON.stringify(docs,undefined,2));
	},(err)=>{
		console.log('Unable to fetch todos',err);
	});	

	//client.close(); 
});