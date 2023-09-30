// made by recanman
bigDecimal = bigDecimal.default
const units = [
  {'unit': 'piconero', 'conversionFactor': new bigDecimal('0.000000000001')},
  {'unit': 'nanonero', 'conversionFactor': new bigDecimal('0.000000001')},
  {'unit': 'micronero', 'conversionFactor': new bigDecimal('0.000001')},
  {'unit': 'millinero', 'conversionFactor': new bigDecimal('0.001')},
  {'unit': 'centinero', 'conversionFactor': new bigDecimal('0.01')},
  {'unit': 'decinero', 'conversionFactor': new bigDecimal('0.1')},
  {'unit': 'monero', 'conversionFactor': new bigDecimal('1')},
  {'unit': 'decanero', 'conversionFactor': new bigDecimal('10')},
  {'unit': 'hectonero', 'conversionFactor': new bigDecimal('100')},
  {'unit': 'kilonero', 'conversionFactor': new bigDecimal('1000')},
  {'unit': 'meganero', 'conversionFactor': new bigDecimal('1000000')},
];

const convert = (number, numberUnit, targetUnit) => {
  const numberFactor = units.find(data => data.unit === numberUnit)?.conversionFactor || 1;
  const targetFactor = units.find(data => data.unit === targetUnit)?.conversionFactor || 1;

  return number.multiply(numberFactor.divide(targetFactor, 12));
}

const prettyConvert = (number, numberUnit, targetUnit) => {
  return `${convert(number, numberUnit, targetUnit).getValue()} ${targetUnit}`;
}

const converterForm = document.getElementById('converter');
const resultDiv = document.getElementById('result');
const convertedAmountText = document.getElementById('convertedAmount');

const inputDenominationSelections = document.getElementsByClassName('inputDenomination');

Array.from(inputDenominationSelections).forEach(input => {
  const option = document.createElement('option');
  option.value = 'none';
  option.innerText = '--- select ---';
  input.appendChild(option);
    
  units.forEach(unit => {
    const option = document.createElement('option');
    option.value = unit.unit;
    option.innerText = `${unit.unit} (${unit.conversionFactor.getValue()})`;
    input.appendChild(option);
  })
})

converterForm.addEventListener('submit', e => {
  e.preventDefault();

  const data = new FormData(converterForm);
  const number = new bigDecimal(data.get('number'));
  const numberUnit = data.get('numberUnit');
  const targetUnit = data.get('targetUnit');

  if (numberUnit === targetUnit || numberUnit === 'none' || targetUnit === 'none') {
    return;
  }

  const prettyConvertedNumber = prettyConvert(number, numberUnit, targetUnit);
  convertedAmountText.innerText = prettyConvertedNumber;
  resultDiv.style.display = 'block';
})