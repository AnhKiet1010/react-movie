import { useKeenSlider } from "keen-slider/react";
import React from "react";
import {
  ORIGINAL_IMAGE_BASE,
  THUMB_IMAGE_BASE,
} from "../../constants/api_constants";
import { Backdrop, Genre } from "../../types/types";
import "keen-slider/keen-slider.min.css";
import PosterList from "../Home/PosterList";
import LazyImage from "./LazyImage";

interface Props {
  posterPath: string;
  name: string;
  overview: string;
  tagline: string;
  backdropPath: string;
  backdrops: Backdrop[];
  genres: Genre[];
  similarTitle: string;
  similarEndpoint: string;
  similarType: string;
}

const Details: React.FC<Props> = ({
  posterPath,
  name,
  overview,
  tagline,
  backdropPath,
  backdrops,
  genres,
  similarTitle,
  similarEndpoint,
  similarType,
  children,
}) => {
  const [pause, setPause] = React.useState(false);
  const timer: any = React.useRef();
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    duration: 1000,
    dragStart: () => {
      setPause(true);
    },
    dragEnd: () => {
      setPause(false);
    },
  });

  React.useEffect(() => {
    sliderRef.current.addEventListener("mouseover", () => {
      setPause(true);
    });
    sliderRef.current.addEventListener("mouseout", () => {
      setPause(false);
    });
  }, [sliderRef]);

  React.useEffect(() => {
    timer.current = setInterval(() => {
      if (!pause && slider) {
        slider.next();
      }
    }, 2000);
    return () => {
      clearInterval(timer.current);
    };
  }, [pause, slider]);
  const genreList = genres.map((genre) => (
    <div
      className="px-4 py-1.5 bg-white bg-opacity-90 text-gray-800 dark:text-gray-200 dark:bg-gray-600 dark:bg-opacity-90 font-semibold rounded-full m-1"
      key={genre.id}
    >
      {genre.name}
    </div>
  ));

  const imageList = backdrops.map((image) => (
    <div key={image.file_path} className="keen-slider__slide">
      <img src={`${ORIGINAL_IMAGE_BASE}/${image.file_path}`} alt={name} />
    </div>
  ));

  return (
    <div
      className="min-h-screen flex flex-row sm:py-5 px-2 md:py-8 items-center bg-fixed"
      style={{
        backgroundImage: `url(${ORIGINAL_IMAGE_BASE}/${backdropPath})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container sm:px-2 py-10 my-10 sm:my-auto mx-auto flex flex-col bg-gray-200 bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 rounded-3xl">
        <div className="mx-auto">
          <div className="flex flex-col sm:flex-row">
            {/* Poster, Title, Genres and Description */}
            <div className="sm:w-3/6 text-center sm:pr-8 sm:py-8">
              <div className="w-32 rounded-lg overflow-hidden inline-flex items-center justify-center bg-transparent text-gray-400">
                <LazyImage
                  src={`${THUMB_IMAGE_BASE}/${posterPath}`}
                  alt={name}
                />
              </div>
              <div className="flex flex-col items-center text-center justify-center">
                <h1 className="font-bold font-heading text-2xl md:text-3xl mt-4 text-gray-900 dark:text-gray-200">
                  {name}
                </h1>
                <div className="w-12 h-1 bg-gradient-to-r from-reactflix-start to-reactflix-end rounded mt-2 mb-2"></div>
                <div className="flex flex-row flex-wrap justify-center">
                  {genreList}
                </div>
                <p className="mt-2 px-5 font-sans text-md lg:text-lg text-gray-800 dark:text-gray-300">
                  {overview}
                </p>
                <div className="mt-4">
                  <button className="text-xl font-semibold bg-gradient-to-r from-yellow-400 to-pink-600 px-8 py-3 rounded-3xl">Xem phim</button>
                </div>
              </div>
            </div>
            {/* Tagline, Vote Average, Number of Seasons, Images, Similar TV Shows  */}
            <div className="sm:w-3/6 sm:pl-8 sm:py-8 sm:border-l border-gray-600 dark:border-gray-500 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              {/* Rating and No. of Seasons */}
              {children}
              {/* Tagline */}
              <div className="text-center font-heading mt-8">
                <span className="text-4xl">&ldquo;</span>
                <span className="text-2xl font-heading font-semibold">
                  {tagline}
                </span>
                <span className="text-4xl">&rdquo;</span>
              </div>
              {/* Images */}
              <div className="container w-3/4 md:w-4/6 rounded-2xl overflow-hidden mt-4 mx-auto">
                <div ref={sliderRef} className="keen-slider">
                  {imageList}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-3 mr-1 mt-5 sm:mt-2">
          <PosterList
            title={similarTitle}
            endpoint={similarEndpoint}
            type={similarType}
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
