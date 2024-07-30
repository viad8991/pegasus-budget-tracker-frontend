package org.pegasus.frontend.ui

import com.vaadin.flow.component.button.Button
import com.vaadin.flow.component.notification.Notification
import com.vaadin.flow.component.orderedlayout.VerticalLayout
import com.vaadin.flow.router.PageTitle
import com.vaadin.flow.router.Route
import com.vaadin.flow.router.RouteAlias
import jakarta.annotation.security.PermitAll
import org.pegasus.frontend.MainView
import org.pegasus.frontend.security.AuthenticatedUser

@PageTitle("Hello World")
@Route(value = "hello", layout = MainView::class)
@RouteAlias(value = "", layout = MainView::class)
@PermitAll
class HWView(val authenticatedUser: AuthenticatedUser) : VerticalLayout() {

    private val sayHello = Button("Say hello!")

    init {

//        VaadinSession.getCurrent().setAttribute("foo", new Object ());

        sayHello.addClickListener { _ ->
            Notification.show("Hello " + authenticatedUser.get()?.name)
        }

        add(sayHello)
    }
}