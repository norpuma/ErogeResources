Scheduling allows characters, including the Protagonist, to act in predictable manner.

Schedules rely on Activities (see Activities.md) and uses scheduling components to create a timetable.

# ScheduleTime
## ScheduleTime must have:
* Days: Must be in the form of days of the week in english or numbers between 0 and 6, included, where 0 represents Sunday. It may be a comma-separated list or a range with ".." between the first and last elements, included.
* StartHours: Must be in the form of hours of the day, between 0 and 23. It may be a comma-separated list or a range with ".." between the first and last elements, included.
## ScheduleTime may have:
* MinimumDuration: A number of hours. Assumed to be equal to standard duration if ommitted or 1 if both are missing.
* StandardDuration: A number of hours. Assumed to be equal to minimum duration if ommitted or 1 if both are missing.
* EndTime: A limit of how late it may end. The minimum of this value and the start + StandarDuration is used. If it conflicts with minimum duration, the scheduling fails and is `skipped`.
* EndTimeFunction: This is a function that generates the end time. It receives the Start Time as an input (for randomized start times). It must return a timestamp (day, hour, minutes).
