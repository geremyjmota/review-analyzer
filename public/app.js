document.getElementById('analyzeBtn').addEventListener('click', async () => {
  const review = document.getElementById('reviewInput').value.trim();
  
  if (!review) {
    alert('Please enter a review to analyze');
    return;
  }
  
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ review })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      displayResult(data);
    } else {
      alert(data.error || 'An error occurred');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to analyze review. Please try again.');
  }
});

function displayResult(data) {
  const resultDiv = document.getElementById('result');
  resultDiv.classList.remove('hidden');
  
  const badge = document.getElementById('sentimentBadge');
  badge.textContent = data.sentiment;
  badge.className = 'sentiment-badge ' + data.sentiment;
  
  document.getElementById('scoreValue').textContent = data.score + '%';
  document.getElementById('confidenceValue').textContent = data.confidence;
  document.getElementById('positiveCount').textContent = data.positiveCount || 0;
  document.getElementById('negativeCount').textContent = data.negativeCount || 0;
}
