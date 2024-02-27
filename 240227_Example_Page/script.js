document.addEventListener('keydown', function(e) {
  if (e.keyCode == 123) {
    e.preventDefault();
    return false;
  }
});

document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

const sections = document.querySelectorAll('section');
const menuLinks = document.querySelectorAll('#menu a');
let currentIndex = 0;
let scrollingAllowed = true;

menuLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    
    if (targetId === '') {
      window.scrollTo({top: 0, behavior: 'smooth'});
    } else {
      const targetSection = document.getElementById(targetId);
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    menuLinks.forEach(item => {
      item.classList.remove('active');
    });

    if (!link.classList.contains('exclude-active')) {
      this.classList.add('active');
    } else {
      if (targetId === 'section1') {
        document.querySelector('#menu a[href="#section1"]').classList.add('active');
      }
    }

    currentIndex = Array.from(sections).findIndex(section => section.getAttribute('id') === targetId);
  });
});

document.addEventListener('wheel', (event) => {
  event.preventDefault();
  if (!scrollingAllowed) {
    return;
  }
  let deltaY = event.deltaY;
  let direction = deltaY > 0 ? 1 : -1;
  let scrollAmount = window.innerHeight * direction;
  window.scrollBy({top: scrollAmount, behavior: 'smooth'});
  disableScrolling();
});

function disableScrolling() {
  scrollingAllowed = false;
  setTimeout(() => {
    scrollingAllowed = true;
  }, 500);
}

window.addEventListener('scroll', function() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });
  menuLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});

document.getElementById('back-to-top').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
