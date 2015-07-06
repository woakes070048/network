var db = require('../db.js');
var Promise = require('bluebird');
var General = require('../lib/General.js');
var Interviews = module.exports = General.access('interviews');



module.exports.megaJoin = function(){
	return db.select('users.*','interviews.*','applications.*').from('interviews')
	.join('applications', function() {
        this.on('applications.id', '=', 'interviews.app_id')})
      .join('users',function() {
        this.on('users.uid', '=', 'applications.user_id')})
}