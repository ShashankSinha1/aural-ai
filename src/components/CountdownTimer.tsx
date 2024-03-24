'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CountdownTimer() {
    const [seconds, setSeconds] = useState(15);
    const router = useRouter();
    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds((prevSeconds) => {
                const newSeconds = prevSeconds - 1;

                if (newSeconds == 0) {
                    clearInterval(intervalId);
                    router.push('/response');// Optionally, perform any other actions when countdown reaches zero
                }

                return newSeconds;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <p>Your interview will start in {seconds} seconds!</p>
    );
}