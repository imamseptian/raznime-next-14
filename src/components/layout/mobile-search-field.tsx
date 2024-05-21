'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavbarSearchField from '@/components/layout/navbar-search-field';

/**
 * Renders a mobile search field component.
 * The field can be toggled to show/hide using the button with search icon
 *
 * @return {JSX.Element} The mobile search field component.
 */
export default function MobileSearchField() {
  const [showSearchField, setShowSearchField] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={ () => {
          setShowSearchField(!showSearchField);
        } }
      >
        <Search size={ 20 } />
      </Button>

      <div className={ `${showSearchField ? 'block' : 'hidden'} fixed top-[4rem] left-0 right-0 z-50 w-full bg-background/90 border-none lg:hidden` }>
        <div className="container bg-transparent pb-1">
          <NavbarSearchField
            onSubmit={ () => setShowSearchField(false) }
            onSelect={ () => setShowSearchField(false) }
          />
        </div>

      </div>
    </>
  );
}
