# Review Analyzer

A simple web application that analyzes the sentiment of customer reviews.

## Overview

This application provides a user-friendly interface for analyzing text reviews. It determines whether a review is positive, negative, or neutral based on keyword analysis.

## Project Structure

```
/
├── server.js          # Express server with sentiment analysis API
├── package.json       # Node.js dependencies
├── public/
│   ├── index.html     # Main HTML page
│   ├── style.css      # Styles
│   └── app.js         # Frontend JavaScript
└── replit.md          # Project documentation
```

## Technology Stack

- **Backend**: Node.js with Express
- **Frontend**: HTML, CSS, JavaScript (vanilla)
- **Port**: 5000

## API Endpoints

- `POST /api/analyze` - Analyzes review text and returns sentiment data
  - Request body: `{ "review": "your review text" }`
  - Response: `{ "sentiment": "positive|negative|neutral", "score": number, "confidence": "low|medium|high" }`

## Running the Application

```bash
npm start
```

The application will be available at port 5000.
