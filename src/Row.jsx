// import React, { useState, useEffect } from "react";
// import axios from "./axios";
// import "./Row.css";
// import Youtube from "react-youtube";
// import movieTrailer from "movie-trailer";

// const base_url = "https://image.tmdb.org/t/p/original";

// // This below means when the row loads i want to make a request to the tmdb api and pull the information //
// const Row = ({ title, fetchUrl, isLargeRow }) => {
//   const [movies, setMovies] = useState([]);
//   const [trailerUrl, setTrailerUrl] = useState("");

//   useEffect(() => {
//     async function fetchData() {
//       const request = await axios.get(fetchUrl);
//       console.log(request.data.results);
//       setMovies(request.data.results);
//       return request;
//     }
//     fetchData();
//   }, [fetchUrl]);
//   //   console.log(movies);

//   const opts = {
//     height: "390",
//     width: "100%",
//     playerVars: {
//       autoplay: 1,
//     },
//   };

//   const handleClick = (movie) => {
//     if (trailerUrl) {
//       setTrailerUrl("");
//     } else {
//       movieTrailer(movie?.name || "")
//         .then((url) => {
//           // This below is to get everything after the question mark
//           const urlParams = new URLSearchParams(new URL(url).search);
//           setTrailerUrl(urlParams.get("q"));
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   };

//   return (
//     <div className="row">
//       <h2>{title}</h2>
//       <div className="row_posters">
//         {movies.map((movie) => {
//           return (
//             <img
//               key={movie.id}
//               onClick={handleClick(movie)}
//               className={`row_poster ${isLargeRow && "row_posterLarge"}`}
//               src={`${base_url}${
//                 isLargeRow ? movie.poster_path : movie.backdrop_path
//               }`}
//               alt={movie.name}
//             />
//           );
//         })}
//       </div>
//       {/* It below basically takes a videoid and some options */}
//       {/* <Youtube videoId={trailerUrl} opts = {opts}/> */}
//       {/* WHen we have the trailer URL then display the youtube video */}
//       {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
//     </div>
//   );
// };

// export default Row;

import React, { useState, useEffect } from "react";
import axios from "./axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "99%",
    playerVars: {
      autoplay: 0,
    },
  };

  const handleClick = (movie) => {
    // console.table(movie?.title)
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
      <div style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}

export default Row;
