# PSD2UGUI

PSD2UGUI是一个从Photoshop的psd格式文档到Unity UGUI的UI生成插件；只要psd的图层命名遵循一定命名规范,即可实现UI的自动生成及图层资源的批量自动导出。

实现方式是通过解析psd；保留图层的层级、父子关系，生成xml文档，在Unity解析XML并生成UI组件。插件在Unity端的导入插件只是C#代码和编辑器扩展，在Photoshop基于Adobe的CEP通用扩展平台，支持该最小版本为CC 2014, 请尽量使用最新版本。





