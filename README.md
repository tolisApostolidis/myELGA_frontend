# Table of Contents
* [About](#about)
* [Requirements](#requirements)
* [How to run](#how-to-run)
* [How to build Docker image](#how-to-build-docker-image)
* [CI/CD](#cicd)
* [Related repositories](#related-repositories)

# About 
Frontend component of the myELGA agricultural compensation management platform. The application provides:
- **Responsive user interface** 
- **Role-based interfaces** for citizens, managers and admin
- **User authentication** through backend API
- **REST API communication** with the backend

# Requirements
In order to build and run the frontend application, you must install the following tools:
* [ ] Install Node.js
    *  18+ (required for Vite)
    *  22.15.1. = recommended version (same as the build version)
* [ ] Install Docker
    * Latest stable version = recommended
* [ ] Install Git
    * Required to clone the repository

# How to run
Firstly, install required dependecnies, then run the application in development mode:
```
npm install

npm run dev
```

By default, the Vite development server is available at:
```
http://localhost:5173
```

# How to build Docker image
Build the image using Docker with the following command:
```
docker build -t myelga-frontend .
```

# CI/CD
The `Jenkinsfile` automates the process of testing, building and publishing the Docker image to GHCR. For each build, Jenkins:
1. Generates an image tag based on Git commit and Jenkins build number
2. Builds the Docker image with both the generated tag and `latest`
3. Authenticates with GHCR
4. Publishes the image to GHCR with both tags
5. Triggers the `myELGA-deployment` Jenkins job with the `frontend` component to restart the Kubernetes deployment

# Related repositories
<table>
    <thead>
        <tr>
            <th>Repository name</th>
            <th>URL</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>myELGA_backend</td>
            <td>https://github.com/tolisApostolidis/myELGA_backend</td>
        </tr>
        <tr>
            <td>myELGA_database</td>
            <td>https://github.com/tolisApostolidis/myELGA_database</td>
        </tr>
        <tr>
            <td>myELGA_deployment</td>
            <td>https://github.com/tolisApostolidis/myELGA_deployment</td>
        </tr>
</table>