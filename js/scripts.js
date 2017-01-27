var Pizza = function() {
  this.wholeSize = "hidden";
  this.toppings = [];
}

var Topping = function() {
  this.price = 0;
}


$(function() {
  var pizza = new Pizza();

  $(".size-button").click(function() {
    pizza.wholeSize = $(this).attr('id');
    $('#pizza-div').removeClass("large medium small hidden");
    $('#pizza-div').addClass(pizza.wholeSize);
    console.log(pizza.wholeSize);
  })
})
