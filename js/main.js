/* =========================================================
   Courtney & Christian - wedding site interactions
   - Sticky nav background on scroll
   - Active nav link highlighting (scroll spy)
   - Countdown to the big day
   No dependencies. Runs after DOM parse (script is deferred).
   ========================================================= */

(function () {
  "use strict";

  /* ----- Wedding date: 3 April 2027, Bluffton SC (US Eastern, EDT) -----
     Update the time here once the ceremony time is set. */
  var WEDDING_DATE = new Date("2027-04-03T16:00:00-04:00");

  /* --------------------- Sticky nav on scroll ---------------------- */
  var nav = document.getElementById("siteNav");

  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ------------------ Active link highlighting --------------------- */
  // Map each in-page nav link to the section it points to, then use an
  // IntersectionObserver to flag the section currently in view.
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.site-nav__links a[href^="#"]')
  );

  var observedSections = [];

  navLinks.forEach(function (link) {
    var id = link.getAttribute("href").slice(1);
    var section = id ? document.getElementById(id) : null;
    if (section) {
      observedSections.push(section);
    }
  });

  function setActive(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle(
        "is-active",
        link.getAttribute("href") === "#" + id
      );
    });
  }

  if ("IntersectionObserver" in window && observedSections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      // Trigger when a section crosses the upper third of the viewport.
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    observedSections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* -------------------------- Countdown ---------------------------- */
  var countdownEl = document.getElementById("countdown");

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function renderCountdown() {
    if (!countdownEl) return;

    var diff = WEDDING_DATE.getTime() - Date.now();

    var fields;
    if (diff <= 0) {
      // The day has arrived (or passed) — show zeros.
      fields = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    } else {
      var sec = Math.floor(diff / 1000);
      fields = {
        days: Math.floor(sec / 86400),
        hours: Math.floor((sec % 86400) / 3600),
        minutes: Math.floor((sec % 3600) / 60),
        seconds: sec % 60,
      };
    }

    Object.keys(fields).forEach(function (key) {
      var el = countdownEl.querySelector('[data-cd="' + key + '"]');
      if (el) {
        el.textContent = key === "days" ? String(fields[key]) : pad(fields[key]);
      }
    });
  }

  if (countdownEl) {
    renderCountdown();
    setInterval(renderCountdown, 1000);
  }
})();
