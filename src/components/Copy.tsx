import React, { useState } from 'react';
import { getUserDetails } from '../api/user-info';
import endpointConfig from '../configs/endpoint-config';


const Copy: React.FunctionComponent<{}> = () => {
    const [ userInfo, setUserInfo ] = useState<any>();

    const meEndpoint = `${endpointConfig.api.endpoints.me}`;

    const message = 
    `curl --request GET --url \n`
    + meEndpoint
    + `\n`
    + `--header 'Accept: application/scim+json'`;

  const handleApiCall = () => {
    (async () => {
      try {
        const response = await getUserDetails();
        setUserInfo(response);
      } catch (error) {
        // Log the error.
      }
    })();
  };

  function copyContent() {
    const contentToCopy = document.getElementById('contentToCopy');
    const textToCopy: string = String(contentToCopy?.innerText);

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
        <h3>API Request</h3>
        <pre id='contentToCopy'>
            {message}
        </pre>
        <div className='container'>
            <div className='column'>
                <button className='button' onClick={handleApiCall}>Ping</button>
            </div>
            <br/>
            <div className='column'>
                <button className='button' onClick={copyContent}>Copy</button>
            </div>
        </div>
        <h3>Output</h3>
        <pre id='contentToCopy'>
            {JSON.stringify(userInfo, null, 2)}
        </pre>
        </>
    )
}

export default Copy;
