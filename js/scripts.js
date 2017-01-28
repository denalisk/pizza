var toppingsArray = [["pepperoni", 1.0], ["mushroom", 0.5], ["bacon", 1.5], ["pepper", 1.0], ["onion", 1.0], ["basil", 1.5], ["garlic", 1.0], ["chicken", 1.5], ["extra cheese", 1.0]];

var orderList = [];

var Pizza = function() {
  this.wholeSize = "hidden";
  this.toppings = [];
  orderList.push(this);
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
  // This function returns the total price of a created pizza
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

var storePizza = function(pizza, destinationId) {
  // This function adds the current pizza to the list in text form
  var orderDescription = "One " + pizza.wholeSize + " pizza with ";
  if (pizza.toppings.length === 0) {
    orderDescription += "cheese"
  } else {
    for (var index = 0; index < pizza.toppings.length; index++) {
      if (index === (pizza.toppings.length - 1)) {
        orderDescription += (" & " + pizza.toppings[index].toppingName);
      } else if (pizza.toppings.length > 2) {
        orderDescription += (pizza.toppings[index].toppingName + ", ");
      } else {
        orderDescription += (" " + pizza.toppings[index].toppingName);
      }
    }
  }
  $(destinationId).append(orderDescription + "<br>");
}

var tallyPizzas = function(pizzaArray) {
  // this function totals the cost of all the pizzas
  var total = 0;
  for (var index = 0; index < pizzaArray.length; index++) {
    total += pizzaArray[index].finalPrice();
  }
  return total
}

$(function() {
  var pizza = new Pizza();
  generateToppingsButtons(toppingsArray, "toppings-buttons-div");

  $(".size-button").click(function() {
    $("#pizza-dough").show();
    pizza.wholeSize = $(this).attr('id');
    $('#pizza-dough').removeClass("large medium small hidden");
    $('#pizza-dough').addClass(pizza.wholeSize);
    console.log(pizza.wholeSize);
  })

  $("#new-pizza").click(function() {
    if (pizza.wholeSize != "hidden") {
      storePizza(pizza, "#pizza-list");
      pizza = new Pizza();
      $("#topping-pictures").empty();
      $("#pizza-dough").hide();
    }
  })

  $(".topping-button").click(function() {
    if (pizza.wholeSize != "hidden") {
      var chosenTopping = getTopping($(this).attr('id'), toppingsArray);
      var newTopping = new Topping(chosenTopping[0], chosenTopping[1]);
      pizza.addTopping(newTopping);
      console.log("#" + $(this).attr('id') + "-image");
      var toppingImage = $("toppings-div").find();
      $("#topping-pictures").append($("#" + $(this).attr('id') + "-image").clone());
    }
  })

  $('.checkout-button').click(function() {
    if (pizza.wholeSize != "hidden" || orderList.length != 0) {
      $(".price-total").text(tallyPizzas(orderList).toFixed());
      $(".receipt").show();
    }
  })

  $("#order-again").click(function() {
    location.reload();
  })
})












var spacer = true;
