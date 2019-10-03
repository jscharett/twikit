'use strict';

const formidable = require('formidable');
const { Transform } = require('stream');

function eolType(stringData) {
  return stringData.includes('\r\n')
    ? '\r\n'
    : stringData.includes('\n')
      ? '\n'
      : 'r';
}

function rowSplitter() {
  return new Transform({
    readableObjectMode: true,

    transform(chunk, encoding, callback) {
      const data = chunk.toString();
      this.push(data.split(eolType(data)));
      callback();
    }
  });
}

function commaSplitter () {
  return new Transform({
    readableObjectMode: true,
    writableObjectMode: true,

    transform(chunk, encoding, callback) {
      this.push(chunk.map((item) => {
        return item.split(',');
      }));
      callback();
    }
  });
}

function objectToString() {
  return new Transform({
    writableObjectMode: true,

    transform(chunk, encoding, callback) {
      this.push(JSON.stringify(chunk) + '\r\n');
      callback();
    }
  });
}


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

/**
 * Parse uploaded csv file and return as json
 * @param {Express.Request} req - Express Request object with the Request.body contaning the data
 * @param {*} res  - Express Response object
 */
function csvToJson(req, res) {
    (new formidable.IncomingForm()).parse(req, (err, fields, files) => {
      if (err) {
        validationError(res)(err);

        return;
      }
      const fs = require("fs");
      fs.exists(files.file.path, (exist) => {
        if (exist) {
          fs.createReadStream(files.file.path)
            .pipe(rowSplitter())
            .pipe(commaSplitter())
            .pipe(objectToString())
            .pipe(res);
        } else {
          validationError(res)(new Error("File does not exist. Check to make sure the file path to your csv is correct."));
        }
    })
  });
}

// Any functions we create, we want to return these functions to the express app to use.
module.exports = { csvToJson };
