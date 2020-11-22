![alt text](https://cdn-images-1.medium.com/max/1200/1*1Ir-RKAMQm5BZuV77FbGgA.png)

# Star Wars Quote Application

![alt text](https://cdn-images-1.medium.com/max/1200/1*RgrRNmej-AjyDZFmcohkRA.png)

This application is a part of a Medium Post named as **Use Docker and Docker-Compose for MySql, PhpMyAdmin, Spring Boot, Angular Stack CRUD Web Application Development**. It is about using docker containers for local development and managing docker containers with docker-compose. The application developed for Medium post is a CRUD web application that uses Angularfront-end,  Spring Boot back-end, MySql databases. Also, there is PhpMyAdmin for database visualization.

### Prerequisites
In order to run this application, you need to install two tools: **Docker** & **Docker Compose**.
Instructions how to install **Docker** on [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/), [Windows](https://docs.docker.com/docker-for-windows/install/) , [Mac](https://docs.docker.com/docker-for-mac/install/) .

### How to run it?
An entire application can be run with a single command in a terminal:
```
$ docker-compose up -d
```
If you want to stop it use the following command:
```
$ docker-compose down
```
---
#### Database

MySql database contains a ```crud-application``` table for application .

After running the app it can be accessed using these connectors:


- Host: *localhost*
- Database: *crud-application*
- User: *root*
- Password: *password*


Like other parts of the application MySql database is containerized and
the definition of its Docker container can be found in
*docker-compose.yml* file.

```yml
mysql-db:  
  image: mysql  
  restart: always  
  container_name: mysql-db  
  environment:  
    MYSQL_ROOT_PASSWORD: 'password'  
  MYSQL_DATABASE: 'crud-application'  
  ports:  
    - 3306:3306 
  volumes:  
    - ./dump.sql:/docker-entrypoint-initdb.d/dump.sql
```
#### Database Visualization

PhpMyAdmin is used for database visualization.

It can be reachable using the link: **http://localhost:8081/**

Like other parts of the application PhpMyAdmin is containerized and
the definition of its Docker container can be found in
*docker-compose.yml* file.

```yml
php-my-admin:  
  image: phpmyadmin  
  restart: always  
  container_name: php-my-admin  
  ports:  
    - 8081:80 
```


#### Back-end 

This is a Spring Boot (Java) based application that connects with a
database and exposes the REST endpoints that can be consumed by
the frontend. It supports multiple HTTP REST methods such as GET, POST, PUT and DELETE for one resource -Quote.

This app is also put in Docker container and its detail can be found
in *BE/Dockerfile* and *docker-compose.yml* file.
```Dockerfile
# Build Stage  
FROM maven:3.6-openjdk-8-slim AS build  
COPY pom.xml /app/  
COPY src /app/src  
RUN mvn -DskipTests -f /app/pom.xml clean package  
  
# Run Stage  
FROM openjdk:8-jre-alpine  
COPY --from=build /app/target/crud-application*.jar /app/app.jar  
ENTRYPOINT ["java", "-XX:+UnlockExperimentalVMOptions", "-XX:+UseCGroupMemoryLimitForHeap","-Djava.security.egd=file:/dev/./urandom","-jar","/app/app.jar"]
```

```yml
springboot-app:   
  build: ./BE  
    container_name: springboot-app    
  environment:  
      MYSQL_HOST: 'mysql-db'  
      MYSQL_USER: 'root'  
      MYSQL_PASSWORD: 'password'  
      MYSQL_DATABASE: 'crud-application'   
  links:  
      - mysql-db
```

#### Front-end

This is a real endpoint for a user where they can manipulate their
quotes. It consumes the REST API endpoints provided by
*BE*.

It can be reachable using the link: **http://localhost:4200/**

This app is also put in Docker container and its detail can be found
in *FE/Dockerfile* and *docker-compose.yml* file.

```Dockerfile
# Build Stage  
FROM node:12.7-alpine AS build  
WORKDIR /app  
COPY package*.json /app/  
RUN npm install  
RUN npm install -g @angular/cli@7.3.9  
COPY ./ /app/  
RUN ng build --extract-css --output-path=dist --prod=true  
  
  
# Run Stage  
FROM nginx:1.17.1-alpine  
COPY default.conf /etc/nginx/conf.d/default.conf  
COPY --from=build /app/dist /usr/share/nginx/html
```

```yml
angular-app:   
  build: ./FE  
  container_name: angular-app  
  ports:  
    - 4200:4200 
  links:  
    - springboot-app
```

