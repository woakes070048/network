var m           = require('mithril');
var materialize = require('../../lib/materialize.js');
var Fuzzy       = require('./Fuzzysearch.js')


//model
var Message     = require('../models/Message.js');

exports.controller = function () {
  var ctrl = this;
  ctrl.message = Message.vm();
  ctrl.filter = echo;
  ctrl.message.receiver_uid = m.prop(null);

  ctrl.submit = function (e) {
    e.preventDefault();
    Message.postMessage(ctrl.message)
      .then(function(){

        ctrl.message == Message.vm();
      });
  };

  ctrl.filterMessages = function(id,uid) {
    ctrl.message.receiver_uid(id);
  };

  ctrl.tConvert = function(time) {  
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    if(+time[0] < 12){
      time[5] = 'AM';
      time[0] = +time[0] - 17;
    } else {
      time[5] = 'PM';
      time[0] = +time[0] - 5;
    }
  }
  return time.join (''); // return adjusted time or original string
};

    ctrl.filter = function(message){
      if((message.receiver_uid ===  ctrl.message.receiver_uid() && message.sender_uid === ctrl.message.sender_uid) || 
         (message.sender_uid === ctrl.message.receiver_uid() && message.receiver_uid === ctrl.message.sender_uid)){
        return message;
      }
    };
};

exports.view = function (ctrl, options) {
  ctrl.selectedUser = ctrl.selectedUser || '';
  if(ctrl.message.receiver_uid()){
    var user = options.users.filter(function(user){return user.uid === ctrl.message.receiver_uid()});
    ctrl.selectedUser = user[0].name;
  };
  ctrl.allMessages = options.messages;
  ctrl.message.sender_uid = options.studentInfo.uid;
  return m('section', [

    m('.modal.bottom-sheet#chat-modal', [
      m('.modal-content', [
        m('form', { onsubmit: ctrl.submit }, [
          m('.row', [
            m('.col.m6.s12.center-align', 'Message Student', [
              m('.message-box', [
                m('ul',[
                  options.messages.filter(ctrl.filter).map(function(message){
                    if( message.sender_uid === ctrl.message.sender_uid ) {               
                      return m('.col.s12', [
                        m('.col.s7.offset-s5.message#msgDarkColor', [
                          m('li.collection-item.valign', [
                            m('span.right', ctrl.tConvert(message.updated_at.slice(11, 16))),
                            m('span.left', message.body),
                          ])
                        ])
                      ])
                    } else {
                      return m('.col.s12', [
                        m('.col.s7.message#msgLightColor', [
                          m('li.collection-item.valign', [
                            m('span.right', ctrl.tConvert(message.updated_at.slice(11, 16))),
                            m('span.left', message.body),
                          ])
                        ])
                      ])
                    }
                  })
                ])
              ]),
            ]),
            m('.col.m6.s12.center-align.fuzzyStudent', [
              m('h6', ctrl.selectedUser || 'Select a User'),
              m('.fuzzyStudent.s12.m6', [              
                  m.component(Fuzzy, {
                  search: 'users',
                  onSelect: function (users) {
                    ctrl.filterMessages(users, options.studentInfo);
                  },
                  placeholder: 'Student',
                  optionView: function (users) {
                    return users.name;
                  }
                }),
              ]),
            ]),
              m('.row.input-field.col.s12.m6.fuzzyMessage', [
                // m('i.mdi-editor-mode-edit.prefix'),
                m('textarea#icon_prefix2.materialize-textarea', {
                  value: ctrl.message.body(),
                  onchange: m.withAttr('value', ctrl.message.body)
                }),
                m('label[for=icon_prefix2]', 'Message: ' + ctrl.selectedUser)
              ]),
              m('.submitMessage', [         
                m('.div.center-align', [
                  m('button.btn.waves-effect.waves-light', 'Send Message',[
                    m('i.mdi-content-send.right')
                  ])
                ]),
              ]),
            ])
        ])
      ])
    ])
  ]) //End Section
};