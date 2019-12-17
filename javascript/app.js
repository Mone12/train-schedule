var firebaseConfig = {
  apiKey: "AIzaSyAfyQeVNLUg2QftaFXuWisdmVqimjY8KmU",
  authDomain: "train-fe5ab.firebaseapp.com",
  databaseURL: "https://train-fe5ab.firebaseio.com",
  projectId: "train-fe5ab",
  storageBucket: "train-fe5ab.appspot.com",
  messagingSenderId: "909209574160",
  appId: "1:909209574160:web:60f2f9f6d4eb6d301ca395",
  measurementId: "G-PZ9XBRLPF9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

$("#add-train").on("click", function() {
  event.preventDefault();

  // get the info from the form
  var trainName = $("#train-name").val();
  var trainDest = $("#destination").val();
  var firstTrain = $("#first-train").val();
  var trainFreq = $("#frequency").val();
  console.log(trainName, trainDest, firstTrain, trainFreq);

  // we create the object on the database

  db.ref().push({
    trainName: trainName,
    trainDest: trainDest,
    firstTrain: firstTrain,
    trainFreq: trainFreq
  });
});


///  read the db and show a table with all the trains

db.ref().on("child_added", function(snap) {

  //
  var key = snap.key
  var trainName = snap.val().trainName;
  var trainDest = snap.val().trainDest
  var firstTrain = snap.val().firstTrain
  var trainFreq = snap.val().trainFreq
  console.log(key, trainName, trainDest, firstTrain, trainFreq);


  // calculate next train and minutes away for every train in the database 
      // Assumptions
      var tFrequency = trainFreq

      // Time is 3:30 AM
      var firstTime = firstTrain
  
      // First Time (pushed back 1 year to make sure it comes before current time)
      var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
      //console.log(firstTimeConverted);
  
      // Current Time
      var currentTime = moment();
    //  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
     // console.log("DIFFERENCE IN TIME: " + diffTime);
  
      // Time apart (remainder)
      var tRemainder = diffTime % tFrequency;
     // console.log(tRemainder);
  
      // Minute Until Train
      var tMinutesTillTrain = tFrequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  
      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // create a html table with all the results
  // trainName  /  destination / frequency / nexttrain / minutes away 
  $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
  
});
