# Movie Search & Watchlist App

## Overview

This is a React-based movie search and watchlist application that fetches movie data from the OMDB API. Users can search for movies, view details, and add them to their watchlist with personal ratings.

## Features

- Search for movies using the OMDB API
- View detailed information about a selected movie
- Add movies to a watchlist
- Rate watched movies
- Remove movies from the watchlist
- Responsive UI with smooth animations

## Technologies Used

- React.js
- OMDB API
- Motion (for animations)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo.git
   ```
2. Navigate to the project directory:
   ```sh
   cd movie-watchlist
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the root directory and add:
   ```sh
   REACT_APP_API_URL=your_api_key_here
   ```
5. Start the development server:
   ```sh
   npm start
   ```

## Usage

- Type a movie name in the search bar to fetch results.
- Click on a movie to view its details.
- Add a movie to your watchlist by rating it.
- View all watched movies in the watchlist section.
- Press `Escape` to close movie details.

## File Structure

```
/src
 ├── components
 │   ├── Navbar.js
 │   ├── Main.js
 │   ├── Search.js
 │   ├── NavbarResults.js
 │   ├── Box.js
 │   ├── MovieInList.js
 │   ├── WatchedMovieList.js
 │   ├── WatchedSummary.js
 │   ├── Loader.js
 │   ├── ErrorMsg.js
 │   ├── MovieDetails.js
 ├── App.js
 ├── index.js
```

## API Usage

- Movies are fetched using the OMDB API.
- Base API URL: `https://www.omdbapi.com/?apikey=your_api_key`

## Contributing

Feel free to submit a pull request with new features, bug fixes, or enhancements.

## License

This project is open-source and available under the MIT License.
