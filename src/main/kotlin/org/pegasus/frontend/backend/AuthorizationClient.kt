package org.pegasus.frontend.backend

import org.springframework.web.reactive.function.client.WebClient
import reactor.core.publisher.Mono

class AuthorizationClient(val client: WebClient) {

    private val BASE_PATH_V1 = "/api/v1/user"

    fun login(username: String, password: String): String {
        println("new $username $password")
        val jwt = client.post()
            .uri("$BASE_PATH_V1/login")
            .body(Mono.just(LoginRequest(username, password)), LoginRequest::class.java)
            .retrieve()
            .bodyToMono(LoginResponse::class.java)
            .doOnError { error -> println(error.message) }
            .block()
            ?.jwt

        println("jwt $jwt")
        requireNotNull(jwt)

        return jwt

    }

    data class LoginRequest(val username: String, val password: String)

    data class LoginResponse(val jwt: String)
}