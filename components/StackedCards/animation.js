import $ from 'jquery'
import { TimelineMax } from 'gsap/TimelineMax'
import { Back, Power2 } from 'gsap/TweenMax'

import { StackedCardsContainer } from './card'

const entry = (switcher, stackedCards, done) => {
  const tl = new TimelineMax({
    onComplete: done,
  })

  return tl.to(
    switcher,
    0.3,
    { opacity: 1 },
  )
}

const exit = (switcher, stackedCards, done) => {
  const tl = new TimelineMax({
    onComplete: done,
  })

  return tl
    .to(switcher, 0.3, { ease: Back.easeIn, opacity: 0 })
    .staggerTo(stackedCards, 0.3, { ease: Power2.easeOut, opacity: 0 }, 0.15);
}

const animateStackedCardsComponent = (animation) => {
  const switcher = StackedCardsContainer.find('#switcher')
  const stackedCards = StackedCardsContainer.find('.card-item')

  return new Promise((resolve) => animation(switcher, stackedCards.toArray().reverse(), resolve))
}

const entryScene = async (element) => {
  await animateStackedCardsComponent(entry)
}

const exitScene = async (element) => {
  await animateStackedCardsComponent(exit)
}

const stackedCardsAnimations = {
  entryScene,
  exitScene,
}

export { stackedCardsAnimations }
