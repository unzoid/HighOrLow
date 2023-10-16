"use client"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Check } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { buttonVariants } from "@/components/ui/button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { Palette } from 'lucide-react';
import { MainNav } from "@/components/main-nav"
import { Languages, LanguagesIcon } from 'lucide-react';
import { ThemeToggle } from "@/components/theme-toggle"
import { useState, useRef, useEffect } from 'react';


export function SiteHeader() {

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
          <div>
              
                  <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[50px] h-[50px]" variant="ghost">
        <Palette className="h-5 w-5" />
          </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">       
        <DialogHeader>
          <DialogTitle>Choose your theme</DialogTitle>
          <DialogDescription>
            Choose a specific theme to your choice
          </DialogDescription>
        </DialogHeader>
        <div>
        <Select>
      <SelectTrigger className="w-[375px]">
        <SelectValue placeholder="Select a theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Theme</SelectLabel>
          <SelectItem value="Sapphire">Sapphire</SelectItem>
          <SelectItem value="Ruby">Ruby</SelectItem>
          <SelectItem value="Virus Green">Virus Green</SelectItem>
          <SelectItem value="Zinc">Zinc</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
        </div>
        <DialogFooter>
        <DialogClose asChild>
          <Button type="submit">
          <Check className="mr-2 h-4 w-4" /> Save Changes
            </Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>             
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>


  )
}
