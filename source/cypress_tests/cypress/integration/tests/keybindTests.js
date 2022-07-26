/// <reference types="Cypress" />
describe("Keybind Integration Tests", () => {
    const N_DELAY = 200;
    beforeEach(() => {
        cy.visit("https://powelldoro.web.app/");
        cy.get('welcome-box > #welcome > .close2').click();
        cy.document().then((o_doc) => {
            cy.spy(o_doc.EventBus, "fireEvent");
            cy.spy(o_doc.EventBus, "updateTaskCompleted");
            cy.spy(o_doc.querySelector("task-list"), "showTaskList");
            cy.spy(o_doc.querySelector("timer-element"), "beginSession");
            cy.spy(o_doc.querySelector("timer-element"), "endSession");
        })
    });

    it("Testing t (tasklist opening)", () => {
        // opening normally
        cy.get("body").type("t");
        cy.wait(N_DELAY);
        cy.document().then((o_doc) => {
            cy.get("#side-tasks").should("have.class", "sidenav-open");
            expect(o_doc.querySelector("task-list").showTaskList).to.be.called;
            expect(o_doc.EventBus.fireEvent.lastCall).to.be.calledWithExactly("showTasks");
        });

        // not opening when information box is out
        cy.get("body").type("{esc}");
        cy.get("#side-tasks").should("not.have.class", "sidenav-open");
        cy.get("#info-btn-new").click();
        cy.get("#close-inst").trigger("click");
        cy.get("body").type("t");
        cy.wait(N_DELAY);
        cy.document().then((o_doc) => {
            cy.get("#side-tasks").should("have.class", "sidenav-open");
            expect(o_doc.querySelector("task-list").showTaskList).to.have.callCount(2);
            expect(o_doc.EventBus.fireEvent.lastCall).to.be.calledWithExactly("showTasks");
        });


    });

    it("Testing Escape (Close out of windows)", () => {
        // opening normally
        cy.get("body").type("t");
        cy.wait(N_DELAY);
        cy.document().then((o_doc) => {
            cy.get("#side-tasks").should("have.class", "sidenav-open");
            expect(o_doc.EventBus.fireEvent.lastCall).to.be.calledWithExactly("showTasks");
        });

        // opening when information box is out
        cy.get("body").type("{esc}");
        cy.wait(N_DELAY);
        cy.document().then((o_doc) => {
            cy.get("#side-tasks").should("not.have.class", "sidenav-open");
        });

        // open instructions
        cy.get("instructions-box").should("not.be.visible");
        cy.get("#info-btn-new").click();
        cy.get("instructions-box").should("be.visible");
        cy.get("body").type("{esc}");
        cy.get("instructions-box").should("not.be.visible");
        cy.wait(N_DELAY);
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent.lastCall).to.be.calledWithExactly("closeWindows");
        });
    });

    it("Testing c (color change)", () => {
        // test toggling theme
        cy.get("#theme").should("have.attr", "href", "./css/colors-stars.css");
        cy.get("body").type("c");
        cy.get("#theme").should("have.attr", "href", "./css/colors-forest.css");
        cy.get("body").type("c");
        cy.get("#theme").should("have.attr", "href", "./css/colors-stars.css");
    });

    it("Testing space (start/end pomo)", () => {
        // testing space without a session
        cy.get("body").type(" ");
        cy.get("#close-task").trigger("click");
        cy.wait(N_DELAY);
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent.lastCall).to.be.calledWithExactly("startSession");
            expect(o_doc.querySelector("timer-element").beginSession).to.not.be.called;
        });

        // get task list using document, cy.get() doesn't work 
        cy.document().then((o_doc) => {
            let o_task_list = o_doc.querySelector("task-list");
            o_task_list.addItem("Task1");
            o_task_list.addItem("Task2");
        });

        cy.get("body").type(" ");
        cy.wait(N_DELAY);
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent.lastCall).to.be.calledWithExactly("startSession");
            expect(o_doc.querySelector("timer-element").beginSession).to.be.called;
        });

        cy.get("body").type(" ");
        cy.wait(N_DELAY);
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("endSession");
            expect(o_doc.querySelector("timer-element").endSession).to.be.called;
        });
    });

    it("Testing n (next task)", () => {
        // make sure that taskdisplay is not updated without a session
        cy.get("body").type("n");
        cy.wait(N_DELAY);
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent.lastCall).to.be.calledWithExactly("nextTask");
            expect(o_doc.EventBus.updateTaskCompleted).to.be.not.called;
        });

        // testing with an actual session
        cy.document().then((o_doc) => {
            let o_task_list = o_doc.querySelector("task-list");
            o_task_list.addItem("Task1");
            o_task_list.addItem("Task2");
        });

        cy.get("body").type(" ");
        cy.wait(N_DELAY);
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent.lastCall).to.be.calledWithExactly("startSession");
        });

        cy.get("body").type("n");
        cy.wait(N_DELAY);
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("nextTask");
            expect(o_doc.EventBus.updateTaskCompleted).callCount(1);
        });

        cy.get("body").type("n");
        cy.wait(N_DELAY);
        cy.document().then((o_doc) => {
            expect(o_doc.EventBus.fireEvent).to.be.calledWithExactly("nextTask");
            expect(o_doc.EventBus.updateTaskCompleted).callCount(2);
        });
    });

});
