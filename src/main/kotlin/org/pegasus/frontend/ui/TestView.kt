package org.pegasus.frontend.ui

import com.vaadin.flow.component.html.Div
import com.vaadin.flow.component.orderedlayout.VerticalLayout
import com.vaadin.flow.router.Route

@Route(value = "test")
class TestView : VerticalLayout() {

    init {
        setSizeFull()

        add(Div("aksdhkuashdkljashdkjh"))
    }

}