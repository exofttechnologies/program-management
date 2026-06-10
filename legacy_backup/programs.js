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

  // Programs and Client Enrollment database
  const programsData = {
    p1: {
      id: "p1",
      name: "Executive Coaching Program",
      clients: [
        { id: "c1", name: "Muhammed Al-Harbi", email: "muhammed@example.com", daysLeft: 45 },
        { id: "c2", name: "Fathima Zahra", email: "fathima@example.com", daysLeft: 72 },
        { id: "c3", name: "James Davis", email: "james@example.com", daysLeft: 18 }
      ],
      days: {
        1: "Introduction & Goal Setting",
        2: "Core Strengths & Skill Assessment",
        3: "Designing High-Performing Teams",
        4: "Conflict Resolution Protocols",
        5: "Scaling Culture & Organizational Design"
      }
    },
    p2: {
      id: "p2",
      name: "Career Transition Mastery",
      clients: [
        { id: "c4", name: "Ameen Shafi", email: "ameen@example.com", daysLeft: 30 },
        { id: "c5", name: "Rashid Khan", email: "rashid@example.com", daysLeft: 12 },
        { id: "c6", name: "Emily Martinez", email: "emily.m@example.com", daysLeft: 58 }
      ],
      days: {
        1: "Career Vision & Ikigai Discovery",
        2: "SaaS Resume & LinkedIn Optimization",
        3: "The Hidden Job Market & Outreach",
        4: "Interview Mechanics & Negotiation"
      }
    },
    p4: {
      id: "p4",
      name: "Personal Wellness & Biohacking",
      clients: [
        { id: "c7", name: "Emily Watson", email: "emily@example.com", daysLeft: 22 },
        { id: "c8", name: "David Miller", email: "david@example.com", daysLeft: 84 }
      ],
      days: {
        1: "Circadian Rhythm Alignment",
        2: "Sleep Mechanics & Recovery Setup",
        3: "Stress Resilience & Cold Exposure"
      }
    }
  };

  // Client schedules based on day index
  const clientSchedules = {
    c1: {
      1: { zoom: "https://zoom.us/j/987654321", recording: "Intro Orientation.mp4", task: "Submit core personal assessment", followup: "Intro session review complete." },
      2: { zoom: "https://zoom.us/j/987654322", recording: "", task: "Delegation matrix framework sheet", followup: "Awaiting sheet review" },
      3: { zoom: "", recording: "", task: "", followup: "" },
      4: { zoom: "", recording: "", task: "", followup: "" },
      5: { zoom: "", recording: "", task: "", followup: "" }
    },
    c2: {
      1: { zoom: "https://zoom.us/j/112233445", recording: "Fathima Day 1.mp4", task: "Write 3 OKRs", followup: "Goal sheet completed." },
      2: { zoom: "", recording: "", task: "", followup: "" },
      3: { zoom: "", recording: "", task: "", followup: "" },
      4: { zoom: "", recording: "", task: "", followup: "" },
      5: { zoom: "", recording: "", task: "", followup: "" }
    },
    c3: {
      1: { zoom: "https://zoom.us/j/556677889", recording: "", task: "", followup: "" },
      2: { zoom: "", recording: "", task: "", followup: "" },
      3: { zoom: "", recording: "", task: "", followup: "" },
      4: { zoom: "", recording: "", task: "", followup: "" },
      5: { zoom: "", recording: "", task: "", followup: "" }
    },
    c4: {
      1: { zoom: "https://zoom.us/j/889900112", recording: "Vision Alignment.mp4", task: "Ikigai sheet completion", followup: "Schedule feedback review call" },
      2: { zoom: "", recording: "", task: "", followup: "" },
      3: { zoom: "", recording: "", task: "", followup: "" },
      4: { zoom: "", recording: "", task: "", followup: "" }
    },
    c5: {
      1: { zoom: "https://zoom.us/j/445566778", recording: "Rashid Day 1.mp4", task: "Complete resume review", followup: "Discuss draft changes" },
      2: { zoom: "", recording: "", task: "", followup: "" },
      3: { zoom: "", recording: "", task: "", followup: "" },
      4: { zoom: "", recording: "", task: "", followup: "" }
    },
    c6: {
      1: { zoom: "", recording: "", task: "", followup: "" },
      2: { zoom: "", recording: "", task: "", followup: "" },
      3: { zoom: "", recording: "", task: "", followup: "" },
      4: { zoom: "", recording: "", task: "", followup: "" }
    },
    c7: {
      1: { zoom: "https://zoom.us/j/334455667", recording: "Emily Wellness Day 1.mp4", task: "Circadian rhythm log", followup: "Sync log results" },
      2: { zoom: "", recording: "", task: "", followup: "" },
      3: { zoom: "", recording: "", task: "", followup: "" }
    },
    c8: {
      1: { zoom: "", recording: "", task: "", followup: "" },
      2: { zoom: "", recording: "", task: "", followup: "" },
      3: { zoom: "", recording: "", task: "", followup: "" }
    }
  };

  let activeProgramId = 'p1';
  let activeClientId = 'c1';

  // Read URL params (e.g. ?program=p2)
  const urlParams = new URLSearchParams(window.location.search);
  const urlProg = urlParams.get('program');
  if (urlProg && programsData[urlProg]) {
    activeProgramId = urlProg;
    if (programsData[urlProg].clients.length > 0) {
      activeClientId = programsData[urlProg].clients[0].id;
    }
  }

  // HTML references
  const programTabsRow = document.getElementById('programTabsRow');
  const enrolledClientsList = document.getElementById('enrolledClientsList');
  const clientScheduleContainer = document.getElementById('clientScheduleContainer');
  
  const scheduleClientName = document.getElementById('scheduleClientName');
  const scheduleProgramName = document.getElementById('scheduleProgramName');
  const scheduleDaysLeft = document.getElementById('scheduleDaysLeft');
  const dayJourneyTimeline = document.getElementById('dayJourneyTimeline');

  // Render Program Selector Tabs
  function renderProgramTabs() {
    programTabsRow.innerHTML = '';
    Object.keys(programsData).forEach(key => {
      const prog = programsData[key];
      const activeClass = activeProgramId === key ? 'active' : '';
      programTabsRow.innerHTML += `
        <button class="view-switch-btn ${activeClass}" data-id="${key}">${prog.name}</button>
      `;
    });

    // Tab switcher events
    const tabBtns = programTabsRow.querySelectorAll('.view-switch-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        activeProgramId = btn.getAttribute('data-id');
        const prog = programsData[activeProgramId];
        if (prog.clients.length > 0) {
          activeClientId = prog.clients[0].id;
        } else {
          activeClientId = null;
        }
        renderProgramTabs();
        renderClientsList();
        renderActiveClientSchedule();
      });
    });
  }

  // Render Enrolled Clients List (Left column)
  function renderClientsList() {
    enrolledClientsList.innerHTML = '';
    const prog = programsData[activeProgramId];
    if (!prog) return;

    if (prog.clients.length === 0) {
      enrolledClientsList.innerHTML = `
        <div style="font-size:0.8rem; color:var(--text-muted); padding:20px; text-align:center;">
          No enrolled clients yet.
        </div>
      `;
      return;
    }

    prog.clients.forEach(client => {
      const activeClass = activeClientId === client.id ? 'active' : '';
      const initials = client.name.split(' ').map(n => n[0]).join('').toUpperCase();
      
      enrolledClientsList.innerHTML += `
        <div class="client-meta-info client-mobile-card ${activeClass}" data-id="${client.id}" style="padding:10px 12px; cursor:pointer; border-radius: var(--radius-sm); margin:0;">
          <div style="display:flex; align-items:center; gap:10px; width:100%;">
            <div class="client-table-avatar" style="width:32px; height:32px; font-size:0.75rem; flex-shrink:0;">${initials}</div>
            <div style="flex:1; min-width:0;">
              <h5 style="margin:0; font-size:0.82rem; font-weight:700; color:var(--text);">${client.name}</h5>
              <p style="margin:0; font-size:0.75rem; color:var(--text-muted);">${client.daysLeft} Days Left</p>
            </div>
            <button class="btn-card-action btn-select-client" style="padding:2px 6px; font-size:0.68rem;">Plan</button>
          </div>
        </div>
      `;
    });

    // Attach click triggers to clients
    const clientRows = enrolledClientsList.querySelectorAll('.client-meta-info');
    clientRows.forEach(row => {
      row.addEventListener('click', () => {
        activeClientId = row.getAttribute('data-id');
        renderClientsList();
        renderActiveClientSchedule();
      });
    });
  }

  // Render Day-by-Day Client Journey
  function renderActiveClientSchedule() {
    if (!activeClientId) {
      clientScheduleContainer.style.display = 'none';
      return;
    }
    clientScheduleContainer.style.display = 'block';

    const prog = programsData[activeProgramId];
    const client = prog.clients.find(c => c.id === activeClientId);
    if (!client) return;

    // Fill Client Info header
    scheduleClientName.textContent = client.name;
    scheduleProgramName.textContent = prog.name;
    scheduleDaysLeft.textContent = `${client.daysLeft} Days Left`;

    // Render Timeline based on Day
    dayJourneyTimeline.innerHTML = '';
    
    // Get schedule data or initialize empty
    if (!clientSchedules[activeClientId]) {
      clientSchedules[activeClientId] = {};
    }
    const sched = clientSchedules[activeClientId];

    Object.keys(prog.days).forEach(dayNum => {
      const dayTitle = prog.days[dayNum];
      const dayData = sched[dayNum] || { zoom: "", recording: "", task: "", followup: "" };

      // Generate action badges
      let zoomBadge = '';
      if (dayData.zoom) {
        zoomBadge = `<a href="${dayData.zoom}" target="_blank" class="badge badge-completed" style="display:inline-flex; align-items:center; gap:4px; text-decoration:none;"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:12px;height:12px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>Zoom Link</a>`;
      } else {
        zoomBadge = `<button class="btn-card-action btn-add-zoom" data-day="${dayNum}" style="padding:2px 6px; font-size:0.7rem;">+ Zoom</button>`;
      }

      let recordingBadge = '';
      if (dayData.recording) {
        recordingBadge = `<span class="badge badge-active" style="display:inline-flex; align-items:center; gap:4px;"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:12px;height:12px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><circle cx="12" cy="12" r="9" fill="none"/></svg>${dayData.recording}</span>`;
      } else {
        recordingBadge = `<button class="btn-card-action btn-upload-recording" data-day="${dayNum}" style="padding:2px 6px; font-size:0.7rem;">+ Recording</button>`;
      }

      let taskBadge = '';
      if (dayData.task) {
        taskBadge = `<span class="badge badge-inactive" style="display:inline-flex; align-items:center; gap:4px;"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:12px;height:12px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2"/></svg>${dayData.task}</span>`;
      } else {
        taskBadge = `<button class="btn-card-action btn-assign-task" data-day="${dayNum}" style="padding:2px 6px; font-size:0.7rem;">+ Task</button>`;
      }

      let followupBadge = '';
      if (dayData.followup) {
        followupBadge = `<span class="badge badge-pending" style="display:inline-flex; align-items:center; gap:4px;"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:12px;height:12px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>${dayData.followup}</span>`;
      } else {
        followupBadge = `<button class="btn-card-action btn-add-followup" data-day="${dayNum}" style="padding:2px 6px; font-size:0.7rem;">+ Follow Up</button>`;
      }

      dayJourneyTimeline.innerHTML += `
        <div style="background:var(--bg-app); border:1px solid var(--border); border-radius:var(--radius-sm); padding:16px; display:flex; flex-direction:column; gap:12px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong style="font-size:0.9rem; color:var(--text);">Day ${dayNum}: ${dayTitle}</strong>
            <span style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">Status: Pending</span>
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center;">
            ${zoomBadge}
            ${recordingBadge}
            ${taskBadge}
            ${followupBadge}
          </div>
        </div>
      `;
    });

    // Rebind Timeline Buttons
    bindTimelineActionButtons();
  }

  // Modals Interactions
  const enrollClientModal = document.getElementById('enrollClientModal');
  const btnEnrollClient = document.getElementById('btnEnrollClient');
  const btnCloseEnrollModal = document.getElementById('btnCloseEnrollModal');
  const btnCancelEnroll = document.getElementById('btnCancelEnroll');
  const enrollClientForm = document.getElementById('enrollClientForm');

  if (btnEnrollClient) {
    btnEnrollClient.addEventListener('click', () => {
      enrollClientModal.classList.add('active');
    });
  }

  function closeEnrollModal() {
    enrollClientModal.classList.remove('active');
    enrollClientForm.reset();
  }

  if (btnCloseEnrollModal) btnCloseEnrollModal.addEventListener('click', closeEnrollModal);
  if (btnCancelEnroll) btnCancelEnroll.addEventListener('click', closeEnrollModal);

  // Enroll Client submit
  if (enrollClientForm) {
    enrollClientForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('enrollClientName').value;
      const email = document.getElementById('enrollClientEmail').value;
      const totalDays = parseInt(document.getElementById('enrollDaysTotal').value);
      const daysLeft = parseInt(document.getElementById('enrollDaysLeft').value);

      const prog = programsData[activeProgramId];
      if (!prog) return;

      const newId = 'c_' + Date.now();
      prog.clients.push({ id: newId, name, email, daysLeft });

      // Initialize client schedule
      clientSchedules[newId] = {};
      Object.keys(prog.days).forEach(dayNum => {
        clientSchedules[newId][dayNum] = { zoom: "", recording: "", task: "", followup: "" };
      });

      activeClientId = newId;
      closeEnrollModal();
      renderClientsList();
      renderActiveClientSchedule();
      showToast("Client Enrolled", `${name} has been enrolled in ${prog.name}.`);
    });
  }

  // Edit Plan Modal
  const editClientEnrollmentModal = document.getElementById('editClientEnrollmentModal');
  const btnEditClientEnrollment = document.getElementById('btnEditClientEnrollment');
  const btnCloseEditModal = document.getElementById('btnCloseEditModal');
  const btnCancelEdit = document.getElementById('btnCancelEdit');
  const editClientEnrollmentForm = document.getElementById('editClientEnrollmentForm');

  if (btnEditClientEnrollment) {
    btnEditClientEnrollment.addEventListener('click', () => {
      const prog = programsData[activeProgramId];
      const client = prog.clients.find(c => c.id === activeClientId);
      if (!client) return;

      document.getElementById('editClientName').value = client.name;
      document.getElementById('editDaysLeft').value = client.daysLeft;

      editClientEnrollmentModal.classList.add('active');
    });
  }

  function closeEditModal() {
    editClientEnrollmentModal.classList.remove('active');
  }

  if (btnCloseEditModal) btnCloseEditModal.addEventListener('click', closeEditModal);
  if (btnCancelEdit) btnCancelEdit.addEventListener('click', closeEditModal);

  if (editClientEnrollmentForm) {
    editClientEnrollmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newDaysLeft = parseInt(document.getElementById('editDaysLeft').value);

      const prog = programsData[activeProgramId];
      const client = prog.clients.find(c => c.id === activeClientId);
      if (client) {
        client.daysLeft = newDaysLeft;
        renderClientsList();
        renderActiveClientSchedule();
        closeEditModal();
        showToast("Plan Saved", `${client.name}'s days left updated.`);
      }
    });
  }

  // Timeline Action Modals setup
  let selectedDayContext = null;

  // Zoom Modal
  const addZoomLinkModal = document.getElementById('addZoomLinkModal');
  const btnCloseZoomModal = document.getElementById('btnCloseZoomModal');
  const btnCancelZoom = document.getElementById('btnCancelZoom');
  const addZoomLinkForm = document.getElementById('addZoomLinkForm');

  // Recording Modal
  const uploadRecordingModal = document.getElementById('uploadRecordingModal');
  const btnCloseRecordingModal = document.getElementById('btnCloseRecordingModal');
  const btnCancelRecording = document.getElementById('btnCancelRecording');
  const uploadRecordingForm = document.getElementById('uploadRecordingForm');

  // Task Modal
  const assignProgramTaskModal = document.getElementById('assignProgramTaskModal');
  const btnCloseTaskModal = document.getElementById('btnCloseTaskModal');
  const btnCancelTask = document.getElementById('btnCancelTask');
  const assignProgramTaskForm = document.getElementById('assignProgramTaskForm');

  // Followup Modal
  const programFollowupModal = document.getElementById('programFollowupModal');
  const btnCloseFollowupModal = document.getElementById('btnCloseFollowupModal');
  const btnCancelFollowup = document.getElementById('btnCancelFollowup');
  const programFollowupForm = document.getElementById('programFollowupForm');

  function bindTimelineActionButtons() {
    // Zoom
    const zoomBtns = dayJourneyTimeline.querySelectorAll('.btn-add-zoom');
    zoomBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        selectedDayContext = btn.getAttribute('data-day');
        document.getElementById('zoomModalDayNum').textContent = selectedDayContext;
        addZoomLinkModal.classList.add('active');
      });
    });

    // Recording
    const recBtns = dayJourneyTimeline.querySelectorAll('.btn-upload-recording');
    recBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        selectedDayContext = btn.getAttribute('data-day');
        document.getElementById('recordingModalDayNum').textContent = selectedDayContext;
        uploadRecordingModal.classList.add('active');
      });
    });

    // Task
    const taskBtns = dayJourneyTimeline.querySelectorAll('.btn-assign-task');
    taskBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        selectedDayContext = btn.getAttribute('data-day');
        document.getElementById('taskModalDayNum').textContent = selectedDayContext;
        assignProgramTaskModal.classList.add('active');
      });
    });

    // Follow Up
    const fuBtns = dayJourneyTimeline.querySelectorAll('.btn-add-followup');
    fuBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        selectedDayContext = btn.getAttribute('data-day');
        document.getElementById('followupModalDayNum').textContent = selectedDayContext;
        programFollowupModal.classList.add('active');
      });
    });
  }

  // Zoom Form Submit
  if (addZoomLinkForm) {
    addZoomLinkForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = document.getElementById('zoomLinkInput').value;
      if (clientSchedules[activeClientId] && selectedDayContext) {
        if (!clientSchedules[activeClientId][selectedDayContext]) {
          clientSchedules[activeClientId][selectedDayContext] = { zoom: "", recording: "", task: "", followup: "" };
        }
        clientSchedules[activeClientId][selectedDayContext].zoom = val;
        renderActiveClientSchedule();
        addZoomLinkModal.classList.remove('active');
        showToast("Zoom Link Saved", `Meeting details added for Day ${selectedDayContext}.`);
      }
    });
  }

  // Recording Form Submit
  if (uploadRecordingForm) {
    uploadRecordingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = document.getElementById('recordingNameInput').value;
      if (clientSchedules[activeClientId] && selectedDayContext) {
        if (!clientSchedules[activeClientId][selectedDayContext]) {
          clientSchedules[activeClientId][selectedDayContext] = { zoom: "", recording: "", task: "", followup: "" };
        }
        clientSchedules[activeClientId][selectedDayContext].recording = val;
        renderActiveClientSchedule();
        uploadRecordingModal.classList.remove('active');
        showToast("Recording Added", `Session video recording linked for Day ${selectedDayContext}.`);
      }
    });
  }

  // Task Form Submit
  if (assignProgramTaskForm) {
    assignProgramTaskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = document.getElementById('programTaskInput').value;
      if (clientSchedules[activeClientId] && selectedDayContext) {
        if (!clientSchedules[activeClientId][selectedDayContext]) {
          clientSchedules[activeClientId][selectedDayContext] = { zoom: "", recording: "", task: "", followup: "" };
        }
        clientSchedules[activeClientId][selectedDayContext].task = val;
        renderActiveClientSchedule();
        assignProgramTaskModal.classList.remove('active');
        showToast("Task Assigned", `"${val}" has been added specifically for Day ${selectedDayContext}.`);
      }
    });
  }

  // Followup Form Submit
  if (programFollowupForm) {
    programFollowupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = document.getElementById('programFollowupInput').value;
      if (clientSchedules[activeClientId] && selectedDayContext) {
        if (!clientSchedules[activeClientId][selectedDayContext]) {
          clientSchedules[activeClientId][selectedDayContext] = { zoom: "", recording: "", task: "", followup: "" };
        }
        clientSchedules[activeClientId][selectedDayContext].followup = val;
        renderActiveClientSchedule();
        programFollowupModal.classList.remove('active');
        showToast("Follow Up Scheduled", `Set goals notes: "${val}" for Day ${selectedDayContext}.`);
      }
    });
  }

  // Close modals buttons binding
  if (btnCloseZoomModal) btnCloseZoomModal.addEventListener('click', () => addZoomLinkModal.classList.remove('active'));
  if (btnCancelZoom) btnCancelZoom.addEventListener('click', () => addZoomLinkModal.classList.remove('active'));
  
  if (btnCloseRecordingModal) btnCloseRecordingModal.addEventListener('click', () => uploadRecordingModal.classList.remove('active'));
  if (btnCancelRecording) btnCancelRecording.addEventListener('click', () => uploadRecordingModal.classList.remove('active'));

  if (btnCloseTaskModal) btnCloseTaskModal.addEventListener('click', () => assignProgramTaskModal.classList.remove('active'));
  if (btnCancelTask) btnCancelTask.addEventListener('click', () => assignProgramTaskModal.classList.remove('active'));

  if (btnCloseFollowupModal) btnCloseFollowupModal.addEventListener('click', () => programFollowupModal.classList.remove('active'));
  if (btnCancelFollowup) btnCancelFollowup.addEventListener('click', () => programFollowupModal.classList.remove('active'));

  // Toast alert system
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

  // Initial render
  renderProgramTabs();
  renderClientsList();
  renderActiveClientSchedule();
});
