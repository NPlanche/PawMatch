# PawMatch

PawMatch is a pet breed matching app I built to help people find **dog and cat breeds** that fit their lifestyle.

The idea behind the project is simple: instead of scrolling through random breeds, users can take a quiz and get matches based on the kind of pet they’re actually looking for. The app uses breed data from **TheDogAPI** and **TheCatAPI** to generate results, show breed details, and make the experience feel more useful and personalized.

---
## Live demo

Deployed with *GitHub Pages*: [PawMatch Live](https://nplanche.github.io/PawMatch/)

---

## Why I built this

I wanted to make something that felt fun to use, but also helpful. PawMatch is an interactive way to explore breeds by answering a few questions and getting matched with cats or dogs that may suit them better.

---

## Features

- Take a **dog quiz** to find breeds that match your lifestyle
- Take a **cat quiz** with more detailed trait-based matching
- View match results for both dogs and cats
- Explore individual breed detail pages
- Uses real breed data and images from external APIs

---

## How it works

### Dog matching
The dog quiz is based on the breed data currently returned by TheDogAPI. Since the dog data is a little more limited, matching focuses on things like:

- size
- height and weight
- breed group
- temperament

### Cat matching
The cat quiz can be more detailed because TheCatAPI provides more structured trait data. That allows matching based on things like:

- activity level
- affection level
- grooming needs
- shedding level
- vocalisation
- adaptability
- compatibility with dogs
- compatibility with children
---

## Built with

- JavaScript
- HTML
- CSS
- Vite
---

## APIs used

- TheDogAPI
- TheCatAPI

---

## Project structure

```text
PawMatch/
├── index.html
├── styles.css
├── vite.config.js
├── js/
│   ├── api.js
│   ├── dog/
│   └── cat/
├── dog/
│   ├── dog-quiz.html
│   ├── dog-results.html
│   └── dog-breed-detail.html
└── cat/
    ├── cat-quiz.html
    ├── cat-results.html
    └── cat-breed-detail.html
```

---

## Running the project locally

### 1. Clone the repo

```bash
git clone https://github.com/NPlanche/PawMatch.git
cd PawMatch
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your API keys

Create a `.env` file in the root of the project and add:

```env
VITE_DOG_API_KEY=your_dog_api_key
VITE_CAT_API_KEY=your_cat_api_key
```

### 4. Start the development server

```bash
npm run dev
```
---

## Pages in the app

- Home page
- Dog quiz
- Dog results page
- Dog breed detail page
- Cat quiz
- Cat results page
- Cat breed detail page
---

## What I want to improve

There are still a lot of things I’d like to keep improving in PawMatch, including:

- making the quiz scoring smarter
- showing users why a breed was matched to them
- adding match percentages
- adding better loading and error states
- polishing the UI more

---

## What I learned

Building and deploying PawMatch helped me learn more about:

- how to use Vite to structure and run a modern frontend project
- how to prepare a project for production builds
- how to deploy a site using  GitHub Workflows, Actions, and Pages
- how deployment paths and asset handling work when hosting a Vite
- how to manage environment variables and project setup more carefully
- how to format a readme

---

## Notes

One thing I learned while building this project is that the dog and cat APIs do not return the same kind of breed data. Because of that, the dog quiz and cat quiz do not work exactly the same way. The cat data supports more detailed matching, while the dog data works better with simpler lifestyle and temperament based scoring.

