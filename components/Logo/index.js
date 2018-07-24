import $ from 'jquery'
import * as R from 'ramda'

import bigcommerceLogo from 'assets/bigcommerce/logo.png'
import elliotLogo from 'assets/elliot/logo.png'

const logoImportMap = {
  bigcommerce: bigcommerceLogo,
  elliot: elliotLogo,
}

const LogoContainer = $('.LogoContainer')

// Creation
const createLogoElement = (name, href) => {
  return $(`
    <a href="${href}" target="_new">
      <img src="${logoImportMap[name]}" alt="${name} logo" />
    </a>
  `)
}

const addElementToContainer = (elem) => {
  $(elem).appendTo(LogoContainer)

  return $(elem)
}

const setLogoContent = ({ name, href }) => {
  R.compose(
    addElementToContainer,
    createLogoElement,
  )(name, href)
}

// Destroyer
const cleanLogo = () => {
  return $(LogoContainer).empty()
}

export { cleanLogo, setLogoContent }
