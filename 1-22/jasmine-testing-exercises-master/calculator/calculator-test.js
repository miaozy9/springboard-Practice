
it('should calculate the monthly rate correctly', function () {
  // ...
  const values = {amount: 50000, years: 15, rate: 3.7};
  expect(calculateMonthlyPayment(values)).toEqual('362.37');

});


it("should return a result with 2 decimal places", function() {
  const values = {amount: 30000, years: 8, rate: 6.2};
  expect(calculateMonthlyPayment(values)).toEqual('397.17');
});


it("should handle edge cases", function() {
  const values = {amount: 0, years: 8, rate: 6.2};
  expect(calculateMonthlyPayment(values)).toEqual('0.00');
  const values2 = {amount: 3000, years: 8, rate: 0};
  expect(calculateMonthlyPayment(values2)).toEqual('0.00');
  const values3 = {amount: 20000, years: 0, rate: 6.2};
  expect(calculateMonthlyPayment(values3)).toEqual('20000.00');
});

/// etc
