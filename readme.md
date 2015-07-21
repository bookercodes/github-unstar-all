![](https://d13yacurqjgara.cloudfront.net/users/2014/screenshots/1095158/attachments/137262/octocat.svg)

#GitHub Unstar All

:fallen_leaf: _Start anew. Unstar all of the repositories you once starred on GitHub._

##CLI

```
$ npm install --global github-unstar-all
```
```
$ github-unstar-all <username> <password>
```

_:warning: Running this command will **irreversibly** unstar all of your [starred repositories](https://github.com/stars)!_

##API

```
$ npm install --save-dev github-unstar-all
```

```javascript
var unStarAll = require('github-unstar-all');

unStarAll("<username>", "<password>", function (error) {
  if (error) {
    console.log('error', error);
    return;
  }
  console.log('done.');
});
```

##Related

- [`github-unfollow-everyone`](https://github.com/alexbooker/github-unfollow-everyone)
