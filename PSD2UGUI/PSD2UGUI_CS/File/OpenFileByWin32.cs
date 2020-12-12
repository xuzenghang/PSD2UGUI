using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Runtime.InteropServices;

public class OpenFileByWin32 : MonoBehaviour
{
    public static string OpenFile(string typ)
    {
        FileOpenDialog dialog = new FileOpenDialog();

        dialog.structSize = Marshal.SizeOf(dialog);

        dialog.filter = string.Format("{0} files\0*.{1}\0All Files\0*.*\0\0", typ, typ);

        dialog.file = new string(new char[256]);

        dialog.maxFile = dialog.file.Length;

        dialog.fileTitle = new string(new char[64]);

        dialog.maxFileTitle = dialog.fileTitle.Length;

        dialog.initialDir = UnityEngine.Application.dataPath;  //默认路径

        dialog.title = "Open File";

        dialog.defExt = typ;//显示文件的类型
        //注意一下项目不一定要全选 但是0x00000008项不要缺少
        dialog.flags = 0x00080000 | 0x00001000 | 0x00000800 | 0x00000200 | 0x00000008;  //OFN_EXPLORER|OFN_FILEMUSTEXIST|OFN_PATHMUSTEXIST| OFN_ALLOWMULTISELECT|OFN_NOCHANGEDIR
        
        if (DialogShow.GetOpenFileName(dialog)) {
            return dialog.file;
        } else {
            return "";
        }
    }
    

    public static string SaveFile(string typ) {
        SaveFileDlg pth  = new SaveFileDlg();
        pth.structSize   = Marshal.SizeOf(pth);
        pth.filter       = string.Format("{0} files\0*.{1}", typ, typ);
        pth.file         = new string(new char[256]);
        pth.maxFile      = pth.file.Length;
        pth.fileTitle    = new string(new char[64]);
        pth.maxFileTitle = pth.fileTitle.Length;
        pth.initialDir   = Application.dataPath; //默认路径
        pth.title        = "Save File";
        pth.defExt       = typ;
        pth.flags        = 0x00080000 | 0x00001000 | 0x00000800 | 0x00000200 | 0x00000008;
        if (SaveFileDialog.GetSaveFileName(pth)) {
            string filepath = pth.file; //选择的文件路径;  
            return filepath;
        } else {
            return "";
        }
    }
}
