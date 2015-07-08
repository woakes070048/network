var m = require('mithril');
var h = require('highcharts');
var Graph = require('../models/Graph.js');

exports.controller = function () {
  var ctrl = this;
  ctrl.fetchAll = Graph.fetchAll().then(function(appData) {
    ctrl.graphOptions = graphOptions(appData);
  })
}

exports.plotter = function(ctrl) { // config class
    return function(elem , isin) {
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
        m("p",console.log(JSON.stringify(ctrl.fetchAll))),
        ]),
    ])
};

function graphOptions (graphData) {
  return {
        chart: {
            type: 'funnel',
            marginRight: 100
        },
        title: {
            text: 'Job Search Tracker',
            x: -50
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b> ({point.y:,.0f})',
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                    softConnector: true
                },
                neckWidth: '30%',
                neckHeight: '25%'

                //-- Other available options
                // height: pixels or percent
                // width: pixels or percent
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Students',
            data: [
                ['Applications Submitted',  graphData.submitted],
                ['Phones Screens',       graphData.phoneScreens],
                ['Onsite Interviews', graphData.interviews],
                ['Offers',    graphData.offers],
                ['Accepted Offers',    graphData.acceptedOffers]
            ]
        }],
        // tooltip: {
        //         formatter: function() {
        //                  return 'Branch: <b>'+ this.series.name +
        //                     '</b><br/>Date: '+ Highcharts.dateFormat('%e %b',this.x)+
        //                         '</b><br/>Pass rate: '+ this.y +'%';
        //                      //     '</b><br/>Pass count: '+  this.point.options.passCount+
        //                      // '</b><br/>Total count: '+  this.point.options.totalCount;
        //         }
        //     },
    }
}
