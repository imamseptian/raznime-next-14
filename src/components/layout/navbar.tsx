import Link from 'next/link';
import ThemeToggler from '@/components/layout/theme-toggler';
import NavbarSearchField from '@/components/layout/navbar-search-field';
import { NAVIGATION_LINKS } from '@/lib/constants';
import MobileSearchField from '@/components/layout/mobile-search-field';
import MainDrawer from '@/components/layout/main-drawer';

export default function Navbar() {
  return (
    <nav className="w-full sticky top-0 z-50 shadow-md bg-background/90 backdrop-blur-sm">
      <div className="w-full lg:container py-3 flex items-center justify-between">

        <div className="flex items-center w-auto lg:w-1/2 pr-10">
          <div className="block lg:hidden">
            <MainDrawer />
          </div>

          <Link
            href="/"
            className="hidden lg:block"
          >
            <div className="font-bold text-emerald-700 text-3xl mr-5">
              Raz
              <span className="text-fuchsia-700">Nime.</span>
            </div>
          </Link>

          <div className="hidden lg:block w-full max-w-[400px] p-0">
            <NavbarSearchField />
          </div>
        </div>

        <Link className="block lg:hidden" href="/">
          <div className="font-bold text-emerald-700 text-3xl">
            Raz
            <span className="text-fuchsia-700">Nime.</span>
          </div>
        </Link>

        <div className="flex">
          <div
            id="navbar-links"
            className="items-center justify-between hidden w-full lg:flex mr-10"
          >
            <ul className="flex space-x-8">
              {
                Object.keys(NAVIGATION_LINKS).map((key) => (
                  <li key={ `navbar-link-${NAVIGATION_LINKS[key].value}` }>
                    <Link
                      href={ `/${NAVIGATION_LINKS[key].value}` }
                      className="text-muted-foreground hover:text-card-foreground text-md"
                    >
                      { `${NAVIGATION_LINKS[key].label}` }
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>

          <div className="block lg:hidden">
            <MobileSearchField />
          </div>

          <ThemeToggler />
        </div>

      </div>
    </nav>
  );
}
