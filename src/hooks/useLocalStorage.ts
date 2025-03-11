const useLocalStorage = (pizza) => {
  if (localStorage.getItem('pizzas')) {
    const pizzas = JSON.parse(localStorage.getItem('pizzas'))
    pizzas.push(pizza)
    localStorage.setItem('pizzas', JSON.stringify(pizzas))
  } else {
    localStorage.setItem('pizzas', JSON.stringify([pizza]))
  }
}

export default useLocalStorage
