    document.addEventListener('DOMContentLoaded', function () {
      const nav = document.getElementById('primary-nav');
      const toggle = document.querySelector('.mobile-nav-toggle');
      const hasSubs = document.querySelectorAll('.has-submenu > a');

      // Mobile menu toggle
      toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        toggle.classList.toggle('active');
        toggle.setAttribute('aria-expanded', String(isOpen));
      });

      // On mobile: toggle submenus when clicking a parent item
      function isMobile() {
        return window.innerWidth < 900;
      }

      hasSubs.forEach(link => {
        link.addEventListener('click', (e) => {
          if (isMobile()) {
            e.preventDefault();
            const parent = link.parentElement;
            const submenu = parent.querySelector('.submenu');
            const expanded = parent.classList.toggle('submenu-open');
            link.setAttribute('aria-expanded', String(expanded));
            
            if (submenu) {
              submenu.classList.toggle('open');
            }
          }
        });
      });

      // 3D Carousel Implementation
      const carouselContainer = document.querySelector('.carousel-3d');
      const carouselNav = document.getElementById('carouselNav');
      
      // Carousel data - replace with your actual images
      const carouselItems = [
        { src: 'assets/news1.png', alt: 'Actualité 1' },
        { src: 'assets/news2.png', alt: 'Actualité 2' },
        { src: 'assets/news3.png', alt: 'Actualité 3' },
      ];
      
      const totalItems = carouselItems.length;
      const angle = 360 / totalItems;
      let currentRotation = 0;
      let currentItem = 0;
      
      // Create carousel items
      carouselItems.forEach((item, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
        carouselItem.style.transform = `rotateY(${angle * index}deg) translateZ(400px)`;
        
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt;
        
        carouselItem.appendChild(img);
        carouselContainer.appendChild(carouselItem);
        
        // Create navigation dots
        const dot = document.createElement('div');
        dot.className = 'carousel-dot';
        if (index === 0) dot.classList.add('active');
        dot.dataset.index = index;
        
        dot.addEventListener('click', () => {
          goToSlide(index);
        });
        
        carouselNav.appendChild(dot);
      });
      
      function goToSlide(index) {
        currentItem = index;
        currentRotation = -angle * index;
        carouselContainer.style.transform = `rotateY(${currentRotation}deg)`;
        
        // Update active dot
        document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
      }
      
      // Auto-rotate carousel
      let autoRotate = setInterval(() => {
        currentItem = (currentItem + 1) % totalItems;
        goToSlide(currentItem);
      }, 4000);
      
      // Pause auto-rotation on hover
      carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoRotate);
      });
      
      carouselContainer.addEventListener('mouseleave', () => {
        autoRotate = setInterval(() => {
          currentItem = (currentItem + 1) % totalItems;
          goToSlide(currentItem);
        }, 4000);
      });
      
      // Initialize mobile submenu state
      if (isMobile()) {
        document.querySelectorAll('.submenu').forEach(s => s.style.display = 'none');
      }
    });