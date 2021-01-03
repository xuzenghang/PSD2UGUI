// date:2020/11/23
// author:lalala

#include "./ExportUtils.js"
#include "./OutputConfig.js"

// Main
// ============================================================
function main() {
    if (app.documents.length <= 0) {
        if (app.playbackDisplayDialogs != DialogModes.NO) {
            alert("当前没有打开任何psd文件")
        }
        return 'cancel'
    }

    logFile = null
    if (OUTPUT_SLICE_IMAGE_LOG) {
        logFile = File.saveDialog("选择效果图输出目录","*.txt")
        if (!logFile)
            return
    }

    var oriRulerUnits = app.preferences.rulerUnits;
    var oriTypeUnits = app.preferences.typeUnits;
    app.preferences.rulerUnits = Units.PIXELS;
    app.preferences.typeUnits = TypeUnits.PIXELS;
    initLogFile()
    initSaveOption()
    startTraverse()
    closeLogFile()
    
    app.preferences.rulerUnits = oriRulerUnits
    app.preferences.typeUnits = oriTypeUnits
    alert("导出结束")
}

function initLogFile() {
    if (logFile) {
        logFile.encoding = "UTF8"
        logFile.open("w", "TEXT", "????")
        addLogItem("\n" + new Date().toString())
    }
}

function initSaveOption() {

    docExportOptions = createExportOptions()
}

function closeLogFile() {
    if (logFile) {
        addLogItem("------------------end")
        logFile.close()
    }
}

function startTraverse() {
    var layers = activeDocument.layers
    activeDocument.activeLayer = layers[0]
    traverseLayers(layers)
}

function addLogItem(str) {
    if (logFile) {
        logFile.write(str + "\n")
    }
}

// Traverse Layers
// ======================================================================

function traverseLayers(layers) {
    for (var i = layers.length - 1; i >= 0; i--) {
        traverse(layers[i])
    }
}

function traverse(layer) {
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

    if (searchName(layer, KEY_RECT_SLICE)) {
        parseRectLayerSet(layer.layers)
    } else {
        traverseLayers(layer.layers)
    }
}

function parseArtLayer(layer) {
    if (layer.kind != LayerKind.TEXT) {
        exportImageLayer(layer)
    }
}

function parseRectLayerSet(layers) {
    var rectBounds = null
    for (var i = layers.length - 1; i >= 0; i--) {
        var layer = layers[i]
        if (layer.typename != "LayerSet" && searchName(layer, KEY_RECT_SLICE)) {
            rectBounds = layer.bounds
            break
        }
    }
    if (!rectBounds) {
        alert("格式错误，限定范围切割的分组底下要有一个表示范围的图层，命名要带有" + KEY_RECT_SLICE)
        return
    }

    for (var i = layers.length - 1; i >= 0; i--) {
        var layer = layers[i]
        if (layer.typename != "LayerSet" && !searchName(layer, KEY_RECT_SLICE) && layer.kind != LayerKind.TEXT) {
            exportImageLayer(layer, rectBounds)
        }
    }
}


// Export Layer
// =========================================================

function exportImageLayer(layer, rectBounds) {
    actLayerToNewDoc(layer)
    saveCutImage(layer, rectBounds)
}

function saveCutImage(layer, rectBounds) {
    var path = ATLAS_PATH
    var is9Slice = false
    var isOverride = searchName(layer, KEY_OVERRIDE)

    if (searchName(layer, KEY_RAW_IMAGE)) {
        path = Texture_PATH
    } else if (searchName(layer, KEY_ART_FONT)) {
        path = ArtFont_PATH
    } else {
        path = ATLAS_PATH
        is9Slice = (searchName(layer, KEY_9_SLICE))
    }

    var imgName = layer.name
    var findIndex = layer.name.search(KEY_SIGN)
    if (findIndex != -1) {
        imgName = layer.name.substr(0, findIndex)
    }
    
    var nameList = imgName.split(":")
    var folderName = nameList[0]
    var resName = nameList[1]

    var folderPath = path + "/" + folderName
    var folder = new Folder(folderPath)
    if (!folder.exists) {
        addLogItem("==== 创建文件夹：" + folderPath)
        folder.create()
    }

    var file = new File(path + "/" + folderName + "/" + resName + docExportOptions.resSuffix);
    if (!file.exists || isOverride) {
        if (file.exists) {
            addLogItem("==== 覆盖旧资源: " + resName + "     |目录: " + folderPath)
        } else {
            addLogItem("==== 添加新资源: " + resName + "     |目录: " + folderPath)
        }

        if (is9Slice) {
            sliceImage(layer)
        } else {
            if (rectBounds != null) {
                trimDocByRect(activeDocument, rectBounds)
            } else {
                activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true)
            }
        }
        makeDocPOT(activeDocument)
        activeDocument.exportDocument(file, ExportType.SAVEFORWEB, docExportOptions)
    } else {
        addLogItem("==== 资源已存在: " + resName + "     |目录: " + folderPath)
    }
    activeDocument.close(SaveOptions.DONOTSAVECHANGES)
}

