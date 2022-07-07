# Event Engine Fundamentals
The Event Engine handles events in the game.

There are two main triggers for events: Protagonist Changing Location; Protagonist Progressing Game Time.

## Protagonist Changing Location
The Event Engine should be invoked whenever the Protagonist takes an action that changes their location, passing the location they are departing from, the location they are going to and a boolean indicating if this action may be interrupted.

The Event Engine should, first, check if the action can be interrupted. If it can't the Event Engine just quits. Otherwise, the Event Engine should check if there are any Location Events triggered when the character leaves the location they are departing from and create a list of `candidate events` sorted by `priority`. All other considerations, such as time of departure, Protagonist attributes or Traits are not relevant to the Event Engine, but any game state element can be queried by the `conditional functions` of the events in the `candidate events` list. The Event Engine, then, walks <a src="Walking the Candidate Events List">the candidate event list</a>.

## Protagonist Progressing Game Time
The Event Engine should be invoked whenever the Protagonist takes an action that progress the game time, passing the timestamp when that action was started, the timestamp of when the action is supposed to end and a boolean indicating if this action may be interrupted.

The Event Engine should, first, check if the action can be interrupted. If it can't the Event Engine just quits. Otherwise, the Event Engine should check if there are any Calendar Events triggered between the action start timestamp and the action's supposed end timestamp to create a list of `candidate events`. All other considerations, such as the Protagonist's location, location of other characters, Protagonist attributes or Traits are not relevant to the Event Engine, but any game state element can be queried by the `conditional functions` of the events in the `candidate events` list. The Event Engine, then, walks <a src="Walking the Candidate Events List">the candidate event list</a>.

## Walking the Candidate Events List
Events in the `candidate list` are visited one by one and their `conditional functions` called. The first Event with a function that returns `true` is marked as the `triggered event`, while all other `candidate events` are checked for `skipped function` and, if they have one, still have their `conditional functions` called with their respective `skipped function` called whenever the `conditional function` returns `true` (this means that Events *without* a `skipped function` do not cause any major delays in visiting the Event Engine). After that, the `triggered event` is started.

# Events
## Events must have the following:
* Start Time: This allows the system to identify if an event is already available depending on the system's current game time.
* End Time: This allows the system to identify if an event is still available depending on the system's current game time.
* Event Callable: This is the event itself. In Ren'py, this will be a label for an interaction. In Twine, this will be a passage for the interaction.
## Events may have the following:
* Deadline: A time stamp after which it is no longer relevant. After an Event reaches its Deadline, it is removed from the list of available Events.
* Priority: Used for ordering candidate Events.
* Conditional Function: A function that determines if an Event should happen.
* Skipped Function: A function that is called if an Event could have happened but another Event took its place. This is mostly used to increase the Priority of Events.
* Aftermath Function: A function that is called once for the event, the next time the Events Engine is called. This is often used to remove an event from the list after it has played out (sometimes keeping a count of occurrences).
