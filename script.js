//object array with CSUN locatation and coordinates as key-value pairs
var CSUNLocations = {
  "Police Services": {
    location: [
      34.23889493240613,
      34.23860184919006,
      -118.5330768755649,
      -118.53355290003682
    ]
  },
  "Jacaranda Hall": {
    location: [
      34.24147544364222,
      34.241039981257934,
      -118.52783813253617,
      -118.5294498709312
    ]
  },
  "Seirra Park/Quad": {
    location: [
      34.23909704413167,
      34.237926733444205,
      -118.52895271201386,
      -118.52964456459969
    ]
  },
  "CSUN KLOTZ Health Centre": {
    location: [
      34.238337253239855,
      34.23798412384744,
      -118.52578895463883,
      -118.52666776795301
    ]
  },
  "Art and Design Center": {
    location: [
      34.24369674984461,
      34.24282828195642,
      -118.52934665987618,
      -118.53037588625598
    ]
  }
};

var message = "";
var map;
var locations = Object.keys(CSUNLocations);
var currQuestionIndex = 0;
var correctAnswers = 0;

var theTimer = document.querySelector(".timer");
var timerInterval;
var isTimerRunning = false;
var minute,
  second,
  ms,
  value = 0;
var highscoresArray = [];

var currLocationPrompt = locations[currQuestionIndex];
document.querySelector(".prompt").innerHTML = currLocationPrompt;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.239708841228264, lng: -118.53008526364081 },
    zoom: 16.7,
    disableDoubleClickZoom: false,
    scrollwheel: false,
    draggable: false,
    clickableIcons: false,
    disableDefaultUI: true,
    gestureHandling: "none",
    styles: [
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#ebe3cd"
          }
        ]
      },
      {
        elementType: "labels",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#523735"
          }
        ]
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#f5f1e6"
          }
        ]
      },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#c9b2a6"
          }
        ]
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#dcd2be"
          }
        ]
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#ae9e90"
          }
        ]
      },
      {
        featureType: "administrative.neighborhood",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [
          {
            color: "#dfd2ae"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            color: "#dfd2ae"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#93817c"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#a5b076"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#447530"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            color: "#f5f1e6"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "labels",
        stylers: [
          {
            visibility: "on"
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          {
            color: "#fdfcf8"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#f8c967"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#e9bc62"
          }
        ]
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [
          {
            color: "#e98d58"
          }
        ]
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#db8555"
          }
        ]
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#806b63"
          }
        ]
      },
      {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [
          {
            color: "#dfd2ae"
          }
        ]
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#8f7d77"
          }
        ]
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#ebe3cd"
          }
        ]
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [
          {
            color: "#dfd2ae"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#b9d3c2"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#92998d"
          }
        ]
      }
    ]
  });

  // function for when user double clicks on map
  map.addListener("dblclick", function(mapsMouseEvent) {
    // start timer
    if (!isTimerRunning) {
      startTimer();
    }

    // get clicked location
    var selectedLat = mapsMouseEvent.latLng.lat();
    var selectedLng = mapsMouseEvent.latLng.lng();
    var clickedLocation = [selectedLat, selectedLng];

    if (currQuestionIndex < locations.length) {
      checkAnswer(CSUNLocations[currLocationPrompt].location, clickedLocation);

      // show next location prompt
      currQuestionIndex++;

      // update prompt
      currLocationPrompt = locations[currQuestionIndex];
      document.querySelector(".prompt").innerHTML = currLocationPrompt || "";
    }
    // when all questions answered: stop timer, show score, and show notification message
    if (currQuestionIndex == locations.length) {
      stopTimer();
      showScore();
      document.querySelector("h2").style.display = "none";
      notificationMessage();
    }
  });
}

// ***TIMER FUNCTIONS***

// Add leading zero to numbers uptill 9
function leadingZero(time) {
  return time < 10 ? "0" + time : time;
}

// Run a standard minute/second/hundredths timer:
function timer() {
  let currentTime =
    leadingZero(minute) + ":" + leadingZero(second) + ":" + leadingZero(ms);
  theTimer.innerHTML = currentTime;
  value++;

  minute = Math.floor(value / 100 / 60);
  second = Math.floor(value / 100 - minute * 60);
  ms = Math.floor(value - second * 100 - minute * 6000);
}

// Start the timer:
function startTimer() {
  isTimerRunning = true;
  timerInterval = setInterval(timer, 10);
}

// Stop timer
function stopTimer() {
  minute, second, ms, (value = 0);
  clearInterval(timerInterval);
  timerInterval = null;
  isTimerRunning = false;
}

// Dispay final score
function showScore() {
  var score = document.getElementById("score");
  score.innerHTML = "Final score - " + correctAnswers + "/" + locations.length;
}

// updates notifications based on number of correct answers
function notificationMessage() {
  $("#notification").addClass("show"); // adds a show class to the HTML notification element
  var notificationText = "You'll need help getting places at campus! 😞 ";
  if (correctAnswers == 3) {
    notificationText = "Pretty good map skills! 🙂 ";
  }
  if (correctAnswers == 4) {
    notificationText = "You're really good at this! 😊 ";
  }
  if (correctAnswers == 5) {
    notificationText = "Great Job, you don't need a map at Campus! 😉 ";
  }
  $("#notification #desc").text(notificationText);
}

//   check if selected location is inside original location
function checkAnswer(location, point) {
  var isAnswerCorrect = isWithinBounds(location, point);
  var selectedLocation = locations[currQuestionIndex];
  if (isAnswerCorrect) {
    highlightLocation(location, true);
    updateResponses(currQuestionIndex, true);
    correctAnswers++;
  } else {
    highlightLocation(location, false);
    updateResponses(currQuestionIndex, false);
  }
}

function isWithinBounds(locs, point) {
  if (
    point[0] <= locs[0] &&
    point[0] >= locs[1] &&
    point[1] <= locs[2] &&
    point[1] >= locs[3]
  )
    return true;
  else return false;
}

//   display list of correct/incorrect responses
function updateResponses(index, isAnswerCorrect) {
  if (index < locations.length) {
    var text = `${locations[index]}   ${isAnswerCorrect ? "✅" : "❌"}`;
    var node = document.createElement("li");
    node.appendChild(document.createTextNode(text));
    document.querySelector("ul").appendChild(node);
  }
}

//  highlight location based on whether the response is correct or incorrect
function highlightLocation(location, isAnswerCorrect) {
  var seaGreen = "#82CEC9";
  var scarletRed = "#E74A37";
  if (isAnswerCorrect) {
    var library = new google.maps.Rectangle({
      strokeColor: seaGreen,
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: seaGreen,
      fillOpacity: 0.5,
      map: map,
      bounds: {
        north: location[0],
        south: location[1],
        east: location[2],
        west: location[3]
      }
    });
  } else {
    var library = new google.maps.Rectangle({
      strokeColor: scarletRed,
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: scarletRed,
      fillOpacity: 0.5,
      map: map,
      bounds: {
        north: location[0],
        south: location[1],
        east: location[2],
        west: location[3]
      }
    });
  }
}

window.onload = initMap;
