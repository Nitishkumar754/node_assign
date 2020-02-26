const Friend = require('./friend.model');
const Profile = require('../profile/profile.model');
const mongoose = require('mongoose');

module.exports.make_friend = async (req, res)=>{
	console.log("making a friend",req.body.userEmail, req.body.friendEmail );
	if(!req.body.userEmail || !req.body.friendEmail){
		res.status(400).json({"message":"Please provide userEmail and friendEmail both"});
	}
	if(req.body.userEmail && req.body.userEmail.toLowerCase() == req.body.friendEmail.toLowerCase()){
		res.status(400).json({"message":"userEmail and friendEmail can't be same!"});
		return;
	}
	try{
		const user_profile = await Profile.findOne({email:req.body.userEmail})
		const friend_profile = await Profile.findOne({email:req.body.friendEmail})
		
		if(!user_profile){
			res.status(400).json({"message":"User profile not found with this email"});
			return;
		}
		if(!friend_profile){
			res.status(400).json({"message":"Friend profile not found with this email"});
			return;
		}

		var new_friend = new Friend({
			user1:user_profile._id,
			user2:friend_profile._id
			
		})

		var new_friend2 = new Friend({
			user1:friend_profile._id,
			user2:user_profile._id
		})

		var new_friend = await new_friend.save();
		var new_friend2 = await new_friend2.save();
		res.status(200).json({"message":"friends added successfuly", new_friend:new_friend});
	}
	catch(e){
		console.log("e>>>>>>>> ",e);
		res.status(500).json({"message":"unkown error occured!"});
	}

}


module.exports.make_new_friend = async (req, res)=>{
	console.log("making a friend");

	try{
		const existing_profile = await Profile.findOne({email:req.body.email})
		
		if(!existing_profile){
			res.status(400).json({"message":"Profile not found"});
			return;
		}

		var new_friend = new Friend({
			user2:existing_profile._id,
			user1:req.user._id
		})

		var new_friend = await new_friend.save();
		res.status(200).json({"message":"friends added successfuly", new_friend:new_friend});
	}
	catch(e){
		console.log("e>>>>>>>> ",e);
		res.status(500).json({"message":"unkown error occured!"});
	}

}


module.exports.list_friend = async (req, res)=>{
	// console.log("listing friend", req.user);
	// console.log("req.body friend", req.body);
	
	try{
		var all_profile = await Friend.find({user1:req.user._id}).populate({path:'user2', select:'name email -_id'});
		res.status(200).json({"message":"success", saved_data:all_profile});
	}
	
	catch(e){
		console.log("e>>>>>>>>>> ",e);
		res.status(500).json({"message":"something went wrong"});
	}

}


module.exports.list_friend_by_email = async (req, res)=>{
	// console.log("listing friend", req.user);
	console.log("req.body friend", req.body);
	
	try{
		const profile = await Profile.findOne({email:req.body.email})
		
		var all_profile = await Friend.find({user1:profile._id}).populate({path:'user2', select:'name email -_id'});
		
		res.status(200).json({"message":"success", friends:all_profile});
	}
	
	catch(e){
		console.log("e>>>>>>>>>> ",e);
		res.status(500).json({"message":"something went wrong"});
	}

}



module.exports.get_mutual_friend = async (req, res) =>{

console.log("get mutual_friend", req.user);

	var user = req.user._id;
	console.log("user id>>>>>>> ", user);
	
	const second_user = await Profile.findOne({"email": req.query.email})
	console.log("second_user>>>>>>>>>> ",second_user);
	
	
	try{
		const mutual_freinds = await Friend.aggregate([

		{
			$match:{user1:{$in:[user, second_user._id]}},

		},

		
		{$group: {_id: "$user2", user2 : { $first: '$user2' }, count: {$sum: 1}}}, {$match: {count: 2}},

		{ $lookup: {from: 'profiles', localField: 'user2', foreignField: '_id', as: 'friends'} }

		// {$project: {_id: 1}}

		
		])

	res.status(200).send({mutual_friends:mutual_freinds})
	}
	catch(e){
		console.log("error>>>>>>>>>>>>> ",e);
		res.status(500).send({e:e})
	}
	

} 





module.exports.get_mutual_friend2 = async (req, res) =>{

console.log("get mutual_friend", req.body);

	
	const first_user = await Profile.findOne({"email": req.body.email1})
	const second_user = await Profile.findOne({"email": req.body.email2})

	if(!first_user){
		res.status(500).json({"message":"profile with email1 not found"});
	}
	if(!second_user){
		res.status(500).json({"message":"profile with email2 not found"});
	}

	console.log("first_user>>>>>>>>>> ",first_user);
	
	console.log("second_user>>>>>>>>>> ",second_user);
	
	
	try{
		const mutual_friends = await Friend.aggregate([

		{
			$match:{user1:{$in:[first_user._id, second_user._id]}},

		},

		
		{$group: {_id: "$user2", user2 : { $first: '$user2' }, count: {$sum: 1}}}, {$match: {count: 2}},

		{ $lookup: {from: 'profiles', localField: 'user2', foreignField: '_id', as: 'friends'} }

		// {$project: {_id: 1}}

		
		])



	res.status(200).send({mutual_friends:mutual_friends})
	}
	catch(e){
		console.log("error>>>>>>>>>>>>> ",e);
		res.status(500).send({e:e})
	}
	

} 

