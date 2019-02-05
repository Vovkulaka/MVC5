using AdoNet;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC5.Models
{
    public class CalculateContext
    {
        private static string _ipAddress = null;

        public CalculateContext(string ipAddress)
        {
            _ipAddress = ipAddress;
        }

        public static List<Calculate> All // звертаючись до властвості All …
        {
            get
            {
                List<Calculate> calculateList = new List<Calculate>();
                dynamic storyColculate = new WorkWithDataDB().ReadData(_ipAddress);

                foreach (var calculateString in storyColculate) // …20 продуктів згенерованих циклом
                {
                    calculateList.Add(new Calculate()
                    {
                        CalculateString = calculateString.ToString()
                    });
                }
                return calculateList;
            }
        }
    }
}