// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
let navOpen = false;

navToggle.addEventListener('click', function () {
  navOpen = !navOpen;
  navLinks.className = navOpen ? 'nav-links open' : 'nav-links';
});

// ===== Dark / Light Theme Toggle (persisted with localStorage) =====
const themeToggle = document.getElementById('themeToggle');
let darkMode = localStorage.getItem('theme') === 'dark';

function updateTheme() {
  document.body.className = darkMode ? 'dark-mode' : '';
  themeToggle.textContent = darkMode ? 'Light Mode' : 'Dark Mode';
}

updateTheme();

themeToggle.addEventListener('click', function () {
  darkMode = !darkMode;
  localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  updateTheme();
});

// ===== Greeting Message Based on Time of Day =====
const greetingEl = document.getElementById('greeting');
const hour = new Date().getHours();
let greetingText = 'Welcome';

if (hour < 12) {
  greetingText = 'Good morning!';
} else if (hour < 18) {
  greetingText = 'Good afternoon!';
} else {
  greetingText = 'Good evening!';
}

greetingEl.textContent = greetingText;

// ===== Contact Form Interaction (no backend) =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const messageField = document.getElementById('message');

contactForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = nameField.value.trim();
  const email = emailField.value.trim();
  const message = messageField.value.trim();

  if (name === '') {
    formStatus.textContent = 'Please enter your name.';
    formStatus.className = 'form-status error';

  } else if (email === '') {
    formStatus.textContent = 'Please enter your email.';
    formStatus.className = 'form-status error';

  } else if (!email.includes('@') || !email.includes('.')) {
    formStatus.textContent = 'Please enter a valid email.';
    formStatus.className = 'form-status error';

  } else if (message === '') {
    formStatus.textContent = 'Please enter your message.';
    formStatus.className = 'form-status error';

  } else {
    formStatus.textContent = 'Thank you, ' + name + '! Form completed successfully (demo only).';
    formStatus.className = 'form-status success';

    nameField.value = '';
    emailField.value = '';
    messageField.value = '';
  }
});

// ===== Footer Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Project Filter and Sort =====

const projectList = document.getElementById('projectsList');
const projects = Array.from(
  projectList.querySelectorAll('.project-card')
);

let currentFilter = 'all';

function updateProjects() {

  // Step 1: Filter projects
  for (let project of projects) {
    if (currentFilter === 'all' ||
        project.dataset.status === currentFilter) {
      project.style.display = 'block';
    } else {
      project.style.display = 'none';
    }
  }

  // Step 2: Sort projects
  const sortOrder = document.getElementById('sortProjects').value;

  projects.sort(function(a, b) {
    const nameA = a.querySelector('h3').textContent;
    const nameB = b.querySelector('h3').textContent;

    if (sortOrder === 'az') {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  // Step 3: Update HTML order
  for (let project of projects) {
    projectList.appendChild(project);
  }
}

updateProjects();

// Filter buttons
document.getElementById('showAll').addEventListener('click', function() {
  currentFilter = 'all';
  updateProjects();
});

document.getElementById('showCompleted').addEventListener('click', function() {
  currentFilter = 'completed';
  updateProjects();
});

document.getElementById('showProgress').addEventListener('click', function() {
  currentFilter = 'progress';
  updateProjects();
});

// Sort dropdown
document.getElementById('sortProjects').addEventListener('change', function() {
  updateProjects();
});

// ===== Visitor Name (State Management) =====

const visitorName = document.getElementById('visitorName');
const saveName = document.getElementById('saveName');
const clearName = document.getElementById('clearName');
const welcomeMessage = document.getElementById('welcomeMessage');

// Get saved name
let savedName = localStorage.getItem('visitorName');

if (savedName) {
  welcomeMessage.textContent = 'Welcome back, ' + savedName + '!';
  visitorName.value = savedName;
}

// Save visitor name
saveName.addEventListener('click', function() {
  const name = visitorName.value.trim();

  if (name === '') {
    welcomeMessage.textContent = 'Please enter your name.';
  } else {
    localStorage.setItem('visitorName', name);
    welcomeMessage.textContent = 'Welcome, ' + name + '!';
  }
});

// Clear saved name
clearName.addEventListener('click', function() {
  localStorage.removeItem('visitorName');
  visitorName.value = '';
  welcomeMessage.textContent = 'Your name has been cleared.';
});

// ===== GitHub Repositories (API Integration) =====
const githubProjects = document.getElementById('githubProjects');
const githubStatus = document.getElementById('githubStatus');

async function loadGitHubProjects() {
  try {
    const response = await fetch(
      'https://api.github.com/users/Hmxq/repos?sort=updated&per_page=6'
    );

    if (!response.ok) {
      throw new Error('Failed to load projects');
    }

    const repos = await response.json();

    githubStatus.textContent = '';

    if (repos.length === 0) {
      githubStatus.textContent = 'No GitHub projects found.';
      return;
    }

    for (let repo of repos) {
      const card = document.createElement('div');
      card.className = 'project-card';

      const info = document.createElement('div');
      info.className = 'project-info';

      const title = document.createElement('h3');
      title.textContent = repo.name;

      const description = document.createElement('p');
      description.textContent = repo.description || 'No description available.';

      const link = document.createElement('a');
      link.href = repo.html_url;
      link.textContent = 'View on GitHub';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';

      info.appendChild(title);
      info.appendChild(description);
      info.appendChild(link);
      card.appendChild(info);

      githubProjects.appendChild(card);
    }

  } catch (error) {
    githubStatus.textContent =
      'Could not load GitHub projects. Please try again later.';
  }
}

loadGitHubProjects();
