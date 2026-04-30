// OVERLAY
function openOverlay(title, date, desc, badges, imgSrc) {
  const overlay = document.getElementById('overlay');

  document.getElementById('overlay-title').innerText = title;
  document.getElementById('overlay-date').innerText = date;
  document.getElementById('overlay-desc').innerHTML = desc;

  const imgDiv = document.getElementById('overlay-img');
  if (imgSrc) {
    imgDiv.style.backgroundImage = `url(${imgSrc})`;
    imgDiv.style.display = 'block';
  } else {
    imgDiv.style.display = 'none';
  }

  const badgeContainer = document.getElementById('overlay-badges');
  badgeContainer.innerHTML = '';
  if (badges && badges.length > 0) {
    badges.forEach(tech => {
      const span = document.createElement('span');
      span.classList.add('badge');
      span.innerText = tech;
      badgeContainer.appendChild(span);
    });
  }

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeOverlay(event, forceClose = false) {
  if (forceClose || event.target.id === 'overlay') {
    document.getElementById('overlay').classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

document.addEventListener('DOMContentLoaded', () => {

  // FILTRE SKILLS
  const skillButtons = document.querySelectorAll('.filter-btn');
  const rows = document.querySelectorAll('.skills-row');

  skillButtons.forEach(button => {
    button.addEventListener('click', () => {
      skillButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');
      rows.forEach(row => {
        const category = row.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === category) {
          row.classList.remove('hidden');
        } else {
          row.classList.add('hidden');
        }
      });
    });
  });

  // FILTRE PROJETS
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      document.querySelector('.filter-btn.active')?.classList.remove('active');
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.classList.contains(filterValue)) {
          card.classList.remove('hide');
          card.classList.add('show');
        } else {
          card.classList.remove('show');
          card.classList.add('hide');
        }
      });
    });
  });

  // TELECHARGEMENT CV
  const cvBtn = document.getElementById('downloadCV');
  if (cvBtn) {
    cvBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const fileUrl = this.getAttribute('href');
      const fileName = 'Yasmine_Saeed_Ismail_CV.pdf';
      fetch(fileUrl)
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        })
        .catch(() => alert('Erreur lors du téléchargement du fichier.'));
    });
  }

  // BURGER MENU
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (burgerBtn && mobileMenu) {
    function openMenu() {
      mobileMenu.classList.add('open');
      burgerBtn.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      mobileMenu.classList.remove('open');
      burgerBtn.classList.remove('open');
      document.body.style.overflow = 'auto';
    }
    burgerBtn.addEventListener('click', openMenu);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);
    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
  }

});