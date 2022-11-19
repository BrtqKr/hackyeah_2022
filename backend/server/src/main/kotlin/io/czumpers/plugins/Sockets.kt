package io.czumpers.plugins

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import io.czumpers.randomStats
import io.ktor.server.application.*
import io.ktor.server.routing.*
import io.ktor.server.websocket.*
import io.ktor.websocket.*
import java.time.Duration

fun Application.configureSockets() {
    install(WebSockets) {
        pingPeriod = Duration.ofSeconds(15)
        timeout = Duration.ofSeconds(15)
        maxFrameSize = Long.MAX_VALUE
        masking = false
    }

    val mapper = jacksonObjectMapper()

    routing {
        webSocket("/server") {
            println("Connected")

            val frame = incoming.receive()
            incoming.iterator()
            for (frame in incoming) {
                frame as? Frame.Text ?: continue

                val text = frame.readText()
                println("Received frame: $text")
                send(mapper.writeValueAsString(randomStats()))
            }
        }
    }
}
