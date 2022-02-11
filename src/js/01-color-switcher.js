const bodyRef = document.querySelector('body');
let intId = null;

bodyRef.addEventListener('click', onBtnClick);

function onBtnClick(e) {
  if (e.target.tagName !== 'BUTTON') {
    return;
  }
  if (e.target.textContent === 'Start') {
    console.log('start');
    e.target.disabled = true;
    e.target.nextElementSibling.disabled = false;
    // console.log([e.target.dataset]);
    intId = setInterval(() => {
      startInterval();
    }, 1000);
  } else {
    console.log('stop');
    clearInterval(intId);
    e.target.disabled = true;
    e.target.previousElementSibling.disabled = false;
    intId = null;
    // console.log(e.target.dataset, 'bbbbbb');
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startInterval() {
  bodyRef.style.backgroundColor = getRandomHexColor();
}
