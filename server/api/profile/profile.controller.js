const Profile = require('./profile.model');
const jwt = require('jsonwebtoken');

module.exports.create_profile = async (req, res)=>{
	console.log("creating a profile");

	if(!req.body.email || !req.body.name){
		res.status(400).json({"message":"Name and email are mandatory!"});
		return;
	}

	try{
		const existing_profile = await Profile.findOne({email:req.body.email})
		
		if(existing_profile){
			res.status(400).json({"message":"Profile exists with this email id"});
			return;
		}

		var new_profile = new Profile({
			name:req.body.name,
			email:req.body.email,
			mobile:req.body.mobile
		})

		var saved_profile = await new_profile.save();
		const token = jwt.sign({ _id: saved_profile._id }, 'secret');
		res.status(200).json({"message":"profile created successfuly", saved_data:saved_profile, token:token});
	}
	catch(e){
		res.status(500).json({"message":"unkown error occured!"});
	}

}


module.exports.list_profile = async (req, res)=>{
	console.log("listing profile");
	
	var all_profile = await Profile.find({});
	res.status(200).json({"message":"success", members:all_profile});

}


