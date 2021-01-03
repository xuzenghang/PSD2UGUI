var settingUtils = {
    customOptionsStr: app.stringIDToTypeID( "PSD2UGUI" ),
    //layout根目录位置

    kLayoutPath :app.stringIDToTypeID( "rootPathLayout" ),
    //图集根目录
    kResPath :app.stringIDToTypeID( "rootResPath" ),
    //格式
    kResFormat :app.stringIDToTypeID( "resFormat" ),
    //质量
    kResQuality :app.stringIDToTypeID( "resQuality" ),
    //资源导出是否包含透明度为0的区域
    kResIncludeTransparency :app.stringIDToTypeID( "resIncludeTranspaenty" ),
    //是否输出日志
    kOutputLog :app.stringIDToTypeID( "outputLog" ),

    //四种格式，需要与设置界面对应上
    resFormatsIndex2Obj : [
        SaveDocumentType.JPEG,
        SaveDocumentType.PNG,
        SaveDocumentType.PNG,
        SaveDocumentType.BMP
    
    ],
    resFormatSuffix :[
        ".jpg",
        ".png",
        ".png",
        ".bmp",
    ],
    resFormats :{
        JPEG:  0,
        PNG8:  1,
        PNG24: 2,
        BMP:   3,
    },


    getSettingOptions : function()
    {
        var d = null;                                                                                                                                                      
        try {
            d = app.getCustomOptions(settingUtils.customOptionsStr);

        }
        catch(e) {
            d = new ActionDescriptor;
            d.putString(settingUtils.kLayoutPath,"");
            d.putString(settingUtils.kResPath,"");
            d.putInteger(settingUtils.kResFormat,settingUtils.resFormats.PNG24);
            d.putInteger(settingUtils.kResQuality,100);
            d.putBoolean(settingUtils.kResIncludeTransparency,false);
            d.putBoolean(settingUtils.kOutputLog,true)

        }
        var otherOptions = new Object();
        otherOptions.layoutPath = d.getString(settingUtils.kLayoutPath);
        otherOptions.resPath = d.getString(settingUtils.kResPath);
        otherOptions.resFormat = d.getInteger(settingUtils.kResFormat);
        otherOptions.resQuality = d.getInteger(settingUtils.kResQuality);
        otherOptions.includeTransparency = d.getBoolean(settingUtils.kResIncludeTransparency);
        otherOptions.isOutputLog = d.getBoolean(settingUtils.kOutputLog);
        return otherOptions;
    },
    
    saveSettingOptions : function(otherOptions){
        d = new ActionDescriptor;
        d.putString(settingUtils.kLayoutPath,otherOptions.layoutPath);
        d.putString(settingUtils.kResPath,otherOptions.resPath);
        d.putInteger(settingUtils.kResFormat,otherOptions.resFormat);
        d.putInteger(settingUtils.kResQuality,otherOptions.resQuality);
        d.putBoolean(settingUtils.kResIncludeTransparency,otherOptions.includeTransparency);
        d.putBoolean(settingUtils.kOutputLog,otherOptions.isOutputLog );
    
        app.putCustomOptions(settingUtils.customOptionsStr,d,true);

    },
    createExportOptions : function()
    {
        var settingCfg = settingUtils.getSettingOptions();
    
        var exportOptions = new ExportOptionsSaveForWeb;
        exportOptions.format = settingUtils.resFormatsIndex2Obj[settingCfg.resFormat];
        exportOptions.transparency = settingCfg.includeTransparency;
        exportOptions.quality = settingCfg.resQuality;
        exportOptions.PNG8 = settingCfg.resFormat == settingUtils.resFormats.PNG8;

        exportOptions.resSuffix  = settingUtils.resFormatSuffix[settingCfg.resFormat];
        return exportOptions;
        
    }
}


