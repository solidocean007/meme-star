// Async js & callback functions
// episode 11 of ColorCode Youtube

// synchronus code stops all code afterwards
// asychronus doesnt wait

// let food;
// const getPizza = () => {
//   console.log("Order pizza");
//   setTimeout(() => {
//     food = "🍕🍕🍕🍕🍕";
//     console.log(`${food} was made and is ready`);
//   }, 2000);
//   console.log("Pizza was delivered.");
// };

// getPizza();
// console.log("Clean house");
// console.log(`Eat ${food}`);
// let food;
const orderPizza = (callback) => {
  setTimeout(() => {
    const pizza = `🍕`
    callback(pizza)
  }, 2000);
}

const foodReady = (food) => {
  console.log(`Eat the ${food}`)
}

orderPizza(foodReady);
console.log('Clean up!')

const clickScreen = () => {
  console.log('Clicked');
}

window.addEventListener('click', clickScreen)


