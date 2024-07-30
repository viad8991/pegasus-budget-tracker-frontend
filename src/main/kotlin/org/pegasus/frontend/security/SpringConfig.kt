package org.pegasus.frontend.security

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.springframework.context.ApplicationContextInitializer
import org.springframework.context.support.GenericApplicationContext
import org.springframework.context.support.beans

val securityInitializer: ApplicationContextInitializer<GenericApplicationContext> = beans {

    bean<ObjectMapper> {
        jacksonObjectMapper()
    }

    bean<LoginService>()

}
