(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: "It works!"}};
    };
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            ['w', 'open data for project %n','open',10080213],
            ['r','current value of ☁ %s','value','Tera'],
            ['r','last user to set ☁ %s','lastuser','Tera'],
            ['-'],
            ['r','data entries','entries'],
            ['r','%m.entryThing of entry %n','entry','value','1'],
            ['r','%m.varEntryThing of entry %n of ☁ %s','varentry','value','3','Tera']
        ],
      menus: {entryThing: ["☁ variable","user","value"],varEntryThing: ["user","value"]},
    };

    // Register the extension
    ScratchExtensions.register('Cloud Extension', descriptor, ext);
})({});
