# Prodigi
### Setup environment
You need to install [mongo]

You need to install node and npm [node.js]

> You may have to run the commands below maybe with sudo

Install jshint globaly
```sh
$ npm install -g jshint
```
Install jscs globaly
```sh
$ npm install -g jscs
```

Install gulp globaly
```sh
$ npm install -g gulp
```

Clone the repo and then go to prodigi folder
```sh
$ cd prodigi
```
change to dev branch
```sh
$ git checkout -b dev
```

pull dev branch
```sh
$ git pull origin dev
```

Install the packages
```sh
$ npm install
```

run  MongoDB
```sh
$ sudo mongod
```

run the front and api in dev version
```sh
$ gulp
```

> Only in master branch

run build version
```sh
$ gulp build
```

and open a new browser tab
[http://localhost:3000/]

[node.js]:http://nodejs.org
[mongo]:https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/
[http://localhost:3000/]:http://localhost:3000/
