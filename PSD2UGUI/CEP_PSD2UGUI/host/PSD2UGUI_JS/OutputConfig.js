

#include "../SettingUtils.js"

var settingCfg = settingUtils.getSettingOptions();


// 图集所在路径
ATLAS_PATH = settingCfg.resPath +"/atlas"
// Texture所在路径
Texture_PATH = settingCfg.resPath +"/texture"
// 艺术字图片所在路径
ArtFont_PATH = settingCfg.resPath +"/artFonts"


// 输出切图时是否输出日志
OUTPUT_SLICE_IMAGE_LOG = settingCfg.isOutputLog


// *********************************************************
KEY_SIGN = "@"
// 图层关键词
// KEY_IMAGE       = KEY_SIGN + "image"    // Sprite 图片
KEY_RAW_IMAGE   = KEY_SIGN + "raw"      // Texture 散图
KEY_ART_FONT    = KEY_SIGN + "art"      // 艺术字资源图片
KEY_9_SLICE     = KEY_SIGN + "9s"       // 九宫格切图
KEY_OVERRIDE    = KEY_SIGN + "new"      // 覆盖图片旧资源
// 分组关键词
KEY_RECT_SLICE  = KEY_SIGN + "rect"     // 限定范围切图
KEY_BUTTON      = KEY_SIGN + "btn"      // 按钮

