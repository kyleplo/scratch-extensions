(function(ext) {
var api = "aab139c61fbf24b217e91606a398a3df";
var zip = "02203";
var data = {"weather":[{"main":"Unknown","description":"Loading or error"}],"main":{"temp":0,"humidity":0},"wind":{"speed":0},"clouds":{"all":0}};
var arrived = false;
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
return {status: 2, msg: "Extension Forecast: Working! (lol)"}
    };
ext.setzip = function (z){zip = z};
ext.request = function (){fetch("http://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",us&appid=" + api).then(function (j){return j.json()}).then(function (j){data = j;arrived = true}).catch(function (e){alert("Error fetching weather: " + e)})};
ext.when = function (){if(arrived){arrived = false;return true}else{return false};};
ext.summary = function (){return data.weather[0].main};
ext.desc = function (){return data.weather[0].description};
ext.humidity = function (){return data.main.humidity};
ext.temp = function (type){
if(type === "kelvin"){return data.main.temp};
if(type === "fahrenheit"){return ((data.main.temp-273.15)*1.8)+32};
if(type === "celsius"){return data.main.temp-273.15};
if(type === "text"){
var f = ((data.main.temp-273.15)*1.8)+32;
if(f < 10){return "very cold"};
if(f < 32){return "cold"};
if(f < 42){return "a bit cold"};
if(f < 55){return "medium"};
if(f < 65){return "a bit warm"};
if(f < 75){return "a bit hot"};
if(f < 95){return "hot"};
return "very hot";
}
};
ext.wind = function (type){
if(type === "meters per second"){return data.wind.speed};
if(type === "miles per hour"){return (data.wind.speed * 3600 / 1610.3*1000)/1000};
if(type === "text"){var m = (data.wind.speed * 3600 / 1610.3*1000)/1000;
if(m < 5){return "very slow"};
if(m < 8){return "slow"};
if(m < 15){return "a bit slow"};
if(m < 20){return "a bit fast"};
if(m < 25){return "fast"};
return "very fast"
};
};
ext.clouds = function (){return data.clouds.all};
ext.getzip = function (call){
fetch("http://ipinfo.io/json").then(function (j){return j.json()}).then(function (j){var z = j.postal.toString();if(z.length === 4){call("0" + z)}else{call(z)}}).catch(function (e){alert("Error fetching zip code: " + e)})
};
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            [' ', 'set zip code to %s', 'setzip','02203'],
            ['R','get zip code based on IP','getzip'],
            [' ','request weather','request'],
            ['-'],
            ['h','when weather data arrives','when'],
            ['r','summary','summary'],
            ['r','temp in %m.type','temp','fahrenheit'],
            ['r','weather description','desc'],
            ['r','humidity','humidity'],
            ['r','wind speed in %m.wind','wind','miles per hour'],
            ['r','cloudiness percent','clouds']
        ],
      menus: {type: ["fahrenheit","celsius","kelvin","text"],wind: ["miles per hour","meters per second","text"]},
 
    };

    // Register the extension
    ScratchExtensions.register('Kyleplo Weather', descriptor, ext);
})({});
