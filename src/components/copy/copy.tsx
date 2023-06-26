import React, { useEffect, useState } from 'react';
import { getUserDetails } from '../../api/user-info';


const Copy: React.FunctionComponent<{}> = () => {
    const [ userInfo, setUserInfo ] = useState<any>();

    const message = 
    `curl --request GET
  --url https://api.asgardeo.io/t/%7Borganization-name%7D/scim2/Me
  --header 'Accept: application/scim+json'`;

  const handleApiCall = () => {
    (async () => {
      try {
        const response = await getUserDetails();
        console.log(response);
        setUserInfo(response);
      } catch (error) {
        console.log(error);
      }
    })();
  };

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
        <h3>API Request: </h3>
        <pre id="contentToCopy">
            {message}
        </pre>
        <button id="copyButton" onClick={handleApiCall}>Ping API</button>
        <br/>
        <button id="copyButton" onClick={copyContent}>Copy</button>
        <h3>Output: </h3>
        <pre id="contentToCopy">
            {JSON.stringify(userInfo, null, 2)}
        </pre>
        </>
    )
}

export default Copy;
