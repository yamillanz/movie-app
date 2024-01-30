interface Image {
  id: string;
  width: number;
  height: number;
  url: string;
  caption: {
    plainText: string;
    __typename: string;
  };
  __typename: string;
}

interface TitleType {
  text: string;
  id: string;
  isSeries: boolean;
  isEpisode: boolean;
  __typename: string;
}

interface TitleText {
  text: string;
  __typename: string;
}

interface YearRange {
  year: number;
  endYear: number | null;
  __typename: string;
}

interface ReleaseDate {
  day: number | null;
  month: number | null;
  year: number;
//   __typename: string;
}

interface Movie {
  _id: string;
  id: string;
  primaryImage: Image | null;
  titleType: TitleType;
  titleText: TitleText;
  originalTitleText: TitleText;
  releaseYear: YearRange;
  releaseDate: ReleaseDate | null;
}

interface MovieDTO {
  id?: string | null;
  primaryImage?: string | null;
  titleText?: string;
  titleType?: string;
  originalTitleText?: string;
  releaseYear?: YearRange | null;
  releaseDate?: ReleaseDate | null;
}

interface MovieListItem {
  page: number;
  next: string;
  entries: number;
  movies: MovieDTO[];
}

interface MoviesResponse {
  page: number;
  next: string;
  entries: number;
  results: Movie[];
}

export { MovieListItem, MoviesResponse, MovieDTO };
