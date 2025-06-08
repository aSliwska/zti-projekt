FROM docker.io/maven:3.9.9-amazoncorretto-23-alpine AS base

FROM base AS builder
COPY ./src ./src
COPY ./pom.xml ./pom.xml
RUN mvn clean package -DskipTests

FROM base AS runner
COPY --from=builder target/*.jar app.jar

ENV PORT=8080
ENTRYPOINT ["java", "-jar", "/app.jar"]