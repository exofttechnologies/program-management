document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggleBtn = document.getElementById('themeToggle');
  const body = document.body;

  // Check system preferences or local storage
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateChartColors(newTheme);
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  function toggleMobileMenu() {
    sidebar.classList.toggle('open');
    sidebarOverlay.classList.toggle('active');
  }

  menuToggle.addEventListener('click', toggleMobileMenu);
  sidebarOverlay.addEventListener('click', toggleMobileMenu);

  // Active navigation handling
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // For demo, we just switch active classes
      if(item.getAttribute('href') === '#') {
        e.preventDefault();
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      }
    });
  });

  // Mobile navigation active handling
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
  mobileNavItems.forEach(item => {
    item.addEventListener('click', () => {
      mobileNavItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Quick Action Buttons Actions
  const quickActionBtns = document.querySelectorAll('.quick-action-btn, #quickAddBtn');
  quickActionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.querySelector('.quick-action-label')?.textContent || btn.querySelector('span')?.textContent || 'Action';
      alert(`${label} flow is clicked! In a full SaaS product, this would open a premium modal window.`);
    });
  });

  // Follow-up actions completion microinteraction
  const followupActions = document.querySelectorAll('.followup-action');
  followupActions.forEach(action => {
    action.addEventListener('click', (e) => {
      const item = e.target.closest('.followup-item');
      item.style.transition = 'all 0.4s ease';
      item.style.opacity = '0';
      item.style.transform = 'translateX(50px)';
      setTimeout(() => {
        item.remove();
        // Update pending follow ups counter
        const counter = document.querySelector('.stat-card:nth-child(4) .stat-value');
        if (counter) {
          const val = parseInt(counter.textContent) - 1;
          counter.textContent = val >= 0 ? val : 0;
        }
        
        const badge = document.querySelector('.nav-badge');
        if (badge) {
          const val = parseInt(badge.textContent) - 1;
          badge.textContent = val >= 0 ? val : '';
          if (badge.textContent === '') badge.style.display = 'none';
        }
      }, 400);
    });
  });

  // Search microinteraction (Command+K focus indicator)
  const searchInput = document.getElementById('searchInput');
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
  });

  // --- CHART GENERATION ---
  let clientChart, revenueChart, programChart, sessionChart;

  function getChartColors(theme) {
    const isDark = theme === 'dark';
    return {
      text: isDark ? '#a09bb5' : '#64748b',
      grid: isDark ? '#2a2440' : '#e2e8f0',
      primary: '#7c3aed',
      primaryLight: 'rgba(124, 58, 237, 0.15)',
      primaryGradientStart: 'rgba(124, 58, 237, 0.4)',
      primaryGradientStop: 'rgba(124, 58, 237, 0.0)',
      indigo: '#6366f1',
      indigoLight: 'rgba(99, 102, 241, 0.15)',
      success: '#10b981',
      warning: '#f59e0b',
      info: '#3b82f6',
      cardBg: isDark ? '#1a1528' : '#ffffff'
    };
  }

  function createCharts() {
    const colors = getChartColors(body.getAttribute('data-theme'));

    // Client Growth Line Chart
    const ctxClient = document.getElementById('clientChart').getContext('2d');
    
    // Create gradient
    const clientGrad = ctxClient.createLinearGradient(0, 0, 0, 240);
    clientGrad.addColorStop(0, colors.primaryGradientStart);
    clientGrad.addColorStop(1, colors.primaryGradientStop);

    clientChart = new Chart(ctxClient, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Active Clients',
          data: [120, 135, 142, 160, 172, 186],
          borderColor: colors.primary,
          borderWidth: 3,
          backgroundColor: clientGrad,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: colors.primary,
          pointHoverRadius: 7,
          pointHoverBackgroundColor: colors.cardBg,
          pointHoverBorderColor: colors.primary,
          pointHoverBorderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: colors.text, font: { family: 'Inter', size: 11 } }
          },
          y: {
            border: { dash: [4, 4] },
            grid: { color: colors.grid },
            ticks: { color: colors.text, font: { family: 'Inter', size: 11 } }
          }
        }
      }
    });

    // Revenue Overview Bar Chart
    const ctxRevenue = document.getElementById('revenueChart').getContext('2d');
    revenueChart = new Chart(ctxRevenue, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Revenue ($)',
          data: [8200, 9500, 10200, 12500, 14000, 15400],
          backgroundColor: colors.indigo,
          borderRadius: 6,
          hoverBackgroundColor: colors.primary
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: colors.text, font: { family: 'Inter', size: 11 } }
          },
          y: {
            border: { dash: [4, 4] },
            grid: { color: colors.grid },
            ticks: { color: colors.text, font: { family: 'Inter', size: 11 } }
          }
        }
      }
    });

    // Program Performance Doughnut Chart
    const ctxProgram = document.getElementById('programChart').getContext('2d');
    programChart = new Chart(ctxProgram, {
      type: 'doughnut',
      data: {
        labels: ['Exec Coaching', 'Leadership Dev', 'Career Transition', 'Wellness'],
        datasets: [{
          data: [42, 28, 18, 12],
          backgroundColor: [colors.primary, colors.indigo, colors.success, colors.warning],
          borderWidth: 4,
          borderColor: colors.cardBg,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: colors.text,
              font: { family: 'Inter', size: 11, weight: '500' },
              boxWidth: 12,
              padding: 15
            }
          }
        },
        cutout: '75%'
      }
    });

    // Session Completion Weekly Radar/Polar/Bar Chart
    const ctxSession = document.getElementById('sessionChart').getContext('2d');
    sessionChart = new Chart(ctxSession, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [{
          label: 'Completed',
          data: [18, 24, 15, 29, 22, 10],
          backgroundColor: colors.primaryLight,
          borderColor: colors.primary,
          borderWidth: 2,
          borderRadius: 4
        }, {
          label: 'Scheduled',
          data: [20, 25, 20, 30, 25, 12],
          backgroundColor: colors.indigoLight,
          borderColor: colors.indigo,
          borderWidth: 2,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: colors.text, font: { family: 'Inter', size: 11 } }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: colors.text, font: { family: 'Inter', size: 11 } }
          },
          y: {
            border: { dash: [4, 4] },
            grid: { color: colors.grid },
            ticks: { color: colors.text, font: { family: 'Inter', size: 11 } }
          }
        }
      }
    });
  }

  function updateChartColors(theme) {
    const colors = getChartColors(theme);
    
    // Client Chart Updates
    clientChart.options.scales.x.ticks.color = colors.text;
    clientChart.options.scales.y.ticks.color = colors.text;
    clientChart.options.scales.y.grid.color = colors.grid;
    // regenerate line gradient for client chart
    const ctxClient = document.getElementById('clientChart').getContext('2d');
    const clientGrad = ctxClient.createLinearGradient(0, 0, 0, 240);
    clientGrad.addColorStop(0, colors.primaryGradientStart);
    clientGrad.addColorStop(1, colors.primaryGradientStop);
    clientChart.data.datasets[0].backgroundColor = clientGrad;
    clientChart.data.datasets[0].borderColor = colors.primary;
    clientChart.data.datasets[0].pointBackgroundColor = colors.primary;
    clientChart.data.datasets[0].pointHoverBorderColor = colors.primary;
    clientChart.update();

    // Revenue Chart Updates
    revenueChart.options.scales.x.ticks.color = colors.text;
    revenueChart.options.scales.y.ticks.color = colors.text;
    revenueChart.options.scales.y.grid.color = colors.grid;
    revenueChart.update();

    // Program Chart Updates
    programChart.options.plugins.legend.labels.color = colors.text;
    programChart.data.datasets[0].borderColor = colors.cardBg;
    programChart.update();

    // Session Chart Updates
    sessionChart.options.scales.x.ticks.color = colors.text;
    sessionChart.options.scales.y.ticks.color = colors.text;
    sessionChart.options.scales.y.grid.color = colors.grid;
    sessionChart.options.plugins.legend.labels.color = colors.text;
    sessionChart.update();
  }

  // Init Charts
  createCharts();
});
