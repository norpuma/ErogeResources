class ScheduleTime {
    constructor(days, startHours){
        // days must be a list of integers with values between 0 and 6 to represent days of the week when the schedule applies.
        this.days = days
        // startHours must be a list of integers with values between 0 and 23 to represent hours of the day at which the activity may start.
        this.startHours = startHours
        this.minimumDuration = 1
        this.standardDuration = 1
        this.endTime = undefined
        this.endTimeFunction = undefined
    }
    setMinimumDuration(minimumDuration){
        this.minimumDuration = minimumDuration
        if (minimumDuration > this.standardDuration){
            this.standardDuration = minimumDuration
        }
    }
    setStandardDuration(standardDuration){
        if(standardDuration < this.minimumDuration){
            this.minimumDuration = standardDuration
        }
    }
    evaluateDurationAndEndTime(startTime){
        let duration = this.standardDuration
        let endTimeCandidate = startTime.addTimes(startTime, duration)
        let endTimeLimit = undefined
        if (this.endTime === undefined) {
            if (this.endTimeFunction !== undefined){
                endTimeLimit = this.endTimeFunction(startTime)
                duration = endTimeLimit.subtract(startTime)
            }
        } else {
            endTimeLimit = this.endTime
            duration = endTimeLimit.subtract(startTime)
        }
        if (endTimeLimit === undefined){
            return {duration: duration, endTime: endTimeCandidate}
        } else {
            if (endTimeLimit.isAfter(endTimeCandidate) == false){
                return {duration: duration, endTime: endTimeCandidate}
            }
            endTimeCandidate = startTime.subtract(endTimeLimit)
            if (endTimeCandidate.toHours() < this.minimumDuration){
                return undefined
            }
            return {duration: duration, endTime: endTimeCandidate}
        }
    }
}

class SchedulingData {
    constructor(times, priority, isAppointment, canRepeateOnSameDay, addToPlanConditions, addToPlanConditionalFunction, skippedDuringPlanningFunction, participants){
        // times is a list of ScheduleTime objects.
        this.times = times
        if (priority === undefined){
            this.basePriority = 0
        } else {
            this.basePriority = priority
        }
        this.priority = this.basePriority
        if (isAppointment === undefined){
            this.isAppointment = false
        } else {
            this.isAppointment = isAppointment
        }
        if (canRepeateOnSameDay === undefined){
            this.canRepeateOnSameDay = false
        } else {
            this.canRepeateOnSameDay = canRepeateOnSameDay
        }
        this.addToPlanConditions = addToPlanConditions
        this.addToPlanConditionalFunction = addToPlanConditionalFunction
        this.skippedDuringPlanningFunction = skippedDuringPlanningFunction
        if (participants === undefined){
            this.participants = []
        } else {
            this.participants = participants
        }
        if (this.isAppointment == true && priority === undefined){
            this.basePriority = 10
        }
        if (this.isAppointment == true && skippedDuringPlanningFunction === undefined){
            this.skippedDuringPlanningFunction = this._defaultIncrementAppointmentPriority
            if (this.plannedConsequenceFunction === undefined){
                this._defaultResetPriority()
            }
        }
    }
    _defaultIncrementAppointmentPriority(){
        this.priority += 10
    }
    _defaultResetPriority(){
        this.priority = this.basePriority
    }
}

