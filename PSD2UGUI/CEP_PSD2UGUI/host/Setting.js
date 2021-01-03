
#include "./SettingUtils.js"

// DIALOG
// ======
var dialog = new Window("dialog"); 
    dialog.text = "设置"; 
    dialog.orientation = "column"; 
    dialog.alignChildren = ["left","top"]; 
    dialog.spacing = 10; 
    dialog.margins = 16; 

// GROUP1
// ======
var group1 = dialog.add("group", undefined, {name: "group1"}); 
    group1.orientation = "row"; 
    group1.alignChildren = ["left","center"]; 
    group1.spacing = 10; 
    group1.margins = 0; 
    group1.alignment = ["left","top"]; 

// GRPSECONDLINE
// =============
var grpSecondLine = group1.add("group", undefined, {name: "grpSecondLine"}); 
    grpSecondLine.orientation = "column"; 
    grpSecondLine.alignChildren = ["left","center"]; 
    grpSecondLine.spacing = 3; 
    grpSecondLine.margins = 0; 
    grpSecondLine.alignment = ["left","center"]; 

var layoutText = grpSecondLine.add("statictext", undefined, undefined, {name: "layoutText"}); 
    layoutText.text = "layout主目录："; 

// LAYOUTGROUUP
// ============
var layoutGrouup = grpSecondLine.add("group", undefined, {name: "layoutGrouup"}); 
    layoutGrouup.orientation = "row"; 
    layoutGrouup.alignChildren = ["left","center"]; 
    layoutGrouup.spacing = 10; 
    layoutGrouup.margins = 0; 

var editTextLayoutPath = layoutGrouup.add('edittext {properties: {name: "editTextLayoutPath"}}'); 
    editTextLayoutPath.preferredSize.width = 200; 
    editTextLayoutPath.alignment = ["left","bottom"]; 

var setLayoutPathBtn = layoutGrouup.add("button", undefined, undefined, {name: "setLayoutPathBtn"}); 
    setLayoutPathBtn.text = "浏览"; 

// GRPSECONDLINE
// =============
var layoutText1 = grpSecondLine.add("statictext", undefined, undefined, {name: "layoutText1"}); 
    layoutText1.text = "图集输出主目录："; 

// LAYOUTGROUUP1
// =============
var layoutGrouup1 = grpSecondLine.add("group", undefined, {name: "layoutGrouup1"}); 
    layoutGrouup1.orientation = "row"; 
    layoutGrouup1.alignChildren = ["left","center"]; 
    layoutGrouup1.spacing = 10; 
    layoutGrouup1.margins = 0; 

var editTextResPath = layoutGrouup1.add('edittext {properties: {name: "editTextResPath"}}'); 
    editTextResPath.preferredSize.width = 200; 
    editTextResPath.alignment = ["left","bottom"]; 

var setResBtn = layoutGrouup1.add("button", undefined, undefined, {name: "setResBtn"}); 
    setResBtn.text = "浏览"; 

// GROUP2
// ======
var group2 = dialog.add("panel", undefined, undefined, {name: "group2"}); 
    group2.text = "导出设置"; 
    group2.orientation = "column"; 
    group2.alignChildren = ["left","top"]; 
    group2.spacing = 13; 
    group2.margins = 10; 

var statictext1 = group2.add("statictext", undefined, undefined, {name: "statictext1"}); 

// FORMATPANEL
// ===========
var formatPanel = group2.add("panel", undefined, undefined, {name: "formatPanel"}); 
    formatPanel.text = "格式"; 
    formatPanel.preferredSize.width = 180; 
    formatPanel.orientation = "row"; 
    formatPanel.alignChildren = ["left","top"]; 
    formatPanel.spacing = 15; 
    formatPanel.margins = 17; 

var radioButton_JPEG = formatPanel.add("radiobutton", undefined, undefined, {name: "radioButton_JPEG"}); 
    radioButton_JPEG.text = "JPEG"; 

var radioButton_PNG8 = formatPanel.add("radiobutton", undefined, undefined, {name: "radioButton_PNG8"}); 
    radioButton_PNG8.text = "PNG-8"; 

var radioButton_PNG24 = formatPanel.add("radiobutton", undefined, undefined, {name: "radioButton_PNG24"}); 
    radioButton_PNG24.text = "PNG-24"; 
    radioButton_PNG24.value = true; 

var radioButton_BMP = formatPanel.add("radiobutton", undefined, undefined, {name: "radioButton_BMP"}); 
    radioButton_BMP.text = "BMP"; 


// GROUP2
// ======
var group2 = dialog.add("group", undefined, {name: "group2"}); 
    group2.orientation = "row"; 
    group2.alignChildren = ["center","center"]; 
    group2.spacing = 9; 
    group2.margins = 0; 
    group2.alignment = ["center","top"]; 

