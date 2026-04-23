(function() {
    // ----- TYPING MULTIPLE ROLES -----
    const roles = ["Software Engineer", "Frontend Developer", "BackEnd Developer", "Data Scientist", "UI/UX Designer"];
    let roleIndex = 0, charIndex = 0, isDeleting = false;
    const typedSpan = document.getElementById('typed-text');
    function typeEffect() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typedSpan.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      } else {
        typedSpan.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentRole.length) {
          isDeleting = true;
          setTimeout(typeEffect, 1500);
          return;
        }
      }
      setTimeout(typeEffect, isDeleting ? 70 : 120);
    }
    typeEffect();

    // ----- THEME TOGGLE (DARK/LIGHT) -----
    const themeBtn = document.getElementById('themeToggleBtn');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark');
      updateThemeIcon(true);
    } else {
      updateThemeIcon(false);
    }
    function updateThemeIcon(isDark) {
      if (themeBtn) {
        if (isDark) themeBtn.innerHTML = '<i class="fas fa-sun"></i> <span>Light</span>';
        else themeBtn.innerHTML = '<i class="fas fa-moon"></i> <span>Dark</span>';
      }
    }
    themeBtn.addEventListener('click', () => {
      body.classList.toggle('dark');
      const isDarkNow = body.classList.contains('dark');
      localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');
      updateThemeIcon(isDarkNow);
    });

    // ----- MOBILE HAMBURGER MENU -----
    const hamburger = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('active'));
    });

    // ----- PROJECTS DATA (User Provided Repos) -----
    const projectsData = [
      {
        title: "Hotel Reservation System",
        desc: "Full-featured hotel management platform with room booking, payment integration, and admin dashboard.",
        tech: ["Java", "Spring Boot", "MySQL", "React"],
        icon: "🏨",
        repo: "https://github.com/Joelorbit/Hotel-Reservation-System.git"
      },
      {
        title: "Tic-Tac-Toe Game",
        desc: "Classic Tic-Tac-Toe with interactive UI, player vs player mode and AI opponent.",
        tech: ["JavaScript", "HTML5", "CSS3"],
        icon: "🎮",
        repo: "https://github.com/FrehiwetZ/Datascience-Bootcamp-Projects/tree/main/Tic-Tac-Toe%20game"
      },
      {
        title: "Titanic Pandas Analysis",
        desc: "Exploratory data analysis & visualization on Titanic dataset using Pandas, Matplotlib. Insights on survival factors.",
        tech: ["Python", "Pandas", "Matplotlib", "Seaborn"],
        icon: "🚢",
        repo: "https://github.com/FrehiwetZ/Datascience-Bootcamp-Projects/tree/main/Titanic_Pandas_analysis"
      },
      {
        title: "Statistical Engine",
        desc: "Statistical hypothesis testing and descriptive analytics engine with real-time computations.",
        tech: ["Python", "NumPy", "SciPy", "Statsmodels"],
        icon: "📈",
        repo: "https://github.com/FrehiwetZ/Datascience-Bootcamp-Projects/tree/main/Statistical%20Thinking/statistical_engine"
      },
      {
        title: "Reverse String Algorithm",
        desc: "Simple yet elegant string reversal tool demonstrating recursion and iteration methods.",
        tech: ["Python", "Algorithms"],
        icon: "🔄",
        repo: "https://github.com/FrehiwetZ/Datascience-Bootcamp-Projects/tree/main/Reverse%20String"
      },
      {
        title: "Fibonacci Sequence",
        desc: "Generate Fibonacci series using dynamic programming and recursion. Visual output.",
        tech: ["Python", "Mathematics", "Optimization"],
        icon: "🌀",
        repo: "https://github.com/FrehiwetZ/Datascience-Bootcamp-Projects/tree/main/Fibonacci%20sequence"
      }
    ];

    const projectsGrid = document.getElementById('projectsGrid');
    function renderProjects() {
      projectsGrid.innerHTML = '';
      projectsData.forEach(proj => {
        const card = document.createElement('div');
        card.classList.add('project-card', 'fade-up');
        card.innerHTML = `
          <div class="project-img">${proj.icon}</div>
          <div class="project-info">
            <h3 class="project-title">${proj.title}</h3>
            <p class="project-desc">${proj.desc}</p>
            <div class="project-tech">${proj.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
            <div class="project-links">
              <a href="${proj.repo}" target="_blank"><i class="fab fa-github"></i> GitHub</a>
              <a href="${proj.repo}" target="_blank"><i class="fas fa-external-link-alt"></i> Explore</a>
            </div>
          </div>
        `;
        projectsGrid.appendChild(card);
      });
    }
    renderProjects();

    // ----- SKILL BARS & SCROLL ANIMATIONS (Intersection Observer)-----
    const fadeElements = document.querySelectorAll('.fade-up');
    const skillFillBars = document.querySelectorAll('.skill-bar-fill');
    function animateSkillBars() {
      skillFillBars.forEach(bar => {
        const widthVal = bar.getAttribute('data-width');
        if (widthVal && !bar.style.width) {
          bar.style.width = widthVal + '%';
        }
      });
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (entry.target.querySelectorAll) {
            const innerBars = entry.target.querySelectorAll('.skill-bar-fill');
            if (innerBars.length) {
              innerBars.forEach(bar => { if(bar.getAttribute('data-width')) bar.style.width = bar.getAttribute('data-width') + '%'; });
            }
          }
        }
      });
    }, { threshold: 0.1 });
    fadeElements.forEach(el => observer.observe(el));
    // specifically trigger skill bars if about section appears
    const aboutSection = document.getElementById('about');
    const aboutObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) animateSkillBars();
    }, { threshold: 0.3 });
    if (aboutSection) aboutObserver.observe(aboutSection);

    // ----- SMOOTH SCROLL & ACTIVE LINK HIGHLIGHT -----
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      navItems.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) link.style.color = 'var(--accent)';
      });
      const backBtn = document.getElementById('backToTop');
      if (window.scrollY > 500) backBtn.classList.add('show');
      else backBtn.classList.remove('show');
    });

    // Back to top button
    const backTop = document.getElementById('backToTop');
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Resume button simulation (customizable)
    const resumeBtn = document.getElementById('resumeBtn');
    resumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert("📄 Frehiwet Zerihun's resume — you can replace this with your actual PDF link.");
    });

    // ----- CONTACT FORM INTERACTION (Validation + Demo)-----
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('nameInput').value.trim();
      const email = document.getElementById('emailInput').value.trim();
      const message = document.getElementById('msgInput').value.trim();
      if (!name || !email || !message) {
        formFeedback.innerHTML = '❌ All fields are required.';
        formFeedback.style.color = '#ef4444';
        setTimeout(() => { formFeedback.innerHTML = ''; }, 2800);
        return;
      }
      if (!email.includes('@') || !email.includes('.')) {
        formFeedback.innerHTML = '❌ Please enter a valid email address.';
        formFeedback.style.color = '#ef4444';
        setTimeout(() => { formFeedback.innerHTML = ''; }, 2800);
        return;
      }
      formFeedback.innerHTML = '✅ Thanks! Your message has been sent. I will get back to you soon.';
      formFeedback.style.color = '#10b981';
      contactForm.reset();
      setTimeout(() => { formFeedback.innerHTML = ''; }, 4000);
    });

    // Footer dynamic year
    document.getElementById('currentYear').innerText = new Date().getFullYear();

    // initial visible check for skill bars
    setTimeout(() => {
      fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) el.classList.add('visible');
      });
      if (aboutSection && aboutSection.getBoundingClientRect().top < window.innerHeight) animateSkillBars();
    }, 200);
  })();