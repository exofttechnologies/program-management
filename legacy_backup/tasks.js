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

  // Tasks Data Database
  const tasksData = {
    t1: {
      title: "Define OKRs for Next Quarter",
      client: "Muhammed Al-Harbi",
      program: "Executive Coaching Program",
      dueDate: "2026-06-05",
      priority: "high",
      status: "submitted",
      progress: 100,
      assignedBy: "Sarah Anderson",
      desc: "Audit your team workflows and formulate three core Objective Key Results (OKRs) for your operations targets next quarter. Submit as PDF or list in text response.",
      response: "I have audited our workflows and set these three OKRs:\n1. Reduce database response lags by 25%.\n2. Standardize meeting delegation protocols.\n3. Automate two steps in SaaS customer onboarding.",
      file: "Executive OKR Audit.pdf",
      fileSize: "1.2 MB"
    },
    t2: {
      title: "Conduct Meeting Audit Report",
      client: "Fathima Zahra",
      program: "Executive Coaching Program",
      dueDate: "2026-06-04",
      priority: "high",
      status: "overdue",
      progress: 0,
      assignedBy: "Sarah Anderson",
      desc: "Track the duration, attendee counts, and output of your daily operation sync meetings for 5 days. Summarize boundary metrics and recommendations.",
      response: "",
      file: "",
      fileSize: ""
    },
    t3: {
      title: "Update LinkedIn Headline & Summary",
      client: "Ameen Shafi",
      program: "Career Transition Mastery",
      dueDate: "2026-06-07",
      priority: "medium",
      status: "progress",
      progress: 50,
      assignedBy: "Sarah Anderson",
      desc: "Optimize your professional bio summary and headline keywords to target junior and mid-level SaaS Product Manager positions.",
      response: "",
      file: "",
      fileSize: ""
    },
    t4: {
      title: "7-Day Sleep Diary Log",
      client: "Emily Watson",
      program: "Personal Wellness & Biohacking",
      dueDate: "2026-06-12",
      priority: "low",
      status: "pending",
      progress: 0,
      assignedBy: "Sarah Anderson",
      desc: "Log daily sleep scores, recovery ratings, caffeine intake windows, and evening screen times using our tracking sheets.",
      response: "",
      file: "",
      fileSize: ""
    },
    t5: {
      title: "Salary Review Script Prep",
      client: "Rashid Khan",
      program: "Career Transition Mastery",
      dueDate: "2026-06-02",
      priority: "medium",
      status: "completed",
      progress: 100,
      assignedBy: "Sarah Anderson",
      desc: "Draft negotiating scripts based on standard base salary guidelines, health perks, and stock incentives for your new offer.",
      response: "Negotiated base salary by 12% successfully and finalized transition logistics.",
      file: "",
      fileSize: ""
    }
  };

  const tasksTableBody = document.getElementById('tasksTableBody');
  const tasksMobileContainer = document.getElementById('tasksMobileContainer');
  const tasksEmptyState = document.getElementById('tasksEmptyState');

  const searchTasksInput = document.getElementById('searchTasksInput');
  const taskPriorityFilter = document.getElementById('taskPriorityFilter');
  const taskStatusFilter = document.getElementById('taskStatusFilter');

  const btnListView = document.getElementById('btnListView');
  const btnKanbanView = document.getElementById('btnKanbanView');
  let currentView = 'list'; // 'list' or 'kanban'
  let activeDetailsTaskId = null;

  // View Switcher logic
  if (btnListView) {
    btnListView.addEventListener('click', () => {
      currentView = 'list';
      btnListView.classList.add('active');
      btnKanbanView.classList.remove('active');
      document.getElementById('tasksTableContainer').style.display = 'block';
      document.getElementById('tasksKanbanContainer').style.display = 'none';
      renderTasks();
    });
  }

  if (btnKanbanView) {
    btnKanbanView.addEventListener('click', () => {
      currentView = 'kanban';
      btnKanbanView.classList.add('active');
      btnListView.classList.remove('active');
      document.getElementById('tasksTableContainer').style.display = 'none';
      document.getElementById('tasksKanbanContainer').style.display = 'grid';
      renderTasks();
    });
  }

  // Recalculate stats card values
  function updateStats() {
    const list = Object.values(tasksData);
    const total = list.length;
    const pending = list.filter(t => t.status === 'submitted').length;
    const completed = list.filter(t => t.status === 'completed').length;
    const overdue = list.filter(t => t.status === 'overdue').length;

    document.getElementById('stat-total-tasks').textContent = total;
    document.getElementById('stat-pending-tasks').textContent = pending;
    document.getElementById('stat-completed-tasks').textContent = completed;
    document.getElementById('stat-overdue-tasks').textContent = overdue;
  }

  // Render List View Rows
  function renderListView(tasks) {
    tasksTableBody.innerHTML = '';
    
    tasks.forEach(task => {
      let priorityClass = `badge-priority-${task.priority}`;
      let statusClass = `badge-${task.status}`;
      let statusText = task.status === 'pending' ? 'To Do' : task.status.charAt(0).toUpperCase() + task.status.slice(1);
      if (task.status === 'progress') statusText = 'In Progress';

      const clientInitials = task.client.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

      // Format Due Date
      const formattedDate = new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit' });

      tasksTableBody.innerHTML += `
        <tr data-id="${task.id}">
          <td><strong style="cursor:pointer;" class="btn-task-details">${task.title}</strong></td>
          <td>
            <div style="display:flex; align-items:center; gap:8px;">
              <div class="task-list-avatar">${clientInitials}</div>
              <span style="font-size:0.85rem; font-weight:600;">${task.client}</span>
            </div>
          </td>
          <td><span style="font-size:0.8rem; color:var(--text-secondary);">${task.program}</span></td>
          <td><span style="font-size:0.8rem; font-weight:600;">${formattedDate}</span></td>
          <td><span class="badge ${priorityClass}">${task.priority.toUpperCase()}</span></td>
          <td><span class="badge ${statusClass}">${statusText}</span></td>
          <td>
            <div style="display:flex; align-items:center; gap:6px;">
              <div class="progress-bar-bg" style="width:60px;"><div class="progress-bar-fill" style="width:${task.progress}%"></div></div>
              <span style="font-size:0.75rem; font-weight:600;">${task.progress}%</span>
            </div>
          </td>
          <td><span style="font-size:0.8rem;">${task.assignedBy}</span></td>
          <td style="text-align:right;">
            <div style="display:flex; gap:8px; justify-content:flex-end;">
              <button class="btn-card-action btn-task-details" style="padding:4px 8px; font-size:0.75rem;">Review</button>
            </div>
          </td>
        </tr>
      `;
    });
  }

  // Render Kanban View Columns
  function renderKanbanView(tasks) {
    // Clear columns
    const columns = {
      pending: document.querySelector('[data-status="pending"]'),
      progress: document.querySelector('[data-status="progress"]'),
      submitted: document.querySelector('[data-status="submitted"]'),
      completed: document.querySelector('[data-status="completed"]')
    };

    // Reset columns content
    Object.values(columns).forEach(col => col.innerHTML = '');

    tasks.forEach(task => {
      // Group overdue/pending into 'pending' column or represent overdue clearly
      let targetColKey = task.status;
      if (task.status === 'overdue') targetColKey = 'pending';

      const col = columns[targetColKey];
      if (!col) return;

      let priorityClass = `badge-priority-${task.priority}`;
      const formattedDate = new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit' });

      // Kanban Card Template
      col.innerHTML += `
        <div class="kanban-card" draggable="true" data-id="${task.id}">
          <span class="badge ${priorityClass}" style="align-self:flex-start;">${task.priority.toUpperCase()}</span>
          <div class="kanban-card-title btn-task-details" style="cursor:pointer;">${task.title}</div>
          <div class="kanban-card-prog-tag">${task.client}</div>
          <div class="kanban-card-meta">
            <span>Due: ${formattedDate}</span>
            <span style="color:var(--primary); font-size:0.7rem; font-weight:600;">${task.program.substring(0,18)}...</span>
          </div>
        </div>
      `;
    });

    // Update column counters
    document.getElementById('count-pending').textContent = columns.pending.children.length;
    document.getElementById('count-progress').textContent = columns.progress.children.length;
    document.getElementById('count-submitted').textContent = columns.submitted.children.length;
    document.getElementById('count-completed').textContent = columns.completed.children.length;

    // Attach Drag and Drop Event Listeners
    initDragAndDrop();
  }

  // Render Mobile Cards
  function renderMobileView(tasks) {
    tasksMobileContainer.innerHTML = '';
    tasks.forEach(task => {
      let statusClass = `badge-${task.status}`;
      let statusText = task.status === 'pending' ? 'To Do' : task.status.charAt(0).toUpperCase() + task.status.slice(1);
      if (task.status === 'progress') statusText = 'In Progress';

      tasksMobileContainer.innerHTML += `
        <div class="client-mobile-card btn-task-details" data-id="${task.id}">
          <div class="client-card-header">
            <div>
              <div class="client-card-name">${task.title}</div>
              <div class="client-card-prog">Client: ${task.client}</div>
            </div>
            <span class="badge ${statusClass}">${statusText}</span>
          </div>
          <div>
            <div class="progress-bar-label" style="font-size: 0.72rem; margin-bottom: 4px;"><span>Progress</span><span>${task.progress}%</span></div>
            <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${task.progress}%"></div></div>
          </div>
          <div class="client-card-footer">
            <span>Due: ${task.dueDate}</span>
            <span>Priority: ${task.priority.toUpperCase()}</span>
          </div>
        </div>
      `;
    });
  }

  // Central Render Logic
  function renderTasks() {
    updateStats();

    const searchVal = searchTasksInput.value.toLowerCase();
    const priorityVal = taskPriorityFilter.value;
    const statusVal = taskStatusFilter.value;

    let filtered = Object.keys(tasksData).map(key => ({ id: key, ...tasksData[key] }));

    // Apply Filter
    filtered = filtered.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchVal) ||
                            task.client.toLowerCase().includes(searchVal) ||
                            task.program.toLowerCase().includes(searchVal);
      const matchesPriority = priorityVal === 'all' || task.priority === priorityVal;
      const matchesStatus = statusVal === 'all' || task.status === statusVal;
      return matchesSearch && matchesPriority && matchesStatus;
    });

    if (filtered.length === 0) {
      tasksEmptyState.style.display = 'block';
      document.getElementById('tasksTableContainer').style.display = 'none';
      document.getElementById('tasksKanbanContainer').style.display = 'none';
      tasksMobileContainer.style.display = 'none';
      return;
    }

    tasksEmptyState.style.display = 'none';

    // Responsiveness routing
    if (window.innerWidth > 768) {
      tasksMobileContainer.style.display = 'none';
      if (currentView === 'list') {
        document.getElementById('tasksTableContainer').style.display = 'block';
        document.getElementById('tasksKanbanContainer').style.display = 'none';
        renderListView(filtered);
      } else {
        document.getElementById('tasksTableContainer').style.display = 'none';
        document.getElementById('tasksKanbanContainer').style.display = 'grid';
        renderKanbanView(filtered);
      }
    } else {
      document.getElementById('tasksTableContainer').style.display = 'none';
      document.getElementById('tasksKanbanContainer').style.display = 'none';
      tasksMobileContainer.style.display = 'flex';
      renderMobileView(filtered);
    }
  }

  // HTML5 Drag and Drop Handlers
  function initDragAndDrop() {
    const cards = document.querySelectorAll('.kanban-card');
    const columnBodies = document.querySelectorAll('.kanban-column-body');

    cards.forEach(card => {
      card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', card.getAttribute('data-id'));
        setTimeout(() => card.style.display = 'none', 0);
      });

      card.addEventListener('dragend', () => {
        card.style.display = 'flex';
        // Reset highlights
        columnBodies.forEach(col => col.classList.remove('drag-over'));
      });
    });

    columnBodies.forEach(col => {
      col.addEventListener('dragover', (e) => {
        e.preventDefault();
        col.classList.add('drag-over');
      });

      col.addEventListener('dragenter', (e) => {
        e.preventDefault();
      });

      col.addEventListener('dragleave', () => {
        col.classList.remove('drag-over');
      });

      col.addEventListener('drop', (e) => {
        e.preventDefault();
        col.classList.remove('drag-over');
        
        const taskId = e.dataTransfer.getData('text/plain');
        const newStatus = col.getAttribute('data-status');

        if (taskId && tasksData[taskId]) {
          const oldStatus = tasksData[taskId].status;
          tasksData[taskId].status = newStatus;

          // Adjust progress indicator accordingly
          if (newStatus === 'completed') {
            tasksData[taskId].progress = 100;
          } else if (newStatus === 'pending') {
            tasksData[taskId].progress = 0;
          } else if (newStatus === 'progress') {
            tasksData[taskId].progress = 50;
          }

          renderTasks();
          showToast("Task Status Updated", `Moved to "${newStatus.toUpperCase()}" column.`);
        }
      });
    });
  }

  // Form Submit: Create Task
  const createTaskModal = document.getElementById('createTaskModal');
  const btnCloseTaskModal = document.getElementById('btnCloseTaskModal');
  const btnCancelTask = document.getElementById('btnCancelTask');
  const createTaskForm = document.getElementById('createTaskForm');

  const createTaskBtns = document.querySelectorAll('#createTaskBtnTop, #createFirstTaskBtn, #floatingCreateTaskBtn');
  createTaskBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      createTaskModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeTaskModal() {
    createTaskModal.classList.remove('active');
    document.body.style.overflow = '';
    createTaskForm.reset();
  }

  if (btnCloseTaskModal) btnCloseTaskModal.addEventListener('click', closeTaskModal);
  if (btnCancelTask) btnCancelTask.addEventListener('click', closeTaskModal);

  // Submit Handler
  if (createTaskForm) {
    createTaskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      saveTaskData(false);
    });
  }

  const btnSaveAssignAnother = document.getElementById('btnSaveAssignAnother');
  if (btnSaveAssignAnother) {
    btnSaveAssignAnother.addEventListener('click', () => {
      saveTaskData(true);
    });
  }

  function saveTaskData(assignAnother) {
    const title = document.getElementById('taskTitleInput').value;
    const desc = document.getElementById('taskDescInput').value;
    const program = document.getElementById('taskProgramSelect').value;
    const client = document.getElementById('taskClientSelect').value;
    const dueDate = document.getElementById('taskDueDateInput').value;
    const priority = document.getElementById('taskPrioritySelect').value;
    const resource = document.getElementById('taskResourceAttach').value;
    const coachNotes = document.getElementById('taskCoachNotes').value;

    if (!title || !desc || !dueDate) {
      alert("Please fill in all required fields.");
      return;
    }

    const newId = 't_' + Date.now();
    tasksData[newId] = {
      title: title,
      client: client,
      program: program,
      dueDate: dueDate,
      priority: priority,
      status: 'pending',
      progress: 0,
      assignedBy: "Sarah Anderson",
      desc: desc,
      response: "",
      file: "",
      fileSize: ""
    };

    renderTasks();
    showToast("Task Created", `Assigned "${title}" to ${client}.`);

    if (assignAnother) {
      document.getElementById('taskTitleInput').value = '';
      document.getElementById('taskDescInput').value = '';
      document.getElementById('taskDueDateInput').value = '';
    } else {
      closeTaskModal();
    }
  }

  // Task Details Page Overlay
  const taskDetailsOverlay = document.getElementById('taskDetailsOverlay');
  const btnBackTasks = document.getElementById('btnBackTasks');

  function openTaskDetails(taskId) {
    const task = tasksData[taskId];
    if (!task) return;

    activeDetailsTaskId = taskId;

    document.getElementById('detailsTaskTitle').textContent = task.title;
    document.getElementById('detailsTaskMeta').textContent = `Assigned to: ${task.client} • Program: ${task.program}`;
    document.getElementById('detailsTaskDesc').textContent = task.desc;

    // Badges
    const statusBadge = document.getElementById('detailsTaskStatusBadge');
    let statusClass = `badge-${task.status}`;
    let statusText = task.status === 'pending' ? 'To Do' : task.status.charAt(0).toUpperCase() + task.status.slice(1);
    if (task.status === 'progress') statusText = 'In Progress';
    statusBadge.className = `badge ${statusClass}`;
    statusBadge.textContent = statusText;

    const prioBadge = document.getElementById('detailsTaskPriorityBadge');
    prioBadge.className = `badge badge-priority-${task.priority}`;
    prioBadge.textContent = `${task.priority.toUpperCase()} PRIORITY`;

    // Response response details
    const submissionWidget = document.getElementById('clientSubmissionWidget');
    if (task.status === 'submitted' || task.status === 'completed') {
      submissionWidget.style.display = 'block';
      document.getElementById('detailsTextResponse').textContent = task.response ? `"${task.response}"` : "No text comments provided.";
      
      const fileBox = document.getElementById('detailsSubmittedFiles');
      if (task.file) {
        fileBox.innerHTML = `
          <div class="resource-box-item" style="max-width:320px;">
            <div class="resource-icon-wrap pdf"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:20px;height:20px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg></div>
            <div class="resource-details">
              <h5>${task.file}</h5>
              <p>${task.fileSize}</p>
            </div>
          </div>
        `;
      } else {
        fileBox.innerHTML = '<span style="font-size:0.8rem; color:var(--text-muted);">No attached file files.</span>';
      }
    } else {
      submissionWidget.style.display = 'none';
    }

    // Reset feedback form
    document.getElementById('coachFeedbackNotesInput').value = '';
    document.getElementById('requireRevisionCheckbox').checked = false;

    taskDetailsOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  if (btnBackTasks) {
    btnBackTasks.addEventListener('click', () => {
      taskDetailsOverlay.classList.remove('active');
      document.body.style.overflow = '';
      activeDetailsTaskId = null;
    });
  }

  // Approve & Reject review clicks
  const btnApproveTask = document.getElementById('btnApproveTask');
  if (btnApproveTask) {
    btnApproveTask.addEventListener('click', () => {
      if (!activeDetailsTaskId || !tasksData[activeDetailsTaskId]) return;

      tasksData[activeDetailsTaskId].status = 'completed';
      tasksData[activeDetailsTaskId].progress = 100;
      
      const fbNotes = document.getElementById('coachFeedbackNotesInput').value;
      
      renderTasks();
      taskDetailsOverlay.classList.remove('active');
      document.body.style.overflow = '';
      showToast("Task Approved", "Client progress updated and milestone checked off.");
    });
  }

  const btnRejectTask = document.getElementById('btnRejectTask');
  if (btnRejectTask) {
    btnRejectTask.addEventListener('click', () => {
      if (!activeDetailsTaskId || !tasksData[activeDetailsTaskId]) return;

      tasksData[activeDetailsTaskId].status = 'progress';
      tasksData[activeDetailsTaskId].progress = 40; // set back progress
      
      renderTasks();
      taskDetailsOverlay.classList.remove('active');
      document.body.style.overflow = '';
      showToast("Revision Requested", "Client has been notified to re-submit progress.");
    });
  }

  // Bind clicks to details view
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.btn-task-details');
    if (trigger) {
      const row = trigger.closest('tr');
      const card = trigger.closest('.kanban-card');
      const mobCard = trigger.closest('.client-mobile-card');
      
      let taskId = null;
      if (row) taskId = row.getAttribute('data-id');
      else if (card) taskId = card.getAttribute('data-id');
      else if (mobCard) taskId = mobCard.getAttribute('data-id');

      if (taskId) openTaskDetails(taskId);
    }
  });

  // Search/Filters Events
  if (searchTasksInput) searchTasksInput.addEventListener('input', renderTasks);
  if (taskPriorityFilter) taskPriorityFilter.addEventListener('change', renderTasks);
  if (taskStatusFilter) taskStatusFilter.addEventListener('change', renderTasks);

  const clearTasksFiltersBtn = document.getElementById('clearTasksFiltersBtn');
  if (clearTasksFiltersBtn) {
    clearTasksFiltersBtn.addEventListener('click', () => {
      searchTasksInput.value = '';
      taskPriorityFilter.value = 'all';
      taskStatusFilter.value = 'all';
      renderTasks();
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

  // Init render & resize sync
  renderTasks();
  window.addEventListener('resize', renderTasks);
});
