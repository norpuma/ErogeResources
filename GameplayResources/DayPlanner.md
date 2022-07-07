NPCs may have intricate lives besides the Protagonist actions, but those lives should not weight too much on the game engine.

Each NPC creates a simple Day plan at the start of the day. The Day Planner Engine is called for each NPC, usually just checking the NPC Schedule and creating the Day Plan.

DayPlanner relies on Activities (see Activities.md) and Schedules (see Scheduling.md).

## Planning
* Day Planner visits all Activities and sorts them by priority and, then, by start time.
* Day Planner visits each Activity in order and checks their AddToPlanConditions and AddToPlanConditionalFunction. If conditions are found, the function is ignored.
* Day Planner checks if the Activity can be added to the plan. If true, the Activity is added to the day's plan and it's end time and endTimeFunction are checked. If end time is found, the end time function is ignored. If not, the end time function is called to find the end time.
* Day Planner skips all Activities that start before the end time of the last Activity added and calls the SkippedDuringPlanningFunction. If no Activity is found that can fit an empty slot, the Default Activity is used.

## Default Activity
A single Activity should be added as the "default" activity. This is used to fill in slots when no other Activity will fit.

## NPC Updates
To ensure NPC integrity, the effects of activities must be updated before a Protagonist may potentially interact with them.

Activities are organized, in the Day Planner Engine, by time (start and end), by character and by location.

Each Activity should have a lightweight `planned consequence function`.

## Location Index
Whenever the Protagonist visits a location, the Day Planner Engine must check what characters may be present. This is done by checking the Day Planner Engine `activities by location` list and checking what NPCs should be at the location, creating a `potential present characters activity` list, sorted by `priority`. The Day Planner Engine, then, walks that list.

For each element of the `potential present characters activity` list, the Day Planner Engine must, first, perform the Time Update routine for each NPC that may potentially present. It, then, checks the `conditional function` of the Activity, if there are any. Activities with no `conditional function` or whose function returned `true` have their `setup function` invoked. The `setup function` should update the character's `activity` and `location` fields.

Activities whose function returned `false` have their`skipped function` invoked. The skipped function should clear the `activity` and `location` field of the character or put in an alternate `activity` AND `location`.

The `setup function` of an Activity should also update the Day Plan for the character indicating that that activity was manually triggered and registering an Event in the Event Engine for when the Protagonist departs their current location and registering an Event in the Event Engine for the time of the Activity's planned end time.

## Time Index
The Day Planner Engine has a list of `activities by time`. Whenever the Protagonist has a chance of interacting with an NPC (when they aren't at the same location this may be caused by using their phone or some kind of divination spell or querying some other NPC about the whereabouts of an absent one), the Day Planner Engine must perform the Time Update routine for that NPC.

## Time Update Routine
The Time Update routine of the Day Planner Engine finds the list of `activities by time` for a given NPC and retrieves the game's current timestamp. It then visits each element of the list with a start time strictly less than the current timestamp. It, then, checks the Activity's `conditional function` and for every `true`, it invokes the Activity's `planned consequence function` and *removes the activity from the list*. This will update the character to their appropriate state at that time of day.

## End of Day
When the Day Planner Engine is invoked at the start of a day, it must clean up the effects of the previous day. This is done by running the Time Update routine for each NPC in the list. All Activities that have not been visited up to that point are correctly computed.

# Activities
NPC Activities determine what they are doing at any given time.

Activities may contemplate interactions with the Protagonist or not.

## Activities must have the following:
* Identifier: This is used by other functions to check a character's current activity.
* SchedulingData: A SchedulingData object.
* Location: The Location to move the character to during the Activity. This will allow the Protagonist to interact with the character during the Activity.
* ShortDescription: A short sentence describing what the character is doing during an Activity. If the value starts with the '>' symbol it is interpreted as a label for a lengthier description (a label in Ren'Py or a passage in Twine).
* Ostensive Observation Description: A longer description used when the Protagonist is present and visible while the Activity is ongoing. If the value starts with the '>' symbol it is interpreted as a label for a lengthier description (a label in Ren'Py or a passage in Twine).
## Activities may have the following:
* Tags: These may be used to group or categorize Activities (e.g.: The following Activities could have the "Sleeping" tag: "Sleeping", "SleepingIn", "ExhaustedSleeping", "SleepingWhileDrunk").
* UnseenInspectionDescription: A longer description for an Activity for when it can be observed without the Protagonist being present - through cameras or magic, for instance. If the value starts with the '>' symbol it is interpreted as a label for a lengthier description (a label in Ren'Py or a passage in Twine).
* Interactions: A list of Interaction objects that allow the Protagonist to interact with the character during the Activity.
* ConditionalFunction: A function that determines if an Activity should happen.
* SetupFunction: A function called before a character executing a given Activity may be interacted with. This is used to update stats and appearance (e.g. setting the character's clothes to bikini during a beach Activity).
* AftermathStatement: This statement is evaluated (using eval()) by the Event Engine after an event should have happened. This is used to replace Planned Consequence when the current scene is resolved to take into consideration possible player interaction. This supersedes AftermathFunction.
* AftermathFunction: This function is called by the Event Engine after an event should have happened. This is used to replace Planned Consequence when the current scene is resolved to take into consideration possible player interaction.
* PlannedConsequenceFunction: A function to be called after an Activity has ran. This may be used to update a character's stats, for instance (e.g. money, after a day working). This runs at 23:59 (this is interpreted as 24:00) of the day the Activity ran.
* SkippedFunction: A function that is called if an Activity could have happened but another Activity or Event took its place. This is mostly used to increase the Priority of Activities.

## SchedulingData must have the following:
* Times: A list of SchedulingTimeData object. It is tested in order and if the event has CanRepeatOnSameDay set to false, it may prevent the latter times to ever be tested.
## SchedulingData may have the following:
* Priority: Used for ordering candidate Activities. Defaults to 0.
* IsAppointment: Must be either true or false. Defaults to false. If it is an appointment, it's starting priority is 10 and the default skipped rules is +10 priority if no other is present.
* CanRepeatOnSameDay: Must be either true or false. Defaults to false. This allows an Activity to be scheduled more than once on the same day.
* AddToPlanConditions: This is a python or javascript expression to be evaluated using the eval() function and used to decide if the Activity should be added to a day plan. If this is found, the conditional function is ignored. This is evaluated at time 0 of a given day.
* AddToPlanConditionalFunction: This is a function to be called to decide if the Activity should be added to a day plan. If an expression is found for this condition, this function is ignored. This is evaluated at time 0 of a given day.
* SkippedDuringPlanningStatement: A string to be evaluated using eval() when a function was skipped during planning (usually because its start time is occupied by another, already planned, Activity). This is mostly used to increase Priority. This supersedes SkippedDuringPlanningFunction.
* SkippedDuringPlanningFunction: A function to be called when a function was skipped during planning (usually because its start time is occupied by another, already planned, Activity). This is mostly used to increase Priority.
* Participants: A list of characters that should have their schedules updated to participate in this event.

