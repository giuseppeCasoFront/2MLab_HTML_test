(function() {
  const templates = [
    {path: 'templates/start/start.html'},
    {path: 'templates/about/about.html'}
  ]

  // DEFINE ELEMENTS
  const main = document.querySelector('#main')
  let sentinels = []

  // CREATE TEMPLATE SECTION
  createTemplateDOM = async () => {
    for (template of templates) {
      let response = await fetch(template.path)
      let html = await response.text()
      main.insertAdjacentHTML('beforeend', html);
      sentinels = document.querySelectorAll('.sentinel')
    }
  }

  // DECETC INVIEW ELEMENT : 50%
  const isInViewport = (elem) => {
    const bounding = elem.getBoundingClientRect();
      return (
          bounding.top >= 0 &&
          bounding.top <= (window.innerHeight / 2 || document.documentElement.clientHeight / 2)
      );
  };

  // FIRE EVENT
  main.addEventListener('scroll', function (event) {
    if (sentinels.length > 0) {
      for (const sentinel of sentinels) {
        if (isInViewport(sentinel)) {
          sentinel.classList.add('animated--isOn')

          const animatedElements = sentinel.querySelectorAll('.animated')
          for (const el of animatedElements) {
            console.log(el)
            el.dataset.delay ? el.querySelector('.animated__el').style.transitionDelay = `${parseFloat(el.dataset.delay)}s` : null
            el.dataset.timing ? el.querySelector('.animated__el').style.transitionDuration = `${parseFloat(el.dataset.timing)}s` : el.querySelector('.animated__el').style.transitionDuration = '.5s'
          }
        }
      }
    }
  })

  createTemplateDOM()
}())
