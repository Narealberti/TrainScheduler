
	 var config = {
		apiKey: "AIzaSyA9VpGW7AWQYrKFqOJW-9mVZIzpiFw8Dlk",
		authDomain: "train-b5204.firebaseapp.com",
		databaseURL: "https://train-b5204.firebaseio.com",
		projectId: "train-b5204",
		storageBucket: "",
		messagingSenderId: "611197038517"
	  };

	  firebase.initializeApp(config);

	  var database = firebase.database();

	  var trainName ; 
	  var destination ; 
	  var time ;
	  var frequency ; 
	  var nextArrival ;
	  var minutesAway ; 
	  var keyArray = []; 

	  function timeDisplay() {
	  	var timeNow = moment().format("HH:mm:ss"); 
	  	$(".timeNow").html(timeNow)
	  }; 

	  setInterval(timeDisplay, 1000); 




	$("#click-button").on("click", function(event) {
	  	event.preventDefault();

	   trainNameInput = $("#name").val().trim();
	   	console.log("trainName " + trainName); 
	   destination = $("#destination").val().trim();
	   	console.log("destination " + destination); 
	   time = $("#time").val().trim();
	   	console.log("first train " + time); 
	   frequency = $("#frequency").val().trim();
	   	console.log("frequency " + frequency);

	    currentTime = moment().format("HH:mm"); 
	    	console.log("currentTime " + currentTime); 
	  	var timeConvert = moment(time, "HH:mm").subtract(1, "years");  
	  		console.log(timeConvert); 
	  	var timeDiff = moment().diff(moment(timeConvert), 'minutes'); 
	  		console.log("timeDiff " + timeDiff); 
	  	var remainder = timeDiff % frequency; 
	  		console.log("remainder " + remainder); 
	  	minutesAway = frequency - remainder; 
	  		console.log("minutes away " + minutesAway); 
	  	nextArrival = moment().add(minutesAway, "m").format("hh:mm A"); 
	  		console.log("nextArrival " + nextArrival); 
	 	 
		//pushes object with values taken from form to firbace under the child called trains
	    database.ref().child("trains").push({
	      trainName : trainNameInput,
	      destination : destination,
	      time : time,
	      frequency : frequency,
	      nextArrival: nextArrival,
	      minutesAway: minutesAway
	    });


      $("#name").val(""); 
      $("#destination").val(""); 
      $("#time").val(""); 
      $("#frequency").val(""); 

    
	}); 

	//event listener wich waits for something to be added to the child called trains 
	//when that happens the function is executed
	database.ref().child("trains").on("child_added", function(snapshot) {
  		console.log("this is the snapshot: " + snapshot)
  		console.log(snapshot.val())
  		//dont put words in front of object arrays or else it will return [object Object]

  	  var key = snapshot.key; 
  	  	keyArray.push(key); 
  	  	console.log(keyArray); 

  	  //this gives you the key to the entire object
  	  //you have to use "key" it is a firebase built in to refer to the object number 
  	  	console.log("key" + key); 

  	  var button = $("<button>"); 
	   button.append("Trash"); 
	   button.attr("removeBtn", key); 
	   button.addClass("buttons glyphicon glyphicon-trash"); 
  	   console.log(button)

	  var row = $("<tr>");
	   row.attr("id", key); 
	   	console.log(row); 
	   row.append("<td>" +  snapshot.val().trainName + "</td>"); 
	   row.append("<td>" +  snapshot.val().destination + "</td>");
	   row.append("<td>" +  snapshot.val().time + "</td>");
	   row.append("<td>" +  snapshot.val().frequency + "</td>");
	   row.append("<td>" +  snapshot.val().nextArrival + "</td>");
	   row.append("<td>" +  snapshot.val().minutesAway + "</td>");

	   var emptyTd = $("<td>"); 
	   var buttonTd = emptyTd.append(button); 
	   row.append(buttonTd); 

	   $("#trains").prepend(row);

	   
	});

	$(document.body).on("click", ".buttons", function() {
		var trainRemove = $(this).attr("removeBtn");
			console.log("trainRemove" + trainRemove); 
		database.ref().child("trains").child(trainRemove).remove(); 
		location.reload(); 
	});



