$(document).ready(function() {
  var events = [];
  
  // event listener for save button click
  $(".saveBtn").on("click", function() {
    // get nearby values
    var value = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");
    var dateAdded = moment().format("dddd, MMMM Do");

// add data into events array
    events.push({description: value, time: time, date: dateAdded});

    // save the value in localStorage as time
    localStorage.setItem("events", JSON.stringify(events));
    console.log("events" + JSON.stringify(events));
    
  });

  function updateColorWorkHour() {
    // get current hour from moment response
    var currentHour = moment().hours();
console.log("current Hour: " +currentHour);
    // loop over time blocks
    $(".time-block").each(function() {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

     //change the color block color to gray-past class if it is in the past
      if(currentHour > blockHour) {
        $(this).addClass("past");
      }
       //change the color block color to pink - present class if it is in present

      else if(currentHour === blockHour) {
        $(this).removeClass("past");
        $(this).addClass("present");
      }
      // else
       //change the color block color to green - future class if it is in future
       else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
      
    });
  }

  updateColorWorkHour();

  // set up interval to check if current work hour to
  // run ColorWorkHour function every 5 seconds
  var secondsLeft =5;

// set time function
  function setTime() {
    setInterval(function() {
      secondsLeft--;
  
      if(secondsLeft === 0) {
        updateColorWorkHour();
        secondsLeft = 5;
      }
    }, 1000);
  }

  // call setTimw
  setTime();

  // describe a new fresh date
  var currentDay = moment().format("dddd, MMMM Do");
  for(var i = 0; i < events.length; i++) {
    if(currentDay.isAfter(events[i].date)) {
      events[i].description = "";
      events[i].time = "";
      events[i].date = "";
      events.length = 0;
    }
  }

  // load from localStorage
  var storedEvents = JSON.parse(localStorage.getItem("events"));

  if (storedEvents !== null) {
    events = storedEvents;
  }

  for(var i = 0; i < events.length; i++) {
    var userDescription = events[i].description;
    $("#" + events[i].time).children(".description").text(userDescription);
  }


  // display current day on page
  $("#currentDay").text(moment().format("dddd, MMMM Do"));
});
