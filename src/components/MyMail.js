import {HTTPtestBB} from "./http-common"

export function myMail(mailto,subject,body) {
    //alert(`Hello, ${user}!`);
    let jsonData=`
    {
        "action": "mail_send",
        "params": {
          "subject": "${subject}",
          "body": "${body}",
          "emailTo": "${mailto}"
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