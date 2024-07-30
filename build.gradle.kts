import org.gradle.internal.impldep.com.fasterxml.jackson.core.JsonPointer.compile
import org.springframework.boot.gradle.tasks.run.BootRun

plugins {

    checkstyle

    kotlin("jvm")
    kotlin("plugin.spring")
    kotlin("plugin.serialization")

    id("org.springframework.boot")
    id("io.spring.dependency-management")

    id("com.vaadin")
}

group = "org.pegasus"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_21
    targetCompatibility = JavaVersion.VERSION_21
}

repositories {
    mavenCentral()
}

extra["vaadinVersion"] = "24.4.7"

dependencies {
    implementation("com.vaadin:vaadin-spring-boot-starter:24.4.7")

    implementation(Spring.boot.rsocket)
    implementation(Spring.boot.webflux)
    implementation(Spring.boot.security)
    implementation(Spring.reactor.kotlin)

    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.17.2")

    implementation("com.vaadin:vaadin-spring-boot-starter:_")

    implementation("org.jetbrains.kotlin:kotlin-reflect:_")
    implementation(KotlinX.coroutines.reactor)

    testImplementation(Spring.boot.test)
    testImplementation(Spring.reactor.test)
    testImplementation(Kotlin.test.junit5)
    testRuntimeOnly("org.junit.platform:junit-platform-launcher:_")
}

dependencyManagement {
    imports {
        mavenBom("com.vaadin:vaadin-bom:${property("vaadinVersion")}")
    }
}

tasks {
    withType<Test> {
        useJUnitPlatform()
        minHeapSize = "256M"

        jvmArgs("-Dspring.profiles.active=test")
    }

    withType<BootRun> {
        jvmArgs("-Dspring.profiles.active=dev")
    }

    clean {
        delete(
            "${projectDir}/src/main/frontend/generated",
        )
    }
}

kotlin {
    jvmToolchain {
        languageVersion.set(JavaLanguageVersion.of(21))
    }

    compilerOptions {
        freeCompilerArgs.addAll("-Xjsr305=strict")
    }
}

vaadin {
    pnpmEnable = true
}

tasks.withType<Test> {
    useJUnitPlatform()
}
