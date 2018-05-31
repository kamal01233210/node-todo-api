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


	//insert document	
	/*db.collection('Todos').find({
		_id:new ObjectID('5b0cbd003185cc1b08b91246')
	}).toArray().then((docs)=>{
		console.log(JSON.stringify(docs,undefined,2));
	},(err)=>{
		console.log('Unable to fetch todos',err);
	});*/

	//find document
	/*db.collection('Todos').count().then((count)=>{
		console.log(count);
		//console.log(JSON.stringify(docs,undefined,2));
	},(err)=>{
		console.log('Unable to fetch todos',err);
	});	*/

	//delete documnet
	//deleteMany is used to delete many documnets
	//deleteOne delete only single document
	//findOneAndDelete deletes only one documnet but it also returns the document which gets deleted
	/*db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
		console.log(result);
	},(err)=>{

	});*/

	/*Update command  
		update also has similiar commands to delete
	*/
	//findOneAndUpdate is used to update the document and retunrs the result

	db.collection('Todos').findOneAndUpdate({
		_id: new ObjectID('5b0f4d2fdd699334148a1daa')
	},{
		$set:{
			completed:true
		}
	},{
		//return original is used to whether return the original documnet or the updated one
		returnOriginal:false
	}).then((result)=>{
		console.log(result);	
	});
	//client.close(); 
});