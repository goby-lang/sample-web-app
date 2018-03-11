FROM gobylang/goby:v0.1.8.1

RUN go get github.com/jmoiron/sqlx
RUN go get github.com/lib/pq

ADD . ./

CMD goby server.gb --bind 0.0.0.0:$PORT wsgi
