'use server';

import { fetchApi, type FetchApiResponse } from '@/lib/api/fetch-api';
import {
  type Anime,
  type AnimeMovie,
  type TopAiringAnime,
  type RecentAnimeEpisode,
  type ConsumetListResponse,
  type AnimeDetailResponse,
  type AnimeEpisodeStreamingLinksResponse,
  type AnimeEpisodeOtherStreamingServer,
  type AnimeGenre,
} from '@/lib/types/anime';
import { unstable_cache } from 'next/cache';

/**
 * Fetches a list of recent anime episodes from the server.
 *
 * @param {Object} options - The options object.
 * @param {number} [options.pageNumber=1] - The page number to retrieve results from. Defaults to 1.
 * @return {Promise<FetchApiResponse<ConsumetListResponse<RecentAnimeEpisode>>>} A promise that resolves to the fetch API response containing the list of recent anime episodes.
 * If the response data does not contain any results, an error object is returned with the error message 'Failed to fetch recent episodes'.
 */
export async function fetchRecentEpisodes({ pageNumber = 1 }: { pageNumber?: number }): Promise<FetchApiResponse<ConsumetListResponse<RecentAnimeEpisode>>> {
  const params = {
    page: pageNumber.toString(),
  };

  const queryString = new URLSearchParams(params).toString();
  const response    = await fetchApi<ConsumetListResponse<RecentAnimeEpisode>>({
    endpoint : `anime/gogoanime/recent-episodes?${queryString}`,
    method   : 'GET',
    next     : {
      revalidate: 1800,
    },
  });

  if (response.data?.results.length === 0) {
    return {
      ...response,
      isError   : true,
      isSuccess : false,
      error     : 'Failed to fetch recent episodes',
    };
  }

  return response;
}

/**
 * Searches for anime based on a given search query and page number.
 *
 * @param {Object} options - The options object.
 * @param {number} options.pageNumber - The page number to retrieve results from. Defaults to 1.
 * @param {string} options.searchQuery - The search query to use for finding anime.
 * @return {Promise<FetchApiResponse<ConsumetListResponse<Anime>>>} A promise that resolves to the fetch API response containing the search results.
 */
export async function searchAnime({
  pageNumber = 1,
  searchQuery,
}: {
  pageNumber?: number,
  searchQuery: string
}): Promise<FetchApiResponse<ConsumetListResponse<Anime>>> {
  const params = {
    page: pageNumber.toString(),
  };

  const queryString = new URLSearchParams(params).toString();
  const url         = `anime/gogoanime/${encodeURIComponent(searchQuery)}?${queryString}`;

  const response = await fetchApi<ConsumetListResponse<Anime>>({
    endpoint : url,
    method   : 'GET',
  });

  if (response.data?.results.length === 0) {
    return {
      ...response,
      isError   : true,
      isSuccess : false,
      error     : "Can't find anime that you are looking for",
    };
  }

  return response;
}

/**
 * Fetches the details of an anime by its ID from the API.
 *
 * @param {Object} options - The options object.
 * @param {string} options.animeId - The ID of the anime to fetch details for.
 * @return {Promise<FetchApiResponse<AnimeDetailResponse>>} A promise that resolves to the fetch API response containing the anime details.
 * If the anime is not found, the response will have an `isError` property set to `true` and an `error` property set to `'Anime that you are looking for is not found'`.
 */
export async function fetchAnimeDetails({ animeId }: { animeId: string }): Promise<FetchApiResponse<AnimeDetailResponse>> {
  const response = await fetchApi<AnimeDetailResponse>({
    endpoint : `anime/gogoanime/info/${animeId}`,
    method   : 'GET',
    next     : {
      revalidate: 3600,
    },
  });

  if (response.isError && !response.data) {
    return {
      ...response,
      error: 'Anime that you are looking for is not found',
    };
  }

  return response;
}

