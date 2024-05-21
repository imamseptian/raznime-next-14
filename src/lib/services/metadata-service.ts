import { Metadata } from 'next';

/**
 * Updates the metadata title and description based on the provided values.
 * currently used this after shallow routing navigation, so we can keep metadata title and description in sync
 *
 * @param {Object} params - The params object containing the new title and description.
 * @param {string} params.title - The new title for the metadata. Defaults to an empty string.
 * @param {string} params.description - The new description for the metadata. Defaults to an empty string.
 */
export function updateMetadataFromClient({ title = '', description = '' }: { title?: string | undefined | null, description?: string | undefined | null }) {
  // update metadata title
  if (title) {
    document.title = title;
  }

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && description) {
    metaDescription.setAttribute('content', description); // Update meta description
  }
}

/**
 * Builds the metadata object for the given parameters.
 *
 * @param {Metadata} params - The metadata parameters.
 * @param {string} params.title - The title of the metadata. Defaults to 'Raznime - Stream Anime Online'.
 * @param {string} params.description - The description of the metadata. Defaults to a generic description.
 * @param {Object} params.openGraph - The Open Graph metadata.
 * @param {Object} params.twitter - The Twitter open graph metadata.
 * @param {string|string[]} params.keywords - The keywords for the metadata. Defaults to ['anime', 'watch', 'stream', 'streaming', 'download'].
 * @returns {Metadata} The built metadata object.
 */
export function buildMetadata({
  title, description,
  openGraph,
  twitter,
  keywords,
  ...props
}: Metadata): Metadata {
  const metadataTitle       = title ?? 'Raznime - Stream Anime Online';
  const metadataDescription = description ?? 'Raznime is your ultimate destination for streaming the latest and greatest anime series, offering a vast library of subbed and dubbed anime series and movies. Indulge in your favorite anime without the hassle of registration or ads, unveiling a world of limitless entertainment, and immerse yourself in captivating stories like never before.';
  let metadataKeywords      = ['anime', 'watch', 'stream', 'streaming', 'download'];

  if (typeof keywords === 'string') {
    metadataKeywords = [...metadataKeywords, keywords];
  }

  if (Array.isArray(keywords)) {
    metadataKeywords = [...metadataKeywords, ...keywords];
  }

  return ({
    title       : metadataTitle,
    description : metadataDescription,
    openGraph   : {
      title       : metadataTitle,
      description : metadataDescription,
      images      : [{
        url    : `${process.env.NEXT_PUBLIC_BASE_URL}/images/metadata-main-image.png`,
        height : 500,
        width  : 500,
      }],
      ...openGraph,
    },
    keywords : metadataKeywords,
    twitter  : {
      title       : title ?? 'Raznime',
      description : description ?? 'Your Gateway to Anime Awesomeness',
      images      : [{
        url    : `${process.env.NEXT_PUBLIC_BASE_URL}/images/metadata-main-image.png`,
        width  : 500,
        height : 500,
      }],
    },
    ...props,
    robots: {
      index   : true,
      follow  : true,
      nocache : true,
    },
  });
}
