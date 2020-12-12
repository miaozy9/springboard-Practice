describe("Sum and append test (with setup and tear-down)", function() {
    beforeEach(function () {
      billAmtInput.value = 100;
      tipAmtInput.value = 15;
      submitPaymentInfo();
    });
  
    it('should sum total tip on sumPaymentTotal()', function () {
      expect(sumPaymentTotal('tipAmt')).toEqual(15);
      billAmtInput.value = 150;
      tipAmtInput.value = 35;
      submitPaymentInfo();
      expect(sumPaymentTotal('tipAmt')).toEqual(50);
    });
  
    it('should sum total bill on sumPaymentTotal()', function () {
      expect(sumPaymentTotal('billAmt')).toEqual(100);
      billAmtInput.value = 150;
      tipAmtInput.value = 35;
      submitPaymentInfo();
      expect(sumPaymentTotal('billAmt')).toEqual(250);
    });
  
    it('should sum total tip percent on sumPaymentTotal()', function () {
      expect(sumPaymentTotal('tipPercent')).toEqual(15);
      billAmtInput.value = 200;
      tipAmtInput.value = 20;
      submitPaymentInfo();
      expect(sumPaymentTotal('tipPercent')).toEqual(25);
    });
  
    it('should calculate tip percent of a single payment on calculateTipPercent()', function () {
      expect(calculateTipPercent(100, 15)).toEqual(15);
      expect(calculateTipPercent(120, 30)).toEqual(25);
    });
  
    it('should append new Td to Tr on appendTd(tr, value)', function () {
      let newTr = document.createElement('tr');
      appendTd(newTr, 'Alice $1.00 X');
      expect(newTr.children.length).toEqual(1);
      expect(newTr.firstChild.innerHTML).toEqual('Alice $1.00 X');
    });
  
    it('should append delete button Td and Tr on appendDeleteBtn(tr, type)', function () {
      let newTr = document.createElement('tr');
      appendDeleteBtn(newTr);
      expect(newTr.children.length).toEqual(1);
      expect(newTr.firstChild.innerHTML).toEqual('X');
    });
  
    afterEach(function() {
      billAmtInput.value = '';
      tipAmtInput.value = '';
      paymentTbody.innerHTML = '';
      summaryTds[0].innerHTML = '';
      summaryTds[1].innerHTML = '';
      summaryTds[2].innerHTML = '';
      serverTbody.innerHTML = '';
      allPayments = {};
      paymentId = 0;
    });
});