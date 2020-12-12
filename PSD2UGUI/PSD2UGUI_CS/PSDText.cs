using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using System.Xml.Linq;
using UnityEngine.UI;


namespace PSD2UGUI {
    class PSDText : PSDNode {
        public int Opacity = 255;
        public int FontSize = 24;
        public string Content = string.Empty;
        public string hexColor = string.Empty;

        public PSDText() {
            Type = PSDNodeType.Text;
        }

        public override void ParseSpecialProperty(string attrName, string attrValue) {
            switch (attrName) {
                case "Opacity": Opacity = int.Parse(attrValue); break;
                case "FontSize": FontSize = int.Parse(attrValue); break;
                case "TextContent": Content = attrValue; break;
                case "TextColor": hexColor = attrValue; break;
            }
        }

        public override void GenUIObject(GameObject parent) {
            Text txtObj = UGUITools.CreateText(parent);
            if (!txtObj)
                return;

            UGUIObj = txtObj.gameObject;
            UGUIObj.name = Name;

            if (ImportPSDUtils.defaultFont) {
                txtObj.font = ImportPSDUtils.defaultFont;
            }
            txtObj.fontSize = FontSize;
            txtObj.text = Content;
            txtObj.color = ImportPSDUtils.Hex2RGBA(hexColor, 2, Opacity);
            txtObj.alignment = TextAnchor.MiddleCenter;
            txtObj.raycastTarget = false;

            SetBaseProperty(parent);

            var rectTransform = UGUIObj.GetComponent<RectTransform>();
            rectTransform.sizeDelta = new Vector2(ContentSize[0] + 50f, ContentSize[1] * 2);
        }

    }
}



