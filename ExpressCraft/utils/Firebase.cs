using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge;

namespace ExpressCraft
{
	public class Firebase
	{
		private static ExternalPlugin ExternalFireBase = new ExternalPlugin("https://www.gstatic.com/firebasejs/3.6.8/firebase.js");

		public static string DisplayName;
		public static string PhotoURL;
		public static bool UserSignedIn;

		public static void Setup()
		{
			ExternalFireBase.Setup();
		}
		public static Action<object> onAuthStateChanged = null;

		public static void InitializeApp(string ApiKey, string AuthDomain, string DatabaseURL, string StorageBucket, string MessagingSenderId)
		{
			ExternalFireBase.UsageCheck();
			if(string.IsNullOrWhiteSpace(ApiKey))
				throw new Exception($"Invalid Firebase {nameof(ApiKey)} !");
			if(string.IsNullOrWhiteSpace(AuthDomain))
				throw new Exception($"Invalid Firebase {nameof(AuthDomain)}!");
			if(string.IsNullOrWhiteSpace(DatabaseURL))
				throw new Exception($"Invalid Firebase {nameof(DatabaseURL)}!");
			if(string.IsNullOrWhiteSpace(StorageBucket))
				throw new Exception($"Invalid Firebase {nameof(StorageBucket)}!");
			if(string.IsNullOrWhiteSpace(MessagingSenderId))
				throw new Exception($"Invalid Firebase {nameof(MessagingSenderId)}!");

			onAuthStateChanged = (user) => {
				/*@				
				if (user) {
					this.UserSignedIn = true;
					this.DisplayName = user.displayName;
					this.PhotoURL = user.photoURL;
				}else{
					this.UserSignedIn = false;
				}
				*/
			};

			/*@
			firebase.initializeApp({apiKey: ApiKey, authDomain: AuthDomain, databaseURL: DatabaseURL, storageBucket: StorageBucket, messagingSenderId: MessagingSenderId });
			firebase.auth.onAuthStateChanged(this.onAuthStateChanged);
			*/
		}

		public static void SignIn()
		{
			/*@			
			firebase.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
			*/
		}

		public static void SignOut()
		{
			/*@			
			firebase.auth.signOut();
			*/
		}

		public object DatabaseRef(string name)
		{			
			var dataRef = Script.Write<dynamic>("firebase.database.ref(name)");
			dataRef.off();
			return dataRef;
		}

		public static void IsSignedInWithFirebase()
		{
			/*@			
			if(firebase.auth.currentUser)
			{
				return true;
			}else
			{
				return false;
			}
			*/
		}
	}
}
