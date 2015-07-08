var m         = require('mithril');
var h         = require('highcharts');
var Graph = require('../models/Graph.js');

exports.controller = function () {
	var ctrl = this;

	ctrl.fetchAll = Graph.fetchAll().then(function(appData) {
    	ctrl.graphOptions = graphOptions(appData);
    	console.log('SP')
  })
};

exports.plotter = function(ctrl) { // config class
    return function(elem,isin) {
        if(!isin) {
          // m.startComputation();
          // console.log(Highcharts)
          ctrl.graphOptions.chart.renderTo = elem
          console.log("Using options:", ctrl.graphOptions)
          var chart = new Highcharts.Chart(ctrl.graphOptions);
          // m.endComputation();
        }
    };
};

exports.view = function(ctrl) { // view
    return  m("html", [ m("body", [
        m("#plot[style=height:400px]", {config: exports.plotter(ctrl)}), console.log(ctrl),
        m("p", console.log(JSON.stringify(ctrl.fetchAll))),
        ]),
    ])
};

function graphOptions(graphData) {
	return {
		// console.log('in graphOptions SP')
		chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
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