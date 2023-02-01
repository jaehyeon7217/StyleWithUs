FROM adoptopenjdk/openjdk11
WORKDIR /usr/app
COPY target/style-0.0.1-SNAPSHOT.jar stylewithus-server.jar
EXPOSE 8082
CMD ["java", "-jar", "stylewithus-server.jar", ">>", "logs/stylewithus.log"]