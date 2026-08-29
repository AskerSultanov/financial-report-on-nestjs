export function calcTaxAmount(taxableAmount: number, taxRate: number): number {
  if (taxRate === 0) {
    return 0;
  }

  var tax: number = (taxableAmount * taxRate) / 100;

  return tax;
}
