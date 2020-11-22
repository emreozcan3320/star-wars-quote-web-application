# Build Stage
FROM maven:3.6-openjdk-8-slim AS build
COPY pom.xml /app/
COPY src /app/src
RUN mvn -DskipTests -f /app/pom.xml clean package

# Run Stage
FROM openjdk:8-jre-alpine
COPY --from=build /app/target/crud-application*.jar /app/app.jar
ENTRYPOINT ["java", "-XX:+UnlockExperimentalVMOptions", "-XX:+UseCGroupMemoryLimitForHeap","-Djava.security.egd=file:/dev/./urandom","-jar","/app/app.jar"]
