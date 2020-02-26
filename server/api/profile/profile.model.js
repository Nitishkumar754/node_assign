var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fileId = mongoose.Types.ObjectId();

var profileSchema = new Schema({
  name:String,
  email:String,
  mobile:String,
  
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})


var Profile = mongoose.model('Profile', profileSchema);

// make this available to our users in our Node applications
module.exports = Profile;
 