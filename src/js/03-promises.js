const refsForm = document.querySelector('.form');

const submitHandler = e => {
  e.preventDefault();
  let { delay, step, amount } = makeFormData(e.currentTarget);

  for (let position = 1; position <= amount; position += 1) {
    // delay = delay + position * step;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }

  // form.reset();
};
function makeFormData(form) {
  const finalData = {};
  const formData = new FormData(form);
  for (const [key, value] of formData.entries()) {
    if (!value) {
      alert('Please fill in all the fields!');
      return;
    }
    finalData[key] = +value;
  }
  return finalData;
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  return promise;
}

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

refsForm.addEventListener('submit', submitHandler);
