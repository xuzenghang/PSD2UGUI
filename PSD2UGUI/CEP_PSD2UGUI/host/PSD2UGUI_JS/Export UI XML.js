// date:2020/11/23
// author:lalala


#include "./ExportUtils.js"
#include "./OutputConfig.js"

// Main
// ============================================================

var labelCount = 0
var btnCount = 0

main()

function main() {
    if (app.documents.length <= 0) {
        if (app.playbackDisplayDialogs != DialogModes.NO) {
            alert("当前没有打开任何psd文件")
        }
        return 'cancel'
    }

    saveFile = File.saveDialog("选择导出目录","*.layout")
    if (!saveFile)
        return

    var oriRulerUnits = app.preferences.rulerUnits
    var oriTypeUnits = app.preferences.typeUnits;
    app.preferences.rulerUnits = Units.PIXELS;
    app.preferences.typeUnits = TypeUnits.PIXELS;

    initSaveFile()
    startTraverse()
    writeSaveFile()

    app.preferences.rulerUnits = oriRulerUnits
    app.preferences.typeUnits = oriTypeUnits
}

function initSaveFile() {
    duppedPsd = app.activeDocument.duplicate()

    WIDTH = duppedPsd.width
    HEIGHT = duppedPsd.height

    saveFile.encoding = "UTF8"
    saveFile.open("w", "TEXT", "????")
}

function startTraverse() {
    xmlTxt = "<?xml version=\"1.0\" encoding=\"utf-8\"?>" + "\n"
    xmlTxt += "<Layout>" + "\n"

    xmlTxt += formatTypeNode("Node", "root")
        + formatAnchorPoint()
        + formatProperty("ContentSize","{"+ getNumInUnitValue(WIDTH) + ","+ getNumInUnitValue(HEIGHT) + "}")

    traverseLayers(duppedPsd.layers)

    xmlTxt += formatNodeEnd()
    xmlTxt += "</Layout>"
}

function writeSaveFile() {
    duppedPsd.close(SaveOptions.DONOTSAVECHANGES)
    saveFile.write(xmlTxt)

    if (saveFile.error) {
        alert("导出失败"+ saveFile.error)
    } else {
        alert("导出成功")
        exportReferencePicture(app.activeDocument, saveFile.path)
    }
    saveFile.close()
}

// Traverse Layers
// ======================================================================

function traverseLayers(layers) {
    addPrefixSpaceNum()
    for (var i = layers.length - 1; i >= 0; i--) {
        traverse(layers[i])
    }
    reducePrefixSpaceNum()
}

function traverse(layer) {
    if (!checkIsValid(layer))
        return

    modifyName(layer)

    if (layer.typename == "LayerSet") {
        parseLayerSet(layer)
    } else {
        parseArtLayer(layer)
    }
}

function parseLayerSet(layer) {
    if (typeof(layer.layers) == "undefined" || layer.layers.length <= 0)
        return

    if (searchName(layer, KEY_BUTTON)) {
        exportBtn(layer)
    } else {
        xmlTxt += formatTypeNode("Node", "node_" + layer.name)
            + formatAnchorPoint(layer)
            + formatPosition(layer)

        traverseLayers(layer.layers)

        xmlTxt += formatNodeEnd()
    }
}

function parseArtLayer(layer) {
    if (layer.kind == LayerKind.TEXT) {
        exportText(layer)
    } else {
        exportImage(layer)
    }
}

// Export Layer
// =========================================================

function exportImage(layer) {
    xmlTxt += parseImageLayer(layer)
}

function exportText(layer) {
    if (layer.textItem.contents.length == 0)
        return

    xmlTxt += parseTextLayer(layer)
}

function exportBtn(btnLayer) {
    var btnTxt = ""
    var childTxt = ""
    var layers = btnLayer.layers
    var mainSpriteLayer = null

    btnTxt += formatTypeNode("Button", "autoBtn_" + (++btnCount))
        + formatAnchorPoint(btnLayer)

    for (var i = layers.length - 1; i >= 0; i--) {
        var layer = layers[i]
        modifyName(layer)

        // 暂不处理btn下的layerSet
        // 以第一张图片作为底
        if (layer.typename != "LayerSet") {
            if (!mainSpriteLayer && layer.kind != LayerKind.TEXT) {
                mainSpriteLayer = layer
                btnTxt += formatContentSize(layer)
                    + formatPosition(layer)
                    + formatImage(layer)
                    + formatImageType(layer)
                    + formatOpacity(layer)
            } else {
                addPrefixSpaceNum()
                if (layer.kind == LayerKind.TEXT) {
                    childTxt += parseTextLayer(layer)
                } else {
                    childTxt += parseImageLayer(layer)
                }
                reducePrefixSpaceNum()
            }
        }
    }

    xmlTxt += btnTxt + childTxt + formatNodeEnd()
}


// ========================================

function parseTextLayer(layer) {
    var text = ""
    text += formatTypeNode("Text", "autoLbl_" + (++labelCount))
        + formatAnchorPoint(layer)
        + formatContentSize(layer)
        + formatPosition(layer)
        + formatOpacity(layer)
        + formatTextContent(layer)
        + formatTextColor(layer)
        + formatFontSize(layer)
        + formatNodeEnd()

    return text
}

function parseImageLayer(layer) {
    var text = ""
    var typeName = "Image"

    if (searchName(layer, KEY_RAW_IMAGE)) {
        typeName = "RawImage"
    } else if (searchName(layer, KEY_ART_FONT)) {
        typeName = "ArtFont"
    } else {
        typeName = "Image"
    }

    text += formatTypeNode(typeName, layer.name)
        + formatAnchorPoint(layer)
        + formatContentSize(layer)
        + formatPosition(layer)
        + formatImage(layer)
        + formatImageType(layer)
        + formatOpacity(layer)
        + formatNodeEnd()

    return text
}

