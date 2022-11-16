package pl.hackyeah2022.czumpers.stonks.server

import io.javalin.Javalin

fun main(args: Array<String>) {
    val app = Javalin.create().start(3000)

    app.ws("/server") { ws ->
        ws.onConnect { ctx ->
            println("Connected!")
        }

        ws.onMessage { ctx ->
            println("On message!")
            ctx.send(randomStats())
        }
    }
}