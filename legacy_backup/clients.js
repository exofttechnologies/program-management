document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Sync
  const body = document.body;
  const themeToggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  function toggleMobileMenu() {
    sidebar.classList.toggle('open');
    sidebarOverlay.classList.toggle('active');
  }

  if (menuToggle) menuToggle.addEventListener('click', toggleMobileMenu);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', toggleMobileMenu);

  // Clients Database
  const clientsData = {
    c1: {
      name: "Muhammed Al-Harbi",
      email: "muhammed@example.com",
      program: "Executive Coaching Program",
      status: "active",
      progress: 85,
      lastActivity: "25 mins ago",
      nextFollowup: "Today, 3:00 PM",
      coach: "Sarah Anderson",
      enrolled: "Jan 16, 2026",
      summary: "Muhammed is a senior startup founder focusing on leadership communication, team delegation protocols, and high-performance workflows. He has demonstrated consistent growth, maintaining 90%+ task completion metrics across early modules.",
      sessions: [
        { num: 1, title: "Leadership Foundations & Alignment", status: "Watched", date: "Jan 20, 2026" },
        { num: 2, title: "Core Strengths & Skill Assessment", status: "Watched", date: "Feb 02, 2026" },
        { num: 3, title: "Designing High-Performing Teams", status: "Watched", date: "Feb 18, 2026" },
        { num: 4, title: "Conflict Resolution & Communication Strategies", status: "Pending", date: "--" }
      ],
      tasks: [
        { title: "Define 3 Core OKRs for Next Quarter", status: "Completed" },
        { title: "Delegation Matrix Audit", status: "Completed" },
        { title: "Weekly 1-on-1 Feedback Form", status: "Pending" }
      ],
      followups: [
        { date: "Yesterday, 4:00 PM", coach: "Sarah Anderson", note: "Discussed leadership alignment challenges. Muhammed is adapting well to the delegation matrix.", status: "Logged" },
        { date: "May 25, 2026", coach: "Sarah Anderson", note: "Introductory onboarding session. Defined long term program roadmap.", status: "Logged" }
      ],
      resources: [
        { name: "Executive 360 Feedback Framework", type: "pdf", size: "2.4 MB" },
        { name: "Goal Alignment Worksheet (OKRs)", type: "worksheet", size: "840 KB" }
      ],
      timeline: [
        { time: "25 mins ago", type: "Session Completed", desc: "Watched Session 3: Designing High-Performing Teams" },
        { time: "Yesterday", type: "Follow-Up Completed", desc: "Weekly review call with Sarah Anderson completed" },
        { time: "3 days ago", type: "Task Submitted", desc: "Submitted 'Delegation Matrix Audit'" }
      ]
    },
    c2: {
      name: "Ameen Shafi",
      email: "ameen@example.com",
      program: "Career Transition Mastery",
      status: "new",
      progress: 10,
      lastActivity: "Yesterday, 4:15 PM",
      nextFollowup: "Tomorrow, 11:00 AM",
      coach: "Sarah Anderson",
      enrolled: "Jun 02, 2026",
      summary: "Ameen is an mid-level software engineer transitioning to a product manager track. Focus areas are professional resume alignment and networking within technical organizations.",
      sessions: [
        { num: 1, title: "Career Vision & Ikigai Discovery", status: "Watched", date: "Jun 04, 2026" },
        { num: 2, title: "SaaS Resume & LinkedIn Optimization", status: "Pending", date: "--" }
      ],
      tasks: [
        { title: "Update LinkedIn headline & summary", status: "Completed" },
        { title: "Draft cold outreach template", status: "Pending" }
      ],
      followups: [
        { date: "Yesterday", coach: "Sarah Anderson", note: "Initial discovery call. Clarified career shift metrics.", status: "Logged" }
      ],
      resources: [
        { name: "SaaS CV/Resume Template Suite", type: "worksheet", size: "1.2 MB" }
      ],
      timeline: [
        { time: "Yesterday", type: "Joined Program", desc: "Enrolled in Career Transition Mastery template" },
        { time: "Yesterday", type: "Session Completed", desc: "Watched Session 1: Career Vision Discovery" }
      ]
    },
    c3: {
      name: "Fathima Zahra",
      email: "fathima@example.com",
      program: "Executive Coaching Program",
      status: "follow-up",
      progress: 42,
      lastActivity: "3 days ago",
      nextFollowup: "Today, 1:30 PM",
      coach: "Sarah Anderson",
      enrolled: "Mar 12, 2026",
      summary: "Fathima is an operations manager at a global logistics firm. Her coaching focuses on setting healthy team boundaries and optimizing meeting schedules.",
      sessions: [
        { num: 1, title: "Leadership Foundations & Alignment", status: "Watched", date: "Mar 18, 2026" },
        { num: 2, title: "Core Strengths & Skill Assessment", status: "Watched", date: "Apr 05, 2026" },
        { num: 3, title: "Designing High-Performing Teams", status: "Pending", date: "--" }
      ],
      tasks: [
        { title: "Conduct meeting audit report", status: "Pending" },
        { title: "Calendar block planning template", status: "Completed" }
      ],
      followups: [
        { date: "1 week ago", coach: "Sarah Anderson", note: "Brief progress checkin. Fathima feels slightly overwhelmed by external task loads.", status: "Logged" }
      ],
      resources: [
        { name: "Goal Alignment Worksheet (OKRs)", type: "worksheet", size: "840 KB" }
      ],
      timeline: [
        { time: "3 days ago", type: "Task Submitted", desc: "Submitted 'Calendar block planning template'" },
        { time: "1 week ago", type: "Coach Note Added", desc: "Sarah Anderson added a note regarding task pacing" }
      ]
    },
    c4: {
      name: "Rashid Khan",
      email: "rashid@example.com",
      program: "Career Transition Mastery",
      status: "completed",
      progress: 100,
      lastActivity: "1 week ago",
      nextFollowup: "None Scheduled",
      coach: "Sarah Anderson",
      enrolled: "Feb 05, 2026",
      summary: "Rashid successfully pivoted from sales associate to tech sales representative, landing a role at a Series B startup in Austin, TX.",
      sessions: [
        { num: 1, title: "Career Vision Discovery", status: "Watched", date: "Feb 10, 2026" },
        { num: 2, title: "Resume & LinkedIn", status: "Watched", date: "Feb 28, 2026" },
        { num: 3, title: "Outreach & Networking", status: "Watched", date: "Mar 15, 2026" },
        { num: 4, title: "Salary Negotiation Blueprint", status: "Watched", date: "Apr 02, 2026" }
      ],
      tasks: [
        { title: "Accept Offer checklist", status: "Completed" },
        { title: "Salary review script prep", status: "Completed" }
      ],
      followups: [
        { date: "Apr 10, 2026", coach: "Sarah Anderson", note: "Congratulated Rashid on onboarding new technical role.", status: "Logged" }
      ],
      resources: [
        { name: "Salary Negotiation Script Book", type: "pdf", size: "950 KB" }
      ],
      timeline: [
        { time: "1 week ago", type: "Follow-Up Completed", desc: "Graduation check-in call successfully logged" },
        { time: "2 months ago", type: "Session Completed", desc: "Completed all core curriculum requirements" }
      ]
    },
    c5: {
      name: "Emily Watson",
      email: "emily@example.com",
      program: "Personal Wellness & Biohacking",
      status: "inactive",
      progress: 65,
      lastActivity: "2 weeks ago",
      nextFollowup: "Next Week, Monday",
      coach: "Sarah Anderson",
      enrolled: "Nov 12, 2025",
      summary: "Emily requested to pause active sessions for 3 weeks due to scheduling logistics. Sleep audit modules completed successfully.",
      sessions: [
        { num: 1, title: "Circadian Rhythm Alignment", status: "Watched", date: "Nov 20, 2025" },
        { num: 2, title: "Sleep Mechanics & Recovery Setup", status: "Watched", date: "Dec 05, 2025" },
        { num: 3, title: "Stress Resilience & Cold Thermogenesis", status: "Pending", date: "--" }
      ],
      tasks: [
        { title: "7-Day sleep diary log", status: "Completed" },
        { title: "Stress response checklist", status: "Pending" }
      ],
      followups: [
        { date: "3 weeks ago", coach: "Sarah Anderson", note: "Agreed to pause active billing cycle temporarily.", status: "Logged" }
      ],
      resources: [
        { name: "Sleep Environment Checklist", type: "pdf", size: "1.1 MB" }
      ],
      timeline: [
        { time: "2 weeks ago", type: "Coach Note Added", desc: "Program paused status confirmed" }
      ]
    }
  };

  const clientsTableBody = document.getElementById('clientsTableBody');
  const clientsMobileContainer = document.getElementById('clientsMobileContainer');
  const clientsEmptyState = document.getElementById('clientsEmptyState');

  const searchClientsInput = document.getElementById('searchClientsInput');
  const clientStatusFilter = document.getElementById('clientStatusFilter');
  const clientSortFilter = document.getElementById('clientSortFilter');

  let activeFollowupClientId = null;

  // Render Table & Cards
  function renderClients() {
    clientsTableBody.innerHTML = '';
    clientsMobileContainer.innerHTML = '';

    const searchVal = searchClientsInput.value.toLowerCase();
    const statusVal = clientStatusFilter.value;
    const sortVal = clientSortFilter.value;

    let filtered = Object.keys(clientsData).map(key => ({ id: key, ...clientsData[key] }));

    // Apply Filter
    filtered = filtered.filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchVal) ||
                            client.email.toLowerCase().includes(searchVal) ||
                            client.program.toLowerCase().includes(searchVal);
      const matchesStatus = statusVal === 'all' || client.status === statusVal;
      return matchesSearch && matchesStatus;
    });

    // Apply Sort
    if (sortVal === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortVal === 'progress') {
      filtered.sort((a, b) => b.progress - a.progress);
    }

    if (filtered.length === 0) {
      clientsEmptyState.style.display = 'block';
      document.getElementById('clientsTableContainer').style.display = 'none';
      clientsMobileContainer.style.display = 'none';
      return;
    }

    clientsEmptyState.style.display = 'none';
    if (window.innerWidth > 768) {
      document.getElementById('clientsTableContainer').style.display = 'block';
      clientsMobileContainer.style.display = 'none';
    } else {
      document.getElementById('clientsTableContainer').style.display = 'none';
      clientsMobileContainer.style.display = 'flex';
    }

    filtered.forEach(client => {
      // Status Badges
      let badgeClass = `badge-${client.status}`;
      let statusText = client.status === 'follow-up' ? 'Follow-Up Required' : client.status.charAt(0).toUpperCase() + client.status.slice(1);
      if (client.status === 'follow-up') badgeClass = 'badge-follow-up';

      const initials = client.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

      // Render Desktop Row
      clientsTableBody.innerHTML += `
        <tr data-id="${client.id}">
          <td>
            <div class="client-meta-info">
              <div class="client-table-avatar">${initials}</div>
              <div>
                <strong>${client.name}</strong>
                <div style="font-size:0.75rem; color:var(--text-muted);">${client.email}</div>
              </div>
            </div>
          </td>
          <td><span style="font-size:0.875rem;">${client.program}</span></td>
          <td><span class="badge ${badgeClass}">${statusText}</span></td>
          <td>
            <div class="clients-table-progress" style="display:flex; align-items:center; gap:8px;">
              <div class="progress-bar-bg" style="width:70px;"><div class="progress-bar-fill" style="width:${client.progress}%"></div></div>
              <span style="font-size:0.75rem; font-weight:600;">${client.progress}%</span>
            </div>
          </td>
          <td><span style="font-size:0.8rem; color:var(--text-secondary);">${client.lastActivity}</span></td>
          <td><span style="font-size:0.8rem; font-weight:600; color:${client.nextFollowup.includes('Today') ? 'var(--warning)' : 'inherit'};">${client.nextFollowup}</span></td>
          <td><span style="font-size:0.8rem;">${client.coach}</span></td>
          <td style="text-align:right;">
            <div style="display:flex; gap:8px; justify-content:flex-end;">
              <button class="btn-card-action btn-view-profile" style="padding:4px 8px; font-size:0.75rem;">Profile</button>
              <button class="btn-card-action btn-add-followup-action" style="padding:4px 8px; font-size:0.75rem;" title="Add Follow Up"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:12px;height:12px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg></button>
            </div>
          </td>
        </tr>
      `;

      // Render Mobile Card
      clientsMobileContainer.innerHTML += `
        <div class="client-mobile-card" data-id="${client.id}">
          <div class="client-card-header">
            <div class="client-card-user">
              <div class="client-table-avatar">${initials}</div>
              <div>
                <div class="client-card-name">${client.name}</div>
                <div class="client-card-prog">${client.program}</div>
              </div>
            </div>
            <span class="badge ${badgeClass}">${statusText}</span>
          </div>
          <div>
            <div class="progress-bar-label" style="font-size: 0.72rem; margin-bottom: 4px;"><span>Progress</span><span>${client.progress}%</span></div>
            <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${client.progress}%"></div></div>
          </div>
          <div class="client-card-footer">
            <span>Next: ${client.nextFollowup}</span>
            <span>Activity: ${client.lastActivity}</span>
          </div>
        </div>
      `;
    });
  }

  // Initial render & resize sync
  renderClients();
  window.addEventListener('resize', renderClients);

  // Search/Filters Events
  if (searchClientsInput) searchClientsInput.addEventListener('input', renderClients);
  if (clientStatusFilter) clientStatusFilter.addEventListener('change', renderClients);
  if (clientSortFilter) clientSortFilter.addEventListener('change', renderClients);

  const clearClientsFiltersBtn = document.getElementById('clearClientsFiltersBtn');
  if (clearClientsFiltersBtn) {
    clearClientsFiltersBtn.addEventListener('click', () => {
      searchClientsInput.value = '';
      clientStatusFilter.value = 'all';
      clientSortFilter.value = 'activity';
      renderClients();
    });
  }

  // Profile overlay switches
  const clientProfileOverlay = document.getElementById('clientProfileOverlay');
  const btnBackClients = document.getElementById('btnBackClients');

  function openClientProfile(clientId) {
    const client = clientsData[clientId];
    if (!client) return;

    activeFollowupClientId = clientId;

    // Set details page content
    document.getElementById('profileClientName').textContent = client.name;
    document.getElementById('profileClientEmail').textContent = client.email;
    document.getElementById('profileEnrolledProgram').textContent = `Program: ${client.program}`;
    document.getElementById('profileEnrolledDate').textContent = client.enrolled;

    const initials = client.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const avatarBox = document.getElementById('profileUserAvatar');
    avatarBox.textContent = initials;

    // Badges details
    const badge = document.getElementById('profileClientStatus');
    let badgeClass = `badge-${client.status}`;
    let statusText = client.status === 'follow-up' ? 'Follow-Up Required' : client.status.charAt(0).toUpperCase() + client.status.slice(1);
    if (client.status === 'follow-up') badgeClass = 'badge-follow-up';
    badge.className = `badge ${badgeClass}`;
    badge.textContent = statusText;

    // Stats
    document.getElementById('profileStatProgress').textContent = `${client.progress}%`;
    const doneTasks = client.tasks.filter(t => t.status === 'Completed').length;
    document.getElementById('profileStatTasks').textContent = `${doneTasks}/${client.tasks.length}`;
    document.getElementById('profileStatLastActive').textContent = client.lastActivity;



    // Populate Tasks tab
    const tasksList = document.getElementById('profileTasksList');
    tasksList.innerHTML = '';
    client.tasks.forEach(task => {
      const isCompleted = task.status === 'Completed';
      const statusBadge = isCompleted 
        ? `<span class="badge badge-active" style="text-transform:none;">Completed</span>`
        : `<span class="badge badge-follow-up" style="text-transform:none;">Pending</span>`;

      tasksList.innerHTML += `
        <div class="session-row-item">
          <div class="session-left">
            <div class="session-num-circle" style="${isCompleted ? 'background:rgba(16,185,129,0.1);color:var(--success);' : 'background:rgba(245,158,11,0.1);color:var(--warning);'}">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:16px;height:16px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="${isCompleted ? 'M5 13l4 4L19 7' : 'M12 6v6m0 0v6m0-6h6m-6 0H6'}"/></svg>
            </div>
            <div class="session-title-meta">
              <h4>${task.title}</h4>
            </div>
          </div>
          <div class="session-right">
            ${statusBadge}
          </div>
        </div>
      `;
    });



    // Reset profile tabs (Not needed anymore, removed from UI)
    // Removed old tab logic

    // Open Overlay
    clientProfileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Back Button
  if (btnBackClients) {
    btnBackClients.addEventListener('click', () => {
      clientProfileOverlay.classList.remove('active');
      document.body.style.overflow = '';
      activeFollowupClientId = null;
    });
  }

  // Bind View Profile triggers on clicks
  clientsTableBody.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-view-profile');
    if (btn) {
      const row = btn.closest('tr');
      const cId = row.getAttribute('data-id');
      openClientProfile(cId);
    }
  });

  clientsMobileContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.client-mobile-card');
    if (card) {
      const cId = card.getAttribute('data-id');
      openClientProfile(cId);
    }
  });

  // Modal: Add Client
  const addClientModal = document.getElementById('addClientModal');
  const btnCloseClientModal = document.getElementById('btnCloseClientModal');
  const btnCancelClient = document.getElementById('btnCancelClient');
  const addClientForm = document.getElementById('addClientForm');

  const addClientBtns = document.querySelectorAll('#addClientBtnTop, #createFirstClientBtn, #floatingAddClientBtn');
  addClientBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      addClientModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeClientModal() {
    addClientModal.classList.remove('active');
    document.body.style.overflow = '';
    addClientForm.reset();
  }

  if (btnCloseClientModal) btnCloseClientModal.addEventListener('click', closeClientModal);
  if (btnCancelClient) btnCancelClient.addEventListener('click', closeClientModal);

  // Form Submit: Add Client
  if (addClientForm) {
    addClientForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientNameInput').value;
      const email = document.getElementById('clientEmailInput').value;
      const program = document.getElementById('clientProgramSelect').value;
      const status = document.getElementById('clientStatusSelect').value;
      const summary = document.getElementById('clientSummaryInput').value || "No initial notes compiled.";
      const coach = document.getElementById('clientCoachSelect').value || "Sarah Anderson";
      const progress = parseInt(document.getElementById('clientProgressInput').value) || 0;

      const cId = 'c_' + Date.now();

      // Insert into local db
      clientsData[cId] = {
        name: name,
        email: email,
        program: program,
        status: status,
        progress: progress,
        lastActivity: "Just now",
        nextFollowup: "Tomorrow, 10:00 AM",
        coach: coach,
        enrolled: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        summary: summary,
        sessions: [
          { num: 1, title: "Leadership Foundations & Alignment", status: "Pending", date: "--" }
        ],
        tasks: [
          { title: "Define Program Core Outcomes", status: "Pending" }
        ],
        followups: [],
        resources: [],
        timeline: [
          { time: "Just now", type: "Joined Program", desc: `Enrolled in ${program}` }
        ]
      };

      // Recalculate stats counters
      const totalStats = document.getElementById('stat-total-clients');
      if (totalStats) totalStats.textContent = parseInt(totalStats.textContent) + 1;
      
      const activeStats = document.getElementById('stat-active-clients');
      if (status === 'active' && activeStats) activeStats.textContent = parseInt(activeStats.textContent) + 1;

      // Update sidebar counter badge
      const sidebarBadge = document.getElementById('sidebarClientsBadge');
      if (sidebarBadge) sidebarBadge.textContent = parseInt(sidebarBadge.textContent) + 1;

      renderClients();
      closeClientModal();
      showToast("Client Added", `"${name}" has been added to ${program}.`);
    });
  }

  // Modal: Add Follow-Up Notes
  const addFollowupModal = document.getElementById('addFollowupModal');
  const btnCloseFollowupModal = document.getElementById('btnCloseFollowupModal');
  const btnCancelFollowup = document.getElementById('btnCancelFollowup');
  const addFollowupForm = document.getElementById('addFollowupForm');

  // Triggering follow-up modal from action buttons
  clientsTableBody.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-add-followup-action');
    if (btn) {
      const row = btn.closest('tr');
      activeFollowupClientId = row.getAttribute('data-id');
      addFollowupModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  const btnProfileAddFollowUp = document.getElementById('btnProfileAddFollowUp');
  if (btnProfileAddFollowUp) {
    btnProfileAddFollowUp.addEventListener('click', () => {
      addFollowupModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  const btnQuickAddFollowup = document.getElementById('btnQuickAddFollowup');
  if (btnQuickAddFollowup) {
    btnQuickAddFollowup.addEventListener('click', () => {
      addFollowupModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeFollowupModal() {
    addFollowupModal.classList.remove('active');
    if (!clientProfileOverlay.classList.contains('active')) {
      document.body.style.overflow = '';
    }
    addFollowupForm.reset();
  }

  if (btnCloseFollowupModal) btnCloseFollowupModal.addEventListener('click', closeFollowupModal);
  if (btnCancelFollowup) btnCancelFollowup.addEventListener('click', closeFollowupModal);

  // Form Submit: Add Follow-Up
  if (addFollowupForm) {
    addFollowupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!activeFollowupClientId || !clientsData[activeFollowupClientId]) return;

      const dateVal = document.getElementById('followupDateInput').value;
      const notesVal = document.getElementById('followupNotesInput').value;

      const formattedDate = new Date(dateVal).toLocaleString('en-US', { 
        month: 'short', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
      });

      // Update in db
      clientsData[activeFollowupClientId].followups.unshift({
        date: formattedDate,
        coach: "Sarah Anderson",
        note: notesVal,
        status: "Logged"
      });

      clientsData[activeFollowupClientId].timeline.unshift({
        time: "Just now",
        type: "Follow-Up Completed",
        desc: `Follow-up completed: ${notesVal}`
      });

      clientsData[activeFollowupClientId].nextFollowup = formattedDate;

      // Update stats if status changed
      if (clientsData[activeFollowupClientId].status === 'follow-up') {
        clientsData[activeFollowupClientId].status = 'active';
        const followupStats = document.getElementById('stat-followup-clients');
        if (followupStats) followupStats.textContent = Math.max(0, parseInt(followupStats.textContent) - 1);
      }

      renderClients();
      
      // If profile overlay is open, refresh its data
      if (clientProfileOverlay.classList.contains('active')) {
        openClientProfile(activeFollowupClientId);
      }

      closeFollowupModal();
      showToast("Follow-Up Logged", "Follow-up notes and schedule updated.");
    });
  }

  // Toast System
  const toastContainer = document.getElementById('toastContainer');
  function showToast(title, desc) {
    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.innerHTML = `
      <div class="toast-icon">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      </div>
      <div>
        <div class="toast-title">${title}</div>
        <div class="toast-desc">${desc}</div>
      </div>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add('active'), 100);

    setTimeout(() => {
      toast.classList.remove('active');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  // Other Quick Actions Demo alerts
  const reminderBtn = document.getElementById('btnQuickSendReminder');
  if (reminderBtn) {
    reminderBtn.addEventListener('click', () => {
      showToast("Reminder Sent", "An SMS and Email reminder has been sent to the client.");
    });
  }

  const assignTaskBtn = document.getElementById('btnQuickAssignTask');
  if (assignTaskBtn) {
    assignTaskBtn.addEventListener('click', () => {
      const taskTitle = prompt("Enter the title of the task to assign:");
      if (taskTitle && activeFollowupClientId && clientsData[activeFollowupClientId]) {
        clientsData[activeFollowupClientId].tasks.unshift({
          title: taskTitle,
          status: "Pending"
        });
        clientsData[activeFollowupClientId].timeline.unshift({
          time: "Just now",
          type: "Task Assigned",
          desc: `Assigned new task: ${taskTitle}`
        });
        openClientProfile(activeFollowupClientId);
        showToast("Task Assigned", `"${taskTitle}" assigned successfully.`);
      }
    });
  }

  const viewProgramBtn = document.getElementById('btnQuickViewProgram');
  if (viewProgramBtn) {
    viewProgramBtn.addEventListener('click', () => {
      if (activeFollowupClientId && clientsData[activeFollowupClientId]) {
        location.href = 'programs.html';
      }
    });
  }
});
