using Bridge.Html5;
using Bridge.jQuery2;
using System;
using System.Collections.Generic;
using System.Text;

namespace ExpressCraft
{
    public static class Gmail
    {
        public static ExternalPlugin ExternalGmail = new ExternalPlugin("https://apis.google.com/js/api.js");
        public static string ClientId;
        public static object GoogleAuth;
        
        private static List<Action> _oneTimeCall = new List<Action>();

        public static void Authorize()
        {
            if(!ExternalGmail.SetupCompleted)
                return;

            if(IsSignedIn())
                return;
            try
            {
                /*@
                ExpressCraft.Gmail.GoogleAuth = gapi.auth2.getAuthInstance()
                gapi.auth2.getAuthInstance().signIn();
                */
                _hasRan = false;
                PushEventsTimeCall();
                Window.Focus();
            }
            catch(Exception)
            {
            }
        }

        private static bool _hasRan = false;

        public static void PushEventsTimeCall()
        {
            if(_hasRan)
                return;
            _hasRan = true;

            try
            {
                foreach(var callpump in _oneTimeCall)
                {
                    if(callpump != null)
                        callpump();
                }
            }
            catch(Exception)
            {
            }
            _oneTimeCall = new List<Action>();
        }

        public static void OnSignedIn(Action method)
        {
            if(method == null)
                return;

            if(_hasRan)
            {
                try
                {
                    method();
                }
                catch(Exception)
                {
                }
            }
            else
            {
                _oneTimeCall.Add(method);
            }
        }

        public static bool IsSignedIn()
        {
            if(!ExternalGmail.SetupCompleted)
            {
                throw new Exception("Setup for gmail is not ready yet!");
            }
            if(GoogleAuth == null)
            {
                throw new ArgumentNullException("GoogleAuth");
            }
            bool signedIn = false;

            /*@
			signedIn = ExpressCraft.Gmail.GoogleAuth.isSignedIn.get();
			*/

            return signedIn;
        }

        public static string AccessToken()
        {
            if(!ExternalGmail.SetupCompleted)
            {
                throw new Exception("Setup for gmail is not ready yet!");
            }
            if(GoogleAuth == null)
            {
                throw new ArgumentNullException("GoogleAuth");
            }

            string access_token = "";

            /*@
			access_token = ExpressCraft.Gmail.GoogleAuth.currentUser.Ab.Zi.access_token;
			*/

            return access_token;
        }

        public static string Fullname()
        {
            if(!ExternalGmail.SetupCompleted)
            {
                throw new Exception("Setup for gmail is not ready yet!");
            }
            if(GoogleAuth == null)
            {
                throw new ArgumentNullException("GoogleAuth");
            }

            string fullname = "";

            /*@
			fullname = ExpressCraft.Gmail.GoogleAuth.currentUser.Ab.w3.ig;
			*/

            return fullname;
        }

        public static string Email()
        {
            if(!ExternalGmail.SetupCompleted)
            {
                throw new Exception("Setup for gmail is not ready yet!");
            }
            if(GoogleAuth == null)
            {
                throw new ArgumentNullException("GoogleAuth");
            }

            string email = "";

            /*@
			email = ExpressCraft.Gmail.GoogleAuth.currentUser.Ab.w3.U3;
			*/

            return email;
        }

        public static string GetContentTypeFromFileName(string filename)
        {
            if(string.IsNullOrWhiteSpace(filename))
                return "application/octet-stream";

            filename = filename.ToLower();

            if(filename.EndsWith(".pdf"))
                return "application/pdf";
            else if(filename.EndsWith(".png"))
                return "image/png";
            else if(filename.EndsWith(".jpg") || filename.EndsWith(".jpeg"))
                return "image/jpeg";
            else
                return "application/octet-stream";
        }

