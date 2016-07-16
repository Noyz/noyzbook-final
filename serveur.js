const http = require('http');


/*** VARIABLE ***/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore(
      { 
        uri: 'mongodb://connect_mongodb_session_test:okamiden@ds021694.mlab.com:21694/heroku_m3lqgxnp',
        collection: 'utilisateurs'
      });
var cookieParser = require('cookie-parser');
var MongoClient = require('mongodb').MongoClient;
var server = require('http').Server(app);
var httpServer = http.createServer();
var router = express.Router(); 
var mongo = require('mongodb');
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var user = {};
var maDb;
var today;
var userConnected = {};
var fromTo;
var room = 0;
var multer = require('multer');
const socketIo = require('socket.io');
var IOServer = socketIo(httpServer);
setInterval(function(){
	var dayMonth = new Date().getDate();
	var objToday = new Date(),
	    weekday = new Array('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'),
	    dayOfWeek = weekday[objToday.getDay()],
	    domEnder = new Array( '', '', '', '', '', '', '', '', '', '' ),
	    dayOfMonth = today + (objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder[objToday.getDate()] : objToday.getDate() + domEnder[parseFloat(("" + objToday.getDate()).substr(("" + objToday.getDate()).length - 1))],
	    months = new Array('Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'),
	    curMonth = months[objToday.getMonth()],
	    curYear = objToday.getFullYear(),
	    curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
	    curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
	    curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
	    curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
		today = dayOfWeek + " " + dayMonth + "  " + curMonth + ' ' + curYear + ", " + curHour + ":" + curMinute + "." + curSeconds + ' '+ curMeridiem + " ";
}, 1000);



app.set('view engine', 'jade');
app.set('views', 'public/socialNetwork/jade');

app.use('/', express.static(__dirname + '/public/socialNetwork/'));

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport("SMTP", {
    service: 'Gmail',
    auth: {
        user: 'kurgaminoyz@gmail.com',
        pass: 'okamiden'
    }
});


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/public/socialNetwork/img/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
    user.profil = 'img/uploads/' + file.originalname;
  }
});

// var storage = s3({
// 	destination : function( req, file, cb ) {
		
// 		cb( null, 'multer-uploads/my-files' );
		
// 	},
// 	filename    : function( req, file, cb ) {
		
// 		cb( null, file.fieldname + '-' + Date.now() );
		
// 	},
// 	bucket      : 'noyzbook',
// 	region      : 'Oregon'
// });


var upload = multer({storage : storage});

app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(session({
		secret:'123456789SECRET',
		saveUninitialized : false,
		resave: false,
		store: store
	}));


app.get('/', function(req, res) {
	res.render('mainPage');
});



app.get('/accueil', function(req, res) {
	res.render('accueil');
});

app.get('/administrateur', function(req, res){
	res.render('administrateur')
});

app.get('/myProfil', function(req, res) {
	res.render('myprofil');
});

app.get('/privateMessage', function(req, res) {
	res.render('privateMessage');
});

app.get('/edition', function(req, res) {
	res.render('edition');
});

app.get('/addFriend', function(req, res) {
	res.render('addFriend');
});

app.get('/notifications', function(req, res){
		res.render('notification');
});

app.get('/listUsers', function(req, res) {
	res.render('listUsers');
});

app.get('/listFriends', function(req, res) {
	res.render('listFriends');
});

app.get('/friendWall', function(req, res) {
	res.render('friendWall');
});

app.get('/editionFriendWall', function(req, res) {
	res.render('editionFriendWall');
});

app.get('/tchat', function(req, res) {
	res.render('tchat');
});

app.get('/privateMessageEditor', function(req, res) {
	res.render('privateMessageEditor');
});

app.get('/pageChat', function(req, res) {
	res.render('popupChat');
});

app.post('/verificationConnexionAdmin', function(req, res){
	var collectionAdmin = maDb.collection('administrateurs');
	collectionAdmin.find({username:req.body.username, password:req.body.password}).toArray(function(err, data){
		if(data == ''){
			res.send('0');
		}else{
			res.send('1');
		}
	});
});

app.post("/getMembers", function(req, res){
	var collectionAdmin = maDb.collection('utilisateurs');
	collectionAdmin.find({}).toArray(function(err, data){
		res.send(data);
	});
});


