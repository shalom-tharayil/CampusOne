/* =====================================================
   CAMPUSONE
   Main Application JavaScript
===================================================== */


/* =====================================================
   DEMO USERS
   Temporary data for frontend testing.
   Real authentication will be added with the backend.
===================================================== */

const demoUsers = {

    student: {
        id: "student",
        name: "Alex Thomas",
        role: "Student",
        roleKey: "student",
        initial: "A"
    },

    teacher: {
        id: "teacher",
        name: "Dr. Anil Kumar",
        role: "Teacher",
        roleKey: "teacher",
        initial: "A"
    },

    librarian: {
        id: "librarian",
        name: "Maria Joseph",
        role: "Librarian",
        roleKey: "librarian",
        initial: "M"
    },

    principal: {
        id: "principal",
        name: "Dr. Thomas George",
        role: "Principal",
        roleKey: "principal",
        initial: "T"
    },

    admin: {
        id: "admin",
        name: "CampusOne Admin",
        role: "Admin",
        roleKey: "admin",
        initial: "C"
    }

};


/* =====================================================
   APPLICATION STATE
===================================================== */

let currentUser = null;

let currentPage = "dashboard";


/* =====================================================
   DOM ELEMENTS
===================================================== */

const loginScreen =
    document.getElementById("loginScreen");

const mainApp =
    document.getElementById("mainApp");

const loginForm =
    document.getElementById("loginForm");

const loginId =
    document.getElementById("loginId");

const password =
    document.getElementById("password");

const rememberMe =
    document.getElementById("rememberMe");

const togglePassword =
    document.getElementById("togglePassword");

const forgotPasswordBtn =
    document.getElementById("forgotPasswordBtn");

const menuBtn =
    document.getElementById("menuBtn");

const sidebar =
    document.getElementById("sidebar");

const closeSidebar =
    document.getElementById("closeSidebar");

const sidebarOverlay =
    document.getElementById("sidebarOverlay");

const logoutBtn =
    document.getElementById("logoutBtn");

const themeToggle =
    document.getElementById("themeToggle");

const userName =
    document.getElementById("userName");

const userRoleText =
    document.getElementById("userRoleText");

const sidebarRole =
    document.getElementById("sidebarRole");

const profileInitial =
    document.getElementById("profileInitial");

const loginYear =
    document.getElementById("loginYear");

const currentDay =
    document.getElementById("currentDay");

const currentDate =
    document.getElementById("currentDate");


/* =====================================================
   INITIALIZATION
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeYear();

    initializeDate();

    initializeTheme();

    initializeLogin();

    initializeNavigation();

    initializeSidebar();

    initializeSettings();

    initializeDemoButtons();

    initializePageActions();

    checkSavedLogin();

});


/* =====================================================
   YEAR
===================================================== */

function initializeYear() {

    if (loginYear) {

        loginYear.textContent =
            new Date().getFullYear();

    }

}


/* =====================================================
   DATE
===================================================== */

function initializeDate() {

    const now = new Date();

    if (currentDay) {

        currentDay.textContent =
            now.toLocaleDateString(
                "en-US",
                {
                    weekday: "long"
                }
            );

    }

    if (currentDate) {

        currentDate.textContent =
            now.toLocaleDateString(
                "en-US",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );

    }

}


/* =====================================================
   LOGIN
===================================================== */

function initializeLogin() {

    if (!loginForm) return;

    loginForm.addEventListener(
        "submit",
        handleLogin
    );

}


/* =====================================================
   LOGIN HANDLER
===================================================== */

function handleLogin(event) {

    event.preventDefault();

    const id =
        loginId.value.trim().toLowerCase();

    const enteredPassword =
        password.value.trim();


    if (!id || !enteredPassword) {

        showMessage(
            "Please enter your ID and password.",
            "warning"
        );

        return;

    }


    /*
       TEMPORARY DEMO LOGIN

       Any password works for:

       student
       teacher
       librarian
       principal
       admin

       Real authentication will be connected
       to the backend later.
    */

    const user =
        demoUsers[id];


    if (!user) {

        showMessage(
            "Demo user not found. Try Student, Teacher, Librarian, Principal or Admin.",
            "error"
        );

        return;

    }


    loginUser(user);

}


