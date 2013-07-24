var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  name: String,
  email: String,
  phone: Number,
  password: String,
  Profiles: [
    {
      name: String,
      me: Boolean,
      def: Boolean,
      position: Number,

      allergies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Allergies'}],
      medications: [{type: mongoose.Schema.Types.ObjectId, ref: 'Medications'}]
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

mongoose.connect('mongodb://localhost/foodsentry');