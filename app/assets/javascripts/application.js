//= require jquery
//= require jquery_ujs
//= require jquery.ui.all
//= require_tree .
//
//= require highcharts
//= require highcharts/highcharts-more

$(function() {
  // Create the chart
  chart = new Highcharts.Chart({
    chart: {
      renderTo: 'container',
      type: 'area',
      plotBorderWidth: 0
    },
    title: {
      text: 'Live random data received through SSE'
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
        // Initializing points 20 points to 0
        var datapoints = [], time = (new Date()).getTime(), i=-20;
        while(i <= 0) {
          // time is milliseconds, we display the last 20 sec points
          datapoints.push([(time + (i*1000)), 0]);
          i += 1;
        }
        return datapoints;
      })()
    }]
  });

  if (!!window.EventSource) {
    var source = new EventSource('/realtime-analytics');
    var date = new Date();

    // counter matches what you send in lib/realtime_analytics.rb
    source.addEventListener('FOOBAR', function(e) {
      x = (new Date().getTime());
      y = parseFloat(e.data)
      chart.series[0].addPoint([x, y], true, true);
      $("#last_received").html(y);
      $("#last_received").effect( "highlight", {}, 500 );
    }, false);

    source.addEventListener('message', function(e) {
      console.log(e.data);
    }, false);

    source.addEventListener('open', function(e) {
      console.log("SSE connection opened");
    }, false);

    source.addEventListener('error', function(e) {
      if (e.readyState == EventSource.CLOSED) {
        console.log("SSE connection closed");
      }
    }, false);
  } else {
    console.log("SSE not supported by your browser");
  }
});
