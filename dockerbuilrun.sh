docker build -t smallwebserver .
docker run -tid --name smallwebserver -p 5555:80 smallwebserver
