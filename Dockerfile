FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

ENV PORT=4080
EXPOSE 4080
ENTRYPOINT ["sh", "-c", "java -Xmx380m -Dserver.port=${PORT} -jar app.jar"]