/**
* @typedef {Object} Anime
* @property {string} id - The unique identifier of the anime.
* @property {string} title - The title of the anime.
* @property {string} url - The URL of the anime.
* @property {string} image - The URL of the anime's image.
* @property {string} releaseDate - The release date of the anime.
* @property {string} subOrDub - Indicates whether the anime is subbed or dubbed.
*/
interface Anime {
  id: string;
  title: string;
  url: string;
  image: string;
  releaseDate: string;
  subOrDub: string;
}

/**
* @typedef {Object} AnimeMovie
* @property {string} id - The unique identifier of the anime movie.
* @property {string} title - The title of the anime movie.
* @property {string} image - The URL of the anime movie's image.
* @property {string} url - The URL of the anime movie.
* @property {string} releaseDate - The release date of the anime movie.
*/
interface AnimeMovie {
  id: string;
  title: string;
  image: string;
  url: string;
  releaseDate: string;
}

/**
* @typedef {Object} TopAiringAnime
* @property {string} id - The unique identifier of the top airing anime.
* @property {string} title - The title of the top airing anime.
* @property {string} image - The URL of the top airing anime's image.
* @property {string} url - The URL of the top airing anime.
* @property {string[]} genres - An array of genres for the top airing anime.
* @property {string} episodeId - The unique identifier of the episode.
* @property {number} episodeNumber - The number of the episode.
*/
interface TopAiringAnime {
  id: string;
  title: string;
  image: string;
  url: string;
  genres: string[];
  episodeId: string;
  episodeNumber: number;
}

/**
* @typedef {Object} PopularAnime
* @property {string} id - The unique identifier of the popular anime.
* @property {string} title - The title of the popular anime.
* @property {string} image - The URL of the popular anime's image.
* @property {string} url - The URL of the popular anime.
* @property {string} releaseDate - The release date of the popular anime.
*/
interface PopularAnime {
  id: string;
  title: string;
  image: string;
  url: string;
  releaseDate: string;
}

/**
* @typedef {Object} RecentAnimeEpisode
* @property {string} id - The unique identifier of the recent anime episode.
* @property {string} episodeId - The unique identifier of the episode.
* @property {number} episodeNumber - The number of the episode.
* @property {string} title - The title of the recent anime episode.
* @property {string} image - The URL of the recent anime episode's image.
* @property {string} url - The URL of the recent anime episode.
*/
interface RecentAnimeEpisode {
  id: string;
  episodeId: string;
  episodeNumber: number;
  title: string;
  image: string;
  url: string;
}

/**
* @typedef {Object} AnimeGenre
* @property {string} id - The unique identifier of the anime genre.
* @property {string} title - The title of the anime genre.
* @property {string} image - The URL of the anime genre's image.
* @property {string} url - The URL of the anime genre.
* @property {string} released - The release date of the anime in this genre.
*/
interface AnimeGenre {
  id: string;
  title: string;
  image: string;
  url: string;
  released: string;
}

/**
* @typedef {Object} AnimeDetailEpisode
* @property {string} id - The unique identifier of the anime episode.
* @property {number} number - The number of the anime episode.
* @property {string} url - The URL of the anime episode.
*/
interface AnimeDetailEpisode {
  id: string;
  number: number;
  url: string;
}

/**
* @typedef {Object} AnimeEpisodeSource
* @property {string} url - The URL of the anime episode source.
* @property {boolean} isM3U8 - Indicates whether the source is an M3U8 file.
* @property {string} quality - The quality of the anime episode source.
*/

interface AnimeEpisodeSource {
  url: string;
  isM3U8: boolean
  quality: string
}

/**
* @typedef {Object} ConsumetListResponse
* @template ResultsType
* @property {number} currentPage - The current page number.
* @property {boolean} hasNextPage - Indicates whether there is a next page.
* @property {ResultsType[]} results - An array of results.
*/
interface ConsumetListResponse<ResultsType> {
  currentPage: number;
  hasNextPage: boolean;
  results: ResultsType[];
}

/**
* @typedef {Object} AnimeDetailResponse
* @property {string} id - The unique identifier of the anime.
* @property {string} title - The title of the anime.
* @property {string} url - The URL of the anime.
* @property {string[]} genres - An array of genres for the anime.
* @property {number} totalEpisodes - The total number of episodes for the anime.
* @property {string} image - The URL of the anime's image.
* @property {string} releaseDate - The release date of the anime.
* @property {string} description - The description of the anime.
* @property {string} subOrDub - Indicates whether the anime is subbed or dubbed.
* @property {string} type - The type of anime (e.g., TV, Movie, OVA).
* @property {string} status - The current status of the anime (e.g., Ongoing, Completed).
* @property {string} otherName - The other name or alternative title of the anime.
* @property {AnimeDetailEpisode[]} episodes - An array of episodes for the anime.
*/
interface AnimeDetailResponse {
  id: string;
  title: string;
  url: string;
  genres: string[];
  totalEpisodes: number;
  image: string;
  releaseDate: string;
  description: string;
  subOrDub: string;
  type: string;
  status: string;
  otherName: string;
  episodes: AnimeDetailEpisode[];
}

/**
* @typedef {Object} AnimeEpisodeStreamingLinksResponse
* @property {string} headers - The headers for the anime episode streaming links response.
* @property {AnimeEpisodeSource[]} sources - An array of anime episode sources.
* @property {string} download - The download URL for the anime episode.
*/
interface AnimeEpisodeStreamingLinksResponse {
  headers: string;
  sources: AnimeEpisodeSource[];
  download: string;
}

/**
* @typedef {Object} AnimeEpisodeOtherStreamingServer
* @property {string} name - The name of the other streaming server.
* @property {string} url - The URL of the other streaming server.
*/
interface AnimeEpisodeOtherStreamingServer {
  name: string;
  url: string;
}

export {
  type Anime,
  type AnimeMovie,
  type AnimeGenre,
  type TopAiringAnime,
  type PopularAnime,
  type RecentAnimeEpisode,
  type AnimeEpisodeSource,
  type AnimeDetailEpisode,
  type ConsumetListResponse,
  type AnimeDetailResponse,
  type AnimeEpisodeStreamingLinksResponse,
  type AnimeEpisodeOtherStreamingServer,
};
