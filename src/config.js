// Edit this file to personalise your portfolio at any time.
export const profile = {
  name: 'Cedric Kipngeno',
  handle: 'Cedric-Kipngeno',
  title: 'Full-Stack, Mobile & AI Developer',
  tagline: 'Building modern web apps, Android experiences, and intelligent Python tools.',
  bio: `I'm a software developer who works across the full stack — from responsive React and Next.js web applications to native Kotlin Android apps, Flask & MySQL REST APIs, and computer-vision / data-science projects in Python. I enjoy turning practical ideas into clean, working products.`,
  avatar: 'https://avatars.githubusercontent.com/u/255511950?v=4',
  github: 'Cedric-Kipngeno',
  githubUrl: 'https://github.com/Cedric-Kipngeno',
  email: 'cedrickipngeno.esq@gmail.com',
  phone: '+254708589412',
  phoneDisplay: '+254 708 589 412',
  linkedin: '', // Add your LinkedIn URL if you want it shown in the header/footer
  stats: [
    { label: 'Public Repositories', value: '21+' },
    { label: 'Core Languages', value: '5' },
    { label: 'Focus Areas', value: 'Web · Mobile · AI' },
  ],
  skillGroups: [
    {
      category: 'Frontend & Web',
      items: ['React', 'Next.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'Bootstrap 5', 'HTML5 & CSS3'],
    },
    {
      category: 'Backend & Databases',
      items: ['Python', 'Flask', 'REST APIs', 'MySQL (PyMySQL)', 'Supabase', 'Node.js'],
    },
    {
      category: 'Mobile & Systems',
      items: ['Kotlin', 'Android Studio', 'Gradle', 'C'],
    },
    {
      category: 'AI, Data & Tools',
      items: ['OpenCV', 'MediaPipe', 'Pandas & NumPy', 'Jupyter Notebooks', 'Git & GitHub'],
    },
  ],
}

// Curated descriptions and tech tags keyed by repo name so your GitHub repos
// look rich even when the GitHub repo description field is blank.
export const projectMeta = {
  CoinVert: {
    category: 'Web',
    featured: true,
    summary:
      'Modern currency & crypto conversion web application built with Next.js 16, React 19, Tailwind CSS v4, and Supabase backend integration.',
    stack: ['Next.js', 'React 19', 'Tailwind CSS', 'Supabase'],
  },
  Apexgadgets: {
    category: 'Web',
    featured: true,
    summary:
      'Full-featured electronics & gadgets e-commerce storefront with product catalog, shopping cart persistence, React Router navigation, and EmailJS checkout notifications.',
    stack: ['React', 'React Router', 'Axios', 'Bootstrap 5', 'Python'],
  },
  AirCanvas: {
    category: 'AI & Data',
    featured: true,
    summary:
      'Real-time computer-vision drawing canvas that tracks fingertip landmarks via webcam using MediaPipe Hand Landmarker and OpenCV so you can sketch in mid-air.',
    stack: ['Python', 'OpenCV', 'MediaPipe', 'NumPy'],
  },
  sokogardenapp: {
    category: 'Web',
    featured: true,
    summary:
      'React web storefront for the SokoGarden online marketplace, featuring user authentication, product listings, and cart workflows connected to the SokoGarden REST API.',
    stack: ['React', 'JavaScript', 'REST API', 'Bootstrap'],
  },
  sokogardenAPI: {
    category: 'Backend',
    featured: true,
    summary:
      'Flask & MySQL RESTful backend powering the SokoGarden platform — handles user signup/signin, product image uploads, and marketplace transactions with CORS support.',
    stack: ['Python', 'Flask', 'MySQL', 'PyMySQL', 'REST API'],
  },
  'SokoGarden-Mobile-App': {
    category: 'Mobile',
    featured: true,
    summary:
      'Native Android client for the SokoGarden marketplace written in Kotlin, bringing mobile browsing and shopping workflows to Android devices.',
    stack: ['Kotlin', 'Android', 'Gradle'],
  },
  WellnessApp: {
    category: 'Mobile',
    featured: true,
    summary:
      'Native Kotlin Android application focused on personal wellness tracking, daily habits, and clean mobile UI patterns.',
    stack: ['Kotlin', 'Android', 'Material UI'],
  },
  HealthBot: {
    category: 'AI & Data',
    featured: true,
    summary:
      'Interactive Python health assistant chatbot that matches symptom and wellness queries against structured medical keyword datasets using Pandas.',
    stack: ['Python', 'Pandas', 'CSV Dataset'],
  },
  DataScience: {
    category: 'AI & Data',
    featured: true,
    summary:
      'Collection of Exploratory Data Analysis (EDA) and machine-learning classification notebooks covering loan approval prediction, Pima Indians diabetes analysis, and suitability modeling.',
    stack: ['Jupyter Notebook', 'Python', 'Pandas', 'Machine Learning'],
  },
  'Auto-Engineering': {
    category: 'Web',
    featured: false,
    summary:
      'Multi-page automotive engineering & spare-parts showcase site with dedicated catalog, parts breakdown, and customer help pages.',
    stack: ['HTML5', 'CSS3'],
  },
  Tumaini: {
    category: 'Web',
    featured: false,
    summary:
      'Responsive retail showcase website for home & bedding products with categorized galleries and clean layout styling.',
    stack: ['HTML5', 'CSS3', 'Bootstrap'],
  },
  'C-language': {
    category: 'Systems',
    featured: false,
    summary:
      'Core systems programming exercises, algorithms, and foundational data-structure implementations in C.',
    stack: ['C'],
  },
  InputValidation: {
    category: 'Backend',
    featured: false,
    summary:
      'Python utilities and patterns for sanitizing, validating, and verifying user input safely.',
    stack: ['Python'],
  },
  Flask: {
    category: 'Backend',
    featured: false,
    summary:
      'Backend web development templates, routing experiments, and server-side rendering using Python Flask.',
    stack: ['Python', 'Flask'],
  },
  MyApp: {
    category: 'Web',
    featured: false,
    summary:
      'Interactive JavaScript web application exploring component state and modern frontend workflows.',
    stack: ['JavaScript', 'React'],
  },
}

// Fallback list used immediately before the live GitHub API call resolves.
export const fallbackRepos = Object.entries(projectMeta).map(([name, meta]) => ({
  name,
  html_url: `https://github.com/Cedric-Kipngeno/${name}`,
  description: meta.summary,
  language: meta.stack[0],
  stargazers_count: 1,
  updated_at: '2026-11-11T00:00:00Z',
  ...meta,
}))
