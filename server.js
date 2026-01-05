const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static('public'));

app.set('trust proxy', true);

function analyzeSentiment(text) {
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'best', 'perfect', 'awesome', 'happy', 'pleased', 'satisfied', 'recommend', 'outstanding'];
  const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'disappointing', 'poor', 'useless', 'broken', 'frustrated', 'angry', 'waste', 'avoid', 'never'];
  
  const words = text.toLowerCase().split(/\s+/);
  let positiveCount = 0;
  let negativeCount = 0;
  
  words.forEach(word => {
    if (positiveWords.some(pw => word.includes(pw))) positiveCount++;
    if (negativeWords.some(nw => word.includes(nw))) negativeCount++;
  });
  
  const total = positiveCount + negativeCount;
  if (total === 0) return { sentiment: 'neutral', score: 0, confidence: 'low' };
  
  const score = (positiveCount - negativeCount) / total;
  let sentiment, confidence;
  
  if (score > 0.3) sentiment = 'positive';
  else if (score < -0.3) sentiment = 'negative';
  else sentiment = 'neutral';
  
  confidence = total >= 3 ? 'high' : total >= 1 ? 'medium' : 'low';
  
  return { sentiment, score: Math.round(score * 100), confidence, positiveCount, negativeCount };
}

app.post('/api/analyze', (req, res) => {
  const { review } = req.body;
  
  if (!review || typeof review !== 'string') {
    return res.status(400).json({ error: 'Please provide a review text' });
  }
  
  const analysis = analyzeSentiment(review);
  res.json(analysis);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Review Analyzer running on http://0.0.0.0:${PORT}`);
});
