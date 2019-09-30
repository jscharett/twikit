const path = require('path');
const _ = require('lodash');

/**
 * Configuration settings for DB and application
 */
const all = {
  // secrets used to encrypt session data
  secrets: {
    session: 'sample-secret'
  },
  // Application Roles
  userRoles: ['guest', 'user', 'admin'],
};

// Export all settings
module.exports = _.merge(
  all
);
