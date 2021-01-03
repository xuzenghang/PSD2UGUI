

function onActive(path)
{
    extensionRoot = path;
}


function setFormat(path)
{   

    var executeJS = extensionRoot  + "/host/Setting.js";
    // var executeJS = "./setting.js"
    $.evalFile(executeJS);    
}

function exprtLayout()
{   
    var executeJS = extensionRoot  + "/host/PSD2UGUI_JS/Export UI XML.js";
    // var executeJS = "./setting.js"
    $.evalFile(executeJS);    
}

function exportLayer()
{
    var executeJS = extensionRoot  + "/host/PSD2UGUI_JS/Export Image.js";
    // var executeJS = "./setting.js"
    $.evalFile(executeJS);    
}

// function exportSelectedLayer()
// {   
//     // executeJS = TOOL_DIR + "/ExportSelectLayer.js";
//     // $.evalFile(executeJS);

// }