app.post('/connectAdmin',function(err,data){
	var urlAdmin = "mongodb://administrateur:okamiden@ds021694.mlab.com:21694/heroku_m3lqgxnp";
	var collectionAdmin = maDb.collection('administrateurs'); 
	var collectionUsers = maDb.collection('utilisateurs');
	MongoClient.connect(urlAdmin, function(err, db) {
	  if (err) {
		res.send('Impossible d\'accéder à votre base de données')
	  }
		maDb = db;
		// var collection = maDb.collection('administrateur');
		collectionAdmin.find({}).toArray(function(err, data){
			console.log(data)
		});
		collectionUsers.find({}).toArray(function(err, data){
			console.log(data)
		});
		server.listen(process.env.PORT || 3000, function(){
			console.log("Express server listening Y on port %d in %s mode", this.address().port, app.settings.env);
		});
	});
});


	/********************************************* Check cookie *********************************************************/
	app.post('/checkCookie', function(req, res){
		var collection = maDb.collection('utilisateurs');
		collection.find({dataCookie:req.body.dataCookie}, {_id:0}).toArray(function(err, data){
			if(data[0] != undefined){
				res.send('1');
			}else{
				res.send('0');
			}
		});
	});
	
	/*********************************************Inscription page ******************************************************/

	app.post('/sub', function(req,res){
		 pseudoUser = req.body.usernameSub;
		 mailUser = req.body.mailSub;
		 passwordUser = req.body.passwordSub;
		var collection = maDb.collection('utilisateurs');
		collection.find({username:pseudoUser, mail:req.body.mailSub}, {_id:0}).toArray(function(err, data){ 
			if(data == ''){
				avertissement = 'Votre compte à correctement été crée ' + pseudoUser;
				collection.insertOne({username : pseudoUser, password:passwordUser, mail:mailUser,amis:[], privateMessages:{}});
				transporter.sendMail({
					from: 'noyzbook@no-reply.com',
				    to: mailUser,
				    subject: 'Bienvenue à toi ' + pseudoUser,
				    text: 'Bienvenue sur le réseau social Noyzbook ! \n\n  J\'espere que tu passeras un agréable moment sur mon site.\n'},
					function(err){
					    if(err){
					        console.log(err);
					    }
				});
				res.send("valid");
			}else{
				res.send('error');
		 	}
		});
	});

	app.post('/connect', function(req,res){
		 pseudoUser = req.body.usernameLog;
		 passwordUser = req.body.passwordLog; 
		var collection = maDb.collection('utilisateurs');
		collection.find({username:pseudoUser, password:passwordUser}, {_id:0}).toArray(function(err, data){
			if(data == ''){ //Compte n'existe pas.
				avertissement = 'Aucun compte trouvée à ce nom.';
				res.send('error'); 
			}else{	
				
				res.send('valid'); 
			}
		});
	});



	app.post('/connexionToProfilSub', function(req, res){
		pseudoUser = req.body.username;
		passwordUser = req.body.password;
		var collection = maDb.collection('utilisateurs');
		collection.find({username:pseudoUser, password:passwordUser}).toArray(function(err, data){
			if(err){
			}else{
				user.information = data;
				collection.updateOne({username:pseudoUser} , { $set: { "dataCookie": req.body.dataCookie , "profil" : "img/anonymous.jpg"}}); 
				res.send(user)	
			}
		});
	});
	
	app.post('/connexionToProfilLog', function(req, res){
		pseudoUser = req.body.username;
		passwordUser = req.body.password;
		var collection = maDb.collection('utilisateurs');
		collection.find({username:pseudoUser, password:passwordUser}).toArray(function(err, data){
				if(err){
			}else{
				user.information = data;
				collection.updateOne({username:pseudoUser} , { $set: { "dataCookie": req.body.dataCookie, privateMessage:[] }}); 
				res.send(user)	
			}
		});
	});

	

	app.post('/resetPassword', function(req, res){
		var collection = maDb.collection('utilisateurs');
		collection.find({mail:req.body.data}).toArray(function(err, data){
			if(data[0] != undefined){
				var newPassword = "mamouth" + Math.random();
				transporter.sendMail({
					from: 'noyzbook@no-reply.com',
				    to: data[0].mail,
				    subject: 'Réinitialisation de mot de passe,',
				    text: 'Vous avez demandez la réintialisation de votre mot de passe. \n Votre nouveau mot de passe temporaire est :' +newPassword + '\n Connectez vous sur votre profil afin de pouvoir le modier'},
					function(err){
					    if(err){
					        console.log(err);
					    }
				});
				console.log(data[0].username)
				collection.updateOne({username:data[0].username} , { $set: { "password": newPassword}});
				res.send('1'); 
			}else{
				res.send('0');
			}
		});
	});

	/**** TOUTES LES PAGES ****/

	app.post('/fetchName', function(req, res){
		var collection = maDb.collection('utilisateurs');
		collection.find({dataCookie:req.body.dataCookie}).toArray(function(err, data){
			res.send(data);
		});
	});

	/************** PAGE ACCUEIL *************************/
	app.post('/loadProfil', function(req, res){
		var obj = {};
		var collection = maDb.collection('utilisateurs');
		collection.find({dataCookie:req.body.data}).toArray(function(err, data){
				if(err){
			}else{
				collection.updateOne({dataCookie:req.body.data});
				obj.actualUserInfo = data;
				
				collection.find({}).toArray(function(err, data){
					obj.everyUser = data;
					res.send(obj);
				})
			}
		});
	});
	app.post('/editMessagePublic', function(req, res){
		var obj = {};
		var collection = maDb.collection('utilisateurs');
		collection.find({dataCookie:req.body.dataCookie}, {_id:0, messagePublic:1}).toArray(function(err, data){
				if(err){
			}else{
				obj.messageActual = data;
				obj.messageAmodifier = req.body;
				res.send(obj);
			}
		});
	});
	app.post('/updateMessagePublic', function(req, res){
		var collection = maDb.collection('utilisateurs');
		collection.find({dataCookie:req.body.dataCookie}, {_id:0, messagePublic:1}).toArray(function(err, data){
				if(err){
			}else{
				data[0].messagePublic[req.body.positionInBd][0] = req.body.messageUpdate;
				data[0].messagePublic[req.body.positionInBd][1] = today;
				collection.updateOne({dataCookie:req.body.dataCookie}, { $set: { "messagePublic" :  data[0].messagePublic }});
				res.send('ok');
			}
		});
	});
	app.post('/deleteMessagePublic', function(req, res){
		var collection = maDb.collection('utilisateurs');
		collection.find({dataCookie:req.body.dataCookie}, {_id:0, messagePublic:1}).toArray(function(err, data){
				if(err){
			}else{
				data[0].messagePublic[req.body.positionInBd].splice(0, 2);
				data[0].messagePublic[req.body.positionInBd].splice(0, 2);
				data[0].messagePublic[req.body.positionInBd].splice(0, 2);
				collection.updateOne({dataCookie:req.body.dataCookie}, { $set: { "messagePublic" :  removeEmptyElem(data[0].messagePublic) }});
				res.send(data[0].messagePublic)
			}
		});
	});

	app.post('/createMessagePublic', function(req, res){
		var obj = {};
		var collection = maDb.collection('utilisateurs');
		collection.find({dataCookie:req.body.dataCookie}, {_id:0, messagePublic:1}).toArray(function(err, data){
				if(err){
			}else{
				obj.messageActual = data;
				obj.messageAmodifier = req.body;
				res.send(obj);
			}
		});
	});

	/**************PAGE PROFIL *************************/

	app.post('/autoFillingRequest', function(req, res){
		var toFill = {};
		var collection = maDb.collection('utilisateurs');
		collection.find({dataCookie:req.body.dataCookie}, {_id:0,nom:1}).toArray(function(err, data){
			toFill.nameUpdate = data[0];
			collection.find({dataCookie:req.body.dataCookie}, {_id:0,prenom:1}).toArray(function(err, data){
				toFill.prenomUpdate = data[0];
				collection.find({dataCookie:req.body.dataCookie}, {_id:0,mail:1}).toArray(function(err, data){
					toFill.mailUpdate = data[0];
					collection.find({dataCookie:req.body.dataCookie}, {_id:0,age:1}).toArray(function(err, data){
						toFill.ageUpdate = data[0];
						collection.find({dataCookie:req.body.dataCookie}, {_id:0,genre:1}).toArray(function(err, data){
							toFill.genreUpdate = data[0];
							collection.find({dataCookie:req.body.dataCookie}, {_id:0,adressePostal:1}).toArray(function(err, data){
								toFill.adressePostal = data[0];
								res.send(toFill);
							});
						});
					});
				});
			});
		});
	});

	
	app.post("/autoFillingPicture", function(req, res){
		var collection = maDb.collection('utilisateurs');
		collection.find({dataCookie:req.body.dataCookie}).toArray(function(err, data){
			res.send(data[0]);
		});
	});

	app.post("/updateProfilInfo", function(req, res){
		var collection = maDb.collection('utilisateurs');
		collection.find({dataCookie:req.body.dataCookie}).toArray(function(err, data){
			collection.updateOne({dataCookie:req.body.dataCookie} , { $set: { "nom" :  req.body.nameUpdate, "prenom" : req.body.prenomUpdate, "mail": req.body.mailUpdate, "age": req.body.ageUpdate, "adressePostal" : req.body.adresseUpdate, "genre": req.body.genre}});
				res.send(data);
		});
	});


	app.post('/upload', upload.single('image'), function(req, res, next){
		console.log(req.file);
		res.redirect('myprofil');
	});

	app.post('/loadProfilPicture', function(req, res){
			var collection = maDb.collection('utilisateurs');
			collection.find({dataCookie:req.body.data}).toArray(function(err, data){
					if(err){
				}else{
					collection.updateOne({dataCookie:req.body.data} , { $set: { "profil" :  user.profil}});
					res.send(user.profil);
				}
		})
	});
	app.post('/checkCurrentPassword', function(req, res){
		var collection = maDb.collection('utilisateurs');
		collection.find({dataCookie:req.body.dataCookie}).toArray(function(err, data){
				if(err){
			}else{
				if(req.body.passwordToCheck != data[0].password){
					res.send('-1');
				}else{
					res.send('1');
				}
			}
		})
	});

	app.post('/updatePassword', function(req, res){
		var collection = maDb.collection('utilisateurs');
		collection.find({dataCookie:req.body.dataCookie}).toArray(function(err, data){
				if(err){
			}else{
				collection.updateOne({dataCookie:req.body.dataCookie}, { $set: { "password" :  req.body.passwordToChange }});
				res.send(data[0]);
			}
		})
	});





	/******* Notifications *******/
	

	app.post('/loadNotification', function(req, res){
		var collection = maDb.collection('utilisateurs');
		collection.find({dataCookie:req.body.data}).toArray(function(err, data){
				if(err){
			}else{
				if(data[0] != undefined){
					if(data[0].Notification == undefined || data[0].Notification == ''){
						res.send({});
					}else{
						res.send(data[0].Notification);
					}	
				}
			}
		});
	});

	app.post('/checkNotification', function(req, res){
		var collection = maDb.collection('utilisateurs');
		collection.find({dataCookie:req.body.data}).toArray(function(err, data){
			res.send(data[0].Notification);
		});
	});

	// Handling friends requests //

	app.post("/addThisFriend", function(req, res){
		var collection = maDb.collection('utilisateurs');
		collection.find({dataCookie:req.body.data}).toArray(function(err, data){
			if(err){
			}else{
				var expediteur = data[0].username;
				var newUser = treatUsers(data[0].amis, req.body.name_user);
				collection.updateOne({dataCookie:req.body.data}, { $set: { 'amis' : newUser}}, { upsert: true });
				collection.find({username:req.body.name_user}).toArray(function(err, data){
					var newUser = treatUsers(data[0].amis, expediteur);
					collection.updateOne({username:data[0].username}, { $set: { 'amis' : newUser}}, { upsert: true });
				});
				res.send(data[0]);
			}
		});
	});

	app.post("/deleteRequestThisFriend", function(req, res){
		var collection = maDb.collection('utilisateurs');
		collection.find({dataCookie:req.body.data}).toArray(function(err, data){
			if(err){

			}else{
				res.send(data[0]);
			}
		});
	});

	app.post("/deleteNotificationFriend", function(req, res){
		var collection = maDb.collection('utilisateurs');
		collection.find({dataCookie:req.body.data}).toArray(function(err, data){
			if(err){

			}else{
				var nbr = data[0].Notification.length -1;
				var propNotification = "Notification.";
				var thisNotification = propNotification.concat(req.body.position).toString()
				collection.updateOne({dataCookie:req.body.data}, { $pull: { "Notification"   :{ $in: [data[0].Notification[req.body.position]] }}, $set:{"NbrNotification" : nbr}});
				collection.find({dataCookie:req.body.data}).toArray(function(err, data){
					res.send(data[0]);
				});
			}
		});
	});

	// Handling wall message //
	app.post("/accessNotificationWall", function(req, res){
		var collection = maDb.collection('utilisateurs');
		collection.find({dataCookie:req.body.data}).toArray(function(err, data){
			if(err){

			}else{
				res.send(data[0]);
			}
		});
	});
	app.post("/deleteThisNotificationWall", function(req, res){
		var collection = maDb.collection('utilisateurs');
		collection.find({dataCookie:req.body.data}).toArray(function(err, data){
			if(err){

			}else{
				var nbr = data[0].Notification.length -1;
				var propNotification = "Notification.";
				var thisNotification = propNotification.concat(req.body.position).toString()
				collection.updateOne({dataCookie:req.body.data}, { $pull: { "Notification"   :{ $in: [data[0].Notification[req.body.position]] }}, $set:{"NbrNotification" : nbr}});
				res.send(data[0]);
			}
		});
	});


	/******* Edition *******/
	app.post('/sendMessage', function(req, res){
		var collection = maDb.collection('utilisateurs');
		collection.find({dataCookie:req.body.dataCookie}).toArray(function(err, data){
			if(err){

			}else{
				var arrayMessageAndTime = [req.body.message, today];
				var newMessagePublic = treatMessagePublicArray(data[0].messagePublic, arrayMessageAndTime);  
				collection.updateOne({dataCookie:req.body.dataCookie} , { $set: { messagePublic : newMessagePublic}});
				collection.find({dataCookie:req.body.dataCookie}).toArray(function(err, data){
					res.send(data[0].messagePublic);
				}); 
			}
		});
	});

	/******* ListUsers *******/
	app.post('/loadList', function(req, res){ // charge la liste de tout les utilisateurs qui sont dans la base de données amis de l'utilisateur
		var collection = maDb.collection('utilisateurs');
		collection.find({}).toArray(function(err, data){ 
			if(err){
			}else{
				var tabResult = []; // Tableau contenant le nom tous utilisateurs
				var allData = data; // On stock les données dans une variable pour refaire appel à data 
				var obj = {};
				obj.data = data; //On stock les données dans une propriété d'un autre objet + la liste des utilisateurs à effacer
				var tabList = [];
				for(i = 0; i < allData.length;i++){
					tabResult.push(allData[i].username); 
				}
				collection.find({dataCookie:req.body.data}).toArray(function(err, data){ 
					if(data[0].amis != undefined && data[0] != undefined && data[0].amis != ''){
						for(var j = 0;j < tabResult.length;j++){
						 	for(var k = 0;k < data[0].amis.length;k++){ 
						 		if(data[0].amis[k] != tabResult[j]){
						 			// console.log('true' + ' ' +  all[j].username)
								}else{
									tabList.push(allData[j].username);
								}
						 	}
						}
					}else{
						tabList.push(allData);
					}
					obj.dataToDelete = tabList;
				res.send(obj);
				});
			}
		});
	});

	app.post("/addThisUser", function(req, res){
		var collection = maDb.collection('utilisateurs');
		collection.find({dataCookie:req.body.data}).toArray(function(err, data){
			if(err){

			}else{
				res.send(req.body.name_user);
			}
		});
	});

	app.post("/requestThisUser", function(req, res){
		var collection = maDb.collection('utilisateurs');
		collection.find({username:req.body.to}).toArray(function(err, data){
			if(err){

			}else{
				var userMail = data[0];
				var notification = ['Vous avez reçu une requête d\'ami venant de : ' + req.body.from];
				var newNotification = treatNotifications(data[0].Notification, notification);
				var nbr = data[0].Notification;
				if(nbr == undefined){
					nbr = 1;
				}else{
					nbr = data[0].Notification.length;
				}
			res.send('ok')
				// collection.updateOne({username:req.body.to}, { $set: { 'Notification' : newNotification, 'NbrNotification' : nbr}});
				// transporter.sendMail({
				// 	from: 'kurgaminoyz@gmail.com',
				//     to: userMail.mail,
				//     subject: 'Nouvelle notification!',
				//     text: 'Bonjour,\n Vous avez reçu une notification venant de : '+ req.body.from + '\nCliquer <a href="http://noyzbook.herokuapp.com/">ici</a> pour y accéder.'},
				// 	function(err){
				// 	    if(err){
				// 	        console.log(err);
				// 	    }
				// });
			}
		});
	});

	/******* ListFriends *******/
	/*** display wall friend ***/
		app.post('/loadListFriend', function(req, res){ // charge la liste de tout les utilisateurs qui sont dans la base de données amis de l'utilisateur
			var collection = maDb.collection('utilisateurs'); 
			collection.find({}).toArray(function(err, data){ 
				if(err){
				}else{
					var tabResult = []; // Tableau contenant les noms des utilisateurs à afficher
					var allData = data; // On stock les données dans une variable pour refaire appel à data 
					var obj = {};
					obj.data = data; //On stock les données dans une propriété d'un autre objet?
					var tabList = [];
					obj.picture =  []; // Tableau de stockage de l'image 
					for(i = 0; i < allData.length;i++){
						tabResult.push(allData[i].username);
					}
					collection.find({dataCookie:req.body.data}).toArray(function(err, data){ 
						if(data[0].amis != undefined){
							for(var j = 0;j < tabResult.length;j++){
							 	for(var k = 0;k < data[0].amis.length;k++){
							 		if(data[0].amis[k] != tabResult[j]){
							 			// console.log('true' + ' ' +  all[j].username)
									}else{
										obj.picture.push(allData[j].profil); 
										tabList.push(allData[j].username);
									}
							 	}
							}
						}
						obj.dataToKeep = tabList;
					res.send(obj);
					});
				}
			});
		});

	var userWall;
	app.post("/loadWallFriend", function(req, res){
		var collection = maDb.collection('utilisateurs');
		collection.find({username:req.body.name}).toArray(function(err, data){
			if(err){

			}else{
				userWall = data;
				collection.find({}).toArray(function(err, data){
					res.send({actualUserInfo:userWall, everyUser:data});
				});
			}
		});
	});
	app.post("/loadMessageFriend", function(req, res){
		var obj = {};
		var collection = maDb.collection('utilisateurs');
		collection.find({dataCookie:req.body.data}).toArray(function(err, data){ 
			obj.actualUserInfo = userWall;
			collection.find({}).toArray(function(err, data){
				obj.everyUser = data;
				res.send(obj);
			});

		});
	});
	app.post("/deleteMessagePublicOnFriend", function(req, res){
		var collection = maDb.collection('utilisateurs');
		collection.find({username:userWall[0].username}, {_id:0, messagePublic:1}).toArray(function(err, data){
				if(err){
			}else{
				data[0].messagePublic[req.body.positionInBd].splice(0, 2);
				data[0].messagePublic[req.body.positionInBd].splice(0, 2);
				data[0].messagePublic[req.body.positionInBd].splice(0, 2);
				collection.updateOne({username:userWall[0].username}, { $set: { "messagePublic" :  removeEmptyElem(data[0].messagePublic) }});
				res.send(data[0].messagePublic)
			}
		});
	});

	app.post("/deleteThisFriend", function(req, res){
		var thatUser = req.body.receveur;
		var collection = maDb.collection('utilisateurs');
		collection.find({dataCookie:req.body.dataCookie}, {_id:0}).toArray(function(err, data){
				if(err){
			}else{
				var exp = data[0].username;
				for (var i=data[0].amis.length;i>=0;i--) {
			        if (data[0].amis[i] != req.body.receveur){
			           var newFriendsMe = data[0].amis.splice(i, 1);
			        }   	
			    }
			    collection.find({username:thatUser}, {_id:0, amis:1}).toArray(function(err, data){
			    	for (var i=data[0].amis.length;i>=0;i--) {
				        if (data[0].amis[i] != exp){
				           var newFriendsHim = data[0].amis.splice(i, 1);
				        }   	
				    }
				    collection.updateOne({username:req.body.receveur}, {$set:{"amis": newFriendsHim}});
			    });
			    collection.updateOne({dataCookie:req.body.dataCookie}, {$set:{"amis": newFriendsMe }});
	            collection.find({dataCookie:req.body.dataCookie}, {_id:0, amis:1}).toArray(function(err, data){
					res.send(data[0].amis);
	            });
			}
		});
	});	

	/***writing on wall friend ***/
	
	app.post("/writingOnWallFriend", function(req, res){
		fromTo = req.body;
		res.send(fromTo);
	});

	app.post("/getNameFriend", function(req, res){
		res.send(fromTo);
	});

	app.post("/sendMessageToFriend", function(req, res){
		console.log('hit')
		console.log(req.body)
		var collection = maDb.collection('utilisateurs');
		var expediteur;
		collection.find({dataCookie:req.body.dataCookie}).toArray(function(err, data){
			expediteur = data[0].username;
		});
		collection.find({username:req.body.receveur}).toArray(function(err, data){
			if(err){

			}else{
				var arrayMessageAndTime = [req.body.message, today, expediteur];  
				var newMessagePublic = treatMessagePublicArray(data[0].messagePublic, arrayMessageAndTime);
				collection.updateOne({username:req.body.receveur}, { $set: { messagePublic : newMessagePublic}});
				/*** Notification envoyé ****/
				var notification = [expediteur + ' à écrit sur votre mur.']
				var newNotification = treatNotifications(data[0].Notification, notification);
				var nbr = data[0].Notification;
				if(nbr == undefined){
					nbr = 1;
				}else{
					nbr = data[0].Notification.length;
				}
				collection.updateOne({username:req.body.receveur}, { $set: { 'Notification' : newNotification, 'NbrNotification' : nbr}});
				transporter.sendMail({
					from: 'kurgaminoyz@gmail.com',
				    to: data[0].mail,
				    subject: expediteur + ' à écrit sur votre mur',
				    text: 'Bonjour, '+ data[0].username+' \n\n Quelqu\'un  à publier un message sur votre mur! \n\n Connectez vous pour aller vérifier.'},
					function(err){
					    if(err){
					        console.log(err);
					    }
				});
				console.log('insertion : ok')
				res.send(data);
			}
		});
	});


	/*** PRIVATE MESSAGE ***/


	app.post("/loadContactPrivateMessageList", function(req, res){ // charge list user, if {}, écris <li> avec "pas de message" != charge list contact
		var collection = maDb.collection('utilisateurs');
		var list = {};
		collection.find({dataCookie:req.body.data}).toArray(function(err, data){
			if(data[0].privateMessages != undefined){
				list.privateMessages = data[0].privateMessages;
			}else{
				//
			}
			res.send(list);
		});
	});

	var destinatairePM = {};

	app.post('/createPrivateMessage', function(req, res) { 
		destinatairePM = req.body;
		res.send('Destinataire enregistré')
	});

	app.post('/getNameFriendPrivateMessage', function(req, res) { 
		res.send(destinatairePM);
	});


	app.post('/sendPrivateMessage', function(req, res) { //send message to BD destinataire
		var collection = maDb.collection('utilisateurs');
		collection.find({username:destinatairePM.receveur}).toArray(function(err, data){ // va chercher le destinataire et l'insere dans une variable
			var thisDestinataire = data;
			collection.find({dataCookie:destinatairePM.expediteur}).toArray(function(err, data){
				var thisExpediteur = data;
				/**** Destinataire side ****/
				var obj = thisDestinataire[0].privateMessages; 
				var target = thisDestinataire[0].privateMessages[thisExpediteur[0].username];
				if(typeof target == "undefined"){
					target = [];
				} 
				obj[thisExpediteur[0].username] = target;
				var arrayPrivateMessageAndTime = [req.body.message, today, thisExpediteur[0].username];
				obj[thisExpediteur[0].username].push(arrayPrivateMessageAndTime);
				collection.updateOne({username:thisDestinataire[0].username} , {$set:{"privateMessages" : obj}});




				/**** Expediteur side ****/
				var objExp = thisExpediteur[0].privateMessages; // obj est égale au message privée du destinataire
				var targetExp = thisExpediteur[0].privateMessages[thisDestinataire[0].username];// target est égale à data[0].privateMessages[exemple.username] (privateMessages.jon_snow)
				if(typeof targetExp == "undefined"){
					targetExp = [];
				} 
				objExp[thisDestinataire[0].username] = targetExp;
				var arrayPrivateMessageAndTimeExp = [req.body.message, today, thisExpediteur[0].username];
				objExp[thisDestinataire[0].username].push(arrayPrivateMessageAndTimeExp);
				collection.updateOne({username:thisExpediteur[0].username} , {$set:{"privateMessages" : objExp}});
				res.send(thisExpediteur[0].privateMessages);
			});
		});
	});
	var room1 = 'room1';
	var room2 = 'room2';
	var usernames = {};
