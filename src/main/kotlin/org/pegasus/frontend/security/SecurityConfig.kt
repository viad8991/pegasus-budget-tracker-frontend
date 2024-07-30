package org.pegasus.frontend.security

import com.vaadin.flow.spring.security.VaadinWebSecurity
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity

@EnableWebSecurity
@Configuration
class SecurityConfig : VaadinWebSecurity() {

    override fun configure(http: HttpSecurity) {
        super.configure(http)
        setLoginView(http, LoginView::class.java)
    }

}