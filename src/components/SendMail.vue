<template>
    <div>
        {{test}}

    </div>
</template>

<script>
export default {
    props:[
        'mailTo','mailForm','Subject','Body'
    ],
    data() {
        return {
            test:1242
        }
    },
    methods:{
        sendMail() {
                this.test=5;
                /*try   
                (sRecipientMail, sSubject, sMsgBody
                {   
                    // create a session and log on -- username and password in profile    
                    var refMsg = WScript.CreateObject("CDO.Message");   
                    var refConf = WScript.CreateObject("CDO.Configuration");   
                    
                    // Setting configuration params   
                    with(refConf.Fields)   
                    {   
                        Item("http://schemas.microsoft.com/cdo/configuration/smtpserver") = "smtp.mail.ru";  
                        Item("http://schemas.microsoft.com/cdo/configuration/sendusing") = 2; 
                        Item("http://schemas.microsoft.com/cdo/configuration/smtpauthenticate") = 1;  
                        Item("http://schemas.microsoft.com/cdo/configuration/sendusername") = "lou@list.ru";  
                        Item("http://schemas.microsoft.com/cdo/configuration/sendpassword") = "****"; 
                    }   
                    refConf.Fields.Update();   
            
                    with(refMsg)   
                    {   
                        Configuration = refConf;   
                        To       = sRecipientMail;   
                        From     = "lou@list.ru";   
                        Subject  = sSubject;   
                        TextBody = sMsgBody;   
                    }  
            
                    if (files)  
                    {  
                        for(var i=0; i<files.length; i++)  
                            refMsg.AddAttachment(files[i]);  
                    }  
            
                    refMsg.Send();   
                }    
                catch(e)   
                {   
                    WScript.Echo("SendMail error !!! : " + e.description);   
                    WScript.Quit(1);   
                }   
            }

          */  
        } 
    },
    created() {
        this.sendMail();
    }
}

</script>

<style>

</style>