/////////////////////////////////////CHAT AND SOCKET /////////////////////////////////////////////
io.on('connection', function(socket){
	socket.emit('askInfoUser');

	socket.on('new user', function(data){
		socket.nickname = data;
		userConnected[socket.nickname] = socket;
		usernames[socket.nickname] = socket.nickname;
		io.emit("displayOnlineContact", Object.keys(userConnected));
	});








	socket.on('join room 1', function(room) {
     	socket.leave('room2');
     	socket.join('room1');
    });

    socket.on('join room 2', function(room) {
    	socket.leave('room1');
     	socket.join('room2');
    });

	socket.on('send All', function(data){
    	io.sockets.in('room1').emit('message', 'what is going on, room1?');
	});

	socket.on('send All 2', function(data){
    	io.sockets.in('room2').emit('message', 'what is going on, room2?');
	});


	socket.on('sendInvitation', function(data){
		userConnected[data.userClicked].emit('notificationInvitation', data.currentUser);
	});


	socket.on('disconnect', function(data){
		delete userConnected[socket.nickname];
		socket.leave();
		io.emit("displayOnlineContact", Object.keys(userConnected));
	});


	socket.on('inviteInRoom', function(data){
		var collection = maDb.collection('utilisateurs');
		var abysse = socket.nickname + data;
		var exp = data;
		userConnected[data].join(abysse);
		userConnected[socket.nickname].join(abysse);
		var tchatRoom = {};
		tchatRoom[abysse] = socket.nickname + data;
		collection.updateOne({username:socket.nickname}, {$set:{'room' : tchatRoom}})
		collection.updateOne({username:data}, {$set:{'room' : tchatRoom}});
		collection.find({username:socket.nickname}).toArray(function(){
			io.sockets.in(abysse).emit('chatOpen', {room:socket.nickname + data, socketAuteur : socket.nickname, date:today, exp:data});
		});

	});



	socket.on('send message', function(data){
		io.sockets.in(data.room).emit('new message', {room:data.room, data:data.message , myname:data.myName});
	});
	

	app.post("/updateContactOnline", function(req, res){
		var collection = maDb.collection('utilisateurs');
		collection.find({dataCookie:req.body.dataCookie}).toArray(function(err, data){
			if(data[0] != undefined){
				res.send(data[0].amis)
			}
		});
	});
/****/
});


