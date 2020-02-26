var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/liftoffdb', {
	useNewUrlParser:true,
	useCreateIndex:true
});


