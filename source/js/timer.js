
// variable for turning on/off console logs used for debugging
// const B_CONSOLE_LOG = false;

/**
 * Custom HTML element for a timer display, where the values to display are passed in as attributes
 * @extends HTMLElement
 */
class TimerDisplay extends HTMLElement {
    /**
     * A list of observed attributes ("time" and "pomos-comp", "theme");
     * @static
     * @type {string[]}
     */
    static get observedAttributes() { return ["time", "pomos-comp", "theme"]; }

    /**
     * Constructs a new Timer Display
     */
    constructor() {
        super();
        // this.attachShadow({ mode: "open" });
        let o_wrapper = document.createElement("div");
        o_wrapper.className = "timer";

        let o_work_message = document.createElement("h1");
        o_work_message.id = "time-display";

        let o_pomos_completed = document.createElement("h2");
        o_pomos_completed.id = "pomos-completed";
        o_pomos_completed.innerText = "Pomodoros Completed:"

        let o_br = document.createElement("br");


        o_wrapper.append(o_work_message, o_pomos_completed, o_br);

        // construct pomos icons
        for (let n_pomo_index = 1; n_pomo_index <= 4; n_pomo_index++) {
            let o_pomo_image = document.createElement("img");
            o_pomo_image.id = `pomo${n_pomo_index}`;
            o_pomo_image.className = "pomo-count";
            o_pomo_image.alt = "Pomodoro Count";
            o_pomo_image.src = TimerDisplay.S_POMO_NO_PATH;
            o_wrapper.append(o_pomo_image);
        }

        this.append(o_wrapper);
    }

    /**
     * Formats a millisecond duration to 'minutes:seconds', while accounting for rounding
     * @param {number} n_milli_time - the time to format
     * @return {string} The formatted XX:YY time.
     */
    static formatMilliTime(n_milli_time) {
        // reset to user chosen pomodoro length
        if (n_milli_time < 0) {    
            let o_timer_display = document.querySelector("timer-display");
            n_milli_time = Number(o_timer_display.getAttribute("pomo-length"));
        }

        let o_date = new Date(n_milli_time + 500);
        let s_minutes = String(o_date.getMinutes()).padStart(2, "0");
        let s_seconds = String(o_date.getSeconds()).padStart(2, "0");
        return `${s_minutes}:${s_seconds}`;
    }

    /**
     * Handles changed attributes, and updates display when any attribute changes its value
     * @param {string} s_attr_name - the name of the attribute that was changed
     * @param {string} s_old_value - the old value of the attribute (attributes are always strings)
     * @param {string} s_new_value - the new value of the attribute
     */
    attributeChangedCallback(s_attr_name, s_old_value, s_new_value) {
        if (s_old_value != s_new_value) {
            this.renderComponents();
        }
    }

    /**
     * Re-renders the displayed time on the timer, and updates the tomato icons of the 
     * finished pomos.
     * Uses the attributes 'time' and 'pomos-comp' as inputs
     *
     */
    renderComponents() {
        // update time display
        this.querySelector("#time-display").innerHTML = 
            TimerDisplay.formatMilliTime(Number(this.getAttribute("time")));
        // update status of pomo icons based on number of pomos completed
        for (let n_pomo_index = 1; n_pomo_index <= 4; n_pomo_index++) {

            let b_pomo_done = n_pomo_index <= this.getAttribute("pomos-comp");
            // We want to use "PomoCountYes2"
            let o_pomo = this.querySelector(`#pomo${n_pomo_index}`);
            let s_pomo_src = o_pomo.getAttribute("src");
            if (this.getAttribute("theme") === "stars") {
                if (b_pomo_done && s_pomo_src != TimerDisplay.S_POMO_YES_PATH_STARS){
                    o_pomo.setAttribute("src", TimerDisplay.S_POMO_YES_PATH_STARS);
                } 
                else if (!b_pomo_done && s_pomo_src != TimerDisplay.S_POMO_NO_PATH_STARS)  {
                    o_pomo.setAttribute("src", TimerDisplay.S_POMO_NO_PATH_STARS);
                }
            // We want to use "PomoCountYes"
            } else {
                if (b_pomo_done && s_pomo_src != TimerDisplay.S_POMO_YES_PATH){
                    o_pomo.setAttribute("src", TimerDisplay.S_POMO_YES_PATH);
                } 
                else if (!b_pomo_done && s_pomo_src != TimerDisplay.S_POMO_NO_PATH)  {
                    o_pomo.setAttribute("src", TimerDisplay.S_POMO_NO_PATH);
                }
            }
        }
    }

}
/**
 * Path to "Yes" icon.
 * @static
 * @type {string}
 */
TimerDisplay.S_POMO_YES_PATH = "./assets/img/PomoCountYes.png";

/**
 * Path to "No" icon.
 * @static
 * @type {string}
 */
TimerDisplay.S_POMO_NO_PATH = "./assets/img/PomoCountNo.png";

/**
 * Path to "Yes" icon.
 * @static
 * @type {string}
 */
TimerDisplay.S_POMO_YES_PATH_STARS = "./assets/img/PomoCountYes2.png";

/**
 * Path to "No" icon.
 * @static
 * @type {string}
 */
TimerDisplay.S_POMO_NO_PATH_STARS = "./assets/img/PomoCountNo2.png";
customElements.define("timer-display", TimerDisplay);

export { TimerDisplay }
