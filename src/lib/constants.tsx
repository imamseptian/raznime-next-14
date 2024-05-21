export const DEFAULT_NUMBER_OF_DISPLAYED_EPISODES = 40;
export const NUMBER_OF_DISPLAYED_EPISODES_INCREMENTS = 16;
export const ANIME_DETAIL_LIMIT_OF_DISPLAYED_EPISODES = 24;
export const DEFAULT_ANIME_IMAGE_BLUR_PLACEHOLDER = '/images/anime-card-placeholder-blur.webp';
export const ANIME_TOTAL_DATA_PER_PAGE = 20;

interface NavigationLink {
  label: string;
  value: string;
}

interface NavigationLinks {
  [key: string]: NavigationLink;
}

export const NAVIGATION_LINKS: NavigationLinks = {
  HOME: {
    label : 'Home',
    value : '',
  },
  RECENT_RELEASE: {
    label : 'Recent',
    value : 'recent-release',
  },
  POPULAR: {
    label : 'Popular',
    value : 'popular',
  },
  GENRES: {
    label : 'Genre',
    value : 'genre',
  },
  MOVIES: {
    label : 'Movies',
    value : 'movies',
  },
};

export const DEFAULT_AVAILABLE_SERVERS = ['gogocdn', 'vidstreaming', 'streamsb'];

export const VIDEO_PLAYER_TYPES = ['default', 'embedded'];

export const ANIME_GENRES = [
  {
    id    : "action",
    title : "Action",
  },
  {
    id    : "adult-cast",
    title : "Adult Cast",
  },
  {
    id    : "adventure",
    title : "Adventure",
  },
  {
    id    : "anthropomorphic",
    title : "Anthropomorphic",
  },
  {
    id    : "avant-garde",
    title : "Avant Garde",
  },
  {
    id    : "shounen-ai",
    title : "Boys Love",
  },
  {
    id    : "cars",
    title : "Cars",
  },
  {
    id    : "cgdct",
    title : "CGDCT",
  },
  {
    id    : "childcare",
    title : "Childcare",
  },
  {
    id    : "comedy",
    title : "Comedy",
  },
  {
    id    : "comic",
    title : "Comic",
  },
  {
    id    : "crime",
    title : "Crime",
  },
  {
    id    : "crossdressing",
    title : "Crossdressing",
  },
  {
    id    : "delinquents",
    title : "Delinquents",
  },
  {
    id    : "dementia",
    title : "Dementia",
  },
  {
    id    : "demons",
    title : "Demons",
  },
  {
    id    : "detective",
    title : "Detective",
  },
  {
    id    : "drama",
    title : "Drama",
  },
  {
    id    : "dub",
    title : "Dub",
  },
  {
    id    : "ecchi",
    title : "Ecchi",
  },
  {
    id    : "erotica",
    title : "Erotica",
  },
  {
    id    : "family",
    title : "Family",
  },
  {
    id    : "fantasy",
    title : "Fantasy",
  },
  {
    id    : "gag-humor",
    title : "Gag Humor",
  },
  {
    id    : "game",
    title : "Game",
  },
  {
    id    : "gender-bender",
    title : "Gender Bender",
  },
  {
    id    : "gore",
    title : "Gore",
  },
  {
    id    : "gourmet",
    title : "Gourmet",
  },
  {
    id    : "harem",
    title : "Harem",
  },
  {
    id    : "high-stakes-game",
    title : "High Stakes Game",
  },
  {
    id    : "historical",
    title : "Historical",
  },
  {
    id    : "horror",
    title : "Horror",
  },
  {
    id    : "isekai",
    title : "Isekai",
  },
  {
    id    : "iyashikei",
    title : "Iyashikei",
  },
  {
    id    : "josei",
    title : "Josei",
  },
  {
    id    : "kids",
    title : "Kids",
  },
  {
    id    : "love-polygon",
    title : "Love Polygon",
  },
  {
    id    : "magic",
    title : "Magic",
  },
  {
    id    : "magical-sex-shift",
    title : "Magical Sex Shift",
  },
  {
    id    : "mahou-shoujo",
    title : "Mahou Shoujo",
  },
  {
    id    : "martial-arts",
    title : "Martial Arts",
  },
  {
    id    : "mecha",
    title : "Mecha",
  },
  {
    id    : "medical",
    title : "Medical",
  },
  {
    id    : "military",
    title : "Military",
  },
  {
    id    : "music",
    title : "Music",
  },
  {
    id    : "mystery",
    title : "Mystery",
  },
  {
    id    : "mythology",
    title : "Mythology",
  },
  {
    id    : "organized-crime",
    title : "Organized Crime",
  },
  {
    id    : "parody",
    title : "Parody",
  },
  {
    id    : "performing-arts",
    title : "Performing Arts",
  },
  {
    id    : "pets",
    title : "Pets",
  },
  {
    id    : "police",
    title : "Police",
  },
  {
    id    : "psychological",
    title : "Psychological",
  },
  {
    id    : "racing",
    title : "Racing",
  },
  {
    id    : "reincarnation",
    title : "Reincarnation",
  },
  {
    id    : "romance",
    title : "Romance",
  },
  {
    id    : "romantic-subtext",
    title : "Romantic Subtext",
  },
  {
    id    : "samurai",
    title : "Samurai",
  },
  {
    id    : "school",
    title : "School",
  },
  {
    id    : "sci-fi",
    title : "Sci-Fi",
  },
  {
    id    : "seinen",
    title : "Seinen",
  },
  {
    id    : "shoujo",
    title : "Shoujo",
  },
  {
    id    : "shoujo-ai",
    title : "Shoujo Ai",
  },
  {
    id    : "shounen",
    title : "Shounen",
  },
  {
    id    : "showbiz",
    title : "Showbiz",
  },
  {
    id    : "slice-of-life",
    title : "Slice of Life",
  },
  {
    id    : "space",
    title : "Space",
  },
  {
    id    : "sports",
    title : "Sports",
  },
  {
    id    : "strategy-game",
    title : "Strategy Game",
  },
  {
    id    : "super-power",
    title : "Super Power",
  },
  {
    id    : "supernatural",
    title : "Supernatural",
  },
  {
    id    : "survival",
    title : "Survival",
  },
  {
    id    : "suspense",
    title : "Suspense",
  },
  {
    id    : "team-sports",
    title : "Team Sports",
  },
  {
    id    : "thriller",
    title : "Thriller",
  },
  {
    id    : "time-travel",
    title : "Time Travel",
  },
  {
    id    : "vampire",
    title : "Vampire",
  },
  {
    id    : "video-game",
    title : "Video Game",
  },
  {
    id    : "visual-arts",
    title : "Visual Arts",
  },
  {
    id    : "work-life",
    title : "Work Life",
  },
  {
    id    : "workplace",
    title : "Workplace",
  },
];
