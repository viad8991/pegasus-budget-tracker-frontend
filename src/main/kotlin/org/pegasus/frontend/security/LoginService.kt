package org.pegasus.frontend.security

import com.vaadin.flow.component.UI
import com.vaadin.flow.server.VaadinSession
import org.pegasus.frontend.backend.AuthorizationClient
import java.io.Serializable

class LoginService(private val authorizationClient: AuthorizationClient)  {

    private var token: String? = null

    fun login(username: String, password: String): Boolean {
        token = authorizationClient.login(username, password)
        VaadinSession.getCurrent().setAttribute("token", token)
//        Session["token"] = token
        UI.getCurrent().page.reload()
        return true
    }

    fun logout() {
        VaadinSession.getCurrent().close()
//        Session.current.close()
        UI.getCurrent().navigate("")
        UI.getCurrent().page.reload()
    }

    fun isLoggedIn() = token != null
}

data class User(val name: String) : Serializable
