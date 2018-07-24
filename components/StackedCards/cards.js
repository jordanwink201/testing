// TODO: remove `webkitTransform`

import $ from 'jquery'
import * as R from 'ramda'

import { createAndAppendOverlay, removeOverlay } from './helpers/overlay'
import { setBoxShadow } from './helpers/shadow'
import { setTransform } from './helpers/transform'

import {
  stackedOptions,
  rotate,
  items,
  elementsMargin,
  useOverlays,
  velocity,
  scaleCardBy,
  opacityDifferenceFactor,
} from './settings'

import {
  addCardToElement,
  createCardWithContent,
  createAndAddContainer,
  StackedCardsContainer,
} from './card'

const containerSelector = '.stackedcards-container'
var currentPosition = 0 //Keep the position of active stacked card.
var maxElements //Total of stacked cards on DOM.
var listElNodesObj //Keep the list of nodes from stacked cards.
var listElNodesWidth //Keep the stacked cards width.
var currentElementObj //Keep the stacked card element to swipe.
var stackedCardsObj
var isFirstTime = true
var elementHeight
var obj
var elTrans

//Functions to swipe right elements on logic external action.
export function onActionRight() {
  if (!(currentPosition >= maxElements)) {
    setTimeout(onSwipeRight, 0)
  }

  return currentPosition + 1
}

//Swipe active card to right.
function onSwipeRight() {
  removeNoTransition()
  transformUi(1000, 0, 0, currentElementObj)

  currentPosition = currentPosition + 1
  updateUi()
  currentElement()
  setActiveHidden()
}

// Usable functions
function countElements() {
  maxElements = listElNodesObj.length
  if (items > maxElements) {
    items = maxElements
  }
}

//Keep the active card.
function currentElement() {
  currentElementObj = listElNodesObj[currentPosition]
}

//Remove transitions from all elements to be moved in each swipe movement to improve perfomance of stacked cards.
function removeNoTransition() {
  if (listElNodesObj[currentPosition]) {
    listElNodesObj[currentPosition].classList.remove('no-transition')
    listElNodesObj[currentPosition].style.zIndex = 6
  }
}

function setActiveHidden() {
  if (!(currentPosition >= maxElements)) {
    listElNodesObj[currentPosition - 1].classList.remove('stackedcards-active')
    listElNodesObj[currentPosition - 1].classList.add('stackedcards-hidden')
    listElNodesObj[currentPosition].classList.add('stackedcards-active')
  }
}

//Add translate X and Y to active card for each frame.
function transformUi(moveX, moveY, opacity, elementObj) {
  requestAnimationFrame(function() {
    var element = elementObj

    // Function to generate rotate value
    function RotateRegulator(value) {
      if (value / 10 > 15) {
        return 15
      } else if (value / 10 < -15) {
        return -15
      }
      return value / 10
    }

    let rotateElement = rotate ? RotateRegulator(moveX) : 0

    elTrans = elementsMargin * (items - 1)
    if (element) {
      setTransform(
        element,
        undefined,
        moveX,
        moveY + elTrans,
        undefined,
        rotateElement,
      )

      element.style.opacity = opacity
    }
  })
}

//Action to update all elements on the DOM for each stacked card.
function updateUi() {
  requestAnimationFrame(function() {
    elTrans = 0
    var elZindex = 5
    var elScale = 1
    var elOpac = 1
    var elTransTop = items
    var elTransInc = elementsMargin

    for (let i = currentPosition; i < currentPosition + items; i++) {
      if (listElNodesObj[i]) {
        listElNodesObj[i].classList.add(
          'stackedcards-top',
          'stackedcards--animatable',
          'stackedcards-origin-top',
        )

        elTrans = elTransInc * elTransTop
        elTransTop--

        if (i === currentPosition) {
          removeOverlay(listElNodesObj[i])
        } else {
          createAndAppendOverlay(listElNodesObj[i])
        }

        setTransform(
          listElNodesObj[i],
          elScale,
          elTrans - elTransInc,
          undefined,
        )

        setBoxShadow(listElNodesObj[i], elTrans * 0.002)

        listElNodesObj[i].style.opacity = elOpac
        listElNodesObj[i].style.zIndex = elZindex

        elScale = elScale - scaleCardBy
        elOpac = elOpac - opacityDifferenceFactor
        elZindex--
      }
    }
  })
}

export function setStackedCards(projectName, cards) {
  const appender = R.compose(
    addCardToElement,
    createAndAddContainer,
  )()
  const elements = R.map(createCardWithContent.bind(null, projectName), cards)

  R.map(appender, elements)

  obj = document.getElementById('stacked-cards-block')
  stackedCardsObj = obj.querySelector(containerSelector)
  listElNodesObj = stackedCardsObj.children

  countElements()
  currentElement()
  listElNodesWidth = stackedCardsObj.offsetWidth
  currentElementObj = listElNodesObj[0]
  updateUi()

  //Prepare elements on DOM
  const addMargin = elementsMargin * (items - 1) + 'px'

  for (let i = items; i < maxElements; i++) {
    listElNodesObj[i].classList.add(
      'stackedcards-top',
      'stackedcards--animatable',
      'stackedcards-origin-top',
    )
  }

  elTrans = elementsMargin * (items - 1)

  stackedCardsObj.style.marginRight = addMargin

  for (let i = items; i < maxElements; i++) {
    listElNodesObj[i].style.zIndex = 0
    listElNodesObj[i].style.opacity = 0

    setTransform(listElNodesObj[i], 1 - items * scaleCardBy, undefined, elTrans)
  }

  if (listElNodesObj[currentPosition]) {
    listElNodesObj[currentPosition].classList.add('stackedcards-active')
  }

  //Remove class init
  setTimeout(function() {
    obj.classList.remove('init')
  }, 150)
}

export const cleanStackedCards = () => {
  $(StackedCardsContainer).empty()

  currentPosition = 0
  maxElements = undefined
  listElNodesObj = undefined
  listElNodesWidth = undefined
  currentElementObj = undefined
  stackedCardsObj = undefined
  isFirstTime = true
  elementHeight = undefined
  obj = undefined
  elTrans = undefined

  return
}
