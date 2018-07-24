import $ from 'jquery'

import { ContentContainerSelector, assetImportMap } from './index'

const pauseSVG = `
  <div class="pauseButtonContainer">
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 45.975 45.975" style="enable-background:new 0 0 45.975 45.975;" xml:space="preserve">
    	<g>
    		<g>
    			<path d="M13.987,0c-2.762,0-5,2.239-5,5v35.975c0,2.763,2.238,5,5,5s5-2.238,5-5V5C18.987,2.238,16.75,0,13.987,0z"/>
    			<path d="M31.987,0c-2.762,0-5,2.239-5,5v35.975c0,2.762,2.238,5,5,5s5-2.238,5-5V5C36.987,2.239,34.749,0,31.987,0z"/>
    		</g>
    	</g>
    </svg>
  </div>
`

const playSVG = `
  <div class="playButtonContainer" id="play">
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 124.512 124.512" style="enable-background:new 0 0 124.512 124.512;"
    	 xml:space="preserve">
    	<g>
    		<path d="M113.956,57.006l-97.4-56.2c-4-2.3-9,0.6-9,5.2v112.5c0,4.6,5,7.5,9,5.2l97.4-56.2
    			C117.956,65.105,117.956,59.306,113.956,57.006z"/>
    	</g>
    </svg>
  </div>
`

const setGifActionOverlay = (contentContainer) => {
  if (contentContainer.is('div')) {
    return
  }

  const $video = contentContainer.first()

  const controllerContainer = $('<div class="controllerOverlay" />')
  const playButton = $(playSVG)
  const pauseButton = $(pauseSVG).addClass('is-hidden')

  controllerContainer.append(playButton)
  controllerContainer.append(pauseButton)

  controllerContainer.click(() => {
    if ($video.get(0).paused === true) {
      $video.get(0).play()
      playButton.addClass('is-hidden')
    } else {
      $video.get(0).pause()
      playButton.removeClass('is-hidden')
      pauseButton.addClass('is-hidden')
    }
  })

  controllerContainer.hover(
    () => {
      if ($video.get(0).paused !== true) {
        pauseButton.removeClass('is-hidden')
      }
    },
    () => {
      if ($video.get(0).paused !== true) {
        pauseButton.addClass('is-hidden')
      }
    },
  )

  return $('.DetailContainer').append(controllerContainer)
}

export { setGifActionOverlay }
