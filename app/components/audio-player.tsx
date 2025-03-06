"use client"

import type React from "react"

import { useState, useRef } from "react"

interface AudioFile {
  _id: string
  title: string
  description?: string
  audioUrl: string
}

export default function AudioPlayer({ audio }: { audio: AudioFile }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <div className="bg-[#1d1d20] shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-2 text-white">{audio.title}</h2>
      {audio.description && <p className="text-sm text-zinc-400 mb-4">{audio.description}</p>}

      <audio
        ref={audioRef}
        src={audio.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />

      <div className="space-y-4">
        <button
          onClick={togglePlay}
          className="bg-zinc-700 text-white px-4 py-2 rounded hover:bg-zinc-600 transition-colors"
        >
          {isPlaying ? "Pausar" : "Reproducir"}
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm w-12 text-zinc-400">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSliderChange}
            className="w-full"
          />
          <span className="text-sm w-12 text-zinc-400">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  )
}

