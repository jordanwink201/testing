import * as R from 'ramda'
import $ from 'jquery'

const createSwitcherElement = (projectName) => {
  return $(`
    <div id="switcher" class="${projectName}-switcher">
      <svg height="22" width="22" viewBox="0 0 40 40">
        <g>
          <path d="m25 10l7.8 8.2c0.5 0.5 0.7 1.1 0.7 1.8s-0.2 1.3-0.7 1.7l-7.8 8.3c-1 0.9-2.4 0.9-3.4 0s-0.9-2.7 0-3.6l3.8-3.9h-17c-1.3 0-2.4-1.1-2.4-2.5s1.1-2.5 2.4-2.5h17l-3.9-3.9c-0.9-0.9-0.9-2.7 0-3.6s2.5-0.9 3.5 0z">
          </path>
        </g>
      </svg>
    </div>
  `)
}

const addElementToContainer = (elem) => {
  $(elem).appendTo($('#stacked-cards-block')).css({opacity: 0})

  return $(elem)
}

const createAndAdd = (projectName) => {
  return R.compose(
    addElementToContainer,
    createSwitcherElement,
  )(projectName)
}

const setSwitcher = (projectName, cb) => {
  const element = createAndAdd(projectName)

  element.on('click', cb)

  return element
}

export { setSwitcher }
