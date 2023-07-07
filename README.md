## 👀 Live Deployment

A live preview of this demo is available at
1. Vercel: [https://asgardeo-react-sample-app.vercel.app](https://asgardeo-react-sample-app.vercel.app)
2. Netlify: [https://kaleidoscopic-medovik-1bf3fc.netlify.app](https://kaleidoscopic-medovik-1bf3fc.netlify.app)

## 🚀 Getting Started

1. Clone the repository.

```bash
git clone https://github.com/dasuni-30/asgardeo-react-sample-app.git
```

3. Install the dependencies.

```bash
npm install
```

4. Create a `.env` file based on the `.env.example` file.

```bash
cp .env.example .env
```

5. Update the values in the `.env` file based on your requirements.

```bash
# The port number on which the client application will run
PORT=3000

# The base URL of the server's API that the client application will communicate with
# E.g., http://localhost:5000
REACT_APP_API_ENDPOINT=<add-server-api-url>

# The client ID for the Asgardeo Single Page Application (SPA) app
REACT_APP_CLIENT_ID=<add-asgardeo-spa-app-client-id-here>

# The base URL for the client application
# E.g., http://localhost:3000
REACT_APP_CLIENT_BASE_URL=<add-client-app-base-url-here>

# The base URL for the Asgardeo organization's API
# E.g., https://api.asgardeo.io/t/your-org
REACT_APP_ASGARDEO_BASE_URL=<add-asgardeo-org-base-url-here>

# The sign-up URL for the Asgardeo organization
REACT_APP_SIGN_UP_URL=<asgardeo-sign-up-url>

# The application name for the Asgardeo application
REACT_APP_APPLICATION_NAME="application-name"
```

5. Start the development server.

```bash
npm start
```

This will start the app on [http://localhost:3000](http://localhost:3000).
