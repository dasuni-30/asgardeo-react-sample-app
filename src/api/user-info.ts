import {AsgardeoSPAClient} from '@asgardeo/auth-react';
import endpointConfig from '../configs/endpoint-config';

const endpoint = `${endpointConfig.api.endpoints.me}`;

const auth: any = AsgardeoSPAClient.getInstance();

export const getUserDetails = () => {

    const requestConfig = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/scim+json"
        },
        method: "GET",
        url: endpoint
    };

    return auth.httpRequest(requestConfig)
    .then((response: any) => {
        return response.data;
    })
    .catch((error: any) => {
        throw new Error('Failed to fetch user profile');
    });
};


export async function updateUserDetails(body: any) {
    const endpoint = `${endpointConfig.api.endpoints.me}`;

    const requestConfig = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/scim+json"
        },
        method: "PUT",
        data: body,
        url: endpoint
    };

    return auth.httpRequest(requestConfig)
    .then((response: any) => {
        return response.data;
    })
    .catch((error: any) => {
        throw new Error('Failed to fetch user profile');
    });
  }
