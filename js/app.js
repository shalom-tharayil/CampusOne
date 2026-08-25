/* =====================================================
   CAMPUSONE APP.JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       ELEMENTS
    ================================================= */

    const loginScreen = document.getElementById("loginScreen");
    const mainApp = document.getElementById("mainApp");

    const loginForm = document.getElementById("loginForm");
    const loginId = document.getElementById("loginId");
    const password = document.getElementById("password");

    const togglePassword =
        document.getElementById("togglePassword");

    const logoutBtn =
        document.getElementById("logoutBtn");

    const menuBtn =
        document.getElementById("menuBtn");

    const closeSidebar =
        document.getElementById("closeSidebar");

    const sidebar =
        document.getElementById("sidebar");

    const sidebarOverlay =
        document.getElementById("sidebarOverlay");

    const profileInitial =
        document.getElementById("profileInitial");

    const profileBtn =
        document.getElementById("profileBtn");

    const userName =
        document.getElementById("userName");

    const sidebarRole =
        document.getElementById("sidebarRole");

    const userRoleText =
        document.getElementById("userRoleText");

    const loginYear =
        document.getElementById("loginYear");


    /* =================================================
       YEAR
    ================================================= */

    if (loginYear) {
        loginYear.textContent =
            new Date().getFullYear();
    }


    /* =================================================
       DEMO USERS
    ================================================= */

    const demoUsers = {

        student: {
            name: "Student",
            role: "Student",
            initial: "S"
        },

        teacher: {
            name: "Teacher",
            role: "Teacher",
            initial: "T"
        },

        librarian: {
            name: "Librarian",
            role: "Librarian",
            initial: "L"
        },

        principal: {
            name: "Principal",
            role: "Principal",
            initial: "P"
        },

        admin: {
            name: "Admin",
            role: "Admin",
            initial: "A"
        }

    };


    /* =================================================
       LOGIN
    ================================================= */

    function login(role) {

        const user =
            demoUsers[role];

        if (!user) return;


        localStorage.setItem(
            "campusoneUser",
            JSON.stringify(user)
        );


        showApplication(user);

    }


    function showApplication(user) {

        if (!loginScreen || !mainApp) return;


        loginScreen.classList.remove("active");

        mainApp.classList.add("active");


        if (userName) {
            userName.textContent =
                user.name;
        }


        if (sidebarRole) {
            sidebarRole.textContent =
                user.role;
        }


        if (profileInitial) {
            profileInitial.textContent =
                user.initial;
        }


        if (userRoleText) {

            userRoleText.textContent =
                `Here's what's happening with your classes today.`;

        }


        /*
           Always open dashboard after login.
        */

        showPage("dashboard");

    }


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const enteredId =
                    loginId.value
                        .trim()
                        .toLowerCase();


                let role = "student";


                if (
                    enteredId.includes("teacher")
                ) {
                    role = "teacher";
                }

                else if (
                    enteredId.includes("librarian")
                ) {
                    role = "librarian";
                }

                else if (
                    enteredId.includes("principal")
                ) {
                    role = "principal";
                }

                else if (
                    enteredId.includes("admin")
                ) {
                    role = "admin";
                }


                login(role);

            }
        );

    }


    /* =================================================
       DEMO LOGIN BUTTONS
    ================================================= */

    document
        .querySelectorAll("[data-role]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const role =
                        button.dataset.role;

                    login(role);

                }
            );

        });


    /* =================================================
       PASSWORD VISIBILITY
    ================================================= */

    if (togglePassword) {

        togglePassword.addEventListener(
            "click",
            () => {

                if (
                    password.type === "password"
                ) {

                    password.type = "text";

                    togglePassword.textContent =
                        "🙈";

                }

                else {

                    password.type = "password";

                    togglePassword.textContent =
                        "👁";

                }

            }
        );

    }


    /* =================================================
       PAGE NAVIGATION

       IMPORTANT:
       This function ONLY changes pages.

       It does NOT generate placeholder HTML.
       ================================================= */

    function showPage(pageName) {

        const pages =
            document.querySelectorAll(".page");

        const navItems =
            document.querySelectorAll(
                ".nav-item"
            );

        const bottomItems =
            document.querySelectorAll(
                ".bottom-nav-item"
            );


        pages.forEach(page => {

            page.classList.remove(
                "active-page"
            );

        });


        navItems.forEach(item => {

            item.classList.remove(
                "active"
            );

        });


        bottomItems.forEach(item => {

            item.classList.remove(
                "active"
            );

        });


        const targetPage =
            document.getElementById(
                pageName + "Page"
            );


        if (targetPage) {

            targetPage.classList.add(
                "active-page"
            );

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }


        document
            .querySelectorAll(
                `[data-page="${pageName}"]`
            )
            .forEach(item => {

                item.classList.add(
                    "active"
                );

            });


        closeMobileSidebar();

    }


    /* =================================================
       NAVIGATION BUTTONS
    ================================================= */

    document
        .querySelectorAll("[data-page]")
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    const page =
                        button.dataset.page;


                    if (page) {
                        showPage(page);
                    }

                }
            );

        });


    /* =================================================
       SIDEBAR
    ================================================= */

    function openSidebar() {

        if (!sidebar) return;

        sidebar.classList.add("open");

        if (sidebarOverlay) {
            sidebarOverlay.classList.add("active");
        }

    }


    function closeMobileSidebar() {

        if (sidebar) {
            sidebar.classList.remove("open");
        }

        if (sidebarOverlay) {
            sidebarOverlay.classList.remove("active");
        }

    }


    if (menuBtn) {

        menuBtn.addEventListener(
            "click",
            openSidebar
        );

    }


    if (closeSidebar) {

        closeSidebar.addEventListener(
            "click",
            closeMobileSidebar
        );

    }


    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            closeMobileSidebar
        );

    }


    /* =================================================
       LOGOUT
    ================================================= */

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            () => {

                localStorage.removeItem(
                    "campusoneUser"
                );


                if (mainApp) {
                    mainApp.classList.remove(
                        "active"
                    );
                }


                if (loginScreen) {
                    loginScreen.classList.add(
                        "active"
                    );
                }

            }
        );

    }


    /* =================================================
       PROFILE BUTTON
    ================================================= */

    if (profileBtn) {

        profileBtn.addEventListener(
            "click",
            () => {

                showPage("settings");

            }
        );

    }


    /* =================================================
       TIMETABLE
    ================================================= */
