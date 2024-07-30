package org.pegasus.frontend.security

import com.vaadin.flow.spring.security.VaadinWebSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.builders.WebSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity

//@EnableWebSecurity
//class SecurityConfiguration : VaadinWebSecurity() {
//
//    override fun configure(http: HttpSecurity?) {
//        super.configure(http)
//        setLoginView(http, LoginView::class.java)
//    }
//
//    override fun configure(web: WebSecurity?) {
//        web?.ignoring()?.requestMatchers(
//            "/error",
//        )
//        super.configure(web)
//    }
//}
