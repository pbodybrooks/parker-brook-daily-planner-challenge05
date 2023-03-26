// nothing will run until the the DOM is ready and the page is loaded
$(document).ready(function () {
  let timeBlockContainer = $(".time-block");

  // display the date and time, refresh it every second.
  let dateTimeRefresh = setInterval(function() {
    // get the unix timestamp
    let unixTimestamp = dayjs().unix();
    // use the unix timestamp to get the date and time in the shown format
    let dateTime = dayjs.unix(unixTimestamp).format('MMM D, YYYY, hh:mm:ss a');
    // show the date and time on screen
    $('#currentDay').text(dateTime);
    // re-run every 1000ms
  }, 1000);

  
  // the below function will set the color of each time block according to whether it is in the past, present, or future
  $(".time-block").each(function() {
    // same method as above to get unix timestamp
    let unixTimestamp = dayjs().unix();
    // this time, i want the time as a simple 2-digit hour value in 24-hr time
    let currentHour = dayjs.unix(unixTimestamp).format('HH');
    // grab time block time (via ID), then split it by "-" and return only the second word ([1])
    let timeBlockHour = $(this).attr("id").split("-")[1];
    // parse both hour variables (currently strings) so i can numerically compare them later
    currentHour = parseInt(currentHour);
    timeBlockHour = parseInt(timeBlockHour);
    // console log to confirm both values are returned for each block
    console.log("Current hour: " + currentHour + "   ||  Time Block hour: " + timeBlockHour);

    // now use an if statement to compare current and time block hours which i will use to set the color
    // add/remove the three classes depending on whether its the past/present/future
    if (timeBlockHour < currentHour){
      $(this).addClass("past");
      $(this).removeClass("present");
      $(this).removeClass("future");
      // the save buttons for the past should be greyed out because no one is going to schedule something in the past...
      $(this).children(".btn").removeClass("saveBtn");
      $(this).children(".btn").addClass("saveBtnPast");
    }
    else if (timeBlockHour > currentHour){
      $(this).addClass("future");
      $(this).removeClass("present");
      $(this).removeClass("past");
    }
    else {
      $(this).addClass("present");
      $(this).removeClass("future");
      $(this).removeClass("past");
    }
  })

  // loop through each of the time blocks, getting anything that was saved to local storage
  $(".time-block").each(function() {
    // set the value of each description field (child of each time block) from local storage using the id (ex. hour-9)
    $(this).children(".description").val(localStorage.getItem($(this).attr("id")));
  })

  // here i have my function to listen for a click and run code that saves entries to local storage
  $(".saveBtn").on("click", function () {
    // per the hint, i want to grab the ID of the time block upon which 'save' was clicked, which is the parent of the button
    let enteredTime = $(this).parent().attr("id");
    // now i grab the text/event the user entered - the sibling of the button with class "description"
    let enteredEvent = $(this).siblings(".description").val();
    // console.log confirms both values i need are grabbed
    console.log("Entered time: " + enteredTime + "  ||  Entered event: " + enteredEvent);
    // set values into local storage
    localStorage.setItem(enteredTime, enteredEvent);
  })
});

// i wanted to be able to clear the schedule so this clears local storage and refreshes page
$("#clearSchedule").on("click", function() {
  localStorage.clear();
  location.reload();
})
