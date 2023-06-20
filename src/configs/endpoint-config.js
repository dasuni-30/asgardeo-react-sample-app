const asgardeoBaseUrl = process.env.REACT_APP_ASGARDEO_BASE_URL;
const apiBaseUrl = process.env.REACT_APP_API_ENDPOINT;

const endpointConfig = {
  api: {
    apiBaseUrl,
    asgardeoBaseUrl,
    endpoints: {
      me: `https://api.asgardeo.io/t/dasuorg/scim2/Me`
    },
  },
};

export default endpointConfig;
