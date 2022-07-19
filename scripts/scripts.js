const burger = document.getElementById('burger__menu');
const navList = document.getElementById('nav__list');
const header = document.getElementById('header');
const about = document.getElementById('aboutIntersection');
const projects = document.getElementById('projectsIntersection');
const tools = document.getElementById('toolsIntersection');
const contact = document.getElementById('contactIntersection');
const upArrow = document.getElementById('upNavigator')
const downArrow = document.getElementById('downNavigator')
const sections = {
  header: throttle(checkHeaderScroll, 10),
  aboutIntersection: throttle(checkAboutScroll, 10),
  toolsIntersection: throttle(checkToolsScroll, 10),
  projectsIntersection: throttle(checkProjectsScroll, 10),
  contactIntersection: throttle(checkContactScroll, 10),
};


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

function checkHeaderScroll() {
  const { top, height } = header.getBoundingClientRect();
  scrollDistance = -top;
  document.documentElement.style.setProperty(
    `--headerScroll`,
    scrollDistance / (height - document.documentElement.clientHeight) / 100
  );
}

function checkAboutScroll() {
  const { top, height } = about.getBoundingClientRect();
  scrollDistance = -top;
  document.documentElement.style.setProperty(
    `--aboutScroll`,
    scrollDistance / (height - document.documentElement.clientHeight)
  );
}

function checkToolsScroll() {
  const { top, height } = tools.getBoundingClientRect();
  scrollDistance = -top;
  document.documentElement.style.setProperty(
    `--toolsScroll`,
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
[header, about, projects, tools, contact].forEach((section) => {
  observer.observe(section);
});


window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});

// Click to open mailbox
// const mailbox = document.getElementById('mailbox');

// mailbox.addEventListener('click', function() {
//   this.classList.toggle('open');
// })