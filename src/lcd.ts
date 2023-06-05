import * as ds from "@devicescript/core"

const screen = new ds.CharacterScreen()
const clock = new ds.RealTimeClock()

clock.reading.subscribe(async numbers => {
    await screen.message.write(wrapString(toDateString(numbers, true), 16))
})

const date_of_week_LUT = ["월", "화", "수", "목", "금", "토", "일"]
function toDateString(
    numbers: [number, number, number, number, number, number, number],
    pmam = false
) {
    const [year, month, date_of_month, date_of_week, hour, minute, second] =
        numbers
    const week = date_of_week_LUT[date_of_week]
    return `${year}년 ${month}월 ${date_of_month}일 ${week}요일 ${
        pmam
            ? hour >= 12
                ? `오후 ${hour - 12}시`
                : `오전 ${hour}시`
            : `${hour}시`
    } ${minute}분 ${second}초`
}
function wrapString(string: string, length: number) {
    if (string.length <= length) return string

    return `${string.slice(0, length)}\n${string.slice(length)}`
}
