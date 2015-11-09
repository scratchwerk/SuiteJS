/**
 * Created by Ronnie on 11/9/2015.
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MentorSchema   = new Schema({
    firstname: String,
    lastname: String
});

module.exports = mongoose.model('Mentor', MentorSchema);