import { useState, useEffect, useRef } from "react";

interface SpeechRecognitionProps {
    interimResults?: boolean;
    lang?: string;
    continuous?: boolean;
}

export default function Webcam(options: SpeechRecognitionProps) {
    const [isListening, setIsListening] = useState<boolean>(false);
    const [transcript, setTranscript] = useState<string>("");

    const recognitionRef = useRef<any | null>(null);
    useEffect(() => {
        if (!("webkitSpeechRecognition" in window)){
            console.log("Web kit API is not supported in this browser")
            return;
        }

        recognitionRef.current = new (window as any).webkitSpeechRecognition();
        const recognition = recognitionRef.current as any;

        if (recognition) {
            recognition.interimResults = options?.interimResults || true;
            recognition.lang = options?.lang || 'en-US';
            recognition.continuous = options?.continuous || false;
        }

        if ("webkitSpeechGrammarList" in window){
            const grammar = "#JSGF V1.0; grammar punctuation; public <punc> = . | , | ? | ! | ; | : ;"
            const speechRecognitionList = new (window as any).webkitSpeechGrammarList();
            speechRecognitionList.addFromString(grammar, 1)
            recognition.grammars = speechRecognitionList
        }

        recognition.onresult = (event: { results: string | any[]; }) => {
            let text = ""
            for (let i = 0; i < event.results.length; i++){
                text += event.results[i][0].transcript
            }

            setTranscript(text);
        }

        recognition.onerror = (event: { error: any; }) => {
            console.log("There was an error: ", event.error);
        }
        
        recognition.onend = () => {
            setIsListening(false)
            setTranscript("")
        }

        return () => {
            recognition.stop()
        }
    }, [])

    const startListening = () => {
        if (recognitionRef.current && !isListening){
            recognitionRef.current.start()
            setIsListening(true)
        }
    }

    const stopListening = () => {
        if (recognitionRef.current && isListening){
            recognitionRef.current.stop()
            setIsListening(false)
        }
    }

    return {
        isListening,
        startListening,
        stopListening,
        transcript
    }
}