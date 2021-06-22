require('dotenv').config(); 

const path = require('path'); 

const express = require('express'); 

const bodyParser = require('body-parser'); 

const nodemailer = require('nodemailer');  

const app = express(); 

// View engine 
app.set('view engine', 'pug'); 

// Middleware 
app.use(bodyParser.urlencoded({extended: true})); 

app.use(express.static(path.join(__dirname, '/public'))); 


// Routes 
app.get('/', (req, res) =>{
	res.render('index'); 
})

app.post('/', (req, res) => {
	const {fullname, email, phone, message} = req.body; 
	
	// SMTP Transporter 
	const transporter = nodemailer.createTransport({
		service:'yahoo', 
		secure: false, 
		auth:{
			user:process.env.EMAIL_NAME, 
			pass:process.env.PASSWORD
		}, 
		tls: {
    		
    		rejectUnauthorized: false
  		},
		debug:false, 
		logger: true

	})

	// Send mail 
	let info = transporter.sendMail({
		from: process.env.EMAIL_NAME, 
		to:'bqueenathome@yahoo.ca', 
		subject:'New client', 
		html:`
			<div>
				<p>From: ${email}</p>
				<p>Full name: ${fullname}</p>
				<p>Phone: ${phone}</p>
				<p>Message: ${message}</p><br>
			 </div>`, 


	}, 

	// Callback 
	(err, info) =>{
		err ? console.log(err) : console.log('Email sent!')
	})

	// Redirect back to home
	res.redirect('/');

})

PORT = process.env.PORT || 5000; 

app.listen(PORT, () => console.log(`Server listening to ${PORT}`)); 