const track = document.getElementById("projectsTrack");

const prevButton = document.getElementById("prevProject");

const nextButton = document.getElementById("nextProject");

const cards = document.querySelectorAll(".project-card");

let currentPosition = 0;


/* ==========================================
   QUANTIDADE DE PROJETOS VISÍVEIS
========================================== */

function getVisibleCards() {

    if (window.innerWidth <= 700) {

        return 1;

    }

    if (window.innerWidth <= 1050) {

        return 2;

    }

    return 3;

}


/* ==========================================
   ATUALIZAR CARROSSEL
========================================== */

function updateCarousel() {

    const visibleCards = getVisibleCards();

    const maxPosition =
        cards.length - visibleCards;


    if (currentPosition < 0) {

        currentPosition = 0;

    }


    if (currentPosition > maxPosition) {

        currentPosition = maxPosition;

    }


    const cardWidth =
        cards[0].offsetWidth;


    const gap = 24;


    const movement =
        (cardWidth + gap) * currentPosition;


    track.style.transform =
        `translateX(-${movement}px)`;


    prevButton.disabled =
        currentPosition === 0;


    nextButton.disabled =
        currentPosition === maxPosition;

}


/* ==========================================
   PRÓXIMO
========================================== */

nextButton.addEventListener(
    "click",
    function () {

        currentPosition++;

        updateCarousel();

    }
);


/* ==========================================
   ANTERIOR
========================================== */

prevButton.addEventListener(
    "click",
    function () {

        currentPosition--;

        updateCarousel();

    }
);


/* ==========================================
   REDIMENSIONAMENTO
========================================== */

window.addEventListener(
    "resize",
    function () {

        updateCarousel();

    }
);


/* ==========================================
   INICIALIZAÇÃO
========================================== */

updateCarousel();