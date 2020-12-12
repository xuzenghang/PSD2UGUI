using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using System.Xml.Linq;
using UnityEngine.UI;


namespace PSD2UGUI {
    class PSDButton : PSDNode {
        public string ImagePath = "";
        public bool IsSliced = false;
        public int Opacity = 255;

        public PSDButton() {
            Type = PSDNodeType.Button;
        }

        public override void ParseSpecialProperty(string attrName, string attrValue) {
            switch (attrName) {
                case "Image": ImagePath = attrValue; break;
                case "Opacity": Opacity = int.Parse(attrValue); break;
                case "ImageType": IsSliced = (attrValue == "Sliced"); break;

            }
        }

        public override void GenUIObject(GameObject parent) {
            UGUIObj = UGUITools.CreateButton(parent);
            if (!UGUIObj)
                return;

            UGUIObj.name = Name;

            SetBaseProperty(parent);

            var imgCmp = UGUIObj.GetComponent<Image>();
            if (!string.IsNullOrEmpty(ImagePath) && imgCmp) {
                imgCmp.color = new Color(imgCmp.color.r, imgCmp.color.g, imgCmp.color.b, Opacity);

                string path = ImportPSDUtils.AtlasFolderPath + ImagePath + ".png";
                Sprite sp = AssetDatabase.LoadAssetAtPath(path, typeof(Sprite)) as Sprite;
                if (sp) {
                    imgCmp.sprite = sp;
                    imgCmp.type = IsSliced ? Image.Type.Sliced : Image.Type.Simple;
                } else {
                    Debug.Log("=== Load Sprite Failed. Path: " + path);
                }
            }
        }

    }
}



