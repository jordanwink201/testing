export const createAndAppendOverlay = (element) => {
  $(element).append('<div class="card-overlay"></div>');
};

export const removeOverlay = (element) => {
  $(element)
    .find('.card-overlay')
    .remove();
};
