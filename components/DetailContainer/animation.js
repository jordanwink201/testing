import $ from 'jquery'
import { TimelineMax } from 'gsap/TimelineMax'
import { Back, Power2 } from 'gsap/TweenMax'

import { DetailContainer } from './index'

const entry = (element, done) => {
  const tl = new TimelineMax({
    onComplete: done,
  })

  return tl.to(
    element,
    0.3,
    { opacity: 1 },
  )
}

const exit = (element, done) => {
  const tl = new TimelineMax({
    onComplete: done,
  })

  return tl
    .delay(0.5)
    .to(element, 0.3, { ease: Back.easeIn, opacity: 0 })
}

const animateDetailContainerComponent = (animation) => {
  const element = DetailContainer.find('div')

  return new Promise((resolve) => animation(element, resolve))
}

const entryScene = async (element) => {
  await animateDetailContainerComponent(entry)
}

const exitScene = async (element) => {
  await animateDetailContainerComponent(exit)
}

const detailContainerAnimations = {
  entryScene,
  exitScene,
}

export { detailContainerAnimations }
