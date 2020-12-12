


using UnityEngine;
using UnityEditor;
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using UnityEngine.UI;
//using BS;



namespace PSD2UGUI {
    public static class UGUITools {
        public static GameObject CreateObject(GameObject parent) {
            GameObject go = new GameObject();

            var rectTransform = go.AddComponent<RectTransform>();
            rectTransform.anchorMin = new Vector2(0.5f, 0.5f);
            rectTransform.anchorMax = new Vector2(0.5f, 0.5f);
            rectTransform.localPosition = Vector2.zero;

            if (parent != null) {
                go.layer = parent.layer;
                rectTransform.parent = parent.transform;
            }
            return go;
        }

        public static T CreateWidget<T>(GameObject parent) where T:Component {
            GameObject go = CreateObject(parent);
            T cmp = go.AddComponent<T>();
            return cmp;
        }

        public static Image CreateImage(GameObject parent) {
            return CreateWidget<Image>(parent);

            //GameObject go = CreateObject(parent);
            //Image imgCmp = go.AddComponent<Image>();
            //return imgCmp;
        }

        public static RawImage CreateRawImage(GameObject parent) {
            return CreateWidget<RawImage>(parent);

            //GameObject go = CreateObject(parent);
            //RawImage rawImgCmp = go.AddComponent<RawImage>();
            //return rawImgCmp;
        }

        public static Text CreateText(GameObject parent) {
            return CreateWidget<Text>(parent);

            //GameObject go = CreateObject(parent);
            //Text txtCmp = go.AddComponent<Text>();
            //return txtCmp;
        }

        public static GameObject CreateButton(GameObject parent) {
            GameObject go = CreateObject(parent);
            go.AddComponent<Image>();
            go.AddComponent<Button>();
            return go;
        }
    }
}