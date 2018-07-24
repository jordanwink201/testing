import triangles from 'assets/bigcommerce/triangle-cluster.png';
import bigcommerceBg from 'assets/bigcommerce/bg.png';
import elliotBg from 'assets/elliot/bg@2x.png';

const gradients = [
  'linear-gradient(234deg, rgba(78, 26, 189, 0.8) 5%, rgba(78, 117, 248, 0.8) 22%, rgba(116, 182, 236, 0.8) 24%, rgba(255, 255, 255, 0.8) 24%)',
  'linear-gradient(to right bottom, rgba(43, 41, 53, 0.9) 50%, rgba(255, 255, 255, 0.4) 50%)',
  'linear-gradient(to right bottom, rgba(255, 255, 255, 0.4) 50%, rgba(43, 41, 53, 0.9) 50%)',
  'radial-gradient(ellipse at center, rgba(238, 241, 246, 0.6) 0%,rgba(252, 253, 253, 0.2) 100%)',
  'radial-gradient(ellipse at center, #6d0019 0%,#8f0222 56%,#a90329 100%)',
  'linear-gradient(135deg, #eef1f6 0%,#fcfdfd 100%)',
  'linear-gradient(135deg, #87e0fd 0%, #53cbf1 40%, #05abe0 100%)',
  'linear-gradient(45deg, #928dab 0%,#1f1c2c 100%)',
];

const bigcommerce = {
  background: {
    name: 'bigcommerce',
    backgroundImage: `
      url(${triangles}),
      linear-gradient(135deg, rgba(72, 61, 139, 0.9) 0%, rgba(72, 61, 139, 0.9) 100%)
    `,
    opacity: 0.8,
  },
  logo: {
    href: 'https://www.bigcommerce.com',
    name: 'bigcommerce',
  },
  cards: [
    {
      header: 'Theme Editor',
      content:
        'Style customizations can be made to the Optimized One-Page Checkout in your selected theme. The Theme Editor has an Optimized Checkout section where you can change fonts and colors, or add a logo.',
      detailContainer: {
        src: 'checkout',
        mp4: 'checkout',
      },
    },
    {
      header: 'Checkout',
      content:
        'This intuitive shopping cart design allows customers to comfortably check out on any device, without distractions. Having a persistent cart means that customers can quickly access and edit items in their cart throughout the checkout process.',
      detailContainer: {
        src: 'customizeCheckout',
        mp4: 'customizeCheckout',
      },
    },
    {
      header: 'Mobile Optimized',
      content:
        'The responsive, minimal design lets customers comfortably check out on any device, without distractions',
      detailContainer: {
        src: 'mobileCheckout',
      },
    },
  ],
};

const elliot = {
  background: {
    name: 'elliot',
    backgroundImage: `url(${elliotBg}), linear-gradient(to bottom, #eef1f6 0%, #fcfdfd 100%)`,
    opacity: 1,
  },
  logo: {
    href: 'https://www.helloiamelliot.com/',
    name: 'elliot',
  },
  cards: [
    {
      header: 'Operating System',
      content:
        'Our edge computing technology creates software orchestration across a container-based, globally distributed infrastructure.',
      detailContainer: {
        iframe: `
          <iframe src="https://player.vimeo.com/video/255844792?title=0&byline=0&portrait=0" frameBorder="0"></iframe>
          <p style="display: none;"><a href="https://vimeo.com/255844792">Elliot. Global Commerce Simplified.</a> from <a href="https://vimeo.com/user80596306">Elliot</a> on <a href="https://vimeo.com">Vimeo</a>.</p>
        `,
      },
    },
    {
      header: 'Observables',
      content:
        'This is a snippet of real (but slightly simplified for demonstration purposes) code that I refactored to use functional streams (Rx Observables) in my latest project. Allowing the codebase to become more maintable, readable, and scalable.',
      detailContainer: {
        script:
          '<script src="https://gist.github.com/jordanwink201/34296e0cbcdea8c8a902ece7cf15d96d.js"></script>',
      },
    },
    {
      header: 'API Development',
      content:
        'Built out the surrounding concerns for the new application - specs, mocking, error reporting, tracing, monitoring, etc',
      detailContainer: {
        script:
          '<script src="https://gist.github.com/jordanwink201/bce94f10f25a74b5d9965856bc588c9b.js"></script>',
      },
    },
    {
      header: 'Documentation',
      content:
        'Document and maintain engineering best practices and processes. Teach and mentor fellow engineers as necessary to adhere to high coding standards.',
      detailContainer: {
        src: 'gitbook',
      },
    },
  ],
};

const projectContent = {
  bigcommerce,
  elliot,
};

export { projectContent };
