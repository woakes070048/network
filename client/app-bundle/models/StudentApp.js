var m = require('mithril');

var studentApp = module.exports = {

  apps: {1: [], 2: [], 3: [], 4: [], 5: []},
  studentInfo: null,
    
  // All open applications for all students
  fetchApps: function(ctrl) {
    if(ctrl.thisUserId){
      m.request({ method: 'GET', url: '/api/applications/' + ctrl.thisUserId})
        .then(function(applications) {
          studentApp.apps = {1: [], 2: [], 3: [], 4: [], 5: []}
          applications.Application.forEach(function(app){
            studentApp.apps[app.phase].push(app);
          });
        });
    } else {
      m.request({ method: 'GET', url: '/api/users/applications'})
        .then(function(applications) {
          if (!Array.isArray(applications.Application)) {
            studentApp.apps = false;
          }else{
            studentApp.apps = {1: [], 2: [], 3: [], 4: [], 5: []};
            applications.Application.forEach(function(app){
              studentApp.apps[app.phase].push(app);
            });
          }
        });
    }
  },

  all: function() {
    return {
      apps: studentApp.apps,
      studentInfo: studentApp.studentInfo
    };
  },

  // All student profile info uid (e.g. avatar, name ...)
  fetchInfo: function(ctrl) {
    if(ctrl.thisUserId){
      m.request({ method: 'GET', url: 'api/users/' + ctrl.thisUserId })
        .then(function(userInfo) {
          studentApp.studentInfo = userInfo.Users[0];
        });
    } else {
      m.request({ method: 'GET', url: '/me/' })
        .then(function(userInfo) {
          studentApp.studentInfo = userInfo.user;
        });
    }
  }

};