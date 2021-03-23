window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const initValue = {amount: 5000, year: 10, rate: 2.5};
  document.getElementById("loan-amount").value = initValue.amount;
  document.getElementById("loan-years").value = initValue.year;
  document.getElementById("loan-rate").value = initValue.rate;
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const currentValue = getCurrentUIValues();
  updateMonthly(calculateMonthlyPayment(currentValue));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const yearRate = (values.rate / 100);
  const monthRate = yearRate /12
  const numMonths = Math.floor(values.years * 12);
  const monthlyPayment = (monthRate * values.amount) /(1 - Math.pow((1 + monthRate), -numMonths))
  return monthlyPayment.toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  document.getElementById("monthly-payment").innerText = '$' + monthly;
}
