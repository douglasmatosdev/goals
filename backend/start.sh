export ORIGIN_PATTERNS=http://localhost:3000,http://localhost:8080
export JWT_TOKEN_SECRET_KEY=53ccr37
export JWT_TOKEN_SECRET_EXPIRE_LENGTH=3600000
export DATABASE_NAME=goals_db
export DATABASE_HOST=localhost
export DATABASE_PORT=3306
export DATABASE_USERNAME=root
export DATABASE_PASSWORD=admin123
# douglas
./mvnw package -Dmaven.test.skip
java -jar target/*.jar