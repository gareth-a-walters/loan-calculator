// Listen for submit
document.querySelector('#loan-form').addEventListener('submit', function (event) {
  // Hide Results
  document.querySelector('#results').style.display = 'none';
  // Display loading spinner
  document.querySelector('#loading').style.display = 'block';
  // Calculate results after 2 seconds
  setTimeout(calculateResults, 2000);
  // Prevent default form event
  event.preventDefault();
});

// Calculate Results
function calculateResults() {
  // UI variables
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //Compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    // Show results
    document.querySelector('#results').style.display = 'block';
    // Hide loading spinner
    document.querySelector('#loading').style.display = 'none';
  } else {
    showError('Please check input values');
  }
}

// Show Input Values Error Message
function showError(error) {
  // Hide results
  document.querySelector('#results').style.display = 'none';
  // Hide loading spinner
  document.querySelector('#loading').style.display = 'none';
  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Create div
  const errorDiv = document.createElement('div');
  // Add class
  errorDiv.className = 'alert alert-danger';
  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));
  // Insert error above heading
  card.insertBefore(errorDiv, heading);
  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear Input Values Error Message
function clearError() {
  document.querySelector('.alert').remove();
}
