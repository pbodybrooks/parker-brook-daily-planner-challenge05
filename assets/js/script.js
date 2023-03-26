
// Globals
//const  = document.querySelector()
// create an array of the time blocks, 9AM to 5PM
// let timeBlockContainer = $(".time-block");
// console.log(timeBlockContainer[1]);

$(document).ready(function () {
  let timeBlockContainer = $(".time-block");

  // Display the date and time, refresh it every second.
  let dateTimeRefresh = setInterval(function() {
    let unixTimestamp = dayjs().unix();
    let dateTime = dayjs.unix(unixTimestamp).format('MMM D, YYYY, hh:mm:ss a');
    $('#currentDay').text(dateTime);
  }, 1000);

  
  // show current hour as a single 2-digit number in 24-hour time
  $(".time-block").each(function() {
    let unixTimestamp = dayjs().unix();
    let currentHour = dayjs.unix(unixTimestamp).format('HH');
    // grab time block time (via ID), then split it and return only the second word
    let timeBlockHour = $(this).attr("id").split("-")[1];
    // parse both hour variables so we can numerically compare them later
    currentHour = parseInt(currentHour);
    timeBlockHour = parseInt(timeBlockHour);
    // console log to confirm both values are returned for each block
    console.log("Current hour: " + currentHour + "   ||  Time Block hour: " + timeBlockHour);

    // now use an if statement to compare current and time block hours which we will use to set the color
    if (timeBlockHour < currentHour){
      $(this).addClass("past")
      $(this).removeClass("present")
      $(this).removeClass("future")
    }
    else if (timeBlockHour > currentHour){
      $(this).addClass("future")
      $(this).removeClass("present")
      $(this).removeClass("past")
    }
    else {
      $(this).addClass("present")
      $(this).removeClass("future")
      $(this).removeClass("past")
    }
  })


  

  $(".saveBtn").on("click",function () {
    // per the hint, we want to grab the ID of the time block upon which save was clicked, which is the parent of the button
    let enteredTime = $(this).parent().attr("id");
    // console log it to confirm its been found
    console.log(enteredTime);
    // now we grab the text/event the user entered - the sibling of the button with class "description"
    let enteredEvent = $(this).siblings(".description").val();
    // console.log confirms both values we need are grabbed
    console.log(enteredEvent);
    // set values into local storage
    localStorage.setItem(enteredTime, enteredEvent);
  })
 
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?


  
  // TODO: Add code to display the current date in the header of the page.
});
