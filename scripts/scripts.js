function throttle(cb, delay = 1000) {
  let shouldWait = false
  let waitingArgs
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false
    } else {
      cb(...waitingArgs)
      waitingArgs = null
      setTimeout(timeoutFunc, delay)
    }
  }

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args
      return
    }

    cb(...args)
    shouldWait = true

    setTimeout(timeoutFunc, delay)
  }
}

// function debounce(func, wait = 10, immediate = true) {
//   let timeout;
//   return function (...args) {
//     const context = this;
//     const later = function () {
//       timeout = null;
//       if (!immediate) func.apply(context, args);
//     };
//     const callNow = immediate && !timeout;
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//     if (callNow) func.apply(context, args);
//   };
// }

const about = document.getElementById('about');
function checkScroll () {
  const {top, height}  = about.getBoundingClientRect();
  scrollDistance = -(top);
  document.documentElement.style.setProperty('--scroll', (scrollDistance/(height - document.documentElement.clientHeight)));
  // console.log(document.documentElement.clientHeight, window.innerHeight);
  // console.log(top, height, bottom);
  // console.log(window.pageYOffset, document.body.offsetHeight, window.innerHeight);
  // document.documentElement.style.setProperty('--scroll', (top / height - window.innerHeight));
  // console.log(document.documentElement.style);
}
console.log(about);
window.addEventListener('scroll', throttle(checkScroll, 10), false);

// setTimeout(function() {
//   const thing = document.querySelector('.intro__name__A1');
//   thing.classList.add('slide__A');
// }, 3000);