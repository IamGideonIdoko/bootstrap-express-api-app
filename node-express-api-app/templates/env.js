module.exports = appName => `APP_NAME='${appName}'
MONGODB_URI='mongodb://localhost:27017/${appName}_db'
JWT_SECRET='jwt_secret'
`;