/**
 * Fetches the streaming links for a specific anime episode from the API.
 * Response data later will be used by default video player
 * @see @/components/anime/default-video-player.tsx for more details
 *
 * @param {Object} options - The options object.
 * @param {string} options.episodeId - The ID of the anime episode.
 * @param {string} [options.streamingServer='gogocdn'] - The streaming server to use. Defaults to 'gogocdn'.
 * @returns {Promise<FetchApiResponse<AnimeEpisodeStreamingLinksResponse>>} A promise that resolves to the fetch API response containing the streaming links for the anime episode.
 */
export async function fetchAnimeEpisodeStreamingLinks({ episodeId, streamingServer = 'gogocdn' }: { episodeId: string, streamingServer?: 'gogocdn' | 'vidstreaming' | 'streamsb' }): Promise<FetchApiResponse<AnimeEpisodeStreamingLinksResponse>> {
  const response = await fetchApi<AnimeEpisodeStreamingLinksResponse>({
    endpoint : `anime/gogoanime/watch/${episodeId}?server=${streamingServer}`,
    method   : 'GET',
  });

  return response;
}

/**
 * Fetches the other streaming servers for a specific anime episode from the API.
 * We will embed vide player url in embedded video player
 * @see @/components/anime/embedded-video-player.tsx for more details
 *
 * @param {Object} options - The options object.
 * @param {string} options.episodeId - The ID of the anime episode.
 * @return {Promise<FetchApiResponse<AnimeEpisodeOtherStreamingServer[]>>} A promise that resolves to the fetch API response containing the other streaming servers for the anime episode.
 */
export async function fetchAnimeEpisodeOtherStreamingServers({ episodeId }: { episodeId: string }): Promise<FetchApiResponse<AnimeEpisodeOtherStreamingServer[]>> {
  const response = await fetchApi<AnimeEpisodeOtherStreamingServer[]>({
    endpoint : `anime/gogoanime/servers/${episodeId}`,
    method   : 'GET',
  });

  return response;
}

/**
 * Fetches a list of top airing anime from the server.
 *
 * @param {Object} options - The options object.
 * @param {number} [options.pageNumber=1] - The page number to retrieve results from. Defaults to 1.
 * @return {Promise<FetchApiResponse<ConsumetListResponse<TopAiringAnime>>>} A promise that resolves to the fetch API response containing the list of top airing anime.
 */
export async function fetchTopAiringAnimeList({ pageNumber = 1 }: { pageNumber?: number }): Promise<FetchApiResponse<ConsumetListResponse<TopAiringAnime>>> {
  const params = {
    page: pageNumber.toString(),
  };

  const queryString = new URLSearchParams(params).toString();
  const response    = await fetchApi<ConsumetListResponse<TopAiringAnime>>({
    endpoint : `anime/gogoanime/top-airing?${queryString}`,
    method   : 'GET',
    next     : {
      revalidate: 1800,
    },
  });

  return response;
}

/**
 * Fetches a list of anime movies from the server.
 *
 * @param {Object} options - The options object.
 * @param {number} options.pageNumber - The page number to retrieve results from. Defaults to 1.
 * @return {Promise<FetchApiResponse<ConsumetListResponse<AnimeMovie>>>} A promise that resolves to the fetch API response containing the list of anime movies.
 */
export async function fetchAnimeMovieList({ pageNumber = 1 }: { pageNumber?: number }): Promise<FetchApiResponse<ConsumetListResponse<AnimeMovie>>> {
  const params = {
    page: pageNumber.toString(),
  };

  const queryString = new URLSearchParams(params).toString();
  const response    = await fetchApi<ConsumetListResponse<AnimeMovie>>({
    endpoint : `anime/gogoanime/movies?${queryString}`,
    method   : 'GET',
    next     : {
      revalidate: 3600,
    },
  });

  return response;
}

/**
 * Fetches a list of popular anime movies from the server.
 *
 * @param {Object} options - The options object.
 * @param {number} [options.pageNumber=1] - The page number to retrieve results from. Defaults to 1.
 * @return {Promise<FetchApiResponse<ConsumetListResponse<AnimeMovie>>>} A promise that resolves to the fetch API response containing the list of popular anime movies.
 */
