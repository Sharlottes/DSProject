import "@devicescript/observables";
import { debounceTime } from "@devicescript/observables";
import { startPotentiometer, startServo } from "@devicescript/servers";
import { pins } from "@dsboard/adafruit_qt_py_c3";

// 오차범위
const Max_Error_Range = 5;

const servo = startServo({
    pin: pins.A2,
});
await servo.enabled.write(true);

const potentio = startPotentiometer({
    pin: pins.A3,
});

potentio.reading
    .pipe(
        debounceTime(10) // 0.01초마다
    )
    .subscribe(async rot => {
        const prev = await servo.angle.read();
        const curr = rot * 180 - 90;
        await servo.angle.write(
            prev + Math.clamp(-Max_Error_Range, curr - prev, Max_Error_Range)
        );
    });
