"use client";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { HelpCircle } from 'lucide-react';
import { Cog } from 'lucide-react';
import { Check } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label";
import { buttonVariants } from "@/components/ui/button";
import 'app/globals.css'
import { Inter } from "next/font/google";
import 'styles/globals.css'


const inter = Inter({
    subsets: ["latin"],
    variable: "--font-Inter",
    weight: "400",
})

export default function IndexPage() {
    const [secretNumber, setSecretNumber] = useState(Math.floor(Math.random() * 100) + 1);
    const [guess, setGuess] = useState("");
    const [feedback, setFeedback] = useState("");
    const [tries, setTries] = useState(0);
    const [numTries, setNumTries] = useState(0); // Initialize numTries state
    const [minNumber, setMinNumber] = useState(1);
    const [maxNumber, setMaxNumber] = useState(100);
    const [showAlertDialog, setShowAlertDialog] = useState(false);
  
    const handleGuess = () => {
        const guessedNumber = parseInt(guess);
        if (isNaN(guessedNumber)) {
            setFeedback("Please enter a valid number.");
        } else if (guessedNumber < secretNumber) {
            setFeedback("Higher");
            setTries(tries + 1);
        } else if (guessedNumber > secretNumber) {
            setFeedback("Lower");
            setTries(tries + 1);
        } else {
            setTries(tries + 1); // Increment tries before using its value
            setNumTries(tries); // Now tries has the correct value
            setSecretNumber(Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber); // generate a new secret number
            setShowAlertDialog(true); // Show the alert dialog
            setTries(0); // Reset tries to 0
        }
        setGuess("");
    };
    
    
    const handleSettingsSave = () => {
      setMinNumber(Math.max(1, minNumber)); // ensure the minimum is at least 1
      setMaxNumber(Math.max(minNumber, maxNumber)); // ensure the maximum is at least as large as the minimum
      setSecretNumber(Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber); // generate a new secret number within the new range
    };
  
    const closeAlertDialog = () => {
      setShowAlertDialog(false);
    };
  
    return (
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Guess it, Higher or Lower?! <br className="hidden sm:inline" />
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Stars on GitHub are appreciated!
          </p>
        </div>
        <div className="flex items-center justify-center min-h-screen">
          <Card className="w-[400px] h-[350px] flex flex-col justify-between mt-[-200px]">
            <CardHeader className="text-center">
              <CardTitle>Guess the number</CardTitle>
              <CardDescription>Choose from {minNumber} till {maxNumber}!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col justify-center items-center h-full">
                {feedback && (
                  <p className={`mb-4 ${feedback ? "fade-in" : ""}`}>
                    <strong>{feedback}</strong>
                  </p>
                )}
                <Input
                  type="number"
                  placeholder="Number"
                  className="w-full mb-4"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  onKeyPress={(e) => {
                    if(e.key === 'Enter') {
                        handleGuess();
                    }
                }}
                  style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
                />
                <Button className="w-full" onClick={handleGuess}>
                <HelpCircle className="mr-2 h-4 w-4" /> Guess
                </Button>
                <Dialog>
            <DialogTrigger asChild>
            <Button className="w-full mt-4">
                <Cog className="mr-2 h-4 w-4" /> Settings
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adjust Numbers</DialogTitle>
                <DialogDescription>
                  Adjust the range of numbers you can choose from.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="Minimum" className="text-right">
                    Minimum
                  </Label>
                  <Input
                    id="Minimum"
                    type="number"
                    value={minNumber}
                    onChange={(e) => setMinNumber(parseInt(e.target.value))}
                    className="col-span-3"
                    style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="Maximum" className="text-right">
                    Maximum
                  </Label>
                  <Input
                    id="Maximum"
                    type="number"
                    value={maxNumber}
                    onChange={(e) => setMaxNumber(parseInt(e.target.value))}
                    className="col-span-3"
                    style={{ appearance: 'textfield' }}
                  />
                </div>
              </div>
              <DialogFooter>
              <DialogClose asChild>
                <Button onClick={handleSettingsSave}> 
                <Check className="mr-2 h-4 w-4" /> Save changes 
                </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
        {showAlertDialog && (
          <AlertDialog open={showAlertDialog}>
            <AlertDialogTrigger asChild>
              <Button variant="outline"></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Congratulations!</AlertDialogTitle>
                <AlertDialogDescription>
    You guessed the correct number in {numTries === 1 ? "1 try" : `${numTries} tries`}.
</AlertDialogDescription>

              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction                  
                onClick={closeAlertDialog}>Play Again</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
  
          @keyframes fade-in {
            0% {
              opacity: 0;
              transform: translateY(10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
  
          .fade-in {
            animation: fade-in 0.5s ease-in;
          }
  
          body, html {
            height: 100%;
            overflow: hidden;
          }
        `}
        </style>
      </section>
    );
  }
