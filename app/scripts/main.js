
// super secure....


// { "timestamp": "2016-03-05T00:00:00", "precinct": "1", "waittime": 2, "reporterid": "e3f99640d60577f72086b54087423593", "state": "GA"}
function addEstimate(precinctnum, state, email, waittime, callback){
  $.ajax({
    type: 'POST',
    url: '/waittimes',
    data: {
      precinct: precinctnum,
      state: state,
      reporterid: md5(email),
      waittime: waittime,
      timestamp: new Date().toISOString()
    },
    dataType: 'json'
  }).then(callback);
}

function getTimes(precinctnum, state, callback){
  $.ajax({
    type: 'GET',
    url: '/waittimes',
    data: {
      where: 'precinct = '+precinctnum+' AND state = \''+state+'\''
    },
    dataType: 'json'
  }).then(callback);
}



// function getReporterID(email){
//   return md5(email);
// }


$(document).ready(function(){

  console.log("hello!");

  addEstimate(55, 'GA', 'charles@rabidaudio.com', 4, function(res){
    console.log("done", res);
    getTimes(55, 'GA', function(res){
      console.log(res);
    });
  });
});