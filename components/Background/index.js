import * as R from 'ramda';
import $ from 'jquery';

const container = '.flex-container';
const stylesheetID = 'background-style';

const setBackgroundElement = ({ backgroundImage, name, opacity = 1 }) => {
  $(`${container}`).attr('id', `background-${name}`);

  $(`<style id='${stylesheetID}'>
      #background-${name} { background-image: ${backgroundImage}; opacity: ${opacity}; }
    </style>`).appendTo('head');
};

const createAndAdd = (obj) => {
  return R.compose(setBackgroundElement)(obj);
};

const cleanBackground = () => {
  $(`${container}`).attr('id', '');

  $(`#${stylesheetID}`).remove();
};

const setBackgroundContent = (backgroundObj) => {
  return createAndAdd(backgroundObj);
};

export { cleanBackground, setBackgroundContent };
