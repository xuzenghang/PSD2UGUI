
using UnityEngine;
using UnityEditor;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Xml.Linq;
using UnityEngine.UI;

namespace PSD2UGUI {

    class ImportPSDUtils {
        public static int UIRootWidth = 0;
        public static int UIRootHeight = 0;
        public static string AtlasFolderPath = "Assets/Res/UI/NewUI/texture/ui_menu/";
        public static string ArtFontFolderPath = "Assets/Res/UI/NewUI/texture/ui_menu/";
        public static string TextureFolderPath = "Assets/Res/UI/NewUI/texture/ui_other/";
        public static Font defaultFont = AssetDatabase.LoadAssetAtPath("Assets/Res/Fonts/font_content2.TTF", typeof(Font)) as Font;

        public static PSDNode ParseUIItem(XElement elem) {
            PSDNode obj = null;
            XAttribute type = elem.Attribute("Type");
            switch (type.Value) {
                case "Node":        obj = new PSDNode(); break;
                case "Text":        obj = new PSDText(); break;
                case "Image":       obj = new PSDImage(); break;
                case "ArtFont":     obj = new PSDImage(true); break;
                case "RawImage":    obj = new PSDRawImage(); break;                
                case "Button":      obj = new PSDButton(); break;

            }
            obj.ParseXElement(elem);
            return obj;
        }

        public static GameObject GenUIRoot(PSDNode node, string name) {
            GameObject rootObj = UGUITools.CreateObject(null);
            rootObj.name = name;
            rootObj.layer = LayerMask.NameToLayer("UI");

            UIRootWidth = node.ContentSize[0];
            UIRootHeight = node.ContentSize[1];

            var rectTransform = rootObj.GetComponent<RectTransform>();
            rectTransform.sizeDelta = new Vector2(UIRootWidth, UIRootHeight);
            rectTransform.position = new Vector3(UIRootWidth / 2, UIRootHeight / 2, 0);

            var canvas = rootObj.AddComponent<Canvas>();
            canvas.renderMode = RenderMode.ScreenSpaceOverlay;

            var canvasScaler = rootObj.AddComponent<CanvasScaler>();
            canvasScaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            canvasScaler.referenceResolution = new Vector2(UIRootWidth, UIRootHeight);

            var graphRaycaster = rootObj.AddComponent<GraphicRaycaster>();


            ImportPSDUtils.GenUIObject(node, rootObj);

            return rootObj;
        }

        public static void GenUIObject(PSDNode node, GameObject parent) {
            switch (node.Type) {
                case PSDNodeType.Image: (node as PSDImage).GenUIObject(parent); break;
                case PSDNodeType.RawImage: (node as PSDRawImage).GenUIObject(parent); break;
                case PSDNodeType.Text: (node as PSDText).GenUIObject(parent); break;
                case PSDNodeType.Button: (node as PSDButton).GenUIObject(parent); break;

                default: node.GenUIObject(parent); break;
            }

            foreach (PSDNode child in node.Childs) {
                ImportPSDUtils.GenUIObject(child, node.UGUIObj);
            }
        }

        // =================================================

        public static float[] StringToFloat2(string str) {
            str = str.Replace("{", "");
            str = str.Replace("}", "");
            string[] data = str.Split(',');
            float[] ret = new float[] { 0f, 0f };
            ret[0] = (float)Convert.ToSingle(data[0]);
            ret[1] = (float)Convert.ToSingle(data[1]);
            return ret;
        }

        public static int[] StringToInt2(string str) {
            str = str.Replace("{", "");
            str = str.Replace("}", "");
            string[] data = str.Split(',');
            int[] ret = new int[] { 0, 0 };
            ret[0] = (int)Convert.ToSingle(data[0]);
            ret[1] = (int)Convert.ToSingle(data[1]);
            return ret;
        }

        public static Color Hex2RGBA(string hexStr, int startIndex, int alpha = 255) {
            if (string.IsNullOrEmpty(hexStr)) {
                Debug.LogError("hexStr is Empty");
                return new Color();
            }
            int rValue = Convert.ToInt32(hexStr.Substring(startIndex, 2), 16);
            int gValue = Convert.ToInt32(hexStr.Substring(startIndex + 2, 2), 16);
            int bValue = Convert.ToInt32(hexStr.Substring(startIndex + 4, 2), 16);
            return new Color(rValue, gValue, bValue, alpha);
        }
    }
}