/* =====================================================
   LOGIN USER
===================================================== */

function loginUser(user) {

    currentUser = user;

    updateUserInterface();

    showMainApp();

    if (rememberMe && rememberMe.checked) {

        localStorage.setItem(
            "campusOneUser",
            JSON.stringify(user)
        );

    } else {

        sessionStorage.setItem(
            "campusOneUser",
            JSON.stringify(user)
        );

    }

}


/* =====================================================
   UPDATE USER UI
===================================================== */

function updateUserInterface() {

    if (!currentUser) return;


    if (userName) {

        userName.textContent =
            currentUser.name.split(" ")[0];

    }


    if (sidebarRole) {

        sidebarRole.textContent =
            currentUser.role;

    }


    if (profileInitial) {

        profileInitial.textContent =
            currentUser.initial;

    }


    if (userRoleText) {

        userRoleText.textContent =
            getRoleDescription(
                currentUser.roleKey
            );

    }


    updateRoleStatistics();

    updateRoleNavigation();

}


/* =====================================================
   ROLE DESCRIPTION
===================================================== */

function getRoleDescription(role) {

    const descriptions = {

        student:
            "Here's what's happening with your classes today.",

        teacher:
            "Here's your teaching schedule and today's tasks.",

        librarian:
            "Manage books, borrowing and library activities.",

        principal:
            "Here's an overview of your college.",

        admin:
            "Manage your college and CampusOne system."

    };

    return descriptions[role] ||
        "Here's what's happening today.";

}


/* =====================================================
   ROLE STATISTICS
===================================================== */

function updateRoleStatistics() {

    const attendance =
        document.getElementById(
            "attendanceStat"
        );

    const exam =
        document.getElementById(
            "examStat"
        );

    const fee =
        document.getElementById(
            "feeStat"
        );

    const library =
        document.getElementById(
            "libraryStat"
        );


    if (!currentUser) return;


    switch (currentUser.roleKey) {

        case "student":

            if (attendance)
                attendance.textContent = "86%";

            if (exam)
                exam.textContent = "12 days";

            if (fee)
                fee.textContent = "₹2,500";

            if (library)
                library.textContent = "2";

            break;


        case "teacher":

            if (attendance)
                attendance.textContent = "96%";

            if (exam)
                exam.textContent = "3 upcoming";

            if (fee)
                fee.textContent = "—";

            if (library)
                library.textContent = "4";

            break;


        case "librarian":

            if (attendance)
                attendance.textContent = "—";

            if (exam)
                exam.textContent = "—";

            if (fee)
                fee.textContent = "—";

            if (library)
                library.textContent = "1,248";

            break;


        case "principal":

            if (attendance)
                attendance.textContent = "89%";

            if (exam)
                exam.textContent = "5 upcoming";

            if (fee)
                fee.textContent = "₹4.8L";

            if (library)
                library.textContent = "1,248";

            break;


        case "admin":

            if (attendance)
                attendance.textContent = "91%";

            if (exam)
                exam.textContent = "8 upcoming";

            if (fee)
                fee.textContent = "₹12.4L";

            if (library)
                library.textContent = "1,248";

            break;

    }

}


/* =====================================================
   ROLE NAVIGATION
===================================================== */

function updateRoleNavigation() {

    const navItems =
        document.querySelectorAll(
            ".nav-item"
        );


    navItems.forEach(item => {

        const page =
            item.dataset.page;

        /*
           Later this will become a complete
           permission system from the backend.

           For now, all modules are visible.
        */

        item.style.display = "flex";

    });

}


/* =====================================================
   SHOW MAIN APP
===================================================== */

