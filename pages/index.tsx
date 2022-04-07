import Head from "next/head";
import PosterList from "../components/Home/PosterList";
import SearchBar from "../components/Home/SearchBar";
import MetaTags from "../components/meta/MetaTags";
import { MOVIE_TYPE, TV_TYPE } from "../constants/api_constants";

const Home = () => {
  return (
    <div className="container mx-auto mb-10">
      <Head>
        <title>Phim.NET</title>
        <MetaTags
          title="Phim.Net"
          description="Phim.Net is a movie library made with ReactJS, Next.js, and TailwindCSS with data from TMDB API."
          URL="https://movies.sanketnaik.dev/"
          imageURL="https://movies.sanketnaik.dev/assets/reactflix-logo.png"
        />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      <SearchBar />
      <PosterList
        title="Phim nổi tiếng"
        endpoint="movie/popular"
        type={MOVIE_TYPE}
      />
      <PosterList
        title="Phim Hot"
        endpoint="trending/movie/week"
        type={MOVIE_TYPE}
      />
    </div>
  );
};

export default Home;
