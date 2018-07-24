import $ from 'jquery'
import { TimelineMax } from 'gsap/TimelineMax'
import { Power3, Back } from 'gsap/TweenMax'

const entry = (elem, done) => {
  const tl = new TimelineMax({
    onComplete: done,
  })

  return tl.fromTo(
    elem,
    0.5,
    { x: 1500, opacity: 0 },
    { ease: Power3.easeOut, x: 0, opacity: 1 },
  )
}

const exit = (elem, done) => {
  const tl = new TimelineMax({
    onComplete: done,
  })

  return tl.to(elem, 0.5, { ease: Back.easeIn, x: -1500, opacity: 0 })
}

const animateBackgroundComponent = (animation) => {
  const BackgroundContainer = $('body').find('div[id^="background-"]')

  return new Promise((resolve) => animation(BackgroundContainer, resolve))
}

const entryScene = async (element) => {
  await animateBackgroundComponent(entry)
}

const exitScene = async (element) => {
  await animateBackgroundComponent(exit)
}

const backgroundAnimations = {
  entryScene,
  exitScene,
}

export { backgroundAnimations }
