(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: "It works!"};
    };
ext.exists = function (e,c){c(ScratchExtensions.getStatus(e).status > 0)};
ext.ready = function (e,c){c(ScratchExtensions.getStatus(e).status === 2)};
ext.status = function (e){return ScratchExtensions.getStatus(e).msg};
ext.forceStop = function (e){ScratchExtensions.stop(e)};

ext.getReporter = function (r,e,a,s,d,f){return ScratchExtensions.getReporter(e,r,[a,s,d,f])};
ext.asyncReporter = function (r,e,a,s,d,f,c){c(ScratchExtensions.getReporterAsync(e,r,[a,s,d,f],-1))};
ext.asyncCommand = function (r,e,a,s,d,f,c){c(ScratchExtensions.runAsync(e,r,[a,s,d,f],-1))};
ext.runCommand = function (r,e,a,s,d,f){ScratchExtensions.runCommand(e,r,[a,s,d,f])};

ext.devices = function (c){c(ScratchExtension.canAccessDevice())};
ext.version = function (c){if(ScratchExtension.canAccessDevice()){ScratchDeviceHost.version(function (v){c(v)})}else{c("unaccessable")}}
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            ['b', 'extension %s exists?', 'exists','AnyExtension Runner'],
            ['b','extension %s is ready?','ready','AnyExtension Runner'],
            ['r','extension %s status','status','AnyExtension Runner'],
            [' ','force %s @stop','forceStop','AnyExtension Runner'],
            ['-'],
            ['r','reporter %s in %s with params %s %s %s %s','getReporter','status','AnyExtension Runner','AnyExtension Runner'],
            ['R','async reporter %s in %s with params %s %s %s %s','asyncReporter'],
            ['w','async command %s in %s with params %s %s %s %s','asyncCommand'],
            [' ', 'command %s in %s with params %s %s %s %s', 'runCommand','forceStop','AnyExtension Runner','AnyExtension Runner'],
            ['-']
            ['b', 'devices enabled?', 'devices'],
            ['R', 'devices plugin version', 'version'],
        ],
      url: "https://github.com/kyleplo/scratch-extensions/wiki/AnyExtension-Runner"
    };

    // Register the extension
    ScratchExtensions.register('AnyExtension Runner', descriptor, ext);
})({});
