



var spaceNum = 0
var prefixStr = ""
var spaceStr = "    "

function addPrefixSpaceNum() {
    spaceNum += 1
    resetPrefixStr()
}
function reducePrefixSpaceNum() {
    spaceNum -= 1
    resetPrefixStr()
}
function resetPrefixStr() {
    prefixStr = ""
    for (var i = 0; i < spaceNum; i++) {
        prefixStr += spaceStr
    }
}

function searchName(layer, keyStr) {
    return layer.name.search(keyStr) >= 0
}

// =================================== Format ========================

function formatTypeNode(type, name) {
    return prefixStr + "<Node Type=\"" + type + "\" Name=\"" + name + "\" >" + "\n"
}

function formatProperty(name, value) {
    return prefixStr + spaceStr + "<Property Name=\"" + name + "\" Value=\"" + value + "\" \/>" + "\n"
}

function formatNodeEnd() {
    return prefixStr + "</Node>" + "\n"
}

function formatAnchorPoint(layer) {
    var anchorX = 0.5
    var anchorY = 0.5
    return formatProperty("AnchorPoint", "{" + anchorX + "," + anchorY + "}")
}

function formatPosition(layer) {
    // bounds [0,1,2,3] 分别是 0:左侧左边距 ，1:顶侧顶边距 ，2:右侧左边距 ，3:底侧顶边距
    var bounds = layer.bounds
    var posX = (bounds[0] + bounds[2]) / 2
    var posY = HEIGHT - ((bounds[1] + bounds[3]) / 2)

    return formatProperty("Position", "{" + getNumInUnitValue(posX) + "," + getNumInUnitValue(posY) + "}")
}

function formatLocalPosition(layer) {
    var bounds = layer.bounds
    var posX = (bounds[0] + bounds[2]) / 2
    var posY = HEIGHT - ((bounds[1] + bounds[3]) / 2)

    if (layer.parent.typename == "LayerSet") {
        var bounds = layer.parent.bounds
        var parPosX = (bounds[0] + bounds[2]) / 2
        var parPosY = HEIGHT - ((bounds[1] + bounds[3]) / 2)
        posX -= parPosX
        posY -= parPosY
    }
    return formatProperty("LocalPosition", "{" + posX + "," + posY + "}")
}

function formatContentSize(layer) {
    var bounds = layer.bounds
    var width = makeNumPOT(bounds[2] - bounds[0])
    var height = makeNumPOT(bounds[3] - bounds[1])

    return formatProperty("ContentSize", "{" + getNumInUnitValue(width) + "," + getNumInUnitValue(height) + "}")
}

function formatImage(layer) {
    var name = layer.name
    var findIndex = layer.name.search(KEY_SIGN)
    if (findIndex != -1) {
        name = layer.name.substr(0, findIndex)
    }

    var list = name.split(":")
    return formatProperty("Image", formatUIPath(list[0], list[1]))
}

function formatImageType(layer) {
    if (searchName(layer, KEY_RAW_IMAGE)) {
        return ""
    }

    if (searchName(layer, KEY_9_SLICE)) {
        return formatProperty("ImageType", "Sliced")
    } else {
        return formatProperty("ImageType", "Simple")
    }
}

function formatOpacity(layer) {
    var opacity = layer.opacity
    if (opacity < 100) {
        var opa = Math.ceil(255 / 100 * opacity)
        return formatProperty("Opacity", opa.toString())
    }

    return ""
}

function formatUIPath(atlasName, spriteName) {
    // return "Assets/Res/UI/NewUI/texture/ui_menu/" + atlasName + "/" + spriteName
    return atlasName + "/" + spriteName
}

function formatFontSize(layer) {
    if (layer.textItem) {
        return formatProperty("FontSize", Math.ceil(layer.textItem.size.value))
    }
    return ""
}

function formatTextColor(layer) {
    if (layer.textItem) {
        return formatProperty("TextColor", "FF" + layer.textItem.color.rgb.hexValue)
    }
    return ""
}

function formatTextContent(layer) {
    if (layer.textItem) {
        return formatProperty("TextContent", layer.textItem.contents)
    }
    return ""
}


// ===========================================================

function createExportOptions() {
    var exportOptions = new ExportOptionsSaveForWeb
    exportOptions.format = SaveDocumentType.PNG
    exportOptions.transparency = true
    exportOptions.quality = 100
    exportOptions.PNG8 = false
    return exportOptions
}

function exportReferencePicture(doc, path) {
    var exportOptions = createExportOptions()
    var imageName = doc.name.replace(".psd", ".png")
    var pngImage = new File(path + "/" + imageName)
    doc.exportDocument(pngImage, ExportType.SAVEFORWEB, exportOptions)
}

function checkIsValid(layer) {
    if (layer.visible == false)
        return false

    return true
}

function getNumInUnitValue(uValue) {
    // var list = uValue.toString().split(" ")
    // if (list.length >= 2) {
    //     return list[0]
    // }
    // return 0
    return uValue.value
}

function makeNumPOT(num) {
    var extra = num % 2
    return extra +　num 
}

function makeDocPOT(doc) {
    if (typeof(doc) == "undefined") {
        alert("doc type is undefined")
        return
    }

    var width = makeNumPOT(doc.width)
    var height = makeNumPOT(doc.height)
    doc.resizeCanvas(width, height, AnchorPosition.MIDDLECENTER)
}

function modifyName(layer) {
    if (typeof(layer) == "undefined") {
        return
    }

    var name = layer.name.replace("：",":")
    if (layer.kind != LayerKind.TEXT) {
        name = name.replace(" ","")
        name = name.replace("拷贝","")
        name = name.replace("副本","")
    }
    
    layer.name = name
}

// ===================================================================

function trimDocByRect(doc, rectBounds) {
    if (!rectBounds || rectBounds.length < 4)
        return

    hideAllLayers(doc)

    var newLayer = createNewLayer(doc)
    doc.activeLayer = newLayer
    
    // 0:左侧左边距 ，1:顶侧顶边距, 2:右侧左边距 ，3:底侧顶边距
    var left = rectBounds[0]
    var top = rectBounds[1]
    var right = rectBounds[2]
    var bottom = rectBounds[3]
    var solidColor = new SolidColor()
    solidColor.rgb.hexValue = "ffffff"

    // 注：ps的坐标是以左上为原点
    // 左上，右上，右下，左下的坐标
    var region = Array([left, top], [right, top], [right, bottom], [left, bottom])
    doc.selection.select(region)
    doc.selection.fill(solidColor)
    doc.selection.deselect()

    doc.trim(TrimType.TRANSPARENT,true,true,true,true)
    newLayer.remove()
    showAllLayers(doc)
}

function hideAllLayers(doc) {
    var layers = doc.layers
    var length = doc.layers.length
    for (var i = 0; i < length; i++) {
        layers[i].visible = false
    }
}

function showAllLayers(doc) {
    var layers = doc.layers
    var length = doc.layers.length
    for (var i = 0; i < length; i++) {
        layers[i].visible = true
    }
}

function createNewLayer(doc) {
    return doc.artLayers.add()
}



