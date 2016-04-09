module.exports = function () {
  var nodeEnv = process.env.NODE_ENV || 'localhost';
  console.log('Setting environment for ' + nodeEnv);

  if (nodeEnv === 'localhost') {
    return require('./config/localhost');
  } else {
    return require('./config/openshift');
  }
};
