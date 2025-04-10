    // Vacio Decoracion
    const vacioDecoracion = document.querySelector('.vacio_decoracion');
    const divActividades = document.querySelector('.div_actividades'); // solo una vez

    if (vacioDecoracion && divActividades) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            vacioDecoracion.style.backgroundColor = "rgb(78, 244, 1)";
            vacioDecoracion.style.height = "100vh";
        } else {
            vacioDecoracion.style.backgroundColor = "rgba(21, 3, 55, 0.998)";
            vacioDecoracion.style.height = "50vh";
        }
        });
    }, { threshold: 0.5 });

    observer.observe(divActividades);
    } else {
    console.warn("Elemento vacio_decoracion o div_actividades no encontrado.");
    }

    // Footer oculto al scrollear
    let lastScrollTop = 0;
    const footer = document.querySelector("footer");

    if (footer) {
    window.addEventListener("scroll", function () {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
        footer.style.transform = "translateY(100%)"; // ocultar
        } else {
        footer.style.transform = "translateY(0)"; // mostrar
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    } else {
    console.warn("Footer no encontrado.");
    }

    // Menú vertical con toggle
    function toggleContent(id) {
    let allContents = document.querySelectorAll('.content');

    allContents.forEach(div => {
        if (div.id === id) {
        let isHidden = getComputedStyle(div).display === 'none';
        div.style.display = isHidden ? 'block' : 'none';
        } else {
        div.style.display = 'none';
        }
    });
    }
