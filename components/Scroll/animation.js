import $ from 'jquery';
import { TimelineMax } from 'gsap/TimelineMax';
import { Expo } from 'gsap/TweenMax';

const startScrolling = (repeat, container) => {
  const timeline = new TimelineMax({
    repeat: repeat,
    repeatDelay: 0.9,
    onComplete: () => stopScrolling(timeline, container),
  });

  return Promise.resolve(container.fadeIn()).then(() => {
    const ScrollElement = container.find('#scroll');
    const WheelElement = container.find('#wheel');

    return timeline
      .to(ScrollElement, 0.3, { y: 10 })
      .to(ScrollElement, 0.2, { opacity: 0 }, 0.2)
      .to(ScrollElement, 0.5, { y: 0 })
      .to(ScrollElement, 0.3, { opacity: 1 });
  });
};

const stopScrolling = (timeline, container) => {
  return Promise.resolve(container.fadeOut()).then(() => {
    return timeline.kill();
  });
};

export { startScrolling };
