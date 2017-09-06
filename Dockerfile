FROM gobylang/goby:v0.1.2

ADD . ./

CMD goby server.gb --bind 0.0.0.0:$PORT wsgi
