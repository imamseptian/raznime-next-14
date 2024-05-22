'use client';

import { objectToQueryString } from '@/lib/helpers/url-helpers';
import Link, { type LinkProps } from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { forwardRef } from 'react';

/**
* @property {React.ReactNode} children - The content to be rendered inside the link.
* @property {() => void} [onLinkClick] - An optional function to be called when the link is clicked.
* @property {LinkProps} [props] - Additional props to be passed to the underlying Next.js `Link` component.
*/
interface ShallowLinkProps extends LinkProps {
  children: React.ReactNode;
  onLinkClick?: () => void;
}

/**
* A custom Next.js `Link` component that updates the URL in the browser history without triggering a full page refresh.
*
* @component
* @param {ShallowLinkProps} props - The props for the ShallowLink component.
* @returns {React.ReactElement} The rendered ShallowLink component.
*/
const ShallowLink = forwardRef<HTMLAnchorElement, ShallowLinkProps>(
  ({
    children, onLinkClick = () => {}, href, ...props
  }, ref) => {
    const searchParams = useSearchParams();
    const queryParams  = Object.fromEntries(searchParams);

    const handleLinkClick = (
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) => {
      event.preventDefault();
      let nextUrl = '';

      if (typeof href === 'object' && href !== null) {
        if (typeof href.query === 'object') {
          const queryString = href.query
            ? objectToQueryString({ ...queryParams, ...href.query })
            : '';
          const pathName    = href.pathname ?? '';
          nextUrl           = `${pathName}?${queryString}`;
        } else {
          nextUrl = href.toString();
        }
      } else {
        nextUrl = href.toString();
      }

      if (onLinkClick) {
        onLinkClick();
      }

      if (props.scroll && window !== undefined) {
        window.scrollTo(0, 0);
      }

      window.history.pushState(null, '', nextUrl);
    };

    return (
      <Link onClick={ handleLinkClick } href={ href } ref={ ref } { ...props }>
        { children }
      </Link>
    );
  },
);

export default ShallowLink;