window.Activity = class {
    constructor(identifier, schedulingData, location, shortDescription, shortDescriptionCallable, ostensiveObservationDescription, ostensiveObservationDescriptionCallable){
        if (identifier === undefined){
            throw "Activity may not be created with 'identifier' undefined."
        }
        if (schedulingData === undefined){
            throw "Activity may not be created with schedulingData undefined."
        }
        if (location === undefined){
            throw "Activity may not be created with location undefined."
        }
        if (shortDescription === undefined && shortDescriptionCallable === undefined){
            throw "Activity may not be created with shortDescription and shortDescriptionCallable undefined."
        }
        if (ostensiveObservationDescription === undefined && ostensiveObservationDescriptionCallable === undefined){
            throw "Activity may not be created with ostensiveObservationDescription and ostensiveObservationDescriptionCallable undefined."
        }
        this.identifier = identifier
        this.schedule = schedulingData
        this.location = location

        this.shortDescription = shortDescription
        this.shortDescriptionCallable = shortDescriptionCallable
        this.ostensiveObservationDescription = ostensiveObservationDescription
        this.ostensiveObservationDescriptionCallable = ostensiveObservationDescriptionCallable

        if (priority === undefined){
            this.basePriority = 0
        } else {
            this.basePriority = priority
        }
        this.priority = this.basePriority
        if (tags === undefined){
            this.tags = []
        } else {
            this.tags = tags
        }

        this.unseenInspectionDescription = unseenInspectionDescription
        this.unseenInspectionDescriptionPassage = unseenInspectionDescriptionPassage
        if (interactions === undefined){
            this.interactions = []
        } else {
            this.interactions = interactions
        }
        this.conditionalFunction = conditionalFunction
        this.setupFunction = setupFunction
        this.aftermathFunction = aftermathFunction
        this.plannedConsequenceFunction = plannedConsequenceFunction
        this.skippedFunction = skippedFunction
    }
    sortFunction(activity){
        // This must return the value for an array sort: negative number if a is lesser than b; 0 if they have the same sorting position; positive number if they a is greater than b.
        // Sort by descending priority.
        if ((this.priority - activity.priority) > 0){
            return 1
        }
        // If they have the same priority, sort by startsAt.
        if (this.priority == activity.priority){
            if (this.startsAt.isBefore(activity.startsAt) == true){
                return 1
            }
            if (this.isSimultaneous(activity.startsAt) == true){
                return 0
            }
        }
        return -1
    }
    checkAddToPlanConditions(){
        if (this.addToPlanConditions !== undefined){
            if (eval(this.addToPlanConditions) == true){
                return true
            } else {
                return false
            }
        }
        if (this.addToPlanConditionalFunction !== undefined){
            if (this.addToPlanConditionalFunction() == true){
                return true
            } else {
                return false
            }
        }
        return true
    }
    resolvePlannedConsequence(){
        if (this.plannedConsequenceFunction !== undefined){
            this.plannedConsequenceFunction()
        }
    }
    setup(){
        if ((this.conditionalFunction !== undefined) && (this.conditionalFunction() == false)){
            return false
        }
        if (this.setupFunction !== undefined){
            this.setupFunction()
        }
        return true
    }
}

class ScheduledActivity {
    constructor(activity, startHour, duration){
        this.activity = activity
        this.startHour = startHour
        this.duration = duration
    }
}

