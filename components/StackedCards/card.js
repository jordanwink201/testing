import * as R from 'ramda'
import $ from 'jquery'

export const StackedCardsContainer = $('.StackedCardsContainer')

// Create Container
const createContainerElement = () => {
  return $(`
    <div id="stacked-cards-block" class="stackedcards stackedcards--animatable init">
      <div class="stackedcards-container"></div>
    </div>
  `)
}

const addContainer = (selector) => (elem) => {
  $(selector).append(elem)

  return $(elem)
}

const addElementToContainer = (elem) => {
  $('.StackedCardsContainer').prepend(elem)

  return $(elem)
}

export const createAndAddContainer = () => {
  return R.compose(
    addElementToContainer,
    createContainerElement,
  )()
}

// Create cards
export const createCardWithContent = (projectName, { header, content }) => {
  return $(`
      <div class="card-item card-item-${projectName}">
        <h1 class="card-item-header">${header}</h1>
        <p class="card-item-content">${content}</p>
      </div>
    `)
}

export const addCardToElement = (element) => (el) => {
  $(element)
    .find('.stackedcards-container')
    .append(el)

  return $(el)
}
