import $ from 'jquery'
import * as R from 'ramda'

// Assets
import profileImage from 'assets/profile.png'

const ProfileContainer = $('.ProfileContainer')

// Creation
const createProfileElement = () => {
  return $(`
    <img src='${profileImage}' />

    <div class="vbox justify-center">
      <h1>Jordan Winkelman</h1>
      <h2>full stack software engineer <strong>since 2012</strong></h2>
    </div>
  `)
}

const addElementToContainer = (elem) => {
  $(elem).appendTo(ProfileContainer)

  return $(elem)
}

const setProfileContent = () => {
  return R.compose(
    addElementToContainer,
    createProfileElement,
  )()
}

// Destroyer
const cleanProfile = () => {
  return $(ProfileContainer).empty()
}

export { cleanProfile, setProfileContent }
