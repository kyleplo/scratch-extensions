var fullscreen = "exited";
var scratch = document.getElementById("scratch").style;
function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}
function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {if(document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled){
        return {status: 2, msg: "It works!"}}else{return {status: 0, msg: "Upgrade to a newer browser!"}}};
    };
    ext.enter = function (){
    fullscreen = "stage"
    scratch.top = "-33px";
    scratch.left = "-4px";
    scratch.width = "487px";
    scratch.height = "434px";
    launchIntoFullscreen(document.getElementById("scratch"))
    };
        ext.editor = function (){
        fullscreen = "editor"
    scratch.top = "0px";
    scratch.left = "0px";
    scratch.width = "100%";
    scratch.height = "100%";
    launchIntoFullscreen(document.getElementById("scratch"))
    };
            ext.exit = function (){
            fullscreen = "exited"
    scratch.top = "0px";
    scratch.left = "0px";
    scratch.width = "100%";
    scratch.height = "100%";
    exitFullscreen()
    };
            ext.getStatus = function (){
return fullscreen
    };
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            [' ','enter fullscreen stage','enter'],
            [' ','enter fullscreen editor','editor'],
            [' ','exit fullscreen','exit'],
            ['r','fullscreen status','getStatus'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Fullscreen', descriptor, ext);
})({});
