plugins {
    application
    groovy
    id("org.springframework.boot") version "2.7.5"
    id("io.spring.dependency-management") version "1.0.15.RELEASE"
}

group = "czumpers.io"
version = "0.0.1-SNAPSHOT"

repositories {
    mavenCentral()
}

application {
    mainClass.set("io.czumpers.authserver.Application")
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")

    // Spock
    implementation(platform("org.apache.groovy:groovy-bom:4.0.5"))
    implementation("org.apache.groovy:groovy")

    developmentOnly("org.springframework.boot:spring-boot-devtools")
    testImplementation("org.springframework.boot:spring-boot-starter-test")

    // Spock
    testImplementation(platform("org.spockframework:spock-bom:2.3-groovy-4.0"))
    testImplementation("org.spockframework:spock-core")
    testImplementation("org.spockframework:spock-junit4")
}

tasks.named<Test>("test") {
    useJUnitPlatform()
}
