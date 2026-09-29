/* =========================================
DOM ELEMENTS
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const yearElement = document.getElementById("year");

/* =========================================
MOBILE NAVIGATION
========================================= */

if (menuToggle && navLinks) {

menuToggle.addEventListener("click", () => {

```
const open = navLinks.classList.toggle("open");

menuToggle.setAttribute(
  "aria-expanded",
  String(open)
);

/* Change menu icon */

menuToggle.textContent = open ? "✕" : "☰";
```

});

/* Close menu when a navigation link is clicked */

document
.querySelectorAll(".nav-links a")
.forEach(link => {

```
  link.addEventListener("click", () => {

    navLinks.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.textContent = "☰";

  });

});
```

}

/* =========================================
THEME TOGGLE
========================================= */

const savedTheme =
localStorage.getItem("aravind-theme");

/* Apply saved theme */

if (savedTheme === "light") {

document.body.classList.add("light");

if (themeToggle) {
themeToggle.textContent = "☀";
}

} else {

if (themeToggle) {
themeToggle.textContent = "☾";
}

}

/* Toggle light / dark theme */

if (themeToggle) {

themeToggle.addEventListener("click", () => {

```
document.body.classList.toggle("light");

const light =
  document.body.classList.contains("light");


/* Save theme preference */

localStorage.setItem(
  "aravind-theme",
  light ? "light" : "dark"
);


/* Change button icon */

themeToggle.textContent =
  light ? "☀" : "☾";
```

});

}

/* =========================================
CURRENT YEAR
========================================= */

if (yearElement) {

yearElement.textContent =
new Date().getFullYear();

}

/* =========================================
SCROLL REVEAL ANIMATION
========================================= */

const revealElements =
document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

const observer =
new IntersectionObserver(
(entries, observerInstance) => {

```
    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        /*
         * Stop observing once the
         * element has appeared.
         */

        observerInstance.unobserve(
          entry.target
        );

      }

    });

  },
  {
    threshold: 0.12
  }
);
```

revealElements.forEach(element => {

```
observer.observe(element);
```

});

} else {

/*

* Fallback for older browsers
  */

revealElements.forEach(element => {

```
element.classList.add("visible");
```

});

}

/* =========================================
PROFILE PHOTO
========================================= */

const profilePhoto =
document.querySelector(".profile-photo");

if (profilePhoto) {

profilePhoto.addEventListener(
"load",
() => {

```
  profilePhoto.classList.add(
    "loaded"
  );

}
```

);

/*

* If the image cannot be loaded,
* keep the layout intact.
  */

profilePhoto.addEventListener(
"error",
() => {

```
  console.warn(
    "Profile photo could not be loaded. Check: assets/profile-photo.png"
  );

}
```

);

}

/* =========================================
EMAIL & CALL BUTTONS
========================================= */

const emailButtons =
document.querySelectorAll(
'a[href^="mailto:"]'
);

const callButtons =
document.querySelectorAll(
'a[href^="tel:"]'
);

/*

* Email buttons
*
* The browser will automatically open
* the user's default email application.
  */

emailButtons.forEach(button => {

button.addEventListener(
"click",
() => {

```
  console.log(
    "Opening email application..."
  );

}
```

);

});

/*

* Call buttons
*
* On mobile devices this opens the
* phone/dialer application.
  */

callButtons.forEach(button => {

button.addEventListener(
"click",
() => {

```
  console.log(
    "Opening phone application..."
  );

}
```

);

});

/* =========================================
CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
========================================= */

document.addEventListener(
"click",
event => {

```
if (!menuToggle || !navLinks) {
  return;
}


const clickedInsideMenu =
  navLinks.contains(event.target);

const clickedToggle =
  menuToggle.contains(event.target);


if (
  !clickedInsideMenu &&
  !clickedToggle &&
  navLinks.classList.contains("open")
) {

  navLinks.classList.remove("open");

  menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );

  menuToggle.textContent = "☰";

}
```

}
);

/* =========================================
CLOSE MENU WITH ESCAPE KEY
========================================= */

document.addEventListener(
"keydown",
event => {

```
if (
  event.key === "Escape" &&
  navLinks &&
  navLinks.classList.contains("open")
) {

  navLinks.classList.remove("open");

  if (menuToggle) {

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.textContent = "☰";

  }

}
```

}
);
