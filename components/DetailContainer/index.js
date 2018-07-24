import $ from 'jquery'
import * as R from 'ramda'
import postscribe from 'postscribe'

// Responsive Bigcommerce Assets
import checkout_png_lg2 from 'assets/bigcommerce/checkout/checkout-lg@2x.png'
import checkout_png_lg from 'assets/bigcommerce/checkout/checkout-lg@1x.png'
import checkout_png_md from 'assets/bigcommerce/checkout/checkout-md@1x.png'
import checkout_png_sm from 'assets/bigcommerce/checkout/checkout-sm@1x.png'

import checkout_mp4_lg from 'assets/bigcommerce/checkout/checkout-lg@1x.mp4'
import checkout_mp4_md from 'assets/bigcommerce/checkout/checkout-md@1x.mp4'
import checkout_mp4_sm from 'assets/bigcommerce/checkout/checkout-sm@1x.mp4'

import customizeCheckout_png_lg2 from 'assets/bigcommerce/checkout/customizeCheckout-lg@2x.png'
import customizeCheckout_png_lg from 'assets/bigcommerce/checkout/customizeCheckout-lg@1x.png'
import customizeCheckout_png_md from 'assets/bigcommerce/checkout/customizeCheckout-md@1x.png'
import customizeCheckout_png_sm from 'assets/bigcommerce/checkout/customizeCheckout-sm@1x.png'

import customizeCheckout_mp4_lg from 'assets/bigcommerce/checkout/customizeCheckout-lg@1x.mp4'
import customizeCheckout_mp4_md from 'assets/bigcommerce/checkout/customizeCheckout-md@1x.mp4'
import customizeCheckout_mp4_sm from 'assets/bigcommerce/checkout/customizeCheckout-sm@1x.mp4'

import mobileCheckout_png_lg2 from 'assets/bigcommerce/checkout/mobileCheckout-lg@2x.png'
import mobileCheckout_png_lg from 'assets/bigcommerce/checkout/mobileCheckout-lg@1x.png'
import mobileCheckout_png_md from 'assets/bigcommerce/checkout/mobileCheckout-md@1x.png'
import mobileCheckout_png_sm from 'assets/bigcommerce/checkout/mobileCheckout-sm@1x.png'

// Responsive Elliot Assets
import gitbook_png_lg2 from 'assets/elliot/gitbook-lg@2x.png'
import gitbook_png_lg from 'assets/elliot/gitbook-lg@1x.png'
import gitbook_png_md from 'assets/elliot/gitbook-md@1x.png'
import gitbook_png_sm from 'assets/elliot/gitbook-sm@1x.png'

export const assetImportMap = {
  gitbook_png_lg2,
  gitbook_png_lg,
  gitbook_png_md,
  gitbook_png_sm,

  checkout_png_lg2,
  checkout_png_lg,
  checkout_png_md,
  checkout_png_sm,

  checkout_mp4_lg,
  checkout_mp4_md,
  checkout_mp4_sm,

  customizeCheckout_png_lg2,
  customizeCheckout_png_lg,
  customizeCheckout_png_md,
  customizeCheckout_png_sm,

  customizeCheckout_mp4_lg,
  customizeCheckout_mp4_md,
  customizeCheckout_mp4_sm,

  mobileCheckout_png_lg2,
  mobileCheckout_png_lg,
  mobileCheckout_png_md,
  mobileCheckout_png_sm,
}

export const DetailContainer = $('.DetailContainer')
export const ContentContainerSelector = 'contentContainer'

const getResponsiveMov = (src) => {
  const mp4_lg = assetImportMap[`${src}_mp4_lg`]
  const mp4_md = assetImportMap[`${src}_mp4_md`]
  const mp4_sm = assetImportMap[`${src}_mp4_sm`]

  return `
    <video loop>
       <source src="${mp4_lg}" type="video/mp4" media="all and (min-width:1024w)">
       <source src="${mp4_md}" type="video/mp4" media="all and (min-width:640w)">
       <source src="${mp4_sm}" type="video/mp4">
    </video>
  `
}

const getResponsiveImage = (src) => {
  const png_lg2 = assetImportMap[`${src}_png_lg2`]
  const png_lg = assetImportMap[`${src}_png_lg`]
  const png_md = assetImportMap[`${src}_png_md`]
  const png_sm = assetImportMap[`${src}_png_sm`]

  return `
    <img srcset="${png_lg2} 2048w, ${png_lg} 1024w, ${png_md} 640w, ${png_sm} 320w"
       sizes="(min-width: 991px) 50vw, (min-width: 768px) 52vw, 80vw"
       src="${png_sm}"
       alt="${src}"
    />
  `
}

// Creation
const createImageDetailContent = (projectName, src) => {
  return $(`
    <div class="${ContentContainerSelector} ${projectName}">
      ${getResponsiveImage(src)}
    </div>
  `)
}

const createMp4DetailContent = (projectName, src) => {
  return $(`${getResponsiveMov(src)}`)
}

const createIframeDetailContent = (projectName, iframe) => {
  return $(`
    <div class="${ContentContainerSelector} ${projectName}">
      ${iframe}
    </div>
  `)
}

const createScriptDetailContent = (projectName) => {
  return $(`
    <div class="contentContainerScript ${projectName}"></div>
  `)
}

const addScriptToContainer = (script, elem) => {
  postscribe(elem, script)

  return elem
}

const addElementToContainer = (elem) => {
  $(elem)
    .appendTo(DetailContainer)
    .hide()
    .fadeIn(600)

  return $(elem)
}

const setDetailContent = (projectName, detailContainer) => {
  const iframe = detailContainer.iframe
  const src = detailContainer.src
  const mp4 = detailContainer.mp4
  const script = detailContainer.script

  if (src && !mp4) {
    return R.compose(
      addElementToContainer,
      createImageDetailContent.bind(null, projectName),
    )(src)
  } else if (mp4) {
    return R.compose(
      addElementToContainer,
      createMp4DetailContent.bind(null, projectName),
    )(src)
  } else if (iframe) {
    return R.compose(
      addElementToContainer,
      createIframeDetailContent.bind(null, projectName),
    )(iframe)
  } else if (script) {
    return R.compose(
      addScriptToContainer.bind(null, script),
      addElementToContainer,
      createScriptDetailContent.bind(null, projectName),
    )(iframe)
  }
}

// Destroyer
const cleanDetailContent = () => {
  return $(DetailContainer).empty()
}

export { setDetailContent, cleanDetailContent }
