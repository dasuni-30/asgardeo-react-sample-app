import React, { useState } from 'react';

/**
 * API Call component.
 */
const APICall: React.FunctionComponent<{}> = () => {
    const [ userInfo, setUserInfo ] = useState<any>();

    const message = 
    'Initiate a request to an external API and retrieve the response.' +
    'This involves communicating with an external server through a ' +
    'designated API, requesting specific data or executing particular' +
    ' actions inherent to the API\'s functionality.';

  const handleApiCall = () => {
    (async () => {
      fetch('https://71fe9995-65a1-4e05-92a8-bc40749649d8-prod.e1-us-east-azure.choreoapis.dev/hmvi/demoapi/endpoint-9090-803/1.0.0/accounts')
      .then((response) => response.json())
      .then((data) => {
         console.log(data);
         setUserInfo(data);
      })
      .catch((err) => {
         console.log(err.message);
      });
    })();
  };
  
    return (
        <>
          <pre id='contentToCopy'>
              {message}
          </pre>
          <div>
            <button className='btn' onClick={handleApiCall}>Invoke API</button>
          </div>
          <br/>
          <h3>Output</h3>
          <pre id='contentToCopy'>
              {JSON.stringify(userInfo, null, 2)}
          </pre>
        </>
    )
}

export default APICall;
