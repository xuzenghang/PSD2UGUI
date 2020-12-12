using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using System.Xml.Linq;
using UnityEngine.UI;


namespace PSD2UGUI {
    class PSDImage : PSDNode {
        public string ImagePath = "";
        public bool IsSliced = false;
        public bool IsArtFont = false;
        public int Opacity = 255;

        public PSDImage(bool isArtFont = false) {
            Type = PSDNodeType.Image;
            IsArtFont = isArtFont;
        }

        public override void ParseSpecialProperty(string attrName, string attrValue) {
            switch (attrName) {
                case "Image": ImagePath = attrValue; break;
                case "Opacity": Opacity = int.Parse(attrValue); break;
                case "ImageType": IsSliced = !IsArtFont && (attrValue == "Sliced"); break;

            }
        }

        public override void GenUIObject(GameObject parent) {
            Image imgObj = UGUITools.CreateImage(parent);
            if (!imgObj)
                return;

            UGUIObj = imgObj.gameObject;
            UGUIObj.name = Name;

            imgObj.color = new Color(imgObj.color.r, imgObj.color.g, imgObj.color.b, Opacity);
            imgObj.raycastTarget = false;

            string folderPath = IsArtFont ? ImportPSDUtils.ArtFontFolderPath : ImportPSDUtils.AtlasFolderPath;
            string path = folderPath + ImagePath + ".png";
            Sprite sp = AssetDatabase.LoadAssetAtPath(path, typeof(Sprite)) as Sprite;
            if (sp) {
                imgObj.sprite = sp;
                imgObj.type = IsSliced ? Image.Type.Sliced : Image.Type.Simple;
            } else {
                Debug.Log("=== Load Sprite Failed. Path: " + path);
            }

            SetBaseProperty(parent);
        }

    }
}



