This is a pomodoro timer chrome extension where the rest duration 'stretches' based on your last focus duration.

For example, if your default duration are:

     focus = 25 minutes
     rest = 5 minutes
     
and you focused for 50 minutes in the current session, your next rest duration will be

     rest = (50/25) * 5 = 10 minutes

## How to use it
1. Start the focus timer
<img width="640" alt="during focus" src="https://github.com/fcyen/elastic-pomodoro/assets/44438602/5cbe1f84-09d7-4663-9f07-2362d74272db">

2. When the default focus duration is up, the tab title will change to "Time's up", but you can keep it running until you are done with your task. Click the check button when you want to end this focus session
<img width="640" alt="focus time up" src="https://github.com/fcyen/elastic-pomodoro/assets/44438602/287ae96d-335c-4fed-a6b0-923394b842b1">

3. The rest timer will automatically start counting down. Its duration is determined by your last focus duration
<img width="640" alt="during rest" src="https://github.com/fcyen/elastic-pomodoro/assets/44438602/13309f65-26b7-425a-b0aa-a2cf8800c3d3">
