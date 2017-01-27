var toppingsArray = [["pepperoni", 1.0], ["mushroom", 0.5], ["bacon", 1.5], ["pepper", 1.0], ["onion", 1.0], ["basil", 1.5], ["garlic", 1.0], ["chicken", 1.5], ["extra cheese", 1.0]];

var Pizza = function() {
  this.wholeSize = "hidden";
  this.toppings = [];
}

var Topping = function(toppingName, cost) {
  this.toppingName = toppingName;
  this.cost = cost;
}

Pizza.prototype.addTopping = function(topping) {
  // this function adds a topping object to the pizza object
  this.toppings.push(topping);
}

Pizza.prototype.finalPrice = function() {
  var totalPrice = 7.0;
  var costAdjuster = 1.0;
  if (this.wholeSize === "large") {
    totalPrice += 8.0;
    costAdjuster = 1.5;
  } else if (this.wholeSize === "medium") {
    totalPrice += 4.0;
  } else {
    totalPrice += 1.0;
    costAdjuster = 0.5;
  }
  for (var index = 0; index < this.toppings.length; index++) {
    totalPrice += this.toppings[index].cost;
  }
  return totalPrice;
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
  generateToppingsButtons(toppingsArray, "toppings-buttons-div");

  $(".size-button").click(function() {
    pizza.wholeSize = $(this).attr('id');
    $('#pizza-dough').removeClass("large medium small hidden");
    $('#pizza-dough').addClass(pizza.wholeSize);
    console.log(pizza.wholeSize);
  })

  $(".topping-button").click(function() {
    var chosenTopping = getTopping($(this).attr('id'), toppingsArray);
    var newTopping = new Topping(chosenTopping[0], chosenTopping[1]);
    pizza.addTopping(newTopping);
    console.log("#" + $(this).attr('id') + "-image");
    var toppingImage = $("toppings-div").find();
    $("#pizza-dough").append($("#" + $(this).attr('id') + "-image"));
  })

  $('.checkout-button').click(function() {
    if (pizza.wholeSize != "hidden") {
      console.log(pizza.finalPrice());
    }
  })
})












var spacer = true;
