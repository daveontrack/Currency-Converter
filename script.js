const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const resultDiv = document.getElementById('result');
const rateInfoDiv = document.getElementById('rate-info');
const dateDiv = document.getElementById('date');

// Set today's date
const today = new Date().toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
dateDiv.textContent = `Today's Date: ${today}`;

// Load currency options
async function loadCurrencies() {
  const res = await fetch('https://v6.exchangerate-api.com/v6/199e582031bd1578de0c32c6/latest/USD');
  const data = await res.json();
  const currencyCodes = Object.keys(data.conversion_rates);

  currencyCodes.forEach(code => {
    const option1 = new Option(code, code);
    const option2 = new Option(code, code);
    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
  });

  fromCurrency.value = 'USD';
  toCurrency.value = 'EUR';
}

async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    resultDiv.textContent = 'Please enter a valid amount.';
    rateInfoDiv.textContent = '';
    return;
  }

  const url = `https://v6.exchangerate-api.com/v6/199e582031bd1578de0c32c6/pair/${from}/${to}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.conversion_rate) {
    const converted = (amount * data.conversion_rate).toFixed(2);
    resultDiv.textContent = `${amount} ${from} = ${converted} ${to}`;
    rateInfoDiv.textContent = `1 ${from} = ${data.conversion_rate.toFixed(4)} ${to}`;
  } else {
    resultDiv.textContent = 'Error fetching rate.';
    rateInfoDiv.textContent = '';
  }
}

// Load on page ready
window.addEventListener('DOMContentLoaded', loadCurrencies);
