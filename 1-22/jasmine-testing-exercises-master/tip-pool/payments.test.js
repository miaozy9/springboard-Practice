describe("Payments test (with setup and tear-down)", function() {
    beforeEach(function () {
      billAmtInput.value = 100;
      tipAmtInput.value = 15;
    });
  
    it('should add a new payment to allPayments on submitPaymentInfo()', function () {
      submitPaymentInfo();
      expect(Object.keys(allPayments).length).toEqual(1);
      expect(allPayments['payment1'].billAmt).toEqual('100');
      expect(allPayments['payment1'].tipAmt).toEqual('15');
      expect(allPayments['payment1'].tipPercent).toEqual(15);
    });
  
    it('should update paymentTable on appendPaymentTable()', function () {
      let currPayment = createCurPayment();
      allPayments['payment1'] = currPayment;
      appendPaymentTable(currPayment);
      let curTdList = document.querySelectorAll('#paymentTable tbody tr td');
      expect(curTdList.length).toEqual(4);
      expect(curTdList[0].innerText).toEqual('$100');
      expect(curTdList[1].innerText).toEqual('$15');
      expect(curTdList[2].innerText).toEqual('15%');
      expect(curTdList[3].innerText).toEqual('X');
    });
  
    it('should create a new payment on createCurPayment()', function () {
      expect(createCurPayment()).toEqual({
        billAmt: '100',
        tipAmt: '15',
        tipPercent: 15,
      });
    });
  
    afterEach(function() {
      billAmtInput.value = '';
      tipAmtInput.value = '';
      paymentTbody.innerHTML = '';
      serverTbody.innerHTML = '';
      summaryTds[0].innerHTML = '';
      summaryTds[1].innerHTML = '';
      summaryTds[2].innerHTML = '';
      paymentId = 0;
      allPayments = {};
    });
  });