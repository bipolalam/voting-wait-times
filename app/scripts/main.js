
// super secure....


// { "timestamp": "2016-03-05T00:00:00", "precinct": "1", "waittime": 2, "reporterid": "e3f99640d60577f72086b54087423593", "state": "GA"}
// function addEstimate(data, callback){
//   $.ajax({
//     type: 'POST',
//     url: dataSource,
//     data: data,
//     beforeSend: function(xhr){
//       xhr.setRequestHeader('Authorization', 'Basic '+basicAuthToken);
//       xhr.setRequestHeader('X-App-Token', appToken);
//     },
//     dataType: 'json'
//   }).then(callback);
// }

// function getTimes(data, callback){
//   $.ajax({
//     type: 'GET',
//     url: dataSource,
//     data: data,
//     beforeSend: function(xhr){
//       xhr.setRequestHeader('Authorization', 'Basic '+basicAuthToken);
//       xhr.setRequestHeader('X-App-Token', appToken);
//     },
//     dataType: 'json'
//   }).then(callback);
// }

// function getReporterID(email){
//   return md5(email);
// }


// $(document).ready(function(){

//   console.log("hello!");

//   addEstimate({
//     precinct: 55,
//     state: 'GA',
//     waittime: 3,
//     timestamp: new Date(),
//     reporterid: getReporterID('charles@rabidaudio.com')
//   }, function(res){
//     console.log("done", res);
//     getTimes({precinct: 55, state: 'GA'}, function(res){
//       console.log(res);
//     });
//   });

// });