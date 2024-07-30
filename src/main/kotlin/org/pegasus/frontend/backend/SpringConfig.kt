package org.pegasus.frontend.backend

import org.springframework.context.ApplicationContextInitializer
import org.springframework.context.support.GenericApplicationContext
import org.springframework.context.support.beans
import org.springframework.web.reactive.function.client.WebClient


val clientInitializer: ApplicationContextInitializer<GenericApplicationContext> = beans {

    bean<WebClient> {
        WebClient.create("http://localhost:8080")
    }

    bean<AuthorizationClient>()

}
