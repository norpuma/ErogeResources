The Game Engine handles updates to the game state.

Game Engine will update states whenever the character performs an activity.

Most, if not all, activities will progress the game time.

When game time is progressed, the Game Engine will move time ahead 1 hour at a time.
For each hour progressed:
* The Game Engine will visit every character to update their state according to their schedules.
* The Game Engine will visit call the Event Engine to find if an event is triggered.
* The Game Engine will visit every character to call their activities consequence function, if their activity is concluded.