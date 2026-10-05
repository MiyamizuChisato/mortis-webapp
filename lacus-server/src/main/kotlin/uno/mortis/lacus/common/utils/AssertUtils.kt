package uno.mortis.lacus.common.utils

fun <T> T?.ifNull(block: () -> Unit) {
    if (this == null) {
        block()
    }
}

fun <T> T?.ifNotNull(block: () -> Unit) {
    if (this != null) {
        block()
    }
}

fun <T> T?.ifTrue(block: () -> Unit) {
    if (this == true) {
        block()
    }
}

fun <T> T?.ifFalse(block: () -> Unit) {
    if (this == false) {
        block()
    }
}