window.CharacterDayPlanner = class {
    constructor (){
        this.todaysActivitiesByStartHour = {}
        this.todaysActivitiesByLocation = {}
        this.todaysUnoccupiedHours = this._resetTodaysUnoccupiedHours()
        this.registeredActivitiessByWeekDay = {"sunday": [], "monday": [], "tuesday": [], "wednesday": [], "thursday": [], "friday": [], "staturday": []}
        this.prearedDay = -1
        this.lastDayPlanned = -1
    }
    _resetTodaysUnoccupiedHours(){
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    }
    registerActivity(activity){
        for(schedulableTimes of activity.schedule.times){
            for (weekDay of schedulableTimes.days){
                this.registeredActivitiessByWeekDay[weekDay] += activity
            }
        }
    }
    prepareForPlanning(day){
        if (day === undefined){
            day = calendar.now().day
        }
        this.preparedDay = day
        let weekday = calendar.indexToDayOfWeekName(currentTimestamp.day)
        this.todaysUnoccupiedHours = this._resetTodaysUnoccupiedHours()
        // This sorts by priority and for the same priority, sorts by startsAt.
        
        this.registeredActivitiessByWeekDay[weekDay].sort((a, b) => a.sortFunction(b))
        this.lastDayPlanned = day
        this.todaysHighestPriorityValue = this.registeredActivitiessByWeekDay[weekday].priority
    }
    planForDay(day){
        if (day === undefined){
            day = calendar.now().day
        }
        if (this.prearedDay != day){
            this.prepareForPlanning(day)
        }
        let repeatableActivities = []
        for(activity of this.registeredActivitiessByWeekDay[weekDay]){
            if (activity.checkAddToPlanConditions() == true){
                if ((this.tryAddActivityToDay(activity, weekday) == false) && (activity.skippedDuringPlanningFunction !== undefined)) {
                    activity.skippedDuringPlanningFunction()
                } else {
                    if (this.todaysUnoccupiedHours.length <= 0){
                        return
                    }
                    if (activity.canRepeateOnSameDay == true){
                        repeatableActivities += activity
                    }
                }
            }
        }
        let allHoursAreScheduled = false
        for(let index = 0; allHoursAreScheduled == false; ++index){
            if (index >= repeatableActivities.length){
                index = 0
            }
            activity = repeatableActivities[index]
            this.tryAddActivityToDay(activity, weekday)
            if (this.todaysUnoccupiedHours.length <= 0){
                allHoursAreScheduled = true
            }
        }
        this.todaysActivitiesByStartHour.sort((a, b) => a.startHour - b.startHour)
    }
    tryAddActivityToDay(activity, weekday){
        for(schedulableTimes of activity.schedule.times.startTimes){
            if (schedulableTimes.days.includes(weekDay)){
                if (this.tryAddScheduleToDay(activity, schedulableTimes, activity.schedule.participants) == true){
                    return true
                }
            }
        }
        return false
    }
    tryAddScheduleToDay(activity, schedulableTimes, activityParticipants){
        for(startHour of schedulableTimes.startHours){
            if (this.todaysUnoccupiedHours.includes(startHour)){
                if (this.tryAddScheduleTimeToDay(activity, schedulableTimes, startHour, activityParticipants) == true){
                    return true
                }
            }
        }
        return false
    }
    tryAddScheduleTimeToDay(activity, schedulableTimes, startHour, activityParticipants){
        let durationAndEndTime = schedulableTimes.evaluateDurationAndEndTime(startHour)
        let duration = durationAndEndTime.duration
        let endTime = durationAndEndTime.endTime
        if (endTime.hour > startHour){
            finalDuration = this.checkAvailability(startHour, duration, schedulableTimes.minimumDuration)
        // } else {
        //     // TODO: Write code for when an activity crosses from one day into the other. **** This will require the next day to accept hours being blocked before it is fully scheduled!
        //     ;
        }
        if (finalDuration > 0){
            finalDuration = this.checkParticipantsAvailability(activityParticipants, startHour, finalDuration, minimumDuration)
            if (finalDuration < 1){
                return false
            }
            this.occupyHours(startHour, finalDuration, activity)
            this.registerActivityToLocation(activity)
            for(character of activityParticipants){
                character.dayPlanner.occupyHours(startHour, finalDuration, activity)
                this.registerActivityToLocation(activity)
            }
            return true
        }
        return false
    }
    checkAvailability(startHour, preferredDuration, minimumDuration, shouldOverwriteDefaultActivities){
        if (this.todaysUnoccupiedHours.length > 0){
            let hourIndex = this.todaysUnoccupiedHours.indexOf(startHour)
            if (hourIndex < 0){
                if (shouldOverwriteDefaultActivities == true){
                    return checkIfOccupationIsOnlyWithDefaultActivities(startHour, duration)
                } else {
                    return -1
                }
            }
            let durationCounter = 1
            let keepChecking = true
            let lastFreeHourFound = startHour
            while (keepChecking == true){
                if ((durationCounter < preferredDuration) &&
                    (hourIndex < this.todaysUnoccupiedHours.length))
                {
                    if (this.todaysUnoccupiedHours[hourIndex] == lastFreeHourFound+1){
                        ++hourIndex
                        ++durationCounter
                        ++lastFreeHourFound
                    }
                } else {
                    // TODO: Also check if hours are occupied by default activities.
                    keepChecking = false
                }
            }
            if (durationCounter >= preferredDuration){
                return durationCounter
            } else if (durationCounter >= minimumDuration){
                // TODO: Also check if hours are occupied by default activities.
                return minimumDuration
            } else {
                return -1
            }
        // TODO: Also check if hours are occupied by default activities.
        // } else {
        //     return checkIfOccupationIsOnlyWithDefaultActivities(startHour, duration)
        }
    }
    occupyHours(activityStartHour, duration){
        // TODO: This does not properly handle hours occupied with default activities being overwritten.
        let activityStartHourIndex = this.todaysUnoccupiedHours.indexOf(activityStartHour)
        this.todaysUnoccupiedHours.splice(activityStartHourIndex, duration)
        this.todaysActivitiesByStartHour[activityStartHour] = new ScheduledActivity(activity, activityStartHour, finalDuration)
    }
    registerActivityToLocation(activity){
        if (this.todaysActivitiesByLocation.includes(activity.location) == false){
            this.todaysActivitiesByLocation[activity.location] = []
        }
        this.todaysActivitiesByLocation[activity.location] += activity
    }
    checkParticipantsAvailability(activityParticipants, startHour, finalDuration){
        if (activityParticipants.length < 1){
            return true
        }
        // The activity requires participants and will only be started if participants are all available.
        for(character of participants){
            if (character.dayPlanner.checkAvailability(startHour, finalDuration) == false){
                return false
            }
        }
        return true
    }
    // TODO: Implement this.
    // checkIfOccupationIsOnlyWithDefaultActivities(startHour, duration){
    //     let keys = this.todaysActivitiesByStartHour.keys()
    //     keys.sort((a, b) => a - b)
    //     for(hour of keys){
    //         activity = this.todaysActivitiesByStartHour[hour]
    //         end = hour + activity.duration
    //         if ((startHour >= hour) && (end <= (startHour + duration))){
    //             if (activity.tags.includes("default")){
    //                 return true
    //             }
    //         }
    //         ;;;; asdf0000---- 
    //     }
    // }
    getCurrentScheduledLocationByTime(hour){
        for(scheduledActivity of this.todaysActivitiesByStartHour){
            if (scheduledActivity.startHour == hour){
                return scheduledActivity.activity.location
            }
            if ((scheduledActivity.startHour < hour) && ((scheduledActivity.startHour + duration) > hour)){
                return scheduledActivity.activity.location
            }
        }
    }
    resolveActivitiesAlreadyEnded(hourAfterActivitiesEnd){
        let resolvedActivitiesCounter = 0
        for(scheduledActivity of this.todaysActivitiesByStartHour){
            if ((scheduledActivity.startHour + duration) <= hourAfterActivitiesEnd){
                scheduledActivity.resolvePlannedConsequence()
                ++resolvedActivitiesCounter
            }
        }
        this.todaysActivitiesByStartHour.splice(0, resolvedActivitiesCounter)
    }
    endDay(){
        this.resolveActivitiesAlreadyEnded(24)
    }
    startPlannedActivityForHour(hour){
        if (hour === undefined){
            hour = calendar.now().hour
        }
        this.resolveActivitiesAlreadyEnded(hour)
        activity = this.todaysActivitiesByStartHour.shift()
        isActivityAvailable = activity.setup()
        if (isActivityAvailable == true){
            resolutionEvent = new BackgroundEvent(hour, activity.location, activity.location, activity.conditionalFunction, activity.skippedFunction, activity.aftermathFunction)
            eventsEngine.addEvent(resolutionEvent)
        }
    }
}

window.GlobalDayPlanEngine = class {
    constructor(characters) {
        this.characters = characters
    }
    startPlanningForAllCharacters(day){
        let plannableCharacters = []
        for(character of this.characters){
            if (character.dayPlanner !== undefined){
                plannableCharacters += character
                character.dayPlanner.prepareForPlanning(day)
            }
        }
        // Sorting characters by each one's highest priority for the day.
        plannableCharacters.sort((a, b) => a.dayPlanner.todaysHighestPriorityValue - b.dayPlanner.todaysHighestPriorityValue)
        for(character of plannableCharacters){
            character.dayPlanner.planForDay()
        }
    }
}

var dayPlanEngine = new GlobalDayPlanEngine()
