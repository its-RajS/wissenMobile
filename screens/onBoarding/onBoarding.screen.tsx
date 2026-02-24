import Slide from '@/components/onBoarding/slide'
import Slider from '@/components/onBoarding/slider'
import { onBoardingSlides } from '@/config/constants'
import React, { useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function onBoardingScreen() {
    const [index, setIndex] = useState(0)
    const prev = onBoardingSlides[index - 1]
    const next = onBoardingSlides[index + 1]


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Slider
                key={index}
                index={index}
                setIndex={setIndex}
                prev={prev && <Slide slide={prev} totalSlides={onBoardingSlides.length} index={index}
                    setIndex={setIndex} />}
                next={next && <Slide slide={next} totalSlides={onBoardingSlides.length} index={index}
                    setIndex={setIndex} />}
            >
                <Slide
                    slide={onBoardingSlides[index]}
                    index={index}
                    setIndex={setIndex}
                    totalSlides={onBoardingSlides.length}
                />
            </Slider>
        </GestureHandlerRootView>
    )
}
