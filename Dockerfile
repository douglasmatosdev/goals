FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY target/goals-1.0.0.jar goals-1.0.0.jar
EXPOSE 8080
CMD [ "java", "-jar", "goals-1.0.0.jar" ]