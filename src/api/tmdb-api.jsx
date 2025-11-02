export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};

export const getMovie = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};


  export const getGenres = () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        import.meta.env.VITE_TMDB_KEY +
        "&language=en-US"
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

export const getTrendingMoviesToday = async (page = 1, perPage = 20) => {
  const apiKey = import.meta.env.VITE_TMDB_KEY;

  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  const data = await response.json();

  return { results: data.results, total_pages: data.total_pages || 1 };
};


export const getTopRateMoviesToday = async (page = 1, perPage = 40) => {
  const apiKey = import.meta.env.VITE_TMDB_KEY;
  const moviesPerTMDBPage = 20;
  const pagesToFetch = Math.ceil(perPage / moviesPerTMDBPage);

  const responses = await Promise.all(
    Array.from({ length: pagesToFetch }, (_, i) =>
      fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${page + i}`
      )
    )
  );

  const results = await Promise.all(responses.map((r) => r.json()));

  // Merge the movie arrays together
  const mergedMovies = results.flatMap((r) => r.results);
  return { results: mergedMovies, total_pages: results[0].total_pages };
};


export const getPopularMovies = async (page = 1, perPage = 40) => {
  const apiKey = import.meta.env.VITE_TMDB_KEY;
  const moviesPerTMDBPage = 20;
  const pagesToFetch = Math.ceil(perPage / moviesPerTMDBPage);

  const responses = await Promise.all(
    Array.from({ length: pagesToFetch }, (_, i) =>
      fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page + i}`
      )
    )
  );

  const results = await Promise.all(responses.map((r) => r.json()));

  // Merge the movie arrays together
  const mergedMovies = results.flatMap((r) => r.results);
  return { results: mergedMovies, total_pages: results[0].total_pages };
};



export const getUpcomingMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }
  return await response.json();
};



  export const getMovieReviews = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

export const getMovieRecommendations = async ({ queryKey }) => {
  const [, { id }] = queryKey;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${import.meta.env.VITE_TMDB_KEY}`
  );
  if (!response.ok) throw new Error("Failed to fetch movie recommendations");
  return await response.json();
};

export const getMovieCredits = async ({ queryKey }) => {
  const [, { id }] = queryKey; 
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movie credits");
  }
  return await response.json();
};

export const getPersonDetails = async ({ queryKey }) => {
  const [, { id }] = queryKey;
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  );
  if (!response.ok) throw new Error("Failed to fetch person details");
  return await response.json();
};

export const getPersonMovieCredits = async ({ queryKey }) => {
  const [, { id }] = queryKey;
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
  );
  if (!response.ok) throw new Error("Failed to fetch person movie credits");
  return await response.json();
};
