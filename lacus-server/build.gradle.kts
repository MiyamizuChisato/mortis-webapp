plugins {
    kotlin("jvm") version "2.3.21"
    kotlin("plugin.spring") version "2.3.21"
    id("org.springframework.boot") version "4.1.1"
    id("io.spring.dependency-management") version "1.1.7"
    kotlin("kapt") version "2.4.10"
}

group = "uno.mortis"
version = "0.0.1-SNAPSHOT"
description = "lacus-server"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(17)
    }
}

repositories {
    mavenCentral()
}

dependencies {
    kapt("org.mapstruct:mapstruct-processor:1.6.3")
    implementation("org.mapstruct:mapstruct:1.6.3")
    implementation("org.springframework.security:spring-security-crypto")
    implementation("com.baomidou:mybatis-plus-spring-boot4-starter:3.5.17")
    implementation("cn.dev33:sa-token-spring-boot4-starter:1.46.0")
    implementation("me.zhyd.oauth:JustAuth:1.16.7")
    implementation("org.springframework.boot:spring-boot-starter-webmvc")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("tools.jackson.module:jackson-module-kotlin")
    implementation("org.springframework.boot:spring-boot-starter-mail")
    implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
    implementation("org.redisson:redisson-spring-boot-starter:4.7.0")
    runtimeOnly("org.postgresql:postgresql")
    testImplementation("org.springframework.boot:spring-boot-starter-webmvc-test")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

kotlin {
    compilerOptions {
        freeCompilerArgs.addAll("-Xjsr305=strict", "-Xannotation-default-target=param-property")
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}
