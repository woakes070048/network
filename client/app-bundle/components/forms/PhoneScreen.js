var m             = require('mithril');
var materialize   = require('../../../lib/materialize.js');
var Fuzzy         = require('../Fuzzysearch.js');

//Model
var Interview   = require('../../models/Interview.js');

exports.controller = function () {
  var ctrl = this;

  // Instantiate view-model
  ctrl.interview = Interview.vm();
  ctrl.interview.type = 'Phone Screen';
  ctrl.update = Interview.vmApp();

  // controller action
  ctrl.submit = function (e) {
    e.preventDefault();
    Interview.postInterview( ctrl.interview )
      .then(function () {
        Interview.updatePhase(ctrl.update);
      })
      .then(function () {
        ctrl.interview = Interview.vm();
        m.route('/profile');
      })
  };
};

exports.view = function (ctrl, options) {
  ctrl.interview.app_id = + options.app_id;
  ctrl.update.id        = + options.app_id;
  ctrl.update.phase     = 2;
  return m('.row', [
    m('.row', [
      m('a.btn[href=/profile]', { config: m.route }, 'Back to profile')
    ]),
    m('.row', [
      m('h3.center-align', 'Phone Screen')
    ]),
    m('form.col.s12', { onsubmit: ctrl.submit }, [
      m('.row.center-align',[
        m.component(Fuzzy, {
          search: 'contacts',
          onSelect: function (name) {
            ctrl.interview.contacts = name;
          },
          placeholder: 'Name of Interviewer',
          optionView: function (contacts) { 
            return contacts.name + "  -  " + contacts.phone_number + "  -  " + contacts.company_name
           },
           route: m('a.waves-effect.waves-light.btn[href=/contacts/' + options.app_id + ']', { config: m.route }, 'Add a Contact')
        }),
      ]),
      m('.row',
        m('h4.center-align', 'Date')
      ),
      m('.row.center-align', [
        m('.input-field.col.s12', [
          m('input[type=date][placeholder=Scheduled For]', {
            class: 'datepicker', 
            config: materialize.pickDates, 
            value: ctrl.interview.scheduled_on(),
            onchange: m.withAttr('value', ctrl.interview.scheduled_on)
          })
        ])
      ]),
      m('.row.center-align', [
        m('button.btn.waves-effect.waves-light', 'Submit',[
          m('i.mdi-content-send.right')
        ])
      ])
    ])
  ]);
};