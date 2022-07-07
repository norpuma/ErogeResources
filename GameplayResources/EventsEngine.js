class BackgroundEvent {
    constructor(startTime, leavingLocation, enteringLocation, conditionalFunction, skippedFunction, aftermathFunction){
        if (startTime === undefined && leavingLocation === undefined && enteringLocation === undefined){
            throw "GameEvent must have either startTime and endTime or leavingLocation or enteringLocation. All three found undefined, here."
        }
        this.startTime = startTime
        this.leavingLocation = leavingLocation
        this.enteringLocation = enteringLocation

        this.conditionalFunction = conditionalFunction
        this.skippedFunction = skippedFunction
        this.aftermathFunction = aftermathFunction
    }
    checkConditions(){
        if (this.conditionalFunction === undefined){
            return true
        }
        if (this.conditionalFunction() == true){
            return true
        }
        return false
    }
}

window.GameEvent = class extends BackgroundEvent{
    constructor(eventCallable, startTime, endTime, leavingLocation, enteringLocation, deadlineTimestamp, priority, conditionalFunction, skippedFunction, aftermathFunction){
        if (eventCallable === undefined){
            throw "GameEvent may not have eventCallable undefined."
        }
        if (startTime !== undefined && endTime === undefined){
            throw "GameEvent may not be initialized with startTime and without a corresponding endTime."
        }
        super(startTime, leavingLocation, enteringLocation, conditionalFunction, skippedFunction, aftermathFunction)

        this.eventCallable = eventCallable

        this.endTime = endTime

        this.deadlineTimestamp = deadlineTimestamp
        if (priority === undefined){
            this.priority = 0
        } else {
            this.priority = priority
        }
        this.conditionalFunction = conditionalFunction
        this.skippedFunction = skippedFunction
        this.aftermathFunction = aftermathFunction
    }
}

window.EventsEngine = class {
    constructor(){
        this.events = []

        this.currentlyTriggeredEvent = undefined
    }
    addEvent(gameEvent){
        this.events += gameEvent
    }
    findEventForLocationChange(leavingLocation, enteringLocation){
        _cleanupPreviousEvents()
        candidateEvents = []
        for(gameEvent in this.events){
            if ((gameEvent.leavingLocation == leavingLocation) ||
                (gameEvent.enteringLocation == enteringLocation))
            {
                candidateEvents += gameEvent
            }
        }
        // Sorting by DESCENDING priority.
        candidateEvents.sort((a, b) => b.priority - a.priority)
        return this._selectEventFromCandidates(candidateEvents)
    }
    findEventForTimeProgress(startTime, endTime){
        _cleanupPreviousEvents()
        candidateEvents = []
        for(gameEvent in this.events){
            if ((gameEvent.endTime.isBefore(startTime) == false) &&
                (gameEvent.startTime.isBefore(endTime) == true))
            {
                candidateEvents += gameEvent
            }
        }
        candidateEvents.sort((a, b) => a.priority - b.priority)
        return this._selectEventFromCandidates(candidateEvents)
    }
    _selectEventFromCandidates(){
        this.currentlyTriggeredEvent = undefined
        for(index = 0; index < candidateEvents.length; ++index){
            candidateEvent = candidateEvents[index]
            if ((this.currentlyTriggeredEvent === undefined) && (candidateEvent.checkConditions() == true)){
                this.currentlyTriggeredEvent = candidateEvent
            } else if ((candidateEvent.skippedFunction !== undefined) && (candidateEvent.checkConditions())) {
                candidateEvent.skippedFunction()
            }
        }
        return this.currentlyTriggeredEvent
    }
    _cleanupPreviousEvents(){
        if ((this.currentlyTriggeredEvent !== undefined) && (this.currentlyTriggeredEvent.aftermathFunction !== undefined)){
            this.currentlyTriggeredEvent.aftermathFunction()
        }
    }
}

var eventsEngine = new EventsEngine()