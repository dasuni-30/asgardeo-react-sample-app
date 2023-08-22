import React, { useState } from 'react';
import endpointConfig from '../configs/endpoint-config';

/**
 * API Call component.
 */
const APICall = () => {
  const [ userInfo, setUserInfo ] = useState();

  const apiEndpoint = `${endpointConfig.api.endpoints.externalApi}`;

  const message = 
    'Initiate a request to an external API and retrieve the response by clicking on the button below. ' +
    'This involves communicating with an external server through a ' +
    'designated API, requesting specific data or executing particular' +
    ' actions inherent to the API\'s functionality.';

  const handleApiCall = () => {
    (async () => {
      fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
      })
      .catch((err) => {
      });
    })();
  };
  
  return (
    <div className='container-center'>
      <p className='p-description max-width justified-text'>{message}</p>
      <div>
        <button className='btn' onClick={handleApiCall}>Invoke API</button>
      </div>
      <br/>
      <h3>Output</h3>
      <pre id='contentToCopy'>
        {JSON.stringify(userInfo, null, 2)}
      </pre>
    </div>
  )
}

export default APICall;
