import * as ds from "@devicescript/core"
import "@devicescript/observables"
import { startLightBulb, startServo } from "@devicescript/servers"
import { pins } from "@dsboard/adafruit_qt_py_c3"

const lightBulb = startLightBulb({
    pin: pins.A1,
})

const servo = startServo({
    pin: pins.A2,
})

setInterval(async () => {
    await lightBulb.toggle()
}, 500)

let i = 0
setInterval(async () => {
    i++
    await servo.angle.write((i % 180) - 90)
}, 1)
