FROM maven:3.8.3-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17.0.1-jdk-slim
COPY --from=build /target/CalculatorApplication-0.0.1-SNAPSHOT.jar CalculatorApplication.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "CalculatorApplication.jar"]



FROM maven:3.8.4-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21
COPY --from=build /target/CalculatorApplication-0.0.1-SNAPSHOT.jar /opt/app/CalculatorApplication.jar
CMD ["java", "-jar", "/opt/app/CalculatorApplication.jar"]