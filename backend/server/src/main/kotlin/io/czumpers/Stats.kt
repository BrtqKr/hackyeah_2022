package io.mzlnk

import java.util.*

data class Stats(val a: Int, val b: Int, val c: Int, val d: Int)

fun randomStats(): Stats {
    val r = Random()
    return Stats(r.nextInt(20), r.nextInt(20), r.nextInt(20), r.nextInt(20))
}
