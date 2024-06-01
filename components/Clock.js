import { useEffect, useRef } from "react";
import { View, Text, Pressable } from "react-native";

import useClockTime from "./hooks/useClockTime";

export default function Clock({ onAlert }) {
  const { time, isPaused, togglePause } = useClockTime()

  // const playButton = useRef(null)
  // const playButtonImg = useRef(null)

  useEffect(() => {
    if (!isPaused) {
      if (time.seconds % 10 === 0) {
        onAlert()
      }
    }
  }, [time])

  return (
    <View>
      <Text>
        {time.minutes.toString().padStart(2, '0')}
        :
        {time.seconds.toString().padStart(2, '0')}
      </Text>
      <Pressable onPress={togglePause}>
        <Text>
          {isPaused ? 'Play' : 'Pause'}
        </Text>
      </Pressable>
    </View>
  )
}