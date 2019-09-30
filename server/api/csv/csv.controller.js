'use strict';

/**
 * Handles validation errors and returns the error to the user.
 * @param {Express.Response} res - an Express Response object
 * @param {number} statusCode - the result status code number
 */
function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function (err) {
    return res.status(statusCode).json(err);
  };
}

function csvToJson() {
  return new Promise((resolve, reject) => {
    //TODO implement
    resolve([
      [1,2,3],
      [4,5,6],
      [7,8,9]
    ]);
  });
}


/**
 * Create a user and save it to the DB. We will send the user details in a POST request in the body of the post.
 * @param {Express.Request} req - Express Request object with the Request.body contaning the data
 * @param {*} res  - Express Response object
 */
function parse(req, res) {
  return csvToJson(req.body).then(function(conversion) { // then when the user saves
    res.json(conversion);
  }).catch(validationError(res)); // catch any errors
}

// Any functions we create, we want to return these functions to the express app to use.
module.exports = { parse };
