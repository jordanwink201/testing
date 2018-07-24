import $ from 'jquery'
import { TimelineMax } from 'gsap/TimelineMax'
import { Power2 } from 'gsap/TweenMax'

const entry = (switcher, done) => {
  const tl = new TimelineMax({
    onComplete: done,
  })

  return tl
    .fromTo(
      switcher,
      0.3,
      { opacity: 0 },
      { ease: Power2.easeOut, y: 0, opacity: 1 },
    )
}

const exit = (switcher, done) => {
  const tl = new TimelineMax({
    onComplete: done,
  })

  return tl.to(switcher, 0.3, { ease: Power2.easeIn, opacity: 0 })
}

const animateFooterComponent = (animation) => {
  const ProjectSwitcherContainer = $('.ProjectSwitcherContainer')
  const switcher = ProjectSwitcherContainer.find('div')

  return new Promise((resolve) => animation(switcher, resolve))
}

const entryScene = async (element) => {
  await animateFooterComponent(entry)
}

const exitScene = async (element) => {
  await animateFooterComponent(exit)
}

const footerAnimations = {
  entryScene,
  exitScene,
}

export { footerAnimations }
