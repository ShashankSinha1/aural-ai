'use client'
import { useState, useEffect } from "react";
import { useRecordWebcam } from "react-record-webcam";
import { FaRegStopCircle } from "react-icons/fa";
import useSpeechToText from "@/hooks/useSpeechToText";

export default function Webcam() {
    const {
        activeRecordings,
        createRecording,
        openCamera,
        startRecording,  
    } = useRecordWebcam();

    const {
        isListening,
        transcript,
        startListening,
        stopListening
    } = useSpeechToText({ continuous: true });

    const [text, setText] = useState('');

    const toggleListening = () => {
        if (isListening) {
            setText(prevText => prevText + (transcript ? `${prevText ? ' ' : ''}${transcript}` : ''));
            stopListening();
        } else {
            startListening();
        }
    };

    const clearText = () => setText('');

    const start = async () => {
        try {
            const recording = await createRecording();
            if (recording) {
                await openCamera(recording.id);
                await startRecording(recording.id);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        start();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-4">
            {activeRecordings.map((recording) => (
                <div key={recording.id} className="flex flex-col items-center justify-center mb-4">
                    <video ref={recording.webcamRef} autoPlay playsInline className="mb-2"/>
                </div>
            ))}
            <textarea
                className="w-full h-52 p-2 mb-2 text-xs text-black border rounded"
                value={isListening ? `${text}${transcript ? `${text ? ' ' : ''}${transcript}` : ''}` : text}
                disabled={isListening}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={toggleListening} className="flex items-center px-3 py-1 mb-2 bg-green-500 hover:bg-green-700 text-white rounded-full">
                {isListening ? 'Stop Listening' : 'Speak'}
            </button>
            <button onClick={clearText} className="flex items-center px-3 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-full">
                Clear
            </button>
        </div>
    );
}