export async function fetchPopularAnimeList({ pageNumber = 1 }: { pageNumber?: number }): Promise<FetchApiResponse<ConsumetListResponse<AnimeMovie>>> {
  const params = {
    page: pageNumber.toString(),
  };

  const queryString = new URLSearchParams(params).toString();
  const response    = await fetchApi<ConsumetListResponse<AnimeMovie>>({
    endpoint : `anime/gogoanime/popular?${queryString}`,
    method   : 'GET',
    next     : {
      revalidate: 3600,
    },
  });

  return response;
}

/**
 * Fetches a list of anime based on the genre from the server.
 *
 * @param {Object} options - The options object.
 * @param {number} [options.pageNumber=1] - The page number to retrieve results from. Defaults to 1.
 * @param {string} options.genre - The genre to filter the anime by.
 * @return {Promise<FetchApiResponse<ConsumetListResponse<AnimeGenre>>>} A promise that resolves to the fetch API response containing the list of anime with the specified genre.
 */
export async function fetchAnimeByGenre({ pageNumber = 1, genre }: { pageNumber?: number, genre: string }): Promise<FetchApiResponse<ConsumetListResponse<AnimeGenre>>> {
  const params = {
    page: pageNumber.toString(),
  };

  const queryString = new URLSearchParams(params).toString();
  const response    = await fetchApi<ConsumetListResponse<AnimeGenre>>({
    endpoint : `anime/gogoanime/genre/${genre}?${queryString}`,
    method   : 'GET',
    next     : {
      revalidate: 3600,
    },
  });

  return response;
}

/**
 * Builds the popular anime carousel data by fetching the first page of popular anime list
 * Then we fetching the details for each anime in the first page of popular anime
 *
 * @return {Promise<FetchApiResponse<AnimeDetailResponse[]>>} A promise that resolves to a response
 * object containing the details of the popular anime.
 */
async function buildPopularAnimeCarouselData() {
  // fetch first page of popular anime
  const firstPagePopularAnimeResponse = await fetchPopularAnimeList({ pageNumber: 1 });

  const { isError, isSuccess, data } = firstPagePopularAnimeResponse ?? {};

  if (isError) {
    return ({
      isSuccess : false,
      isError   : true,
      data      : [],
      error     : 'Failed to fetch popular anime list',
    }) as FetchApiResponse<[]>;
  }

  const { results: popularAnimeList  } = data ?? {};

  const animeIdUrls = popularAnimeList ? popularAnimeList.map((anime) => anime.id) : [];

  const fetchPopularAnimeDetails = animeIdUrls.map(
    (animeId) => fetchAnimeDetails({ animeId })
      .then((response) => {
        const {
          isError: isCurrentAnimeError,
          data: currentAnimeDetails,
        } = response ?? {};

        if (isCurrentAnimeError) {
          throw new Error(`Failed to fetch details for anime ID: ${animeId}`);
        }

        if (isSuccess && currentAnimeDetails) {
          return currentAnimeDetails;
        }

        return null;
      })
      // if error happen during fetching certain anime details, return null
      .catch(() => null),
  );

  const popularAnimeDetails = await Promise.all(fetchPopularAnimeDetails);

  return ({
    isSuccess : true,
    isError   : false,
    // filter out null values
    data      : popularAnimeDetails.filter((detail) => detail !== null),
  }) as FetchApiResponse<AnimeDetailResponse[]>;
}

// since fetching each anime details for top 20 popular anime list is taking some time
// we cache the data for 24 hours, because popular anime doesn't change often
export const getPopularAnimeCarouselData = unstable_cache(
  buildPopularAnimeCarouselData,
  ['popular-carousel'],
  {
    tags       : ['popular-carousel'],
    revalidate : 60 * 60 * 24,
  },
);
