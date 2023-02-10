(function () {
/*-----------------CABECERA-----------------*/
const customSelect = document.querySelector(".cabecera__langselect");
const selectedOption = customSelect.querySelector(".langselect__selected");
const options = customSelect.querySelector(".langselect__options");

const nav = document.querySelector("[data-cabecera-nav]");
const botonNav = document.querySelector("[data-cabecera-boton]");
const navLinks = document.querySelectorAll('[data-cabecera-nav] a');
const sections = document.querySelectorAll('section');
let menuVisible = false;

navLinks.forEach(link => link.addEventListener('click', (event) => {
    event.preventDefault();
    seleccionar();
    const section = document.querySelector(event.target.getAttribute("href"));
    desplazamiento(section.offsetTop);
}));

botonNav.addEventListener("click", () => {
    if (menuVisible) {
        nav.classList.remove("mostrar");
        menuVisible = false;
    } else {
        nav.classList.add("mostrar");
        menuVisible = true;
        if (options.classList.contains("options--show")) {
            options.classList.remove("options--show");
        }
    }
});

function seleccionar() {
    nav.classList.remove("mostrar");
    menuVisible = false;
}

function desplazamiento(offsetTop) {
    window.scrollTo({
        top: offsetTop - 67.6,
        behavior: "smooth"
    });
}

function getCurrentScrollPosition() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

function activar() {
    const currentPosition = getCurrentScrollPosition();

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (currentPosition >= sectionTop - 200 && currentPosition < sectionBottom) {
            navLinks.forEach((link) => {
                link.classList.remove('activo');
            });
            navLinks[index].classList.add('activo');
        }
    });
}

document.addEventListener('scroll', activar);

/*cambio de idioma*/
selectedOption.addEventListener("click", () => {
    //   options.style.display = options.style.display === "block" ? "none" : "block";
    options.classList.toggle("options--show");
    if (menuVisible) {
        nav.classList.remove("mostrar");
        menuVisible = false;
    }
});

options.addEventListener("click", async (event) => {
    const selectedValue = event.target.closest("li").dataset.value;
    selectedOption.innerHTML = event.target.closest("li").innerHTML;
    //   options.style.display = "none";
    options.classList.remove("options--show");

    const languageData = await fetch("/assets/languages.json")
        .then((res) => res.json())
        .then((data) => data[selectedValue]);

    document.querySelectorAll("[data-lang]").forEach((el) => {
        const key = el.getAttribute("data-lang");
        el.textContent = languageData[key];
    });
});

/*-----------------CUERPO-----------------*/
const addClassOnIntersect = (className) => (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add(className);
      observer.unobserve(entry.target);
    }
  });
};

/*Animación sección CURRICULUM*/
const observerDer = new IntersectionObserver(addClassOnIntersect("der-mov"));
const elementsDer = document.querySelectorAll(".der");
elementsDer.forEach(element => {
  observerDer.observe(element);
});

const observerIzq = new IntersectionObserver(addClassOnIntersect("izq-mov"));
const elementsIzq = document.querySelectorAll(".izq");
elementsIzq.forEach(element => {
  observerIzq.observe(element);
});


/*Animación sección SKILLS*/
let habilidades = document.getElementsByClassName("progreso");
const observerTecs = new Array(12);
for (let i = 0; i < 12; i++) {
  observerTecs[i] = new IntersectionObserver(addClassOnIntersect(`hab-${i}`));
  observerTecs[i].observe(habilidades[i]);
}


/*Animación sección PORTFOLIO*/
const observerProyectos = new IntersectionObserver(addClassOnIntersect("proyecto--animacion"));
const proyectos = document.querySelectorAll(".galeria__proyecto");
proyectos.forEach(element => {
  observerProyectos.observe(element);
});


/*-----------------FOOTER-----------------*/
const redes = document.querySelector("[data-footer-redes]");

function getCurrentScrollPosition() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

function redesResponsive(){
    if (window.innerWidth < 1334) {
        redes.classList.remove("fixedPosition");
        redes.classList.remove("desplazar");
    }
}
redesResponsive();
window.addEventListener('resize', redesResponsive);

document.addEventListener('scroll', moverRedes);

function moverRedes() {
    if (window.innerWidth >= 1334) {
        const currentPosition = getCurrentScrollPosition() + window.innerHeight - 39;
        const footerPosition = document.querySelector("[data-footer]").offsetTop;

        if (currentPosition > footerPosition) {
            redes.classList.remove("fixedPosition");
            redes.classList.add("desplazar");
        }else{
            redes.classList.add("fixedPosition");
            redes.classList.remove("desplazar");
        }
    }
}

const flecha = document.querySelector("[data-fotter-flecha]");
let bottom = 13;

setInterval(() => {
  bottom -= 0.2;
  flecha.style.top = `${bottom}px`;

  if (bottom <= 0) {
    bottom = 13;
  }
}, 16);



/*-----------------FOOTER-----------------*/
setTimeout(function() {
    document.querySelectorAll(".hide").forEach(section => section.classList.remove("hide"));
  }, 3500);

})();