(function(ext) {
var blocks = [];
var alpha = "abcdefghijklmnopqrstuvwxyz";
var blockcount = 0;
var types = {'stack':' ','reporter':'r','reporter wait':'R','stack wait':'w','boolean wait':'b','crazy weird':null};
load(false);
function load(hasloaded){
if(hasloaded){ScratchExtensions.unregister('Custom JS Blocks')};
    ext._shutdown = function() {};
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
ext.createBlock = function (type,text,code){blocks.push({code: code, codename: alpha[blockcount],block: [types[type],text,alpha[blockcount]]});blockcount++;load(true)};
    var descriptor = {
        blocks: [
     [null,'create block type %m.type text %s function %s','createBlock','reporter','%n + %n','return a + b;'],
        ],
menus: {type: ["stack","reporter","reporter wait","stack wait","boolean wait","crazy weird"]}
    };
for(var i = 0;i < blocks.length;i++){descriptor.blocks.push(blocks[i].block);eval('ext.'+alpha[i]+' = function (a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z){'+blocks[i].code+'}')};
    ScratchExtensions.register('Custom JS Blocks', descriptor, ext)}
})({});
