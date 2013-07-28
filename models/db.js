var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  name: String,
  email: {type: String, unique: true},
  phone: {type: Number, unique: true},
  password: String,
  profiles: [
    {
      name: String,
      me: Boolean,
      def: Boolean,
      position: Number,
      allergies: [{name: {type: String, lowercase: true}}],
      medications: [{name: {type: String}}] //should capitalize
      // allergies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Allergies'}],
      // medications: [{type: mongoose.Schema.Types.ObjectId, ref: 'Medications'}]
    }
  ]
});

var allergySchema = new mongoose.Schema({
  name: String,
  count: Number
});

var medicationSchema = new mongoose.Schema({
  name: String,
  interactions: [{name: String}],
  count: Number
});


mongoose.model('User', userSchema);
mongoose.model('Allergy', allergySchema);
mongoose.model('Medication', medicationSchema);

var mongooseUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/foodsentry';
mongoose.connect(mongooseUri);