var statictext2 = group2.add("statictext", undefined, undefined, {name: "statictext2"}); 
    statictext2.text = "品质："; 

var qualitySlideBar = group2.add("slider", undefined, undefined, undefined, undefined, {name: "qualitySlideBar"}); 
    qualitySlideBar.minvalue = 0; 
    qualitySlideBar.maxvalue = 100; 
    qualitySlideBar.value = 50; 
    qualitySlideBar.preferredSize.width = 150; 

var editQuality = group2.add('edittext {properties: {name: "editQuality"}}'); 
    editQuality.preferredSize.width = 30; 

// GROUP3
// ======
var group3 = dialog.add("group", undefined, {name: "group3"}); 
    group3.orientation = "row"; 
    group3.alignChildren = ["left","center"]; 
    group3.spacing = 11; 
    group3.margins = 0; 
    group3.alignment = ["center","top"]; 

var statictext3 = group3.add("statictext", undefined, undefined, {name: "statictext3"}); 
    statictext3.text = "包含透明区域："; 

var includeTranCheckBtn = group3.add("checkbox", undefined, undefined, {name: "includeTranCheckBtn"}); 
    includeTranCheckBtn.value = true; 
    includeTranCheckBtn.preferredSize.width = 100; 
    includeTranCheckBtn.preferredSize.height = 15; 

// GROUP4
// ======
var group4 = dialog.add("group", undefined, {name: "group4"}); 
    group4.orientation = "row"; 
    group4.alignChildren = ["left","center"]; 
    group4.spacing = 11; 
    group4.margins = 0; 
    group4.alignment = ["center","top"]; 

var statictext4 = group4.add("statictext", undefined, undefined, {name: "statictext4"}); 
    statictext4.text = "导出图层是否输出日志："; 

var showLogCheckBtn = group4.add("checkbox", undefined, undefined, {name: "showLogCheckBtn"}); 
    showLogCheckBtn.value = true; 
    showLogCheckBtn.preferredSize.width = 100; 
    showLogCheckBtn.preferredSize.height = 15; 

// GROUP5
// ======
var group5 = dialog.add("group", undefined, {name: "group5"}); 
    group5.orientation = "row"; 
    group5.alignChildren = ["center","center"]; 
    group5.spacing = 10; 
    group5.margins = 0; 
    group5.alignment = ["center","top"]; 

var cancelBtn = group5.add("button", undefined, undefined, {name: "cancelBtn"}); 
    cancelBtn.text = "取消"; 

var sureBtn = group5.add("button", undefined, undefined, {name: "sureBtn"}); 
    sureBtn.text = "保存"; 


var otherOptions = settingUtils.getSettingOptions();

var resFormats = settingUtils.resFormats;

radioButton_JPEG.onClick = function(){
    otherOptions.resFormat = resFormats.JPEG;
}

radioButton_PNG8.onClick = function(){
    otherOptions.resFormat = resFormats.PNG8;
}

radioButton_PNG24.onClick = function(){
    otherOptions.resFormat = resFormats.PNG24;
}

radioButton_BMP.onClick = function(){
    otherOptions.resFormat = resFormats.BMP;
}

formatPanel.children[otherOptions.resFormat].value = true;


qualitySlideBar.onChange = function()
{
    var value = Math.round(qualitySlideBar.value);
    editQuality.text = value;
    qualitySlideBar.value = value;
    otherOptions.resQuality = value;
}
qualitySlideBar.value = otherOptions.resQuality;
editQuality.text = otherOptions.resQuality;

editTextLayoutPath.text = otherOptions.layoutPath;
setLayoutPathBtn.onClick = function(){

    var selFoloder = Folder.selectDialog("选择目录");
    var path = new String(selFoloder.fsName).replace(/\\/g,"/");
    editTextLayoutPath.text = path;
    otherOptions.layoutPath = path;
} 

editTextResPath.text = otherOptions.resPath;
setResBtn.onClick = function(){


    var selFoloder = Folder.selectDialog("选择目录");
    var path = new String(selFoloder.fsName).replace(/\\/g,"/");
    editTextResPath.text = path;
    otherOptions.resPath = path;
} 

includeTranCheckBtn.value = otherOptions.includeTransparency;
showLogCheckBtn.value = otherOptions.isOutputLog;



cancelBtn.onClick = function(){

    dialog.close(); 
} 
sureBtn.onClick = function(){
    

    otherOptions.includeTransparency = includeTranCheckBtn.value;
    otherOptions.isOutputLog = showLogCheckBtn.value;
    settingUtils.saveSettingOptions(otherOptions);
    dialog.close(); 

} 


dialog.show();
