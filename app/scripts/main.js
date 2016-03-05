

//http://stackoverflow.com/a/3855394
(function($) {
    $.QueryString = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);


var state = $.QueryString['state'];
var precinct = $.QueryString['precinct'];


// { "timestamp": "2016-03-05T00:00:00", "precinct": "1", "waittime": 2, "reporterid": "e3f99640d60577f72086b54087423593", "state": "GA"}
function addEstimate(precinctnum, state, email, waittime, callback){
  $.ajax({
    method: 'POST',
    url: '/waittimes',
    data: JSON.stringify({
      precinct: precinctnum,
      state: state,
      reporterid: md5(email),
      waittime: waittime,
      timestamp: new Date().toISOString()
    }),
    contentType: 'application/json',
    dataType: 'json',
    success: null
  }).then(callback);
}

function getTime(precinctnum, state, callback){
  $.ajax({
    method: 'GET',
    url: '/waittimes',
    data: {
      where: 'precinct = '+precinctnum+' AND state = \''+state+'\'',
      order: 'timestamp',
      limit: 1
    },
    dataType: 'json'
  }).then(callback);
}


var waitTimeMap = [
  "None",
  "Short",
  "Medium",
  "Long"
];

function drawTime() {

    console.log("updating...");

    getTime(precinct, state, function(res){

      console.log("got data", res);

      $('.precinct-name').text(state + " Precinct "+precinct);

      if(res[0]){
        $('.wait-time').text(waitTimeMap[res[0].waittime]);

        $('.last-updated').text(new Date(res[0].timestamp).toRelativeString());
      }else{
        $('.wait-time').text("Unknown");

        $('.last-updated').text("Never");
      }
    });
}



$(document).ready(function(){

  // console.log("hello!");

  drawTime();
  setInterval(drawTime, 10*1000);



  // addEstimate(55, 'GA', 'charles@rabidaudio.com', 4, function(res){
  //   console.log("done", res);
  //   getTimes(55, 'GA', function(res){
  //     console.log(res);
  //   });
  // });
});