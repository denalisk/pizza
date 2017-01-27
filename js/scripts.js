var toppingsArray = [["pepperoni", 1.0], ["mushrooms", 0.5], ["bacon", 1.5], ["peppers", 1.0], ["onions", 1.0], ["basil", 1.5], ["garlic", 1.0], ["chicken", 1.5], ["extra cheese", 1.0]];

var Pizza = function() {
  this.wholeSize = "hidden";
  this.toppings = [];
}

var Topping = function(toppingName, price) {
  this.toppingName = toppingName;
  this.price = price;
}

Pizza.prototype.addTopping = function(topping) {
  // this function adds a topping object to the pizza object
  this.toppings.push(topping);
}

var getTopping = function(toppingName, toppingsArray) {
  // this function returns the topping item from the toppingsArray
  for (var index = 0; index < toppingsArray.length; index++) {
    if (toppingsArray[index][0] === toppingName) {
      return toppingsArray[index];
    }
  }
}

var makeElement = function(element, classes, id, parentDivClass, htmlText) {
  // this function generates a new element and appends it to the parentDiv
  var newElement = document.createElement(element);
  newElement.className = classes;
  newElement.innerHTML = htmlText;
  newElement.id = id;
  $("." + parentDivClass).append(newElement);
}

var generateToppingsButtons = function(toppingsArray, toppingsDiv) {
  // this function makes buttons out of all the elements in the toppingsArray and sticks them in the toppingsDiv
  for (var index = 0; index < toppingsArray.length; index++) {
    makeElement('button', "topping-button btn btn-danger capitals", toppingsArray[index][0], toppingsDiv, toppingsArray[index][0])
  }
}

$(function() {
  var pizza = new Pizza();
  generateToppingsButtons(toppingsArray, "toppings-div");

  $(".size-button").click(function() {
    pizza.wholeSize = $(this).attr('id');
    $('#pizza-div').removeClass("large medium small hidden");
    $('#pizza-div').addClass(pizza.wholeSize);
    console.log(pizza.wholeSize);
  })

  $(".topping-button").click(function() {
    var chosenTopping = getTopping($(this).attr('id'), toppingsArray);
    var newTopping = new Topping(chosenTopping[0], chosenTopping[1]);
    pizza.addTopping(newTopping);
    console.log(pizza.toppings);
  })
})
