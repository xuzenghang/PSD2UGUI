


using UnityEngine;
using UnityEditor;
using System.Collections.Generic;
using System.Xml.Linq;
using System.IO;
using System;
using System.Diagnostics;
using System.Runtime.InteropServices;

namespace PSD2UGUI { 
    public class PSD2UGUIUtils {
        [MenuItem("Tools/UI/Layout导入", priority = 2)]
        public static void Import() {
            string fileName = OpenFileByWin32.OpenFile("layout");
            if (string.IsNullOrEmpty(fileName))
                return;

            ImportLayout(fileName);
        }

        public static GameObject ImportLayout(string fileName) {
            XDocument document = XDocument.Load(fileName);
            if (document == null) {
                UnityEngine.Debug.LogError("Load Layout failed!");
            }

            XElement layoutRoot = document.Root;
            IEnumerable<XElement> elements = layoutRoot.Elements();
            foreach (XElement item in elements) {
                PSDNode node = ImportPSDUtils.ParseUIItem(item);
                node.IsRoot = true;
            
                string[] nameArray = fileName.Split('\\');
                string layoutName = nameArray[nameArray.Length - 1].Replace(".layout", "");
                return ImportPSDUtils.GenUIRoot(node, layoutName);
            }
            return null;
        }

    }

}