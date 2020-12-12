using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using System.Xml.Linq;
using UnityEngine.UI;


namespace PSD2UGUI {
    class PSDRawImage : PSDNode {
        public string ImagePath = "";
        public int Opacity = 255;

        public PSDRawImage() {
            Type = PSDNodeType.RawImage;
        }

        public override void ParseSpecialProperty(string attrName, string attrValue) {
            switch (attrName) {
                case "Image": ImagePath = attrValue; break;
                case "Opacity": Opacity = int.Parse(attrValue); break;

            }
        }

        public override void GenUIObject(GameObject parent) {
            RawImage imgObj = UGUITools.CreateRawImage(parent);
            if (!imgObj)
                return;

            UGUIObj = imgObj.gameObject;
            UGUIObj.name = Name;

            imgObj.color = new Color(imgObj.color.r, imgObj.color.g, imgObj.color.b, Opacity);
            imgObj.raycastTarget = false;

            string path = ImportPSDUtils.TextureFolderPath + ImagePath + ".png";
            Texture texture = AssetDatabase.LoadAssetAtPath(path, typeof(Texture)) as Texture;
            if (texture) {
                imgObj.texture = texture;
            } else {
                Debug.Log("=== Load Sprite Failed. Path: " + path);
            }

            SetBaseProperty(parent);
        }

    }
}



