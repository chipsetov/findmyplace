FROM maven:3.3-jdk-8
COPY . /usr/src/findmeplace/api
WORKDIR /usr/src/findmeplace/api
EXPOSE 8080
CMD ["mvn", "spring-boot:run"]