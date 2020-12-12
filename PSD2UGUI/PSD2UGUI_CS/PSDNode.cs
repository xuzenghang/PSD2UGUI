
using System;
using System.Collections.Generic;
using System.Xml.Linq;
using UnityEngine;

namespace PSD2UGUI {

    public enum PSDNodeType {
        Node,
        Image,
        RawImage,
        Text,
        Button,

    }

    class PSDNode {
        public string Name = "";
        public float[] AnchorPoint = new float[] { 0.5f, 0.5f };
        public float[] Position = new float[] { 0f, 0f };
        public int[] ContentSize = new int[] { 0, 0 };
        public bool IsRoot = false;

        public GameObject UGUIObj;
        public List<PSDNode> Childs = new List<PSDNode>();
        public PSDNodeType Type = PSDNodeType.Node;
        //public string Type = "PSDNode";

        public void ParseXElement(XElement elem) {
            IEnumerable<XAttribute> attrs = elem.Attributes();
            foreach (XAttribute attr in attrs) {
                if (attr.Name == "Name") {
                    Name = attr.Value;
                }
            }

            IEnumerable<XElement> elements = elem.Elements();
            foreach (XElement item in elements) {
                if (item.Name == "Property") {
                    // ImportPSDUtils.ParseProperty(this, item);
                    ParseXProperty(item);
                } else if (item.Name == "Node") {
                    object node = ImportPSDUtils.ParseUIItem(item);
                    Childs.Add(node as PSDNode);
                }
            }
        }
        public void ParseXProperty(XElement elem) {
            IEnumerable<XAttribute> attrs = elem.Attributes();

            string attrName = "";
            foreach (XAttribute attr in attrs) {
                if (attr.Name.ToString() == "Name") {
                    attrName = attr.Value.ToString();
                } else {
                    ParseBaseProperty(attrName, attr.Value);
                    ParseSpecialProperty(attrName, attr.Value);
                    attrName = "";
                }
            }
        }

        // =======================================================

        public virtual void ParseSpecialProperty(string attrName, string attrValue) { }

        public virtual void GenUIObject(GameObject parent) {
            UGUIObj = UGUITools.CreateObject(parent);
            UGUIObj.name = Name;

            SetBaseProperty(parent);
        }

        // =======================================================

        protected void ParseBaseProperty(string attrName, string attrValue) {
            switch (attrName) {
                case "Name": Name = attrValue; break;
                case "Position": Position = ImportPSDUtils.StringToFloat2(attrValue); break;
                case "AnchorPoint": AnchorPoint = ImportPSDUtils.StringToFloat2(attrValue); break;
                case "ContentSize": ContentSize = ImportPSDUtils.StringToInt2(attrValue); break;

            }
        }

        protected void SetBaseProperty(GameObject parent) {
            var rectTransform = UGUIObj.GetComponent<RectTransform>();
            if (rectTransform) {
                if (IsRoot) {
                    rectTransform.localPosition = Vector3.zero;
                } else {
                    rectTransform.position = new Vector3(Position[0], Position[1], 0);
                }

                rectTransform.sizeDelta = new Vector2(ContentSize[0], ContentSize[1]);
                // rectTransform.localScale = 
                // rectTransform.localEulerAngles = 
            }

        }
    }
}