        public static void SendEmail(GmailMessage message)
        {
            if(message == null)
                return;

            var builder = new StringBuilder();

            builder.Append("Content-Type: multipart/mixed; boundary=\"_intelogy_8ab337ec2e38e1a8b82a01a5712a8bdb\"\r\n");
            builder.Append("MIME-Version: 1.0\r\n");
            builder.Append("From: " + Email() + "\r\n");
            builder.Append("To: " + message.ToEmail + "\r\n");
            builder.Append("Subject: " + message.Subject + "\r\n\r\n");

            builder.Append("--_intelogy_8ab337ec2e38e1a8b82a01a5712a8bdb\r\n");
            builder.Append("Content-Type: text/" + (message.IsHTML ? "html" : "plain") + "; charset=\"UTF-8\"\r\n");
            builder.Append("MIME-Version: 1.0\r\n");
            builder.Append("Content-Transfer-Encoding: 7bit\r\n\r\n");

            if(message.IsHTML)
            {
                builder.Append((message.Body + "").Replace("\r\n", "<br />") + "\r\n\r\n");
            }
            else
            {
                builder.Append(message.Body + "\r\n\r\n");
            }

            builder.Append("--_intelogy_8ab337ec2e38e1a8b82a01a5712a8bdb\r\n");

            if(message.Attachments != null)
            {
                foreach(var attachment in message.Attachments)
                {
                    if(!string.IsNullOrWhiteSpace(attachment.Data))
                    {
                        builder.Append("--_intelogy_8ab337ec2e38e1a8b82a01a5712a8bdb\r\n");
                        builder.Append("Content-Type: " + GetContentTypeFromFileName(attachment.Filename) + "; charset=\"UTF-8\"\r\n");
                        builder.Append("MIME-Version: 1.0\r\n");
                        builder.Append("Content-Transfer-Encoding: base64\r\n");
                        builder.Append("Content-Disposition: attachment; filename=\"" + (attachment.Filename).Replace("\"", "") + "\"\r\n\r\n");

                        if(attachment.IsBase64)
                        {
                            builder.Append(attachment.Data);
                        }
                        else
                        {
                            builder.Append(Global.Btoa(attachment.Data));
                        }

                        builder.Append("\r\n\r\n");

                        builder.Append("--_intelogy_8ab337ec2e38e1a8b82a01a5712a8bdb\r\n");
                    }
                }
            }

            var settings = new AjaxOptions()
            {
                Type = "POST",
                Url = "https://www.googleapis.com/upload/gmail/v1/users/me/messages/send?uploadType=multipart",
                ContentType = "message/rfc822",
                Data = builder.ToString(),
                Headers = new
                {
                    Authorization = "Bearer " + AccessToken()
                },
                Error = (a, b, c) =>
                {
                },
                Complete = (jq, data) =>
                {
                },
                Success = (obj, data, jq) =>
                {
                }
            };

            jQuery.Ajax(settings);
        }

        public static string IconURL()
        {
            if(!ExternalGmail.SetupCompleted)
            {
                throw new Exception("Setup for gmail is not ready yet!");
            }
            if(GoogleAuth == null)
            {
                throw new ArgumentNullException("GoogleAuth");
            }

            string iconUrl = "";

            /*@
			iconUrl = ExpressCraft.Gmail.GoogleAuth.currentUser.Ab.w3.Paa;
			*/

            return iconUrl;
        }

        public static void Setup(string clientId)
        {
            ClientId = clientId;

            ExternalGmail.OnReady = () =>
            {
                try
                {
                    /*@
			    gapi.load('client:auth2', function() {
                    gapi.client.init({
                      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"],
                      clientId: ExpressCraft.Gmail.ClientId,
                      scope: 'https://www.googleapis.com/auth/gmail.send'
                    }).then(function () {
                      // Listen for sign-in state changes.
                      ExpressCraft.Gmail.GoogleAuth = gapi.auth2.getAuthInstance()
                      gapi.auth2.getAuthInstance().signIn();

                      ExpressCraft.Gmail.PushEventsTimeCall();
                    });
                });
			    */
                }
                catch(Exception)
                {
                }
            };
            ExternalGmail.Setup(true, true);
        }
    }

    public class GmailMessage
    {
        public string ToEmail { get; set; }

        public string Subject { get; set; }
        public string Body { get; set; }
        public bool IsHTML { get; set; }

        public GmailMessage(string toEmail, string subject, string body, bool isHTML)
        {
            ToEmail = toEmail;
            Subject = subject;
            Body = body;
            IsHTML = isHTML;
        }

        public List<GmailMessageAttachment> Attachments { get; set; } = new List<GmailMessageAttachment>();
    }

    public class GmailMessageAttachment
    {
        public string Filename { get; set; }
        public string Data { get; set; }
        public bool IsBase64 { get; set; }

        public GmailMessageAttachment(string filename, string data, bool isBase64 = false)
        {
            Filename = filename; Data = data; IsBase64 = isBase64;
        }
    }
}