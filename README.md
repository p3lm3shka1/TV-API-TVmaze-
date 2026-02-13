# TVMaze Explorer

A simple web app for browsing TV shows using the [TVMaze API](https://www.tvmaze.com/api).  
You can search shows, view details, cast, and show images.

## Features
- Browse all shows
- Search by title
- Show details page (rating, genres, year, summary)
- Cast list with “Show all actors”
- Responsive layout
- Scroll-to-top button

## Tech Stack
- HTML
- CSS
- JavaScript (Vanilla)

## API Used
- `GET https://api.tvmaze.com/shows`
- `GET https://api.tvmaze.com/search/shows?q={query}`
- `GET https://api.tvmaze.com/shows/{id}`
- `GET https://api.tvmaze.com/shows/{id}/cast`
- `GET https://api.tvmaze.com/shows/{id}/images`

## Project Structure
```
.
├── css
│   ├── details.css
│   ├── media-details.css
│   ├── media-main.css
│   └── styles.css
├── script
│   ├── details.js
│   └── script.js
├── details.html
└── index.html
```

## How to Run
Just open `index.html` in the browser.

## Notes
This project uses the public TVMaze API. No API key is required.

---
Made for learning and practicing frontend skills.
