using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AdoNet;
using MVC5.Attribute;
using MVC5.Models;

namespace MVC5.Controllers
{
    // GET: Calculater
    [Culture]
    public class CalculaterController : Controller
    {
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

        HomeController homeController = new HomeController();
        // GET: Calculater
        public ActionResult BeginFormAJAX(string lang)
        {
            return View("BeginFormAJAX");
        }

        public ActionResult BeginFormHTML(string lang)
        {
            return View("BeginFormHTML");
        }

        public ActionResult _ShowStoryColculate() // тут можна передади параметр за-замовчуванням
        {
            string ipAddress = GetIPAddress(this.Request);
            new CalculateContext(ipAddress);
            IEnumerable<Calculate> storyColculate = CalculateContext.All; // - так можна викликати властивість лише якщо вона static!!!
            return PartialView("_StoryColculate", storyColculate);
        }

        [HttpGet]
        public ActionResult AddDeleteCalculate(string nameAct, string calculate)
        {
            WorkWithDataDB workWithDataDB = new WorkWithDataDB();
            string ipAddress = GetIPAddress(this.Request); // ДЛЯ ДЕБАГУ: "01.01.01.1111";
            string resulteAddData = null;

            if (nameAct == "Addalculate")
            {
                resulteAddData = workWithDataDB.AddData(ipAddress, calculate);
            }
            else if (nameAct == "DeleteCalculate")
            {
                workWithDataDB.DeleteData(ipAddress);
            }

            //ViewBag.Result = resulteAddData; // #222 - також див. Index.html

            //new CalculateContext(ipAddress);
            //IEnumerable<Calculate> storyColculate = CalculateContext.All; // - так можна викликати властивість лише якщо вона static!!!
            //return PartialView("_StoryColculate", storyColculate);

            return Json(resulteAddData, JsonRequestBehavior.AllowGet); // #111 такий рядок дозволяє в AJAX-функції опрацювати повернуте значення цього методу дії! // new EmptyResult(); - …інакше повертаємо пусту відповідь
        }
    }
}