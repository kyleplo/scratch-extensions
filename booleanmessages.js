(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
    var bool = false;
    var trig = {"message1":false}
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: "It works!"};};
    };
    ext.when = function(b) {
    if(bool === b){return false}else{var o = b;bool = b;return o;}
    };
    ext.con = function () {return true;}
    ext.forif = function (b,i){if(b){i();}}
    ext.trig = function (m){trig[m] = true;setTimeout(function (){trig[m] = false},500)}
    ext.wtrig = function (m,c){setInterval(function (){if(trig[m]){c();}},500)}
    ext.btrig = function (m,c){c(trig[m])}
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            ['h','when %b','when'],
            ['h','constantly','con'],
            ['-'],
            ['c','forever if %b','forif'],
            ['-'],
            [' ','trigger %m.broadcast','trig','message1'],
            ['W','wait for trigger %m.broadcast','wtrig','message1'],
            ['-'],
            ['b','%m.broadcast triggered?','btrig','message1']
        ],
      url: "https://github.com/kyleplo/scratch-extensions/wiki/Advanced-Text-to-Speech"
    };

    // Register the extension
    ScratchExtensions.register('Advanced Boolean Messages', descriptor, ext);
})({});
