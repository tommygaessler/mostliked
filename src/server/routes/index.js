const express = require('express');
const router = express.Router();
const http = require('http');
const request = require('request');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.SECRET_ID;
const redirect_uri = process.env.REDIRECT_URI;

router.get('/', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Welcome to Express!';
  res.render('index', renderObject);
});

router.get('/authenticate', function(req, res, next) {
  res.redirect(`https://api.instagram.com/oauth/authorize/?client_id=${client_id}&redirect_uri=http://localhost:3000/mostliked&response_type=code`);
});

router.get('/mostliked', function(req, res, next) {

  request({
    uri: 'https://api.instagram.com/oauth/access_token',
    method: 'POST',
    form: {
      client_id,
      client_secret,
      grant_type: 'authorization_code',
      redirect_uri,
      code: req.query.code
    }
  }, function(error, response, body) {
    body = JSON.parse(body);
    const access_token = body.access_token;

    request({
      uri: `https://api.instagram.com/v1/users/self/media/recent/?access_token=${access_token}`,
      method: 'GET'
    }, function(error, response, media) {
      media = JSON.parse(media);
      console.log(media);
      res.send(media);
    });
  });
});

module.exports = router;
