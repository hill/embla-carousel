import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import CarouselArrowsDots from 'components/Sandbox/React/SandboxFilesSrc/ArrowsDots/EmblaCarousel'
import { carouselDefaultWrapperStyles } from 'components/Examples/carouselWrapperStyles'
import { createCarouselArrowsDotsStyles } from 'components/Examples/createCarouselStyles'
import { arrayFromNumber } from 'utils/arrayFromNumber'

export const ID = 'embla-carousel-arrow-dots'
export const SLIDES = arrayFromNumber(5)
export const OPTIONS: EmblaOptionsType = {}
export const STYLES = createCarouselArrowsDotsStyles()

export const Wrapper = styled.div`
  ${carouselDefaultWrapperStyles};

  &.${ID} {
    ${STYLES};
  }
`

export const ExampleCarouselArrowsDots = () => {
  const [inViewRef, inView] = useInView()

  return (
    <Wrapper className={ID} ref={inViewRef}>
      {inView ? <CarouselArrowsDots slides={SLIDES} options={OPTIONS} /> : null}
    </Wrapper>
  )
}
