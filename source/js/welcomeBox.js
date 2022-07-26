
/**
 * Custom HTML element encapsulating all of the functionality related to the Intructions Box
 * @extends HTMLElement
 */
class WelcomeBox extends HTMLElement {

    /**
     * Constructs a new Welcome Box, initializing all elements
     */
    constructor() {
        super();
        // most of this content is simply initializing the html to go in the webcomponent
        let o_wrapper_obj_back = document.createElement("div");
        o_wrapper_obj_back.classList.add("welcome-section-blocker", "hidden");
        o_wrapper_obj_back.id = "welcome-blocker";
        o_wrapper_obj_back.addEventListener("click", this.closeWelcome.bind(this));

        let o_wrapper_obj = document.createElement("div");
        o_wrapper_obj.classList.add("welcome-section");
        o_wrapper_obj.id = "welcome";

        let o_close_button = document.createElement("a");
        o_close_button.classList.add("close2", "btn");
        o_close_button.id = "close-welc";
        o_close_button.title = "Close Welcome Message (esc)";
        o_close_button.innerHTML = "&times;";
        o_close_button.addEventListener("click", this.closeWelcome.bind(this));

        let o_welc_title_wrapper = document.createElement("div");
        o_welc_title_wrapper.className = "hidden";
        o_welc_title_wrapper.id = "welcome-title";

        //Welcome Box header
        let o_welc_title = document.createElement("h1");
        o_welc_title.className = "welcome-head";
        o_welc_title.innerText = "Welcome!";

        let o_welc_text = document.createElement("div");
        o_welc_text.className = "hidden";
        o_welc_text.id = "welcome-para";

        //Initial greeting for readers
        let o_welc_greet = document.createElement("p");
        o_welc_greet.innerText = WelcomeBox.S_WELC_MSG;

        //Points on how to use the timer - first point
        let o_welc_use_list = document.createElement("ul");
        o_welc_use_list.className = "welc-list";
        let o_ul1 = document.createElement("li");
        o_ul1.innerText = WelcomeBox.A_USE_MSG[0];
        let o_ul1_icon = document.createElement("i");
        o_ul1_icon.classList.add("fas", "fa-tasks", "fa-x");
        let o_ul1b = document.createElement("span");
        o_ul1b.innerText = WelcomeBox.A_USE_MSG[1];
        o_ul1.append(o_ul1_icon, o_ul1b);

        //Second point
        let o_ul2 = document.createElement("li");
        o_ul2.innerText = WelcomeBox.A_USE_MSG[2];
        let o_ul2_icon = document.createElement("i");
        o_ul2_icon.classList.add("fas", "fa-cogs", "fa-x");
        let o_ul2b = document.createElement("span");
        o_ul2b.innerText = WelcomeBox.A_USE_MSG[3];
        o_ul2.append(o_ul2_icon, o_ul2b);

        //Third point
        let o_ul3 = document.createElement("li");
        o_ul3.innerText = WelcomeBox.A_USE_MSG[4];
        let o_ul3_icon = document.createElement("i");
        o_ul3_icon.classList.add("fas", "fa-info-circle", "fa-x");
        let o_ul3b = document.createElement("span");
        o_ul3b.innerText = WelcomeBox.A_USE_MSG[5];
        o_ul3.append(o_ul3_icon, o_ul3b);

        o_welc_use_list.append(o_ul1, o_ul2, o_ul3);

        //header for final thoughts
        let o_welc_final_text = document.createElement("p");
        o_welc_final_text.innerText = WelcomeBox.S_FINAL_MSG;
        o_welc_final_text.classList.add("centered-note");
        o_welc_final_text.id = "final-thought-p";

    
        o_welc_title_wrapper.append(o_welc_title);
        o_welc_text.append(o_welc_greet, o_welc_use_list, o_welc_final_text);
        o_wrapper_obj.append(o_close_button, o_welc_title_wrapper, o_welc_text);
        this.append(o_wrapper_obj_back);
        this.append(o_wrapper_obj);
    }

    /** Function to determine if the welcome are currently shown */
    getIsShown() {
        return this.querySelector("#welcome").classList.contains("welcome-section-open");
    }

    /**
     * Function to show task list display from the main user screen
     */
    showWelcomeBox() {
        this.querySelector("#welcome").classList.add("welcome-section-open");
        this.querySelector("#close-welc").style.display = "none";

        // Hide everything inside welcome box while animating to prevent sandwiching of text
        setTimeout(() => {
            this.querySelector("#welcome-title").style.display = "block";
            this.querySelector("#welcome-para").style.display = "block";
            this.querySelector("#close-welc").style.display = "block";
            this.querySelector("#close-welc").style.position = "fixed";
            document.body.focus();
        }, 300);

        this.querySelector("#welcome-blocker").style.display = "block";
    }

    /**
     * Function to close task list display from the main user screen
     */
    closeWelcome() {
        this.querySelector("#welcome").classList.remove("welcome-section-open");
        this.querySelector("#welcome-title").style.display = "none";
        this.querySelector("#welcome-para").style.display = "none";
        this.querySelector("#welcome-blocker").style.display = "none";
        this.querySelector("#close-welc").style.position = "absolute";
        this.querySelector("#close-welc").style.display = "none";
    }
}

/**
 * String of welcome to users - the first thing they will read
 * @static
 * @type {string[]}
 */
WelcomeBox.S_WELC_MSG = "This is a timer designed to help you focus and be more \
    productive on your work! It uses the Pomodoro Technique, which is a work-break \
    cycle that follows these steps: focus on your work for a while, take a short \
    break, and repeat.";

/**
 * Array storing information telling the user how to use the timer
 * @static
 * @type {string[]}
 */
WelcomeBox.A_USE_MSG = ["Simply add tasks to your task list using the ",
    " button and start your session.",
    "Visit the settings ",
    " to adjust the lengths of your work intervals and breaks.",
    "View the instructions ",
    " if you want more information on how to use the timer."];

/**
 * String describing the final thoughts of the welcome box
 * @static
 * @type {String}
 */
WelcomeBox.S_FINAL_MSG = "Try to focus and be productive!";


customElements.define("welcome-box", WelcomeBox);


export { WelcomeBox }