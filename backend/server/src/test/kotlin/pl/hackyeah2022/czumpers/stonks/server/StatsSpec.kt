package pl.hackyeah2022.czumpers.stonks.server

import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.shouldBe

class StatsSpec : StringSpec({

    "should create stats object" {
        // when:
        val stats = Stats(1, 2, 3, 4)

        // then:
        stats.a shouldBe 1
        stats.b shouldBe 2
        stats.c shouldBe 3
        stats.d shouldBe 4
    }
})