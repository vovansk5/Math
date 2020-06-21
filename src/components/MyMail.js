import {HTTPtestBB} from "./http-common"
/* eslint-disable no-unused-vars */
export function myMail(mailto,subject,body,file_attachments) {

  //alert(`Hello, ${user}!`);
    let jsonData=`
    {
        "action": "mail_send",
        "params": {
          "subject": "${subject}",
          "body": "${body}",
          "emailTo": "${mailto}",
          "file_attachments": "${file_attachments}"
        },
        "token": "1F7C1236-E4A3-46B0-80F0-ADA1FBCCE700",
        "version": 1
      }
      `;
    HTTPtestBB.post(``,jsonData)
      .then( (Response) => {
          return Response.data;
      });

      
  }