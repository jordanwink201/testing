import $ from 'jquery'
import { TweenLite } from 'gsap/TweenLite'

const setupParallax = async () => {
  $.fn.parallax = function(resistance, mouse) {
    const $el = $(this)

    TweenLite.to($el, 0.3, {
      x: -((mouse.clientX - window.innerWidth / 2) / resistance),
      y: -((mouse.clientY - window.innerHeight / 2) / resistance),
    })
  }

  const $background = $('body').find('div[id^="background-"]')

  $(document).mousemove(function(e) {
    $background.parallax(-100, e)
  })
}

export { setupParallax }
