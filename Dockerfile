FROM ubuntu

COPY ./HelloGaming/ /var/www/html
RUN	apt-get update && \
	apt-get install lighttpd  -y

CMD service lighttpd start && /bin/bash
