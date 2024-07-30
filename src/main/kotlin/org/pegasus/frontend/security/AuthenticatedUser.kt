package org.pegasus.frontend.security

import com.vaadin.flow.server.VaadinServletRequest
import com.vaadin.flow.server.VaadinServletResponse
import com.vaadin.flow.spring.security.AuthenticationContext
import jakarta.servlet.http.Cookie
import jakarta.servlet.http.HttpServletRequest
import org.springframework.security.authentication.AnonymousAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.core.context.SecurityContextHolder

class AuthenticatedUser(private val authenticationContext: AuthenticationContext) {

    private fun getAuthentication(): Authentication? {
        val context: SecurityContext = SecurityContextHolder.getContext()
        return if (context.authentication !is AnonymousAuthenticationToken) {
            context.authentication
        } else {
            null
        }
    }

    fun get() = getAuthentication()

    fun logout() {
        authenticationContext.logout()
        clearCookies()
    }

    private fun clearCookies() {
        clearCookie("jwt.headerAndPayload")
        clearCookie("jwt.signature")
    }

    private fun clearCookie(cookieName: String) {
        val request = VaadinServletRequest.getCurrent().httpServletRequest
        val response = VaadinServletResponse.getCurrent().httpServletResponse
        val cookie = Cookie(cookieName, null).apply {
            path = getRequestContextPath(request)
            maxAge = 0
            secure = request.isSecure
            isHttpOnly = false
        }
        response.addCookie(cookie)
    }

    private fun getRequestContextPath(request: HttpServletRequest): String {
        val contextPath = request.contextPath
        return if ("" == contextPath) "/" else contextPath
    }
}