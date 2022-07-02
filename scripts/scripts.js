const burger = document.getElementById('burger__menu');
const navList = document.getElementById('nav__list');
const header = document.getElementById('header');
const about = document.getElementById('aboutIntersection');
const work = document.getElementById('workIntersection');
const projects = document.getElementById('projects');
const contact = document.getElementById('contactIntersection');
const sections = {
  aboutIntersection: throttle(checkAboutScroll, 50),
  workIntersection: throttle(checkWorkScroll, 50),
  projects: throttle(checkProjectsScroll, 50),
  contactIntersection: throttle(checkContactScroll, 50),
};

burger.addEventListener('click', function() {
  if (this.classList.contains('burger__menu--x')) {
    this.classList.replace('burger__menu--x', 'burger__menu--burger');
  } else if (this.classList.contains('burger__menu--burger')) {
    this.classList.replace('burger__menu--burger', 'burger__menu--x');
  } else {
    this.classList.add('burger__menu--x');
  }
  navList.classList.toggle('nav__list--visible');
});

function throttle(cb, delay = 1000) {
  let shouldWait = false;
  let waitingArgs;
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      cb(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    cb(...args);
    shouldWait = true;

    setTimeout(timeoutFunc, delay);
  };
}

function checkAboutScroll() {
  const { top, height } = about.getBoundingClientRect();
  scrollDistance = -top;
  document.documentElement.style.setProperty(
    `--aboutScroll`,
    scrollDistance / (height - document.documentElement.clientHeight)
  );
}

function checkWorkScroll() {
  const { top, height } = work.getBoundingClientRect();
  scrollDistance = -top;
  document.documentElement.style.setProperty(
    `--workScroll`,
    scrollDistance / (height - document.documentElement.clientHeight)
  );
}

function checkProjectsScroll() {
  const { top, height } = projects.getBoundingClientRect();
  scrollDistance = -top;
  document.documentElement.style.setProperty(
    `--projectsScroll`,
    scrollDistance / (height - document.documentElement.clientHeight)
  );
}

function checkContactScroll() {
  const { top, height } = contact.getBoundingClientRect();
  scrollDistance = -top;
  document.documentElement.style.setProperty(
    `--contactScroll`,
    scrollDistance / (height - document.documentElement.clientHeight)
  );
}

// Whenever the IntersectionObserver observes a section entering the viewport, it activates that section's scroll listener. Conversely, whenever it observes a section leaving the viewport, it removes that section's scroll listener.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const section = entry.target.id;
    if (entry.isIntersecting) {
      addEventListener("scroll", sections[section]);
    }
    if (!entry.isIntersecting) {
      removeEventListener("scroll", sections[section]);
    }
  });
}, {});

// Observes the entry of new sections into viewport
[about, projects, work, contact].forEach((section) => {
  observer.observe(section);
});

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});