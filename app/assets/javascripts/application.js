// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .
//
//= require highcharts
//= require highcharts/highcharts-more

$(function() {
  // Create the chart
  $('#container').highcharts({
    chart: {
      type: 'area',
      plotBorderWidth: 0,
      events: {
        load: function() {
          // set up the updating of the chart each second
          var series = this.series[0];
          setInterval(function() {
            var x = (new Date()).getTime(), // current time

            // Previous value +/- 10 max
            y = Math.round(series.data.slice(-1)[0]['y'] + (Math.random() * 10 * (Math.round(Math.random()) * 2 - 1)));
            if (y < 0) {
              y = -y
            }
            series.addPoint([x, y], true, true);
          }, 1000);
        }
      }
    },
    title: {
      text: 'Live random data'
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      gridLineWidth: 0.3,
      title: {text: ""}
    },
    plotOptions: {
      area: {
        fillOpacity: 0.35,
        states: {
          hover: {
            enabled: false
          }
        },
        marker: {
          enabled: true,
          symbol: 'circle',
          radius: 2
        }
      }
    },
    legend: { enabled: false },
    credits: { enabled: false },
    series: [{
      name: 'Random data',
      lineWidth: 2,
      data: (function() {
        // generate an array of random data
        var data = [], time = (new Date()).getTime(), i;
        var previous;
        for( i = -60; i <= 0; i+=1) {
          data.push([time + i * 1000, Math.round(Math.random() * 100)]);
        }
        return data;
      })()
    }]
  });
});
