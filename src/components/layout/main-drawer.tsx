import {
  Menu as MenuIcon, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from 'next/link';
import { NAVIGATION_LINKS } from '@/lib/constants';

/**
 * Renders the left drawer component.
 *
 * @return {JSX.Element} The main drawer component.
 */
export default function MainDrawer() {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
        >
          <MenuIcon />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="bg-background/80">
        <DrawerHeader className="relative">
          <Link href="/">
            <DrawerTitle>
              <div className="font-bold text-emerald-700 text-3xl mr-5">
                Raz
                <span className="text-fuchsia-700">Nime.</span>
              </div>
            </DrawerTitle>
          </Link>

          <DrawerDescription>Your Gateway to Anime Awesomeness</DrawerDescription>

          <DrawerClose className="aspect-square absolute top-0 right-0 ring-0 border-none rounded-none rounded-tr-lg" asChild>
            <Button variant="ghost" className="aspect-square">
              <X />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="h-full">
          <ul className="">
            {
              Object.keys(NAVIGATION_LINKS).map((key) => (
                <li
                  key={ `navbar-link-${NAVIGATION_LINKS[key].value}` }
                  className="p-2 border-y hover:bg-muted hover:text-muted-foreground "
                >
                  <DrawerClose asChild>
                    <Link
                      key={ `navbar-link-${NAVIGATION_LINKS[key].value}` }
                      href={ `/${NAVIGATION_LINKS[key].value}` }
                    >
                      <p className="w-full">
                        { NAVIGATION_LINKS[key].label }
                      </p>
                    </Link>
                  </DrawerClose>
                </li>
              ))
            }
          </ul>
        </div>

        <DrawerFooter>
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024
            { " " }
            <a href="https://github.com/imamseptian" className="hover:underline">
              Raznime™
            </a>
            . All Rights Reserved.
          </span>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
