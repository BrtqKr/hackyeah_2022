plugins {
    kotlin("jvm") version "1.7.21"
    application
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("io.javalin:javalin:5.1.4")
    implementation("org.slf4j:slf4j-simple:2.0.3")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.14.0")

    runtimeOnly("io.kotest:kotest-assertions-core:5.5.4")
    runtimeOnly("io.kotest:kotest-property:5.5.4")

    testImplementation("io.kotest:kotest-runner-junit5:5.5.4")
}

application {
    mainClass.set("pl.hackyeah2022.czumpers.stonks.server.ApplicationKt")
}

tasks.withType<Test>().configureEach {
    useJUnitPlatform()
}