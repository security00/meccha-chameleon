(() => {
  const STEAM_URL = 'https://store.steampowered.com/app/4704690/MECCHA_CHAMELEON/';
  const ROUTES = [
    ['where to play', '/where-to-play/'],
    ['steam store', STEAM_URL],
    ['view on steam', STEAM_URL],
    ['buy on steam', STEAM_URL],
    ['play now', STEAM_URL],
    ['join party', '/join-friends/'],
    ['join friends', '/join-friends/'],
    ['how to play', '/beginner-guide/'],
    ['beginner guide', '/beginner-guide/'],
    ['game info', '/beginner-guide/'],
    ['guides', '/beginner-guide/'],
    ['put skills to the test', STEAM_URL],
    ['hider', '/hider-guide/'],
    ['seeker', '/seeker-guide/'],
    ['troubleshoot', '/server-not-showing/'],
    ['server status', '/server-not-showing/'],
    ['support', '/contact/'],
    ['contact us', '/contact/'],
    ['contact', '/contact/'],
    ['faq', '/faq/'],
    ['press kit', '/contact/'],
    ['privacy policy', '/privacy/'],
    ['privacy', '/privacy/'],
    ['privacy splatter', '/privacy/'],
    ['terms of service', '/terms/'],
    ['terms of play', '/terms/'],
    ['terms', '/terms/'],
    ['safety', '/terms/#download-policy'],
    ['security alerts', '/terms/#download-policy'],
    ['unofficial guide disclaimer', '/terms/#disclaimer'],
    ['database', '/faq/'],
    ['wiki', '/faq/'],
    ['home', '/'],
    ['meccha chameleon', '/'],
    ['mc', '/'],
  ];

  const normalize = (value) => (value || '').replace(/\s+/g, ' ').trim().toLowerCase();
  const routeFor = (label) => {
    const text = normalize(label).replace(/^(mail|send|shopping_cart|download|home|help_outline|security|sports_esports|shopping_bag|info|gavel|link|forum|verified)\s+/, '');
    const exact = ROUTES.find(([key]) => text === key);
    if (exact) return exact[1];
    const partial = ROUTES.find(([key]) => text.includes(key));
    return partial?.[1];
  };

  const track = (name, params = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...params });
  };

  const go = (target, sourceText) => {
    if (!target) return;
    if (target.startsWith('http')) {
      track('steam_outbound_click', { page_path: location.pathname, cta_text: sourceText });
      window.open(target, '_blank', 'noopener,noreferrer');
      return;
    }
    if (target.startsWith('#')) {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    window.location.href = target;
  };

  function hideAuthEntrypoints() {
    document.querySelectorAll('a,button').forEach((el) => {
      const text = normalize(el.textContent);
      if (['login', 'sign in', 'log in'].includes(text)) {
        el.setAttribute('hidden', '');
        el.setAttribute('aria-hidden', 'true');
        el.style.display = 'none';
      }
    });
  }

  function enhanceNavigation() {
    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('a,button');
      if (!trigger) return;
      const text = trigger.textContent || trigger.getAttribute('aria-label') || '';
      const href = trigger.getAttribute('href');

      if (href && href !== '#') {
        if (href.startsWith('http') && href.includes('store.steampowered.com')) {
          track('steam_outbound_click', { page_path: location.pathname, cta_text: text.trim() });
        }
        return;
      }

      const target = routeFor(text);
      if (!target) return;
      event.preventDefault();
      go(target, text.trim());
    });

    document.querySelectorAll('a[href="#"]').forEach((link) => {
      const target = routeFor(link.textContent || '');
      if (target) {
        link.setAttribute('href', target);
        if (target.startsWith('http')) {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        }
      }
    });
  }

  function enhanceMobileMenu() {
    const menuButtons = [...document.querySelectorAll('button')].filter((button) => normalize(button.textContent).includes('menu'));
    if (!menuButtons.length) return;

    const overlay = document.createElement('div');
    overlay.className = 'mc-mobile-menu';
    overlay.innerHTML = `
      <div class="mc-mobile-menu__panel" role="dialog" aria-modal="true" aria-label="Site navigation">
        <button class="mc-mobile-menu__close" type="button" aria-label="Close menu">×</button>
        <a href="/">Home</a>
        <a href="/where-to-play/">Steam Store</a>
        <a href="/beginner-guide/">Beginner Guide</a>
        <a href="/join-friends/">Join Friends</a>
        <a href="/server-not-showing/">Troubleshooting</a>
        <a href="/hider-guide/">Hider Guide</a>
        <a href="/seeker-guide/">Seeker Guide</a>
        <a href="/faq/">FAQ</a>
        <a href="/contact/">Contact</a>
      </div>`;
    document.body.appendChild(overlay);

    const open = () => {
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      overlay.querySelector('a,button')?.focus();
    };
    const close = () => {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    };
    menuButtons.forEach((button) => button.addEventListener('click', (event) => {
      event.preventDefault();
      open();
    }));
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay || event.target.closest('.mc-mobile-menu__close')) close();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close();
    });
  }

  function enhanceContactForm() {
    const form = document.querySelector('form');
    if (!form || !location.pathname.includes('/contact')) return;
    let status = form.querySelector('[data-form-status]');
    if (!status) {
      status = document.createElement('p');
      status.setAttribute('data-form-status', '');
      status.setAttribute('role', 'status');
      status.style.marginTop = '1rem';
      form.appendChild(status);
    }
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = form.querySelector('#name')?.value.trim();
      const email = form.querySelector('#email')?.value.trim();
      const message = form.querySelector('#message')?.value.trim();
      const subjectSelect = form.querySelector('select');
      const subject = subjectSelect?.value || 'Meccha Chameleon guide contact';
      if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) {
        status.textContent = 'Please add your name, a valid email, and a short message.';
        status.style.color = '#ffb4ab';
        track('contact_validation_error', { page_path: location.pathname });
        return;
      }
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      const mailto = `mailto:hello@mecchachameleon.guide?subject=${encodeURIComponent(subject)}&body=${body}`;
      status.textContent = 'Opening your email app with this message. No personal data is stored on this site.';
      status.style.color = '#5dd9d0';
      track('contact_mailto_open', { page_path: location.pathname });
      window.location.href = mailto;
    });
  }

  function enhanceTermsSearch() {
    const search = document.querySelector('input[placeholder*="Search"]');
    if (!search) return;
    const sections = [...document.querySelectorAll('section[id], article[id], div[id]')].filter((el) => el.id && el.innerText.length > 80);
    search.addEventListener('input', () => {
      const query = normalize(search.value);
      sections.forEach((section) => {
        section.style.display = !query || normalize(section.innerText).includes(query) ? '' : 'none';
      });
      track('terms_search', { page_path: location.pathname, has_query: Boolean(query) });
    });
  }

  function enhanceFaq() {
    if (!location.pathname.includes('/faq')) return;
    const candidates = [...document.querySelectorAll('main h2, main h3, main h4')].filter((h) => h.textContent?.trim().endsWith('?'));
    candidates.forEach((heading) => {
      heading.tabIndex = 0;
      heading.setAttribute('role', 'button');
      heading.setAttribute('aria-expanded', 'true');
      heading.style.cursor = 'pointer';
      const toggle = () => {
        let sib = heading.nextElementSibling;
        const expanded = heading.getAttribute('aria-expanded') !== 'false';
        while (sib && !/^H[234]$/.test(sib.tagName)) {
          sib.style.display = expanded ? 'none' : '';
          sib = sib.nextElementSibling;
        }
        heading.setAttribute('aria-expanded', String(!expanded));
        track('faq_toggle', { question: heading.textContent?.trim(), expanded: !expanded });
      };
      heading.addEventListener('click', toggle);
      heading.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggle();
        }
      });
    });
  }

  hideAuthEntrypoints();
  enhanceNavigation();
  enhanceMobileMenu();
  enhanceContactForm();
  enhanceTermsSearch();
  enhanceFaq();
})();
