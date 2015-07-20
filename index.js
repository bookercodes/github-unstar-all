'use strict';

var GitHub = require('github');
var async = require('async');

var github = new GitHub({
  version: '3.0.0'
});

function fetchAllStars(done) {
  (function fetch(page, result) {
    var PER_PAGE = 100;
    github.repos.getStarred({
      page: page,
      per_page: PER_PAGE
    }, function(error, repos) {
      if (error) {
        done(error);
        return;
      }
      // aggregate starred repos
      result = result.concat(repos);
      var next = repos.length === PER_PAGE;
      if (next) {
        fetch(page + 1, result);
        return;
      }
      done(null, result);
    });
  })(1, []);
}

function unStarAll(repos, done) {
  async.each(
    repos,
    function(repo, done) {
      github.repos.unStar({
        user: repo.owner.login,
        repo: repo.name
      }, function(error, response) {
        done(error, response);
      });
    },
    done
  );
}

module.exports = function(username, password, done) {
  github.authenticate({
    type: 'basic',
    username: username,
    password: password
  });
  fetchAllStars(function(error, repos) {
    if (error) {
      done(error);
      return;
    }
    unStarAll(repos);
  });
};
