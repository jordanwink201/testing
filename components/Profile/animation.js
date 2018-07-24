import $ from 'jquery'
import { TimelineMax } from 'gsap/TimelineMax'
import { Back } from 'gsap/TweenMax'

const entry = (profileImg, name, title, done) => {
  const tl = new TimelineMax({
    onComplete: done,
  })

  return tl
    .set(profileImg, { opacity: 0 })
    .fromTo(
      name,
      0.3,
      { y: 30, opacity: 0 },
      { ease: Back.easeOut, y: 0, opacity: 1 },
    )
    .delay(1)
    .fromTo(
      title,
      0.3,
      { y: 30, opacity: 0 },
      { ease: Back.easeOut, y: 0, opacity: 1 },
    )
    .delay(1)
    .fromTo(
      profileImg,
      0.3,
      { y: -100, opacity: 0 },
      { ease: Back.easeOut, y: 0, opacity: 1 },
    )
}

const exit = (profileImg, name, title, done) => {
  const tl = new TimelineMax({
    onComplete: done,
  })

  return tl
    .delay(3)
    .to(profileImg, 0.3, { ease: Back.easeIn, y: -100, opacity: 0 })
    .to(name, 0.3, { ease: Back.easeIn, y: -100, opacity: 0 })
    .to(title, 0.3, { ease: Back.easeIn, y: -100, opacity: 0 })
}

const transition = (profileImg, name, title, done) => {
  const tl = new TimelineMax({
    onComplete: done,
  })

  const loadingBg = $('#loading')
  // const loadingBgFill = $('#loading-fill')

  return tl
    // .set(loadingBgFill, { opacity: 1 })
    // .to(loadingBgFill, 0.3, { top: 0 })
    .set(loadingBg, { display: 'none', opacity: 0 })
    // .to(loadingBgFill, 0.3, { display: 'none', opacity: 0 })
}

const profileAnimations = {
  entry,
  exit,
  transition,
}

const animateProfileComponent = (animation) => {
  const profileContainer = $('.ProfileContainer')
  const textContainer = profileContainer.find('div')

  const profileImg = profileContainer.find('img')
  const name = textContainer.find('h1')
  const title = textContainer.find('h2')

  return new Promise((resolve) => animation(profileImg, name, title, resolve))
}

const playProfileAnimations = async (element) => {
  await animateProfileComponent(profileAnimations.entry)

  await animateProfileComponent(profileAnimations.exit)

  await animateProfileComponent(profileAnimations.transition)
}

export { playProfileAnimations }
