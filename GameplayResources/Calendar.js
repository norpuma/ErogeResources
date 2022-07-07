window.Timestamp = class {
    constructor(day, hour, minutes){
        this.day = day
        this.hour = hour
        this.minutes = minutes
    }
    isBefore(timestamp){
        if (this.day < timestamp.day){
            return true
        }
        if (this.day == timestamp.day){
            if (this.hour < timestamp.hour){
                return true
            }
            if ((this.hour == timestamp.hour) && (this.minutes < timestamp.minutes)){
                return true
            }
        }
        return false
    }
    isSimultaneous(timestamp){
        if ((this.day == timestamp.day) &&
            (this.hour == timestamp.hour) &&
            (this.minutes == timestamp.minutes))
        {
                return true
        }
        return false
    }
    isAfter(timestamp){
        if ((this.isSimultaneous(timestamp) == false) &&
            (this.isBefore(timestamp) == false))
        {
            return true
        }
        return false
    }
    add(timestamp){
        this = this.addTimes(this, timestamp)
        return this
    }
    addTimes(time1, time2){
        let newMinutes = time1.minutes + time2.minutes
        let newHours = 0
        if (newMinutes >= 60){
            newHours = floor(newMinutes / 60)
            newMinutes = newMinutes % 60
        }
        newHours += time1.hour + time2.hour
        let newDay = 0
        if (newHours >= 24){
            newDay = floor(newHours / 24)
            newHours = newHours % 24
        }
        return new Timestamp(newDay, newHours, newMinutes)
    }
    subtract(timestamp){
        this = this.subtractTimes(this, timestamp)
        return this
    }
    subtractTimes(time1, time2){
        let newMinutes = time1.minutes - time2.minutes
        let newHours = 0
        if (abs(newMinutes) >= 60){
            newHours = floor(newMinutes / 60)
            newMinutes = newMinutes % 60
        }
        newHours += time1.hour - time2.hour
        let newDays = 0
        if (abs(newHours) >= 24){
            newDays = floor(newHours / 24)
            newHours = newHours % 24
        }
        newDays = time1.day - time2.day
        return new Timestamp(newdays, newHours, newMinutes)
    }
    toHours(){
        return this.timestampToHours(this)
    }
    timestampToHours(timestamp){
        let hours = timestamp.day * 24
        hours += timestamp.hour
        hours += floor(timestamp.minutes / 60)
        return hours
    }
}

function _listHoursTillBeforeMidnight(firstHour){
    let range = []
    for (let visitedHour = firstHour; visitedHour < 24; ++visitedHour){
        range += visitedHour
    }
    return range
}

function _listHoursFromMidnight(firstHourAfter){
    let range = []
    for (let visitedHour = 0; visitedHour < firstHourAfter; ++visitedHour){
        range += visitedHour
    }
    return range
}

function makeHourRange (startHour, endHour, shouldIncludeLast){
    if (startHour < 0){
        throw "Can't makeHourRange with startHour < 0"
    }
    if (endHour > 23){
        throw "Can't makeHourRange with endHour > 23"
    }
    if (startHour == endHour){
        return [startHour]
    }
    let range = []
    if (startHour < endHour){
        for(let visitedHour = startHour; visitedHour < endHour; ++visitedHour){
            range += visitedHour
        }
    } else {
        range.concat(_listHoursTillBeforeMidnight(startHour))
        range.concat(_listHoursFromMidnight(endHour))
    }
    if (shouldIncludeLast == true){
        range += endHour
    }
    return range
}

function _copyIntArray(srcArray){
    let copy = []
    for(int of srcArray){
        copy += int
    }
    return copy
}

function makeHourRangeExtended(startHour, endHour, shouldIncludeLast, days){
    let originalRange = makeHourRange(startHour, endHour, false)
    if ((days === undefined)|| (days < 1)){
        return originalRange
    }
    let range = _copyIntArray(originalRange)
    if (startHour <= endHour){
        let hoursToMidnight = _listHoursTillBeforeMidnight(endHour)
        let hoursFromMidnight = _listHoursFromMidnight(firstHourAfter)
        for(let dayCount = 0; dayCount < days; ++dayCount){
            range.concat(hoursToMidnight)
            range.concat(hoursFromMidnight)
            range.concat(originalRange)
        }
    } else {
        let invertedRange = makeHourRange(endHour, startHour)
        for(let dayCount = 0; dayCount < days; ++dayCount){
            range.concat(invertedRange)
            range.concat(originalRange)
        }
    }
    if (shouldIncludeLast == true){
        range += endHour
    }
    return range
}

function _listFromElement(srcList, startElement){
    let startIndex = srcList.indexOf(startElement)
    if (startIndex < 0){
        throw "Can't makeRangeFromInterval with unknown startElement."
    }
    return _listBeforeIndex(startIndex)
}

