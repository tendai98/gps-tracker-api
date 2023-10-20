const express = require('express')
const firebase = require('firebase')
const config = require('./config')
const auth = require('./auth')
const mailer = require('./mailer')
const port = process.env.PORT || 5000
const fb = firebase.initializeApp(config)
let authed = false
const target = 'emergencyresponse@domain.com'

function timestampStr(){
	return Math.floor(new Date())+""
}

function authSystem(){
	fb.auth().signInWithEmailAndPassword(auth.email, auth.password).then( e => {
		authed = true
	}).finally( e => {} )
}

function gps(req, res){
	try{
		let ref = fb.database().ref(req.query.id)
		let target = ref.child(req.query.target)

		target.on("value", data => {
			res.json(data.val())
		})
	}catch(e){
			res.json({code:-1})
	}
}


function api(req, res){

	try{
		let ref = fb.database().ref(req.query.id)
		let accelerationXAxis = req.query.x || 0
		let fireDetection = req.query.ir

		if(accelerationXAxis > 3 || fireDetection == 1){
			let lat = req.query.lat || 0
                	let lng = req.query.lon || 0

			message = (accelerationXAxis > 3) ? "[ Vehicle Crashed ] " : ""
			message = (fireDetection == 1) ? " [ Fire Detected ]" : ""
			mailer.createTransporter("gmail")
			mailer.sendMail("Accident Alert", `Accident has occurred at this location: https://maps.google.com/?q=${lat},${lng}, Possible number of casualties: 5, Status: ${message}`, target, res)
		}

		ref.child("currentTrackerData").set(req.query)
		ref.child("dataLog").child(timestampStr()).set(req.query)
		res.json({code: 0})
	}catch(e){
		res.json({code: -1})
	}
}

app = express()
app.use(express.static("public"))
app.get("/api", api)
app.get("/gps", gps)
authSystem()

app.listen(port, () => {
	console.log(`::${port}`);
})
