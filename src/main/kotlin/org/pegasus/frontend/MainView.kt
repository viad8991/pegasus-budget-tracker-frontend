package org.pegasus.frontend

import com.vaadin.flow.component.applayout.AppLayout
import com.vaadin.flow.component.html.H2
import com.vaadin.flow.component.html.Span
import com.vaadin.flow.router.HasDynamicTitle
import com.vaadin.flow.router.PageTitle
import com.vaadin.flow.server.auth.AccessAnnotationChecker
import com.vaadin.flow.theme.lumo.LumoUtility.*
import org.pegasus.frontend.security.AuthenticatedUser

class MainView(
    val authenticatedUser: AuthenticatedUser,
    val accessAnnotationChecker: AccessAnnotationChecker
) : AppLayout() {

    private val viewTitle: H2 = H2()

    init {
        addDrawerContent()
    }

    private fun addDrawerContent() {
        val spanAppName = Span("Vaadin Chat").also { span ->
            span.addClassNames(
                AlignItems.CENTER,
                Display.FLEX,
                FontSize.LARGE,
                FontWeight.SEMIBOLD,
                Height.XLARGE,
                Padding.Horizontal.MEDIUM
            )
        }

        primarySection = Section.DRAWER

        addToDrawer(spanAppName)
    }

    override fun afterNavigation() {
        super.afterNavigation()
        viewTitle.text = when (content) {
            null -> ""
            is HasDynamicTitle -> (content as HasDynamicTitle).pageTitle
            else -> content.javaClass.getAnnotation(PageTitle::class.java)?.value ?: ""
        }
    }
}
