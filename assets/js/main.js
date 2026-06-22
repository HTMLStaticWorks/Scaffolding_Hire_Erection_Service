document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================
     THEME TOGGLE
  ========================================== */
  const themeToggles = document.querySelectorAll('.theme-toggle');
  
  // Check local storage or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcons('dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    updateThemeIcons('light');
  }

  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcons(newTheme);
    });
  });

  function updateThemeIcons(theme) {
    themeToggles.forEach(toggle => {
      if (theme === 'dark') {
        toggle.innerHTML = '<i class="ph ph-sun"></i>';
      } else {
        toggle.innerHTML = '<i class="ph ph-moon"></i>';
      }
    });
  }

  /* ==========================================
     RTL TOGGLE
  ========================================== */
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  
  const savedRtl = localStorage.getItem('rtl');
  if (savedRtl === 'true') {
    document.documentElement.setAttribute('dir', 'rtl');
  }

  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      if (isRtl) {
        document.documentElement.removeAttribute('dir');
        localStorage.setItem('rtl', 'false');
      } else {
        document.documentElement.setAttribute('dir', 'rtl');
        localStorage.setItem('rtl', 'true');
      }
    });
  });

  /* ==========================================
     MOBILE DRAWER
  ========================================== */
  const hamburger = document.querySelector('.hamburger');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerClose = document.querySelector('.drawer-close');
  const drawerOverlay = document.querySelector('.drawer-overlay');

  if (hamburger && mobileDrawer) {
    const openDrawer = () => {
      mobileDrawer.classList.add('active');
      drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      mobileDrawer.classList.remove('active');
      drawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', openDrawer);
    drawerClose.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);
  }

  /* ==========================================
     FORM VALIDATION
  ========================================== */
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent reload
      let isValid = true;
      
      const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
      
      inputs.forEach(input => {
        const group = input.closest('.form-group') || input.closest('.checkbox-group');
        const errorMsg = group.querySelector('.error-msg');
        
        // Reset state
        input.classList.remove('error');
        group.classList.remove('has-error');
        
        let valid = true;
        let msg = 'This field is required';

        if (input.type === 'checkbox') {
          if (!input.checked) {
            valid = false;
            msg = 'You must accept to continue';
          }
        } else if (!input.value.trim()) {
          valid = false;
        } else if (input.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value)) {
            valid = false;
            msg = 'Enter a valid email address';
          }
        } else if (input.type === 'password' && input.name === 'password') {
          if (input.value.length < 8) {
            valid = false;
            msg = 'Password must be at least 8 characters';
          }
        } else if (input.type === 'password' && input.name === 'confirm_password') {
          const pass = form.querySelector('input[name="password"]');
          if (pass && input.value !== pass.value) {
            valid = false;
            msg = 'Passwords do not match';
          }
        }

        if (!valid) {
          isValid = false;
          input.classList.add('error');
          group.classList.add('has-error');
          if (errorMsg) errorMsg.textContent = msg;
        } else {
          input.classList.add('success');
        }
      });

      if (isValid) {
        // Show inline success message
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="ph ph-check-circle"></i> Success';
        submitBtn.classList.add('btn-success'); // Custom style if needed
        submitBtn.style.backgroundColor = 'var(--color-success)';
        submitBtn.style.borderColor = 'var(--color-success)';
        submitBtn.style.color = '#fff';
        
        setTimeout(() => {
          form.reset();
          inputs.forEach(i => i.classList.remove('success'));
          submitBtn.innerHTML = originalText;
          submitBtn.style = '';
        }, 3000);
      }
    });
  });

  /* ==========================================
     NAVBAR SCROLL EFFECT
  ========================================== */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.style.boxShadow = 'var(--shadow)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    });
  }
  /* ==========================================
     BACK TO TOP BUTTON
  ========================================== */
  const backToTop = document.createElement('button');
  backToTop.id = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = '<i class="ph ph-arrow-up"></i>';
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
