
var csInterface = new CSInterface();



function init()
{
    extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION);
    csInterface.evalScript('onActive("' + extensionRoot + '")',function(result){

    });
}

var setBtn = document.querySelector("#setting-button");
setBtn.addEventListener("click",function()
{

    csInterface.evalScript("setFormat()",function(result){
    });
});


var layoutBtn = document.querySelector("#layout-button");

layoutBtn.addEventListener("click",function ()
{
    csInterface.evalScript("exprtLayout()",function(result){
    });
});

var layerBtn = document.querySelector("#layer-button");
layerBtn.addEventListener("click",function ()
{
    csInterface.evalScript("exportLayer()");
});



// var selectedLayerBtn = document.querySelector("#selectedLayer-button");
// selectedLayerBtn.addEventListener("click",function ()
// {   
//     window.location.href="index2.html";
//     csInterface.evalScript("exportSelectedLayer()");
// });

