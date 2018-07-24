import $ from 'jquery'
import { TimelineMax } from 'gsap/TimelineMax'
import { Back } from 'gsap/TweenMax'

const entry = (logo, done) => {
  const tl = new TimelineMax({
    onComplete: done,
  })

  const projectSwitcher = $('.project-switcher')

  return tl
    .delay(0.5)
    .fromTo(
      logo,
      0.3,
      { y: 50, opacity: 0 },
      { ease: Back.easeOut, y: 0, opacity: 1 },
    )
    .to(projectSwitcher, 0.6, { ease: Back.easeOut, opacity: 1 })
}

const exit = (logo, done) => {
  const tl = new TimelineMax({
    onComplete: done,
  })

  return tl.delay(0.5).to(logo, 0.3, { ease: Back.easeIn, y: 50, opacity: 0 })
}

const animateLogoComponent = (animation) => {
  const LogoContainer = $('.LogoContainer')
  const logoImg = LogoContainer.find('img')

  return new Promise((resolve) => animation(logoImg, resolve))
}

const entryScene = async (element) => {
  await animateLogoComponent(entry)
}

const exitScene = async (element) => {
  await animateLogoComponent(exit)
}

const logoAnimations = {
  entryScene,
  exitScene,
}

export { logoAnimations }
