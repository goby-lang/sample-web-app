FROM gobylang/goby:latest

ADD . ./

CMD goby server.gb --bind 0.0.0.0:$PORT wsgi