/* =================================================
   TIMETABLE
================================================= */

const dayButtons =
    document.querySelectorAll(".day-button");

const schedules =
    document.querySelectorAll(".day-schedule");


function showTimetableDay(day) {

    /* Remove active from all buttons */

    dayButtons.forEach(button => {

        button.classList.remove("active");

    });


    /* Hide ALL schedules */

    schedules.forEach(schedule => {

        schedule.classList.remove("active");

    });


    /* Activate selected button */

    const selectedButton =
        document.querySelector(
            `.day-button[data-day="${day}"]`
        );


    if (selectedButton) {

        selectedButton.classList.add("active");

    }


    /* Show ONLY selected schedule */

    const selectedSchedule =
        document.querySelector(
            `.day-schedule[data-schedule="${day}"]`
        );


    if (selectedSchedule) {

        selectedSchedule.classList.add("active");

    }

}


/* Button click */

dayButtons.forEach(button => {

    button.addEventListener("click", () => {

        const day =
            button.getAttribute("data-day");

        showTimetableDay(day);

    });

});


/* Default day */

if (dayButtons.length > 0) {

    showTimetableDay("monday");

}


    /* =================================================
       DARK / LIGHT MODE
    ================================================= */

    const themeToggle =
        document.getElementById(
            "themeToggle"
        );


    function applyTheme(theme) {

        if (theme === "dark") {

            document.body.classList.add(
                "dark-mode"
            );

            if (themeToggle) {
                themeToggle.textContent =
                    "☀️";
            }

        }

        else {

            document.body.classList.remove(
                "dark-mode"
            );

            if (themeToggle) {
                themeToggle.textContent =
                    "🌙";
            }

        }

    }


    const savedTheme =
        localStorage.getItem(
            "campusoneTheme"
        );


    if (savedTheme) {
        applyTheme(savedTheme);
    }


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const isDark =
                    document.body.classList.contains(
                        "dark-mode"
                    );


                const newTheme =
                    isDark
                        ? "light"
                        : "dark";


                localStorage.setItem(
                    "campusoneTheme",
                    newTheme
                );


                applyTheme(newTheme);

            }
        );

    }


    /* =================================================
       BUG / FEATURE BUTTONS
    ================================================= */

    document
        .querySelectorAll(
            "[data-setting]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const type =
                        button.dataset.setting;


                    if (type === "bug") {

                        alert(
                            "Bug reporting will be connected to the CampusOne cloud system."
                        );

                    }

                    else if (
                        type === "feature"
                    ) {

                        alert(
                            "Feature suggestion will be connected to the CampusOne cloud system."
                        );

                    }

                }
            );

        });


    /* =================================================
       NOTIFICATION
    ================================================= */

    const notificationBtn =
        document.getElementById(
            "notificationBtn"
        );


    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            () => {

                alert(
                    "No new notifications."
                );

            }
        );

    }


    /* =================================================
       RESTORE LOGIN
    ================================================= */

    const savedUser =
        localStorage.getItem(
            "campusoneUser"
        );


    if (savedUser) {

        try {

            const user =
                JSON.parse(savedUser);


            if (user && user.role) {

                showApplication(user);

            }

        }

        catch (error) {

            localStorage.removeItem(
                "campusoneUser"
            );

        }

    }


});