function showMainApp() {

    loginScreen.classList.remove("active");

    mainApp.classList.add("active");

    showPage("dashboard");

}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    currentUser = null;

    localStorage.removeItem(
        "campusOneUser"
    );

    sessionStorage.removeItem(
        "campusOneUser"
    );

    closeMobileSidebar();

    mainApp.classList.remove("active");

    loginScreen.classList.add("active");

    loginForm.reset();

    showMessage(
        "You have been logged out.",
        "success"
    );

}


/* =====================================================
   SAVED LOGIN
===================================================== */

function checkSavedLogin() {

    const savedUser =
        localStorage.getItem(
            "campusOneUser"
        );


    if (savedUser) {

        try {

            const user =
                JSON.parse(savedUser);

            if (user && user.roleKey) {

                loginUserWithoutSaving(
                    user
                );

            }

        } catch (error) {

            localStorage.removeItem(
                "campusOneUser"
            );

        }

    }

}


/* =====================================================
   LOGIN WITHOUT SAVING
===================================================== */

function loginUserWithoutSaving(user) {

    currentUser = user;

    updateUserInterface();

    showMainApp();

}


/* =====================================================
   DEMO LOGIN BUTTONS
===================================================== */

function initializeDemoButtons() {

    const buttons =
        document.querySelectorAll(
            ".demo-buttons button"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const role =
                    button.dataset.role;

                loginId.value =
                    role;

                password.value =
                    "demo";

            }
        );

    });

}


/* =====================================================
   PASSWORD VISIBILITY
===================================================== */

if (togglePassword) {

    togglePassword.addEventListener(
        "click",
        () => {

            const isPassword =
                password.type === "password";


            password.type =
                isPassword
                    ? "text"
                    : "password";


            togglePassword.textContent =
                isPassword
                    ? "🙈"
                    : "👁";

        }
    );

}


/* =====================================================
   FORGOT PASSWORD
===================================================== */

if (forgotPasswordBtn) {

    forgotPasswordBtn.addEventListener(
        "click",
        () => {

            showMessage(
                "Password recovery will be connected to the college authentication system.",
                "info"
            );

        }
    );

}


/* =====================================================
   NAVIGATION
===================================================== */

function initializeNavigation() {

    const navigationButtons =
        document.querySelectorAll(
            "[data-page]"
        );


    navigationButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const page =
                    button.dataset.page;

                if (page) {

                    showPage(page);

                    closeMobileSidebar();

                }

            }
        );

    });

}


/* =====================================================
   SHOW PAGE
===================================================== */

function showPage(pageName) {

    currentPage = pageName;


    const pages =
        document.querySelectorAll(
            ".page"
        );


    pages.forEach(page => {

        page.classList.remove(
            "active-page"
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

    }


    /*
       Update sidebar navigation
    */

    const navItems =
        document.querySelectorAll(
            ".nav-item"
        );


    navItems.forEach(item => {

        item.classList.toggle(
            "active",
            item.dataset.page === pageName
        );

    });


    /*
       Update bottom navigation
    */

    const bottomItems =
        document.querySelectorAll(
            ".bottom-nav-item"
        );


    bottomItems.forEach(item => {

        item.classList.toggle(
            "active",
            item.dataset.page === pageName
        );

    });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   SIDEBAR
===================================================== */

function initializeSidebar() {

    if (menuBtn) {

        menuBtn.addEventListener(
            "click",
            openMobileSidebar
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


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            logout
        );

    }

}


/* =====================================================
   OPEN SIDEBAR
===================================================== */

function openMobileSidebar() {

    sidebar.classList.add("open");

    sidebarOverlay.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";

}


/* =====================================================
   CLOSE SIDEBAR
===================================================== */

function closeMobileSidebar() {

    sidebar.classList.remove("open");

    sidebarOverlay.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


/* =====================================================
   THEME
===================================================== */

function initializeTheme() {

    const savedTheme =
        localStorage.getItem(
            "campusOneTheme"
        );


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

    }


    updateThemeButton();

}


/* =====================================================
   THEME TOGGLE
===================================================== */

function toggleTheme() {

    document.body.classList.toggle(
        "dark-mode"
    );


    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );


    localStorage.setItem(
        "campusOneTheme",
        isDark
            ? "dark"
            : "light"
    );


    updateThemeButton();

}


/* =====================================================
   THEME BUTTON
===================================================== */

function updateThemeButton() {

    if (!themeToggle) return;


    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );


    themeToggle.textContent =
        isDark
            ? "☀️"
            : "🌙";

}


/* =====================================================
   SETTINGS
===================================================== */

function initializeSettings() {

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            toggleTheme
        );

    }


    const settingButtons =
        document.querySelectorAll(
            ".setting-action"
        );


    settingButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const type =
                    button.dataset.setting;

                if (type === "bug") {

                    openFeedbackForm(
                        "Report a Bug"
                    );

                }

                if (type === "feature") {

                    openFeedbackForm(
                        "Suggest a Feature"
                    );

                }

            }
        );

    });

}


