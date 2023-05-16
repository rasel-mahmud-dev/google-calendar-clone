import dayjs from "dayjs";

function getDayClass(day, daySelected) {
    const format = "DD-MM-YY";

    const nowDay = dayjs().format(format);
    const nowDate = dayjs(new Date())

    const currDay = day.format(format);
    const slcDay = daySelected && dayjs(daySelected).format(format);



    if (nowDay === currDay) {
        return "today";
    } else if (currDay === slcDay) {
        return "selected-date";
    } else if (nowDate.year() === day.year() && nowDate.month() === day.month()) {
        return "current-month"
    } else {
        return ""
    }
}


export default getDayClass