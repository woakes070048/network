var m = require('mithril');

//TODO: Comment and fix functionality
var Interview = module.exports = {

	vm: function (attrs) {
		attrs = attrs || '';

		return {
			// id: attrs.id,

			contacts_id: m.prop('1'),
			role: m.prop('1'),
			scheduled_date: m.prop(''),
			occured_date: m.prop('')


			// contacts_id: m.prop(''),
			// role: m.prop(''),
			// scheduled_date: m.prop(''),
			// occured_date: m.prop(''),
			// follow_up: m.prop(''),
			// quality: m.prop(''),
			// preparedness: m.prop('')


			// scheduled_date: m.prop(attrs.scheduled_date || new Date()),
			// quality: m.prop(attrs.quality || 3)
		};
	},

	fetchInt: function (req) {
		return m.request({ methods: 'GET', url: '/API/interviews/' })
			.then(console.log('Interviews GET request'), req);
	},

	postInterview: function (interview) {
		return m.request({ method: 'POST', url: '/API/interviews', data: interview })
			// .then(console.log('Interview POST'));
			// .then(undefined);
			.then(function (serverResponse) {
				console.log('Interview POST', serverResponse)
				return serverResponse
			})
	},
	
	all: function() {
		return Interview.vm();
  }

};