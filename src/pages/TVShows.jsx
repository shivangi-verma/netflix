// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import Navbar from "../components/Navbar";
// import CardSlider from "../components/CardSlider";
// import { onAuthStateChanged } from "firebase/auth";
// import { firebaseAuth } from "../utils/firebase-config";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchMovies, getGenres } from "../store";
// import SelectGenre from "../components/SelectGenre.jsx";
// import Slider from "../components/Slider";

// function TVShows() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const movies = useSelector((state) => state.netflix.movies);
//   const genres = useSelector((state) => state.netflix.genres);
//   const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
//   const dataLoading = useSelector((state) => state.netflix.dataLoading);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!genres.length) dispatch(getGenres());
//   }, []);

//   useEffect(() => {
//     if (genresLoaded) {
//       dispatch(fetchMovies({ genres, type: "tv" }));
//     }
//   }, [genresLoaded]);

//   const [user, setUser] = useState(undefined);

//   onAuthStateChanged(firebaseAuth, (currentUser) => {
//     if (currentUser) setUser(currentUser.uid);
//     else navigate("/login");
//   });

//   window.onscroll = () => {
//     setIsScrolled(window.pageYOffset === 0 ? false : true);
//     return () => (window.onscroll = null);
//   };

//   return (
//     <Container>
//       <Navbar isScrolled={isScrolled} />
//       <div className="data">
//         <SelectGenre genres={genres} type="tv" />
//         {movies.length ? (
//           <>
//             <Slider movies={movies} />
//           </>
//         ) : (
//           <h1 className="not-available">
//             No TV Shows avaialble for the selected genre. Please select a
//             different genre.
//           </h1>
//         )}
//       </div>
//     </Container>
//   );
// }

// const Container = styled.div`
//   .data {
//     margin-top: 8rem;
//     .not-available {
//       text-align: center;
//       margin-top: 4rem;
//     }
//   }
// `;
// export default TVShows;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
// Importing CardSlider but not using it
// import CardSlider from "../components/CardSlider";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import SelectGenre from "../components/SelectGenre.jsx";
import Slider from "../components/Slider";

function TVShows() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  // Unused variable dataLoading
  // const dataLoading = useSelector((state) => state.netflix.dataLoading);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!genres.length) dispatch(getGenres());
  }, [dispatch, genres]); // Added dispatch and genres to the dependency array

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "tv" }));
    }
  }, [dispatch, genres, genresLoaded]); // Added dependencies

  // Commenting out unused user state
  // const [user, setUser] = useState(undefined);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        // setUser(currentUser.uid);
      } else {
        navigate("/login");
      }
    });
  }, [navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="data">
        <SelectGenre genres={genres} type="tv" />
        {movies.length ? (
          <>
            <Slider movies={movies} />
          </>
        ) : (
          <h1 className="not-available">
            No TV Shows available for the selected genre. Please select a
            different genre.
          </h1>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      margin-top: 4rem;
    }
  }
`;
export default TVShows;
