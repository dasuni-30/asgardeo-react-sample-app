import React, { useState } from 'react';
import { getUserDetails } from '../api/user-info';

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
      try {
        const response = await getUserDetails();
        setUserInfo(response);
      } catch (error) {
        // Log the error.
      }
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
