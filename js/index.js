var cloudy = "<div class=\"cloud2 small-cloud\"></div><div class=\"cloud2\"></div></div>",
  rainy = "<div class= \"cloud2\"></div><div class=\"rain\"></div></div>",
  thunder = "<div class= \"cloud2\"></div><div class=\"thunder\"><div class=\"bolt\"></div><div class=\"bolt\"></div></div></div>",
  clearSky = "<div class=\"rays\"><div class=\"ray\"></div><div class=\"ray\"></div><div class=\"ray\"></div><div class=\"ray\"></div></div><div class=\"sun\"></div></div>",
  drizzle = "<div class=\"cloud2\"></div><div class=\"drizzle\"></div></div>",
  snow = "<div class=\"cloud2\"></div><div class=\"snow\"><div class=\"flake\"></div><div class=\"flake\"></div><div class=\"flake\"></div><div class=\"flake\"></div></div>",
    extreme = "<div class=\"extreme text-center\"><div class=\"harsh-wind\"></div><div class=\"harsh-wind\"></div><div class=\"harsh-wind\"></div><div class=\"harsh-wind\"></div><div class=\"harsh-wind\"></div><div class=\"harsh-wind\"></div><div class=\"harsh-wind\"></div></div>",
    
  lat,
  lon,
  apiKey = "bdc2605d641073bc05c91883ee6c6fd5",
  api = "https://api.openweathermap.org/data/2.5/weather?lat=[lat]&lon=[lon]&appid=[appid]&callback=?",
  place,
  id,
  main,
  tempK,
  tempC,
  tempF,
  desc,
  items,
  icon,
  weatherStore = {
    2: {
      "icon": thunder,
      "main": "Thunder is roaring"
    },
    3: {
      "icon": drizzle,
      "main": "It's just a little rain"
    },
    5: {
      "icon": rainy,
      "main": "It's raining out there"
    },
    6: {
      "icon": snow,
      "main": "It's kinda white outside"
    },
    800: {
      "icon": clearSky,
      "main": "The sky is clear!!"
    },
    7: {
      "icon": "<div></div>",
      "main": "It's just"
    },
    8: {
      "icon": cloudy,
      "main": "Clouds are floating"
    },
    90: {
      "icon": extreme,
      "main": "It's too dangerous"
    },
    9: {
      "icon": "<div></div>",
      "main": "It's just"
    }
  },
  notSure = [
    "Probably",
    "May be",
    "More likely",
    "Perhaps",
    "May or may not",
    "<100% chance that"
  ];

/* Example json response

{"coord":{"lon":139,"lat":35},
"sys":{"country":"JP","sunrise":1369769524,"sunset":1369821049},
"weather":[{"id":804,"main":"clouds","description":"overcast clouds","icon":"04n"}],
"main":{"temp":289.5,"humidity":89,"pressure":1013,"temp_min":287.04,"temp_max":292.04},
"wind":{"speed":7.31,"deg":187.002},
"rain":{"3h":0},
"clouds":{"all":92},
"dt":1369824698,
"id":1851632,
"name":"Shuzenji",
"cod":200}
*/
function toKelvin() {
  $("#temp").text(tempK);
  document.getElementById("f").style.opacity = .2;
  document.getElementById("k").style.opacity = 1;
  document.getElementById("c").style.opacity = .2;
}

function toCelcius() {
  $("#temp").text(tempC);
  document.getElementById("f").style.opacity = .2;
  document.getElementById("k").style.opacity = .2;
  document.getElementById("c").style.opacity = 1;
}

function toFahrenheit() {
  $("#temp").text(tempF);
  document.getElementById("f").style.opacity = 1;
  document.getElementById("k").style.opacity = .2;
  document.getElementById("c").style.opacity = .2;
  //document.getElementbyId("f").style.opacity = 1;
}

function getItems(id) {
  if (id == 800) return weatherStore[id];
  else if (Math.round(id / 10) == 90) return weatherStore[Math.round(id / 10)];
  else return weatherStore[Math.round(id / 100)];
}

$(document).ready(function() {
  $.ajaxSetup({
    cache: false
  });
  console.log(Math.round(Math.random() * notSure.length));
  $("#probable").text(notSure[Math.round(Math.random() * notSure.length)]);
  getLocation();
})

function getLocation(){
  console.log("asd");
  $.getJSON("//ip-api.com/json", function(json){
    lat = Math.round(json.lat);
    lon = Math.round(json.lon);
    console.log(lat + " "+ lon );
    $("#loc").html(json.city+", "+json.country);
    getWeatherData();
  })
}
function getWeatherData() {
      api = api.replace("[lat]", lat).replace("[lon]", lon).replace("[appid]", apiKey);
      console.log(lat + " " + lon);
      console.log(api);
      $.getJSON(api, function(json) {
        id = json.weather[0].id;
        items = getItems(id);
        console.log(id);
        main = items.main;
        icon = items.icon;
        desc = json.weather[0].description;
        place = json.sys.country;
        tempK = Math.round(json.main.temp * 10) / 10;
        tempC = Math.round((tempK - 273) * 100) / 100;
        tempF = Math.round((tempC * 9 / 5 + 32) * 10) / 10;
        $("#main").text(main);
        $("#desc").text(desc);
        $("#icon_holder").html(icon);
        toCelcius();
      })
}