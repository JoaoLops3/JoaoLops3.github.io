// Função que exibe a tela
function exibirTela() {
    // Cria um elemento div para a tela
    var tela = document.createElement("div");
    tela.style.position = "fixed";
    tela.style.top = "50%";
    tela.style.left = "50%";
    tela.style.transform = "translate(-50%, -50%)";
    tela.style.backgroundColor = "#009da8"; // Definindo a cor de fundo
    tela.style.color = "white"; // Definindo a cor do texto como branco para melhor contraste
    tela.style.padding = "20px";
    tela.style.border = "5px solid #009da8"; // Adicionando uma borda da mesma cor
    tela.style.borderRadius = "10px"; // Adicionando um pouco de arredondamento nos cantos
    tela.style.zIndex = "9999";
    tela.style.boxShadow = "0px 0px 15px 0px rgba(0,0,0,0.75)"; // Adicionando a sombra
    tela.textContent = "Olá, Não fume! Os riscos para a sua saúde podem ser devastadores!";
  
    // Adiciona a tela ao body
    document.body.appendChild(tela);
  
    // Depois de 10 segundos, remove a tela
    setTimeout(function() {
      document.body.removeChild(tela);
    }, 10000);
  }
  
  // Exibe a tela 3 minutos após a página carregar
  window.addEventListener("load", function() {
    setTimeout(exibirTela, 0); // 3 minutos = 180000 milissegundos
  });

  document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  
    if ("IntersectionObserver" in window) {
      let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            let lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove("lazy");
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });
  
      lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });
    } else {
      // Fallback para navegadores antigos
      var lazyLoad = function() {
        if (active === false) {
          active = true;
  
          setTimeout(function() {
            lazyImages.forEach(function(lazyImage) {
              if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.classList.remove("lazy");
  
                lazyImages = lazyImages.filter(function(image) {
                  return image !== lazyImage;
                });
  
                if (lazyImages.length === 0) {
                  document.removeEventListener("scroll", lazyLoad);
                  window.removeEventListener("resize", lazyLoad);
                  window.removeEventListener("orientationChange", lazyLoad);
                }
              }
            });
  
            active = false;
          }, 200);
        }
      };
  
      document.addEventListener("scroll", lazyLoad);
      window.addEventListener("resize", lazyLoad);
      window.addEventListener("orientationChange", lazyLoad);
    }
  });