/* =====================================================
   FEEDBACK
===================================================== */

function openFeedbackForm(title) {

    const message =
        prompt(
            title + "\n\nPlease describe your request:"
        );


    if (!message) return;


    showMessage(
        "Thank you! Your submission has been recorded locally for now.",
        "success"
    );

}


/* =====================================================
   PAGE ACTIONS
===================================================== */

function initializePageActions() {

    const notificationBtn =
        document.getElementById(
            "notificationBtn"
        );

    const profileBtn =
        document.getElementById(
            "profileBtn"
        );


    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            () => {

                showMessage(
                    "You have 3 new notifications.",
                    "info"
                );

            }
        );

    }


    if (profileBtn) {

        profileBtn.addEventListener(
            "click",
            () => {

                showPage("settings");

            }
        );

    }

}


/* =====================================================
   MESSAGE / TOAST
===================================================== */

function showMessage(
    message,
    type = "info"
) {

    let toast =
        document.getElementById(
            "campusOneToast"
        );


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );

        toast.id =
            "campusOneToast";

        document.body.appendChild(
            toast
        );

    }


    toast.textContent =
        message;


    toast.className =
        "campusone-toast " +
        type;


    requestAnimationFrame(() => {

        toast.classList.add(
            "show"
        );

    });


    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 3500);

}


/* =====================================================
   TOAST STYLES
   Injected so no extra CSS file is required.
===================================================== */

const toastStyle =
document.createElement("style");

toastStyle.textContent = `

    .campusone-toast {

        position: fixed;

        left: 50%;
        bottom: 85px;

        transform:
            translate(-50%, 20px);

        width:
            min(90%, 420px);

        padding:
            13px 16px;

        border-radius:
            11px;

        background:
            var(--text);

        color:
            var(--surface);

        font-size:
            12px;

        text-align:
            center;

        box-shadow:
            var(--shadow-md);

        opacity:
            0;

        pointer-events:
            none;

        z-index:
            3000;

        transition:
            0.25s ease;

    }


    .campusone-toast.show {

        opacity:
            1;

        transform:
            translate(-50%, 0);

    }


    .campusone-toast.success {

        border-left:
            4px solid
            var(--success);

    }


    .campusone-toast.warning {

        border-left:
            4px solid
            var(--warning);

    }


    .campusone-toast.error {

        border-left:
            4px solid
            var(--danger);

    }


    .campusone-toast.info {

        border-left:
            4px solid
            var(--primary);

    }

`;

document.head.appendChild(
    toastStyle
);


/* =====================================================
   KEYBOARD SHORTCUTS
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        /*
           Escape closes mobile sidebar.
        */

        if (event.key === "Escape") {

            closeMobileSidebar();

        }

    }
);


/* =====================================================
   SERVICE WORKER
===================================================== */

if (
    "serviceWorker" in navigator
) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register(
                    "service-worker.js"
                )
                .then(
                    registration => {

                        console.log(
                            "CampusOne Service Worker registered:",
                            registration.scope
                        );

                    }
                )
                .catch(
                    error => {

                        console.log(
                            "Service Worker registration failed:",
                            error
                        );

                    }
                );

        }
    );

}


/* =====================================================
   APP READY
===================================================== */

console.log(
    "CampusOne frontend initialized."
);
