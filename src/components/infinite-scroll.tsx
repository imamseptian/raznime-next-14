"use client";

import {
  type RecentAnimeEpisode,
  type Anime,
  type AnimeMovie,
  type PopularAnime,
  type AnimeGenre,
} from '@/lib/types/anime';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  fetchAnimeByGenre,
  fetchAnimeMovieList,
  fetchPopularAnimeList,
  fetchRecentEpisodes,
  searchAnime,
} from '@/lib/api/anime-api';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { toast } from "sonner";
import AnimeCard from './anime/card';
import { Button } from './ui/button';

const FETCH_API = {
  episode : fetchRecentEpisodes,
  anime   : searchAnime,
  movie   : fetchAnimeMovieList,
  popular : fetchPopularAnimeList,
  genre   : fetchAnimeByGenre,
};

const INITIAL_PAGE = 2;

interface InfiniteScrollProps {
  cardType: "anime" | "movie" | "episode" | "popular" | "genre";
  genreId?: string
}

/**
 * Renders an infinite scroll component that fetches data based on the provided card type and genre ID.
 *
 * @param {InfiniteScrollProps} props - The props object containing the card type and genre ID.
 * @param {string} props.cardType - The type of card to display. Must be one of "anime", "movie", "episode", "popular", or "genre".
 * @param {string} [props.genreId=''] - The ID of the genre. Required if cardType is "genre".
 * @return {JSX.Element} The infinite scroll component.
 * @throws {Error} If cardType is "genre" and genreId is not provided.
 */
export default function InfiniteScroll({
  cardType,
  genreId = '',
}: InfiniteScrollProps) {
  if (cardType === "genre" && !genreId) {
    throw new Error("Genre ID is required for 'genre' card type");
  }

  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [listData, setListData]       = useState<(Anime | RecentAnimeEpisode | AnimeMovie | PopularAnime | AnimeGenre)[]>([]);
  const [isLoading, setIsLoading]     = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const searchParams = useSearchParams();
  const queryParams  = Object.fromEntries(searchParams);

  /**
   * Fetches anime data asynchronously based on the provided card type and genre ID(if exists).
   *
   * @return {Promise<void>} - A promise that resolves when the data is fetched and updated successfully.
   * @throws {Error} - If an error occurs while fetching the data.
   */
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const {
        isError,
        isSuccess,
        data,
        error,
      } = await FETCH_API[cardType]({
        ...queryParams,
        pageNumber  : currentPage,
        genre       : genreId,
        searchQuery : queryParams.query as string,
      });
      if (isSuccess) {
        const currentPageData   = data?.results ?? [];
        const nextPageAvailable = data?.hasNextPage ?? false;
        setListData((prevData) => [...prevData, ...currentPageData]);
        setCurrentPage((prevPage) => prevPage + 1);
        setHasNextPage(nextPageAvailable);
      }

      if (isError) {
        toast(error ?? "An error occurred while retrieving anime data");
      }
    } catch (error) {
      toast("An error occurred while retrieving anime data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {
        listData.map((anime) => {
          const currentAnime = anime as RecentAnimeEpisode;

          const isEpisodeCard = cardType === "episode";

          const urlPrefix = isEpisodeCard ? '/watch' : '/detail';
          const urlId     = isEpisodeCard ? currentAnime.episodeId : currentAnime.id;
          const url       = `${urlPrefix}/${urlId}`;

          return (
            <AnimeCard
              key={ `${cardType}-anime-card-${urlId}` }
              anime={ anime }
              cardType={ cardType }
              href={ url }
              scroll={ isEpisodeCard }
            />
          );
        })
      }

      {
        isLoading && (
          <>
            {
              Array(20).fill(0).map((_, index) => (
                <motion.div
                  // eslint-disable-next-line react/no-array-index-key
                  key={ `anime-card-skeleton-loader-${index}` }
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ ease: "easeInOut", duration: 0.6 }}
                  variants={{
                    hidden  : { opacity: 0, y: 20 },
                    visible : { opacity: 1, y: 0 },
                  }}
                >
                  <Skeleton className="w-full aspect-3/4" />
                </motion.div>

              ))
            }
          </>
        )
      }

      <div className="min-h-2 flex justify-center items-center w-full absolute bottom-10 left-0">
        {
          hasNextPage && (
            <motion.div
              key={ listData.length }
              // will trigger fetchData when this element is in view
              onViewportEnter={ fetchData }
            >
              <Button
                type="button"
                variant="outline"
                onClick={ fetchData }
                disabled={ isLoading }
              >
                { isLoading ? 'Loading...' : 'Load More' }
              </Button>
            </motion.div>
          )
        }
      </div>
    </>
  );
}
