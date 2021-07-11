using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using CefSharp;
using CefSharp.WinForms;
using CodeGenerate.Helpers;

namespace CodeGenerate {
    /// <summary>
    /// Cef DotNet 對應 Html/js 介面
    /// </summary>
    class CefCustomObject {
        /// <summary>
        /// 內嵌 chrome 瀏覽器
        /// </summary>
        private readonly ChromiumWebBrowser _instanceBrowser;
        /// <summary>
        /// 乘載 Cef 的 winform
        /// </summary>
        private static Form1 _instanceMainForm = null;

        public CefCustomObject (ChromiumWebBrowser browser, Form1 form) {
            //設定 瀏覽器
            _instanceBrowser = browser;
            //設定 主form
            _instanceMainForm = form;

            var methods = this.GetType().GetMethods();
            string[] camelCaseMethodNames = methods.Select(x => x.Name.FirstCharToLowerCase()).ToArray();
            string[] methodParameters = methods.Select(x => string.Join(",",x.GetParameters().Select(i => i.Name.FirstCharToLowerCase()))).ToArray();
            string cefServiceTemplate = "";
            foreach(var method in methods){
                string camelCaseMethodName = method.Name.FirstCharToLowerCase();
                string methodParameter = string.Join(",",method.GetParameters().Select(p => p.Name.FirstCharToLowerCase()));
                cefServiceTemplate += $"{camelCaseMethodName}({methodParameter}){{return this.cefCustomObject.{camelCaseMethodName}({methodParameter});}}\r\n";
            }
            System.IO.File.WriteAllText("./CefCustomObject.txt",cefServiceTemplate);
        }

        public string SayHello () {
            return "Hello World";
        }

        /// <summary>
        ///開啟瀏覽器 develope 視窗
        /// </summary>
        public void ShowDevTools () {
            _instanceBrowser.ShowDevTools ();
        }

        public void RefreshWindow () {
            _instanceBrowser.GetBrowser ().Reload ();
        }

        public string SelectedFolderPath () {
           var tmp = (string)_instanceMainForm.Invoke(_instanceMainForm.selectedFolderDelegate);
           return tmp;
        }

        public string SelectedFilePath(){
            var tmp = (string)_instanceMainForm.Invoke(_instanceMainForm.selectedFileDelegate);
            return tmp;
        }

        public string DoSomeThing(string name, string action){
            return $"{name} {action}";
        }
    }
}