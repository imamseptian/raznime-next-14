'use client';

import { Input } from "@/components/ui/input";
import { searchAnime } from '@/lib/api/anime-api';
import { type Anime } from '@/lib/types/anime';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { RefreshCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

/**
 * Props for the NavbarSearchField component.
 *
 * @interface NavbarSearchFieldProps
 * @property {() => void} [onSubmit] - Function to be called when the search form is submitted.
 * @property {() => void} [onSelect] - Function to be called when an anime result is selected.
 */
interface NavbarSearchFieldProps {
  onSubmit?: () => void
  onSelect?: () => void
}

/**
 * Renders a search field for the navbar, allowing users to search for anime.
 */
export default function NavbarSearchField({
  onSubmit = () => { },
  onSelect = () => { },
}: NavbarSearchFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const [animeResults, setAnimeResults] = useState<Anime[]>([]);
  const [searchQuery, setSearchQuery]   = useState("");
  const [isLoading, setIsLoading]       = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * Submits a search query to the server and navigates to the search results page.
   *
   * @param {FormData} formData - The form data containing the search query.
   * @return {Promise<void>} - A promise that resolves when the search query is submitted successfully.
   */
  async function submitSearchQuery(formData: FormData) {
    const formSearchQuery = formData.get('query');

    if (formSearchQuery) {
      onSubmit();
      inputRef.current?.blur();
      router.push(`/search?query=${formSearchQuery}`);
    }
  }

  let timeoutId: ReturnType<typeof setTimeout>;

  /**
   * Handles the key up event on the input element.
   *
   * @param {React.KeyboardEvent<HTMLInputElement>} event - The keyboard event object.
   * @return {void}
   */
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
      setIsLoading(true);
      setErrorMessage('');
      if (inputValue) {
        setSearchQuery(inputValue);
        const {
          isError, isSuccess, data, error,
        } = await searchAnime({ searchQuery: inputValue, pageNumber: 1 });
        if (isSuccess && data) {
          setAnimeResults(data.results);
          if (data.results.length === 0) {
            setErrorMessage("Can't find any anime that you are looking for");
          }
        }
        if (isError) {
          setAnimeResults([]);
          setErrorMessage(error || 'An unexpected error occurred');
        }
      } else {
        setSearchQuery('');
        setAnimeResults([]);
      }

      setIsLoading(false);
    }, 500);
  };

  /**
   * Blurs the input element and calls the onSelect function when an item is selected from the search result.
   *
   * @return {void}
   */
  const onItemSelect = () => {
    inputRef.current?.blur();
    onSelect();
  };

  const showInitialMessage = !isLoading && !searchQuery;
  const showViewMoreButton = !isLoading && animeResults.length > 5;
  const showErrormessage   = !isLoading && errorMessage !== '';

  return (
    <form action={ submitSearchQuery } className="relative">
      <Input
        ref={ inputRef }
        type="text"
        name="query"
        placeholder="Search for anime"
        className="w-full rounded-lg peer/anime-search focus-visible:rounded-b-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-0"
        onKeyUp={ handleKeyUp }
        autoComplete="off"
      />

      <button className="sr-only" type="submit">Search</button>
      { /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */ }
      <div onMouseDown={ (e) => e.preventDefault() } className="hidden w-full absolute z-50 bg-popover/90 p-0 peer-focus-visible/anime-search:block border-x shadow-md rounded-b-lg">
        <h5 className="text-center my-2 text-sm font-semibold">
          Results
        </h5>

        { isLoading && <ListSkeleton /> }

        {
          showInitialMessage && <p className="text-center text-sm text-muted-foreground my-3">Type to start searching</p>
        }

        {
          showErrormessage && <p className="text-center text-sm text-muted-foreground my-3">{ errorMessage }</p>
        }

        {
          !isLoading && (
            <ul>
              {
                // render only first 5 results so it doesn't take too much space
                animeResults.slice(0, 5).map((anime, index) => {
                  const listColor       = index % 2 === 0 ? 'bg-secondary/90 text-secondary-foreground' : 'bg-popover/90 text-popover-foreground';
                  const buttonTextColor = index % 2 === 0 ? 'text-secondary-foreground' : 'text-popover-foreground';
                  return (
                    <li className={ `${listColor} p-2` } key={ anime.id }>
                      <Button
                        type="button"
                        variant="link"
                        onClick={ onItemSelect }
                        className={ `p-0 h-full w-full ${buttonTextColor}` }
                        asChild
                      >
                        <Link
                          href={ `/detail/${anime.id}` }
                          scroll={ false }
                        >
                          <div className="w-full flex gap-2">
                            <div className="basis-1/6">
                              <div className="w-full aspect-3/4 overflow-hidden">
                                <Image
                                  src={ anime.image }
                                  alt={ anime.title }
                                  width={ 300 }
                                  height={ 400 }
                                />
                              </div>
                            </div>

                            <div className="w-full">
                              <h5 className="text-sm font-semibold mb-1 line-clamp-2">{ anime.title }</h5>
                              <span className="text-xs text-muted-foreground">
                                <Badge
                                  variant="default"
                                  className="mr-1 border uppercase"
                                >
                                  { anime.subOrDub }
                                </Badge>
                                { anime.releaseDate }
                              </span>

                            </div>
                          </div>
                        </Link>
                      </Button>
                    </li>
                  );
                })
              }
            </ul>
          )
        }

        {
          showViewMoreButton && (
            <div className="w-full bg-primary/90 text-primary-foreground border flex justify-center py-1 rounded-b-lg">
              <Link
                href={{
                  pathname : "/search",
                  query    : {
                    query: searchQuery,
                  },
                }}
                className="w-full"
                onClick={ () => inputRef.current?.blur() }
              >
                <div className="w-full text-center text-sm font-semibold">
                  View More
                </div>
              </Link>
            </div>
          )
        }
      </div>
    </form>
  );
}

/**
 * Renders a skeleton when loading the search results.
 *
 * @return {JSX.Element} The skeleton list component.
 */
function ListSkeleton() {
  return (
    <div className="flex gap-2 relative px-2 my-2">
      <div className="basis-1/6">
        <Skeleton className="aspect-3/4" />
      </div>

      <div className="w-full">
        <Skeleton className="h-3 w-48 mb-2" />
        <div className="flex gap-2">
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>

      <RefreshCcw className="absolute top-1/2 left-1/2 text-primary animate-spin font-bold" />
    </div>
  );
}
