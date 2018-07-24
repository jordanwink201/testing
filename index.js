import $ from 'jquery'
import * as R from 'ramda'

import bigcommerceBg from 'assets/bigcommerce/bg.png'

// Styles
import 'normalize.css'
import './index.scss'

// Background
import {
  cleanBackground,
  setBackgroundContent,
} from './components/Background/index'
import { setupParallax } from './components/Background/parallax'
import { backgroundAnimations } from './components/Background/animation'

// Stacked Cards
import { setSwitcher } from './components/StackedCards/switcher'
import {
  cleanStackedCards,
  onActionRight,
  setStackedCards,
} from './components/StackedCards/cards'
import { stackedCardsAnimations } from './components/StackedCards/animation'

// Detail Container
import {
  cleanDetailContent,
  setDetailContent,
} from './components/DetailContainer/index'
import { setGifActionOverlay } from './components/DetailContainer/gifOverlay'
import { detailContainerAnimations } from './components/DetailContainer/animation'

// Logo
import { cleanLogo, setLogoContent } from './components/Logo/index'
import { logoAnimations } from './components/Logo/animation'

// Profile
import { setProfileContent } from './components/Profile/index'
import { playProfileAnimations } from './components/Profile/animation'

// Footer
import {
  cleanProjectSwitcher,
  setProjectSwitcher,
} from './components/Footer/index'
import { footerAnimations } from './components/Footer/animation'

// Content
import { projectContent } from './content'

const projectsArray = [projectContent.bigcommerce, projectContent.elliot]

const projectIntro = async (project) => {
  const { background, logo } = project

  // Initiate
  setBackgroundContent(background)
  setLogoContent(logo)
}

var activeProjectIdx = 1

const setProjectContent = async (project) => {
  // Pluck
  const { background, cards, logo } = project
  const { detailContainer } = R.head(cards)

  // Initiate
  setStackedCards(background.name, cards)

  R.compose(
    setGifActionOverlay,
    setDetailContent.bind(null, background.name),
  )(detailContainer)

  setProjectSwitcher(background.name, () => {
    if (activeProjectIdx >= projectsArray.length) {
      activeProjectIdx = 0
    }

    const nextProject = projectsArray[activeProjectIdx]

    runNextProject(nextProject)
    activeProjectIdx++
  })

  setSwitcher(background.name, () => {
    const idx = onActionRight()
    const content = project.cards[idx]
    const { detailContainer } = content

    cleanDetailContent()
    R.compose(
      setGifActionOverlay,
      setDetailContent.bind(null, background.name),
    )(detailContainer)
  })
}

const projectEntryScenes = () => {
  backgroundAnimations.entryScene()
  return logoAnimations.entryScene()
}

const projectExitScenes = async () => {
  backgroundAnimations.exitScene()
  return logoAnimations.exitScene()
}

const projectContentEntryScenes = () => {
  footerAnimations.entryScene()
  detailContainerAnimations.entryScene()
  return stackedCardsAnimations.entryScene()
}

const projectContentExitScenes = () => {
  footerAnimations.exitScene()
  detailContainerAnimations.exitScene()
  return stackedCardsAnimations.exitScene()
}

const projectCleanup = async () => {
  // Cleanup
  cleanBackground()
  cleanLogo()
  cleanProjectSwitcher()
  cleanDetailContent()
  cleanStackedCards()

  return Promise.resolve()
}

const run = async (project) => {
  await setProfileContent()

  await playProfileAnimations()

  await projectIntro(project)

  await projectEntryScenes()

  await setProjectContent(project)

  await projectContentEntryScenes()

  await setupParallax()
}

async function runNextProject(project) {
  await projectContentExitScenes()

  await projectExitScenes()

  await projectCleanup()

  await projectIntro(project)

  await projectEntryScenes()

  await setProjectContent(project)

  await projectContentEntryScenes()

  await setupParallax()
}

window.document.addEventListener('DOMContentLoaded', (event) => {
  window.$ = $ // TESTING

  R.compose(run)(R.head(projectsArray))

  // $('#second-background').css({
  //   backgroundImage: `
  //       url(${bigcommerceBg}),
  //       linear-gradient(to right, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.96) 100%)
  //     `,
  // })
})
