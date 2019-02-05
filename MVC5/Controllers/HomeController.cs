using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AdoNet;
using MVC5.Attribute;
using MVC5.Models;
using System.Diagnostics;


namespace MVC5.Controllers
{
    [Culture]
    public class HomeController : Controller
    {
        //CalculateContext calculateContext;

        //private string GetIPAddress()
        //{
        //    string ipAddress = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
        //    if (string.IsNullOrEmpty(ipAddress))
        //    {
        //        ipAddress = Request.ServerVariables["REMOTE_ADDR"];
        //    }
        //    //ViewBag.IPAddress = ipAddress;
        //    return ipAddress;
        //}

        public static string GetIPAddress(HttpRequestBase request)
        {
            string ip;
            try
            {
                ip = request.ServerVariables["HTTP_X_FORWARDED_FOR"];
                if (!string.IsNullOrEmpty(ip))
                {
                    if (ip.IndexOf(",") > 0)
                    {
                        string[] ipRange = ip.Split(',');
                        int le = ipRange.Length - 1;
                        ip = ipRange[le];
                    }
                }
                else
                {
                    ip = request.UserHostAddress;
                }
            }
            catch { ip = null; }

            return ip;
        }

        public ActionResult Index()
        {
            new ConfigurationConnectDB().ConfigurationConnectionStr();
            //string ipAddress = GetIPAddress(this.Request);
            //new CalculateContext(ipAddress); // ЗАМІСТЬ "01.01.01.1111" БУЛО ipAddress
            //CalculateContext calculateContext = new CalculateContext(ipAddress); // ЗАМІСТЬ "01.01.01.1111" БУЛО ipAddress

            #region
#if DEBUG
            Debug.WriteLine("\n\n\n\n" + new string('*', 50) + "\n");
            //Debug.WriteLine("****** - ipAddress:" + ipAddress);
            Debug.WriteLine("\n" + new string('*', 50) + "\n\n\n\n");
#endif
            #endregion
            #region ЦЕЙ КОД ТИ ВИКОРИСТОВУВАВ ДЛЯ ВІДЛАДКИ! ВІН НЕ РОБОЧИЙ!!!
            //dynamic storyColculate = new WorkWithDataDB().ReadData("01.01.01.1111");
            //ViewBag.StoryColculate = storyColculate;
            #endregion


            return View();
        }

        public ActionResult ChangeCulture(string lang, string returnUrl, string submit) // #333 об'єкт локалізації системи. Див. файл ~/Resources/README.txt
        {
            // БУЛО: string returnUrl = Request.UrlReferrer.AbsolutePath;
            // Список культур
            List<string> cultures = new List<string>() { "ua", "en" };
            if (!cultures.Contains(lang) && lang != null) // Якщо надісланої культури немає в списку - встановлюємо культуру ua яка служитиме культурої за замовчуванням
            {
                lang = "ua";
            }
            else if (submit == "ua")
            {
                lang = "ua";
            }
            else if (submit == "en")
            {
                lang = "en";
            }
            // Сохраняем выбранную культуру в куки
            HttpCookie cookie = Request.Cookies["lang"];
            if (cookie != null)
                cookie.Value = lang;   // если куки уже установлено, то обновляем значение
            else
            {

                cookie = new HttpCookie("lang");
                cookie.HttpOnly = false;
                cookie.Value = lang;
                cookie.Expires = DateTime.Now.AddYears(1);
            }
            Response.Cookies.Add(cookie);
            return Redirect(returnUrl);
        }
    }
}