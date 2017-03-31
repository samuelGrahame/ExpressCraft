using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
	public class Firebase
	{
		private static ExternalPlugin ExternalFireBase = new ExternalPlugin("https://www.gstatic.com/firebasejs/3.6.8/firebase.js");
		public static void Setup()
		{
			ExternalFireBase.Setup();
		}

		public static void InitializeApp(string apiKey, string authDomain, string databaseURL, string storeageBucket, string messagingSenderId)
		{
			ExternalFireBase.UsageCheck();


		}
	}
}
