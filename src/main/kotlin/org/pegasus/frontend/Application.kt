package org.pegasus.frontend

import com.vaadin.flow.component.page.AppShellConfigurator
import com.vaadin.flow.theme.Theme
import com.vaadin.flow.theme.material.Material
import org.pegasus.frontend.backend.clientInitializer
import org.pegasus.frontend.security.securityInitializer
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.ApplicationContextInitializer
import org.springframework.context.support.GenericApplicationContext
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity

@SpringBootApplication
@EnableWebSecurity
@Theme(themeClass = Material::class)
class Application : AppShellConfigurator

fun main(args: Array<String>) {
    runApplication<Application>(*args)
}

object AppInitializer : ApplicationContextInitializer<GenericApplicationContext> {
    override fun initialize(applicationContext: GenericApplicationContext) {
        securityInitializer.initialize(applicationContext)
        clientInitializer.initialize(applicationContext)
    }
}