function sliceImage(layer) {
    var doc = activeDocument
    doc.trim(TrimType.TRANSPARENT,true,true,true,true)

    var layerName = layer.name
    layerName = layerName.replace(KEY_9_SLICE, "@9s")
    var re = /\s*@9s(\:\d+)+/g
    var matchResult = layerName.match(re)
    var getStr = ""
    if (matchResult) {
        getStr = matchResult[0]
    } else {
        alert("图层名为：" + layer.name + "的九宫格格式不对！应为" + KEY_9_SLICE + ":XX或:XX:XX:XX:XX")
        return
    }

    var paddingList = null
    var nums = getStr.split(":")
    if (nums.length == 2) {
        var num = parseInt(nums[1])
        paddingList = [num, num, num, num]
    } else if (nums.length == 5) {
        paddingList = [0, 0, 0, 0]
        for (var i = 1; i < 5; i++) {
            var num = parseInt(nums[i])
            paddingList[i-1] = num
        }
    } else {
        alert("图层名为：" + layer.name + "的九宫格格式不对！应为" + KEY_9_SLICE + ":XX或:XX:XX:XX:XX")
        return
    }

    var topPadding = paddingList[0]
    var bottomPadding = paddingList[1]
    var leftPadding = paddingList[2]
    var rightPadding = paddingList[3]
    var width = doc.width.value
    var height = doc.height.value

    if (leftPadding > 0 || rightPadding > 0) {
        var rightBounds = width - rightPadding
        if (leftPadding >= rightBounds) {
            alert("图层名为：" + layer.name + "的九宫格数据错误！左切割线超过了右切割线")
            return
        }
        var region = Array([leftPadding, 0], [rightBounds, 0], [rightBounds, height], [leftPadding, height])
        doc.selection.select(region)
        doc.selection.clear()
        doc.selection.deselect()
        if (rightPadding > 0) {
            var region = Array([rightBounds, 0], [width, 0], [width, height], [rightBounds, height])
            doc.selection.select(region)
            doc.selection.translate(leftPadding - rightBounds)
            doc.selection.deselect()
        }
    }
    if (topPadding > 0 || bottomPadding > 0) {
        var bottomBounds = height - bottomPadding
        if (topPadding >= bottomBounds) {
            alert("图层名为：" + layer.name + "的九宫格数据错误！下切割线超过了上切割线")
            return
        }
        var region = Array([0, topPadding], [width, topPadding], [width, bottomBounds], [0, bottomBounds])
        doc.selection.select(region)
        doc.selection.clear()
        doc.selection.deselect()
        if (bottomPadding > 0) {
            var region = Array([0, bottomBounds], [width, bottomBounds], [width, height], [0, height])
            doc.selection.select(region)
            doc.selection.translate(0, topPadding - bottomBounds)
            doc.selection.deselect()
        }
    }

    doc.trim(TrimType.TRANSPARENT,true,true,true,true)
}

// =========================================================

function actLayerToNewDoc(layer) {
    activeDocument.activeLayer = layer;

    var desc143 = new ActionDescriptor();
        var ref73 = new ActionReference();
        ref73.putClass( charIDToTypeID('Dcmn') );
    desc143.putReference( charIDToTypeID('null'), ref73 );
    desc143.putString( charIDToTypeID('Nm  '), activeDocument.activeLayer.name );
        var ref74 = new ActionReference();
        ref74.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    desc143.putReference( charIDToTypeID('Usng'), ref74 );
    executeAction( charIDToTypeID('Mk  '), desc143, DialogModes.NO );
}

main()
