"use client";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
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
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { buttonVariants } from "@/components/ui/button";

export default function IndexPage() {
    const [secretNumber, setSecretNumber] = useState(Math.floor(Math.random() * 100) + 1);
    const [guess, setGuess] = useState("");
    const [feedback, setFeedback] = useState("");
    const [tries, setTries] = useState(0);
    const [showSettings, setShowSettings] = useState(false);
    const [minNumber, setMinNumber] = useState(1);
    const [maxNumber, setMaxNumber] = useState(100);

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
            setFeedback(`Congratulations! You guessed the correct number in ${tries + 1} tries.`);
            setSecretNumber(Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber); // generate a new secret number
            setTries(0);
        }
        setGuess("");
    };

    const handleSettingsSave = () => {
        setMinNumber(Math.max(1, minNumber)); // ensure minimum is at least 1
        setMaxNumber(Math.max(minNumber, maxNumber)); // ensure maximum is at least as large as minimum
        setSecretNumber(Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber); // generate a new secret number within the new range
        setShowSettings(false);
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
            <div className="flex justify-center items-center h-screen">
                <div className="mt-0">
                    <Card className="w-[400px] h-[350px] flex flex-col justify-between">
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
                                />
                                <Button className="w-full" onClick={handleGuess}>
                                    Guess
                                </Button>
                                <Button className="w-full mt-4" onClick={() => setShowSettings(true)}>
                                    Settings
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            {showSettings && (
                <Dialog open={showSettings}>
                    <DialogTrigger asChild>
                        <Button variant="outline"></Button>
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
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleSettingsSave}> Save changes </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
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

        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
        </section>
    );
}
