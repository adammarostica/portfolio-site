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

const header = document.getElementById("header");
const about = document.getElementById("aboutIntersection");
const works = document.getElementById("workIntersection");
let newIntersection = null;
const sections = {
  header: {
    scrollFunction: checkHeaderScroll,
  },
  aboutIntersection: {
    scrollFunction: throttle(checkAboutScroll, 50),
    scrollOption: true,
  },
  workIntersection: {
    scrollFunction: throttle(checkWorksScroll, 50),
    scrollOption: false,
  },
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

function checkWorksScroll() {
  const { top, height } = works.getBoundingClientRect();
  scrollDistance = -top;
  document.documentElement.style.setProperty(
    `--worksScroll`,
    scrollDistance / (height - document.documentElement.clientHeight)
  );
}

// Whenever the IntersectionObserver observes a section entering the viewport, it activates that section's scroll listener. Conversely, whenever it observes a section leaving the viewport, it removes that section's scroll listener.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const section = entry.target.id;
    if (entry.isIntersecting) {
      addEventListener("scroll", sections[section].scrollFunction);
    }
    if (!entry.isIntersecting) {
      removeEventListener("scroll", sections[section].scrollFunction);
    }
  });
}, {});

// Observes the entry of new sections into viewport
[header, about, works].forEach((section) => {
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
