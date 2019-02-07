## React-chat-IO
small application inspired by socket.io
### Installation
##### Manually
Please, install firstly:
1. nodejs 
2. npm 
3. mongodb
4. After that, do next things
```sh
$ cd <directory>
$ npm install
$ systemctl start mongo (if you use systemd or statrt db by hands)
$ npm run build:prod 
$ npm start (server work only http protocol)
```
##### Docker
Please, install firstly:
1. docker
2. docker-compose
3. After that, do next things
```sh
$ cd <directory>
$ docker-compose build (possible you should start it with sudo command)
$ docker-compose up
```
After this, please check next address
```sh
localhost:5050
```
You can visit [Website](https://ivanobivan.github.io/react-chat-io/#/)

You can ask something in [Chat](https://kls-teamworkspace.slack.com/)

License
----
MIT