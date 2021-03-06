var m         = require('mithril');
var h         = require('highcharts');
var Graph     = require('../models/Graph.js');

exports.controller = function () {
	var ctrl = this;

	ctrl.fetchAll = Graph.fetchAll().then(function(appData) {
    ctrl.graphOptions = graphOptions(appData);
  })
};

exports.plotter = function(ctrl) { 
  return function(elem,isin) {
    if(!isin) {
      ctrl.graphOptions.chart.renderTo = elem
      var chart = new Highcharts.Chart(ctrl.graphOptions);
    }
  };
};

exports.view = function(ctrl) { // view
  return  m("html", [
    m("body", [
      m("#plot[style=height:400px]", {config: exports.plotter(ctrl)}),
    ])
  ])
};

function graphOptions(graphData) {
	return {
		chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    credits: {
      enabled: false
    },
    title: {
      text: 'Student Job Search Progress'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
          }
        }
      }
    },
    series: [{
      name: "Student Progress",
      colorByPoint: true,
      data: [{
        name: "HIRED",
        y: 56.33
      }, {
        name: "ON TRACK",
        y: 24.03,
        sliced: true,
        selected: true
      }, {
        name: "BEHIND",
        y: 10.38
      }, {
        name: " DANGER ZONE",
        y: 4.77
      }]
    }]
  }
}