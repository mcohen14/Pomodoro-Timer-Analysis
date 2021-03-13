import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { jest } from '@jest/globals'
import { EventBus } from "../js/eventBus.js";
import { TaskDisplay } from "../js/taskDisplay.js";
import { TaskList } from '../js/taskList.js';
import { TimerContainer } from '../js/timerContainer.js';
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { document } = (new JSDOM(`
<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <meta charset="utf-8">
  <meta name="description" content="Pomodoro Timer">
  <meta name="keywords" content="Pomodoro, Tomato, Timer">
  <meta name="author" content="Group 30: Teamato">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>PomoHero</title>

  <!-- Import css stylesheets for layout and colors -->
  <link rel="stylesheet" href="./css/layout.css">
  <link rel="stylesheet" href="./css/colors2.css">

  <!-- Import icons for buttons -->
  <script src="https://kit.fontawesome.com/ad11314e23.js" crossorigin="anonymous"></script>

  <!-- Add stylesheet for when javascript is disabled or not supported -->
  <noscript>
    <link href='./css/noscript.css' rel='stylesheet'>
  </noscript>
</head>

<body>

  <main>
    <section class="full-height timer-section">

      <!-- Contains the header : logo, title -->
      <div class="header-container">
        <a href="#">
          <img class="pomo-logo" src="assets/img/PomoHeroLogo2.png" alt="pomo hero logo" href="#">
        </a>
        <a href="#">
          <img class="banner" src="assets/img/PomoTitleA.png" alt="PomoHero Banner">
        </a>
      </div>

      <!-- Contains the slide-out tasklist -->
      <task-list></task-list>

      <!-- Contains the Pomodoro timer -->
      <div class="top-container">
        <div class="main-box">
          <nav class="all-btns">
            <button id="theme-btn" title="Simple Theme" class="btn"><i class="fas fa-palette fa-x theme-btn"></i></button>
            <button id="task-btn" title="Tasklist" class="btn"><i class="fas fa-tasks fa-x"></i></button>
            <button id="info-btn-new" title="Instructions" class="btn"><i class="fas fa-info-circle fa-x info-btn-new"></i></button>
          </nav>
          <timer-element></timer-element>
        </div>
      </div>
    </div>

    <!-- <div class="middle-container">
      <h3>Current task:</h3>
      <div id="current">
        Do this
      </div>
      <button id="check" class="btn"><i class="fas fa-check-circle fa-x tool"></i></button>
      <h3>Next task:</h3>
      <div id="next">
        Do that
      </div>
    </div> -->

    <!-- Contains the current and next task of the user -->
    <task-display></task-display>

  </section>

    <!-- Contains the instructions -->
    <section class="instructions-section flex flex-column">
      <h2 class="instruct-head">Instructions</h2>
      <div id="instructions-para">
        <h3>Add tasks for the session</h3>
        <ul>
          <li>From the top-right corner, click on the task list button</li>
          <li>In the slide-out container, add all tasks for the session</li>
          <li>Note: Tasks can only be added before starting the Pomodoro session</li>
          <li>Tasks can be added, edited, or deleted</li>
          <li>Once the session begins, you can see the current and the next tasks below the timer</li>
          <li>If you are done with the task, hit the 'check' button next to the current task</li>
        </ul>
        <h3>Work-Break-Work</h3>
        <ul>
          <li>Click on “Start” when you are ready</li>
          <li>Note: Once started, there is no going back. The timer won’t stop</li>
          <li>Take a 5-minute break after every Pomodoro and a 30-minute break after every 4
            Pomodoros</li>
          <li>Get distracted at your own risk. If distracted, click “Restart” and you will have to start
            your current interval from the very beginning</li>
          <li>Have other jobs to do? Hit “End Session” to log out</li>
        </ul>
        <h3>Pomodoro Technique</h3>
        <p>
          The Pomodoro technique is a scientifically proven way to help increase productivity.
          It is a way to work with time instead of struggling against it.
          It is a smart method for handling interruptions,
          meeting deadlines,
          improving content of work,
          and reducing useless work sessions.
        </p>
      </div>
      <div class="instruct-bottom">
        <button id="up-arrow" class="btn" title="Scroll up"><i class="fas fa-arrow-alt-circle-up fa-2x arrow-up-icon"></i></button>
      </div>
    </section>
  </main>

  <!-- Contains the footer : Copyright for app name -->
  <footer>
    <p class="copy-right">© PomoHero 2021</p>
  </footer>

  <!-- Add sound for notifications -->
  <audio id="notifs" src="assets/audio/notif_tone.mp3"></audio>

  <!-- Import JS source files -->
  <script type="module" src="js/main.js"></script>
  <script src="js/timerContainer.js"></script>

  <!-- No Script for when JS is not supported or disabled -->
  <noscript>
    <div>
      <p>Sorry, either your browser does not support JavaScript, or it has been disabled...</p>
    </div>
  </noscript>
</body>

</html>
`, { runScripts: "outside-only" })).window;
//jest.mock("../js/taskDisplay.js" );

// const mockAction = jest.fn();
// jest.mock("../js/eventBus.js"
//   , () => {
//         EventBus: jest.fn().mockImplementation(() => ({
//             registerEvent: mockAction
//     }))
// }
// );

// beforeEach(() => {
//     // Clear all instances and calls to constructor and all methods:
//     TaskDisplay.mockClear();
// });

it('First test', () => {
//     // let o_event_bus = new EventBus();
//     // let o_task_disp = new TaskDisplay();

//     // o_event_bus.o_task_list = document.querySelector("task-list");
//     // o_event_bus.o_timer_container = document.querySelector("timer-element");
//     // o_event_bus.o_task_display = document.querySelector("task-display");

//     // o_event_bus.o_toolbar = document.querySelector("nav");

//     // let mock_task_disp = TaskDisplay.mock.instances[0];
//     // let mock_task_disp_handle_start = mock_task_disp.handleStartSession;

//     // o_event_bus.handleStartSession();

//     // expect(mock_task_disp_handle_start).toHaveBeenCalledTimes(1);
  

  // let e = new EventBus();

  // e.o_task_list = new TaskList();
  // e.o_timer_container = new TimerContainer();
  // e.o_task_display = new TaskDisplay();

  // let t = e.o_task_display;
  //e.registerEvent = jest.fn();
  // const mockEventBusInstance = EventBus.mock.instances[0];
  // const mockRegisterEvent = mockEventBusInstance.registerEvent;

  // expect(mockRegisterEvent).toHaveBeenCalledTimes(6);

});