/*** Fonction ***/


	var treatMessagePublicArray = function(arrayMessages, userMessage){
		if(arrayMessages == undefined){
			arrayMessages = [];
		}
		arrayMessages.push(userMessage);
		return arrayMessages;
	};

	var treatPrivateMessageArray = function(arrayPM, userMessage){
		if(arrayPM == undefined){
			arrayPM = [];
		}
		arrayPM.push(userMessage);
		return arrayPM;
	};


	var treatUsers = function(arrayFriends, userFriend){
		if(arrayFriends == undefined){
			arrayFriends = [];
		}
		arrayFriends.push(userFriend);
		return arrayFriends;
	};

	var treatNotifications = function(arrayNotifications, currentNotification){
		if(arrayNotifications == undefined){
			arrayNotifications = [];
		}
		arrayNotifications.push(currentNotification);
		return arrayNotifications;
	};

	var removeEmptyElem = function(ary) {
    for (var i=ary.length;i>=0;i--) {
        if (ary[i] == "")  {
            ary.splice(i, 1);
        }   	
    }
	    return ary;
	};



	
// app.get('/pages/:un', function (req, res){
// 	var params = req.params.un;
// 	var collection = maDb.collection('jeux');
//  	collection.find().toArray(function(err, data){
// 	 	if(err){
// 	     	return next(err);
// 	 	} else{ 
// 			switch(params){
// 				case '':
// 				    res.render('layout.jade', {datas:data}); 
// 				break;
// 				case 'layout':
// 				    res.render('layout.jade', {datas:data});
// 				break;
// 				case 'article':
// 				    res.render('article.jade') ;
// 				break;
// 				case 'edition':
// 				    res.render('edition.jade') ;
// 				break;
// 	     	}
//  		}
// 	}); 
//  });

 // if(req.session.nbrSession){
 //  req.session.nbrSession++;
 // } else {
 //  req.session.nbrSession = 1;

 // }
 // var params = req.params.un;
	
 // switch(params){
 //  case 'accueil':
 //      res.render('accueil.jade', {nbrSession : req.session.nbrSession});  
 //  break;
 //  case 'about':
 //      res.render('about.jade',{nbrSession : req.session.nbrSession}) ;
 //  break;
 //  case 'test':
 //      res.render('test.jade',{nbrSession : req.session.nbrSession}) ;
 //  break;
 //  case 'form':
 //      res.render('form.jade',{nbrSession : req.session.nbrSession}) ;
 //  break;
 //  case 'resultat':
 //      var collection = maDb.collection('velib');
 //      collection.find({},{"fields.name": 1}).limit(10).toArray(function(err, data){
 //          if(err){
 //              return next(err);
 //          } else{ 
 //              res.render('resultat.jade', {datas:data});
 //          }
 //      });
 //  break;
 // }



// app.post('/reponse', function(req, res) {
//  if(req.body.mail == ''){
//      res.render('errer404');
//  } else{
//      res.render('reponse.jade', {Nom : req.body.nom, Prenom : req.body.prenom, Mail : req.body.mail});
//  }
// });



// app.get('/resultat', function(req,res){
//      var collection = maDb.collection('velib');
//  collection.find({},{"fields.name": 1, }).toArray(function(err, data){
//      res.render('resultat.jade', {datas:data.fields.name});
//  });
//  });

var url = "mongodb://utilisateurs:okamiden@ds021694.mlab.com:21694/heroku_m3lqgxnp";
var urlAdmin = "mongodb://administrateur:okamiden@ds021694.mlab.com:21694/heroku_m3lqgxnp" 
MongoClient.connect(url, function(err, db) {
  if (err) {
	res.send('Impossible d\'accéder à votre base de données')
  }
	maDb = db;
	// var collection = maDb.collection('administrateur');
	// collection.find({}).toArray()
	// 
	server.listen(process.env.PORT || 3000, function(){
		console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
	});
});
