import dayjs from "dayjs";

function getMonthDayMartix(month = dayjs().month()) {

    /*
    Month index = 3
    prev month March = 31
    April total days = 30
    next month May   = 31


    start April 1 from Saturday [6]


    * */

    month = Math.floor(month)

    const year = dayjs().year();


    // start on day index 0 - 6
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();


    let currentMonthCount = 0 - firstDayOfTheMonth;
    // 0 = sunday
    // 6 = sat

    // first week.
    // [Su] 1st loop pull date previous that -6 date from now ==> 26-3-2023
    // [Mo] 2nd loop pull date previous that -5 date from now ==> 27-3-2023
    // [Tu] 3rd loop pull date previous that -4 date from now ==> 28-3-2023
    // [We] 4th loop pull date previous that -3 date from now ==> 29-3-2023
    // [Th] 5th loop pull date previous that -2 date from now ==> 20-3-2023
    // [Fr] 6th loop pull date previous that -1 date from now ==> 31-3-2023
    // [Sa] 7th loop pull date previous that 0 date from now ==> 01-3-2023

    // second week.
    // [Su] 1st loop pull date previous that 1 date from now ==> 2-3-2023
    // [Mo] 2nd loop pull date previous that 2 date from now ==> 3-3-2023
    // [Tu] 3rd loop pull date previous that 3 date from now ==> 4-3-2023
    // [We] 4th loop pull date previous that 4 date from now ==> 5-3-2023
    // [Th] 5th loop pull date previous that 5 date from now ==> 6-3-2023
    // [Fr] 6th loop pull date previous that 6 date from now ==> 7-3-2023
    // [Sa] 7th loop pull date previous that 7 date from now ==> 8-3-2023

    // third week
    // ....


    const daysMatrix = new Array(6).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return dayjs(new Date(year, month, currentMonthCount));
        });
    });
    return daysMatrix
}

export default getMonthDayMartix