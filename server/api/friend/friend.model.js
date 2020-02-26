var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fileId = mongoose.Types.ObjectId();

var freindSchema = new Schema({
  user1:{type: mongoose.Schema.ObjectId, ref:'Profile'},
  user2:{type: mongoose.Schema.ObjectId, ref:'Profile'},
  
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})


var Friend = mongoose.model('Friend', freindSchema);

// make this available to our users in our Node applications
module.exports = Friend;
 