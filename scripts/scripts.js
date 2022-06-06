function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function (...args) {
    const context = this;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const about = document.getElementById('about');
function checkScroll () {
  console.log(about.pageYOffset, about.offsetHeight, about.innerHeight);
  document.documentElement.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
  console.log(document.documentElement.style);
}
console.log(about);
window.addEventListener('scroll', debounce(checkScroll), false);

// setTimeout(function() {
//   const thing = document.querySelector('.intro__name__A1');
//   thing.classList.add('slide__A');
// }, 3000);