package org.pegasus.frontend.security

import com.vaadin.flow.component.html.Div
import com.vaadin.flow.component.html.H1
import com.vaadin.flow.component.login.LoginForm
import com.vaadin.flow.component.notification.Notification
import com.vaadin.flow.component.orderedlayout.FlexComponent
import com.vaadin.flow.component.orderedlayout.FlexComponent.JustifyContentMode
import com.vaadin.flow.component.orderedlayout.VerticalLayout
import com.vaadin.flow.router.BeforeEnterEvent
import com.vaadin.flow.router.BeforeEnterObserver
import com.vaadin.flow.router.PageTitle
import com.vaadin.flow.router.Route
import org.pegasus.frontend.backend.AuthorizationClient

@Route("login")
@PageTitle("Login")
class LoginView(val loginService: LoginService) : VerticalLayout(), BeforeEnterObserver {

    private var loginForm: LoginForm = LoginForm().also {
        addClassName("login-view")
        setSizeFull()
        alignItems = FlexComponent.Alignment.CENTER
        justifyContentMode = JustifyContentMode.CENTER
        it.action = "login"
        it.addLoginListener { event ->
            val token = loginService.login(event.username, event.password)
            Notification.show("Login successful $token")
        }
    }

    init {
        add(
            H1("Vaadin"),
            Div("You can log in as 'user/user' or 'admin/admin'"),
            loginForm
        )
    }

    override fun beforeEnter(event: BeforeEnterEvent) {
        loginForm.isError = event.location.queryParameters.parameters.containsKey("error")
    }
}
