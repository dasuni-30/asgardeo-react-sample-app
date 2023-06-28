const asgardeoBaseUrl = process.env.REACT_APP_ASGARDEO_BASE_URL;

const endpointConfig = {
  api: {
    endpoints: {
      me: `${asgardeoBaseUrl}/scim2/Me`
    },
  },
};

export default endpointConfig;
