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

const header = document.getElementById('header');
const about = document.getElementById('aboutIntersection');
const work = document.getElementById('workIntersection');
const projects = document.getElementById('projects');
const contact = document.getElementById('contactIntersection');
let newIntersection = null;
const sections = {
  header: checkHeaderScroll,
  aboutIntersection: throttle(checkAboutScroll, 50),
  workIntersection: throttle(checkWorkScroll, 50),
  projects: throttle(checkProjectsScroll, 50),
  contactIntersection: throttle(checkContactScroll, 50),
};

function checkHeaderScroll() {
  // A stub. Not sure if the header section needs a scroll yet, but this function needs to exist for the IntersectionObserver to efficiently add and remove listeners to and from other sections
}

function checkAboutScroll() {
  const { top, height } = about.getBoundingClientRect();
  scrollDistance = -top;
  document.documentElement.style.setProperty(
    `--aboutScroll`,
    scrollDistance / (height - document.documentElement.clientHeight)
  );
  // console.log(document.documentElement.style);
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
  // console.log(document.documentElement.style);
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
[header, about, projects, work, contact].forEach((section) => {
  observer.observe(section);
});

// setTimeout(function() {
//   const thing = document.querySelector('.intro__name__A1');
//   thing.classList.add('slide__A');
// }, 3000);

// Observer logic that guarantees only one scroll listener is active at a time.
/* 
const observer = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    const section = entry.target.id;
    if (entry.isIntersecting) {
      newIntersection = entry.target.id;
    }
    if (!entry.isIntersecting && newIntersection) {
      removeEventListener('scroll', sections[section].scrollFunction);
      addEventListener('scroll', sections[newIntersection].scrollFunction);
    }
  })
}, {});
*/
