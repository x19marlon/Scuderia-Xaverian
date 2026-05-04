/* ═══════════════════════════════════════════════
   SCUDERIA XAVERIAN — Main Script
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Header scroll effect ── */
  const header = document.getElementById('site-header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Hamburger menu ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ── Scroll reveal (IntersectionObserver) ── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  /* ── Team filter tabs ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const memberCards = document.querySelectorAll('.member-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active tab
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      memberCards.forEach(card => {
        if (filter === 'all' || card.dataset.team === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ── Member modal ── */
  const modal       = document.getElementById('member-modal');
  const modalClose   = document.getElementById('modal-close');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalPhoto   = document.getElementById('modal-photo');
  const modalName    = document.getElementById('modal-name');
  const modalRole    = document.getElementById('modal-role');
  const modalCareer  = document.getElementById('modal-career');
  const modalCarIcon = document.getElementById('modal-career-icon');
  const modalCarText = document.getElementById('modal-career-text');
  const modalLinks   = document.getElementById('modal-links');
  const modalBio     = document.getElementById('modal-bio');

  function openModal(card) {
    const photo = card.querySelector('.member-card__photo');
    const name  = card.querySelector('.member-card__name').textContent;

    modalPhoto.src = photo.src;
    modalPhoto.alt = name;
    modalName.textContent = name;
    modalRole.textContent = card.dataset.role || '';

    // Career
    const career = card.dataset.career || '';
    const careerIcon = card.dataset.careerIcon || '';
    if (career) {
      modalCareer.style.display = 'flex';
      modalCarText.textContent = career;
      if (careerIcon) {
        modalCarIcon.src = careerIcon;
        modalCarIcon.style.display = 'block';
      } else {
        modalCarIcon.style.display = 'none';
      }
    } else {
      modalCareer.style.display = 'none';
    }

    // Links
    modalLinks.innerHTML = '';
    const linkedin = card.dataset.linkedin;
    const email    = card.dataset.email;

    if (linkedin) {
      const a = document.createElement('a');
      a.href = linkedin;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'modal__link';
      a.innerHTML = '<img src="assets/LinkedIn_icon.svg.png" alt="LinkedIn" /> LinkedIn';
      modalLinks.appendChild(a);
    }
    if (email) {
      const a = document.createElement('a');
      a.href = 'mailto:' + email;
      a.className = 'modal__link';
      a.innerHTML = '✉ ' + email;
      modalLinks.appendChild(a);
    }

    // Bio
    const bio = card.dataset.bio || '';
    if (bio) {
      modalBio.textContent = bio;
      modalBio.style.display = 'block';
    } else {
      modalBio.style.display = 'none';
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Attach click to all member cards
  memberCards.forEach(card => {
    card.addEventListener('click', () => openModal(card));
  });

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

});
