/*Артём*/
// ! Video Slider Script
// Global Constants
const adaptiveVideosSlider = document.querySelector('.adaptive-videos-slider')
const vsCardsWrapper = adaptiveVideosSlider.querySelector('.vs-cards-wrapper')
const vsCards = vsCardsWrapper.querySelectorAll('.vs-card')
const vsPaginationBullets = adaptiveVideosSlider.querySelectorAll(
  '.vs-pagination-bullet'
)
const vsPrevBtn = adaptiveVideosSlider.querySelector('.vs-prev-btn')
const vsNextBtn = adaptiveVideosSlider.querySelector('.vs-next-btn')

// Cards Moving
function moveVsCards() {
  vsCardsWrapper.style.transform = `translateX(-${
    currentVsCard * (100 / vsCards.length)
  }%)`
  vsPaginationBullets.forEach((bullet, index) => {
    bullet.classList.remove('active')
    if (index === currentVsCard) {
      bullet.classList.add('active')
    }
  })
}

let currentVsCard = 0

vsPrevBtn.addEventListener('click', () => {
  vsBulletsCount()
  if (currentVsCard > 0) {
    currentVsCard--
    moveVsCards()
  } else if ((currentVsCard = -1)) {
    currentVsCard = vsCards.length - vsCardsInRow
    moveVsCards()
  }
})

vsNextBtn.addEventListener('click', () => {
  vsBulletsCount()
  if (currentVsCard < vsCards.length - vsCardsInRow) {
    currentVsCard++
    moveVsCards()
  } else {
    currentVsCard = 0
    moveVsCards()
  }
})

vsPaginationBullets.forEach((bullet, index) => {
  bullet.addEventListener('click', () => {
    currentVsCard = index
    moveVsCards()
  })
})

// Change Рagination
let vsBullet5 = document.getElementById('vs-bullet-5')
let vsBullet6 = document.getElementById('vs-bullet-6')


function vsBulletsCount() {
  if (window.innerWidth < 1000) {
    vsCardsInRow = 1
    vsBullet5.hidden = false
    vsBullet6.hidden = false
  } else if (window.innerWidth < 1360) {
    vsCardsInRow = 2
    vsBullet5.hidden = false
    vsBullet6.hidden = true
  } else {
    vsCardsInRow = 3
    vsBullet5.hidden = true
    vsBullet6.hidden = true
  }
}

// Swiper Slider
function handleGesture() {
  if (xTouchEnd <= xTouchStart) {
    vsBulletsCount()
    if (currentVsCard < vsCards.length - vsCardsInRow) {
      currentVsCard++
      moveVsCards()
    } else {
      currentVsCard = 0
      moveVsCards()
    }
  }

  if (xTouchEnd >= xTouchStart) {
    vsBulletsCount()
    if (currentVsCard > 0) {
      currentVsCard--
      moveVsCards()
    } else if ((currentVsCard = -1)) {
      currentVsCard = vsCards.length - vsCardsInRow
      moveVsCards()
    }
  }
}

let xTouchStart = 0
let xTouchEnd = 0

vsCardsWrapper.addEventListener('touchstart', (e) => {
  xTouchStart = e.touches[0].clientX
})

vsCardsWrapper.addEventListener('touchend', (e) => {
  xTouchEnd = e.changedTouches[0].clientX
  handleGesture()
})
var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: true,
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints:{
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
    },
  });