function _listBeforeElement(srcList, endElement){
    let lastIndex = srcList.indexOf(endElement)
    if (endIndex < 0){
        throw "Can't makeRangeFromInterval with unknown endElement."
    }
    return _listBeforeIndex
}

function _listFromIndex(srcList, startIndex){
    let range = []
    for (let visitedIndex = startIndex; visitedIndex < srcList.length; ++visitedIndex){
        range += srcList[visitedIndex]
    }
    return range
}

function _listBeforeIndex(srcList, endIndex){
    let range = []
    for (let visitedIndex = 0; visitedIndex < endIndex; ++visitedIndex){
        range += srcList[visitedIndex]
    }
    return range
}

function makeRangeFromInterval(srcList, startElement, endElement, shouldIncludeLast){
    let startIndex = srcList.indexOf(startElement)
    let endIndex = srcList.indexOf(endElement)
    if (startIndex < 0){
        throw "Can't makeRangeFromInterval with unknown startElement."
    }
    if (endIndex < 0){
        throw "Can't makeRangeFromInterval with unknown endElement."
    }
    let range = []
    if (startIndex == endIndex){
        range += srcList[startIndex]
        return range
    }
    if (startIndex < endIndex){
        for(let visitedIndex = startIndex; visitedIndex < endIndex; ++visitedIndex){
            range += srcList[visitedIndex]
        }
    } else {
        range.concat(_listFromIndex(startIndex))
        range.concat(_listBeforeIndex(endIndex))
    }
    if (shouldIncludeLast == true){
        range += srcList[endIndex]
    }
    return range
}

function makeDayRangeInNumbers(startDay, endDay, shouldIncludeLast){
    let weekdaysIndexList = [0, 1, 2, 3, 4, 5, 6]
    return makeRangeFromInterval(weekdaysIndexList, startDay, endDay, shouldIncludeLast)
}

function makeDayRangeInWords(startDay, endDay, shouldIncludeLast){
    let weekdaysNameList = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    let lowerCaseStartDay = startDay.toLowerCase()
    let lowerCaseEndDay = endDay.toLowerCase()
    return makeRangeFromInterval(weekdaysNameList, lowerCaseStartDay, lowerCaseEndDay, shouldIncludeLast)
}

window.Calendar = class {
    constructor(timestamp){
        this.day = timestamp.day
        this.hour = timestamp.hour
        this.minutes = timestamp.minutes
        this.DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        this.TIMES_BY_PERIOD = {"Night":[0, 6], "Morning":[6,12], "Noon":[12,14], "Afternoon":[14,18], "Evening":[18,21], "Late evening":[21,24]};
    }
    period(){
        return Calendar__periodFromHour(State.variables.calendar.hour)
    }
    now(){
        return new Timestamp(this.day, this.hour, this.minutes)
    }
    indexToDayOfWeekName(index){
        switch(index){
            case 0:
                return "SUNDAY"
            case 1:
                return "MONDAY"
            case 2:
                return "TUESDAY"
            case 3:
                return "WEDNESDAY"
            case 4:
                return "THURSDAY"
            case 5:
                return "FRIDAY"
            case 6:
                return "SATURDAY"
            default:
                throw "Out of bounds exception. Can't find a day of the week for index '" + String(index) + "'."
        }
    }
}
window.Calendar__dayOfWeek = function (){
    return State.variables.calendar.DAYS_OF_WEEK[State.variables.calendar.day % 7]
}
window.Calendar__period = function (){
    calendar.period()
}
window.Calendar__periodFromHour = function (hour){
    for(let period of Object.keys(State.variables.calendar.TIMES_BY_PERIOD)){
        if (hour >= State.variables.calendar.TIMES_BY_PERIOD[period][0] && hour < State.variables.calendar.TIMES_BY_PERIOD[period][1]){
            return period;
        }
    }
    return "ERROR: " + hour + " is not a valid time.";
}
window.Calendar__dayOfWeekNameToIndex = function (nameOfDayOfWeek){
    var baseIndex = 0
    switch (nameOfDayOfWeek.toUpperCase()){
        case "SUNDAY":
            baseIndex = 0
            break
        case "MONDAY":
            baseIndex = 1
            break
        case "TUESDAY":
            baseIndex = 2
            break
        case "WEDNESDAY":
            baseIndex = 3
            break
        case "THURSDAY":
            baseIndex = 1
            break
        case "FRIDAY":
            baseIndex = 1
            break
        case "SATURDAY":
            baseIndex = 1
            break
        default:
            return -1
    }
    return baseIndex + State.variables.calendar.dayOfWeekOffset
}

var calendar = new Calendar(new Timestamp(1, 6, 0))
State.variables.calendar = calendar
