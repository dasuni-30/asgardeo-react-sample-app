import React from 'react';

const copyButton = document.getElementById('copyButton');
const textArea = document.getElementById('textArea');

const Copy: React.FunctionComponent<{}> = () => {
    const message = 
    `curl --request PATCH
    --url https://api.asgardeo.io/t/%7Borganization-name%7D/scim2/Me
    --header 'Accept: application/scim+json'
    --header 'Content-Type: application/scim+json'
    --data '{
    "schemas": [
      "urn:ietf:params:scim:api:messages:2.0:PatchOp"
    ],
    "Operations": [
      {
        "op": "add",
        "value": {
          "nickName": "shaggy"
        }
      }
    ]
  }'`;

  function copyContent() {
    const contentToCopy = document.getElementById('contentToCopy');
    const textToCopy: string = String(contentToCopy?.innerText);
    console.log(textToCopy);

    navigator.clipboard.writeText
                (textToCopy)
      .then(() => {
        setTimeout(() => {
          
        }, 2000); // Reset the button text after 2 seconds
      })
      .catch((error) => {
        console.error('Unable to copy content:', error);
      });
  }
  
    return (
        <>
        <pre id="contentToCopy">
            {message}
        </pre>
        <button id="copyButton">Ping API</button>
        <br/>
        <button id="copyButton" onClick={copyContent}>Copy</button>
        </>
    )
}

export default Copy;
