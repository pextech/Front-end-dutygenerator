docker build . -t pextech/dutygenfront:frontend &&\
docker run -it -p 8080:80 --name dutygenFront pextech/dutygen:frontend