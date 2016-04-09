module.exports = {
  mongoDbUrl: 'mongodb://' + process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' + process.env.OPENSHIFT_MONGODB_DB_PASSWORD + '@' + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' + process.env.OPENSHIFT_MONGODB_DB_PORT + '/' + process.env.OPENSHIFT_APP_NAME,
  serverAddress: process.env.OPENSHIFT_NODEJS_IP,
  serverPort: process.env.OPENSHIFT_NODEJS_PORT,
};
