export function getAdminDashboardHTML(): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Omnitratech Admin Dashboard</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background: #f5f5f5;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
        }

        header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        header h1 {
            font-size: 24px;
        }

        .logout-btn {
            background: rgba(255,255,255,0.2);
            border: 1px solid white;
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            transition: background 0.3s;
        }

        .logout-btn:hover {
            background: rgba(255,255,255,0.3);
        }

        .auth-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .login-form {
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            width: 100%;
            max-width: 400px;
        }

        .login-form h2 {
            text-align: center;
            margin-bottom: 30px;
            color: #333;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #555;
            font-weight: 500;
        }

        .form-group input {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
        }

        .form-group input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .login-btn {
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
        }

        .login-btn:hover {
            transform: translateY(-2px);
        }

        .login-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .dashboard-main {
            padding: 20px;
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            text-align: center;
        }

        .stat-card h3 {
            color: #667eea;
            font-size: 28px;
            margin-bottom: 10px;
        }

        .stat-card p {
            color: #666;
            font-size: 14px;
        }

        .section {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .section h2 {
            margin-bottom: 20px;
            color: #333;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
        }

        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .add-btn {
            background: #667eea;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            transition: background 0.3s;
        }

        .add-btn:hover {
            background: #764ba2;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th {
            background: #f8f9fa;
            padding: 12px;
            text-align: left;
            font-weight: 600;
            color: #333;
            border-bottom: 2px solid #ddd;
        }

        td {
            padding: 12px;
            border-bottom: 1px solid #eee;
        }

        .actions {
            display: flex;
            gap: 10px;
        }

        .edit-btn, .delete-btn {
            padding: 6px 12px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            transition: opacity 0.2s;
        }

        .edit-btn {
            background: #667eea;
            color: white;
        }

        .delete-btn {
            background: #ef4444;
            color: white;
        }

        .edit-btn:hover, .delete-btn:hover {
            opacity: 0.8;
        }

        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 1000;
            align-items: center;
            justify-content: center;
        }

        .modal.active {
            display: flex;
        }

        .modal-content {
            background: white;
            padding: 30px;
            border-radius: 8px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .close-btn {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        }

        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }

        .form-grid.full {
            grid-template-columns: 1fr;
        }

        .form-actions {
            display: flex;
            gap: 10px;
            margin-top: 20px;
            justify-content: flex-end;
        }

        .cancel-btn, .save-btn {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }

        .cancel-btn {
            background: #e5e7eb;
            color: #333;
        }

        .save-btn {
            background: #667eea;
            color: white;
        }

        .error {
            background: #fee;
            color: #c33;
            padding: 12px;
            border-radius: 4px;
            margin-bottom: 20px;
            display: none;
        }

        .error.show {
            display: block;
        }

        .success {
            background: #efe;
            color: #3c3;
            padding: 12px;
            border-radius: 4px;
            margin-bottom: 20px;
            display: none;
        }

        .success.show {
            display: block;
        }

        .tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            border-bottom: 2px solid #eee;
        }

        .tab {
            padding: 12px 20px;
            background: none;
            border: none;
            cursor: pointer;
            color: #666;
            font-weight: 500;
            border-bottom: 3px solid transparent;
            transition: all 0.3s;
        }

        .tab.active {
            color: #667eea;
            border-bottom-color: #667eea;
        }

        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
        }
    </style>
</head>
<body>
    <div id="auth-view" class="auth-container">
        <form class="login-form" id="login-form">
            <h2>Admin Login</h2>
            <div class="error" id="login-error"></div>
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit" class="login-btn">Login</button>
        </form>
    </div>

    <div id="dashboard-view" style="display: none;">
        <header>
            <h1>Omnitratech Admin Dashboard</h1>
            <button class="logout-btn" onclick="logout()">Logout</button>
        </header>

        <div class="container dashboard-main">
            <div class="stats" id="stats"></div>

            <div class="tabs">
                <button class="tab active" onclick="switchTab('services')">Services</button>
                <button class="tab" onclick="switchTab('resources')">Resources</button>
                <button class="tab" onclick="switchTab('jobs')">Jobs</button>
                <button class="tab" onclick="switchTab('industries')">Industries</button>
            </div>

            <!-- Services Section -->
            <div id="services" class="tab-content active">
                <div class="section">
                    <div class="section-header">
                        <h2>Services</h2>
                        <button class="add-btn" onclick="openModal('service')">Add Service</button>
                    </div>
                    <div class="error" id="service-error"></div>
                    <div class="success" id="service-success"></div>
                    <div id="services-list"></div>
                </div>
            </div>

            <!-- Resources Section -->
            <div id="resources" class="tab-content">
                <div class="section">
                    <div class="section-header">
                        <h2>Resources</h2>
                        <button class="add-btn" onclick="openModal('resource')">Add Resource</button>
                    </div>
                    <div class="error" id="resource-error"></div>
                    <div class="success" id="resource-success"></div>
                    <div id="resources-list"></div>
                </div>
            </div>

            <!-- Jobs Section -->
            <div id="jobs" class="tab-content">
                <div class="section">
                    <div class="section-header">
                        <h2>Jobs</h2>
                        <button class="add-btn" onclick="openModal('job')">Add Job</button>
                    </div>
                    <div class="error" id="job-error"></div>
                    <div class="success" id="job-success"></div>
                    <div id="jobs-list"></div>
                </div>
            </div>

            <!-- Industries Section -->
            <div id="industries" class="tab-content">
                <div class="section">
                    <div class="section-header">
                        <h2>Industries</h2>
                        <button class="add-btn" onclick="openModal('industry')">Add Industry</button>
                    </div>
                    <div class="error" id="industry-error"></div>
                    <div class="success" id="industry-success"></div>
                    <div id="industries-list"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal for Adding/Editing -->
    <div class="modal" id="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modal-title">Add Item</h2>
                <button class="close-btn" onclick="closeModal()">&times;</button>
            </div>
            <form id="modal-form">
                <div id="form-fields"></div>
                <div class="form-actions">
                    <button type="button" class="cancel-btn" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="save-btn">Save</button>
                </div>
            </form>
        </div>
    </div>

    <script>
        const API_URL = '/api';
        let authToken = localStorage.getItem('adminToken');
        let currentType = 'service';
        let editingId = null;

        const formConfigs = {
            service: [
                { name: 'name', label: 'Service Name', type: 'text' },
                { name: 'description', label: 'Description', type: 'textarea' },
                { name: 'icon', label: 'Icon URL', type: 'text' },
                { name: 'features', label: 'Features (comma-separated)', type: 'text' }
            ],
            resource: [
                { name: 'title', label: 'Title', type: 'text' },
                { name: 'description', label: 'Description', type: 'textarea' },
                { name: 'category', label: 'Category', type: 'text' },
                { name: 'url', label: 'URL', type: 'text' }
            ],
            job: [
                { name: 'title', label: 'Job Title', type: 'text' },
                { name: 'department', label: 'Department', type: 'text' },
                { name: 'location', label: 'Location', type: 'text' },
                { name: 'description', label: 'Description', type: 'textarea' },
                { name: 'requirements', label: 'Requirements', type: 'textarea' }
            ],
            industry: [
                { name: 'name', label: 'Industry Name', type: 'text' },
                { name: 'description', label: 'Description', type: 'textarea' },
                { name: 'image', label: 'Image URL', type: 'text' },
                { name: 'expertise', label: 'Expertise (comma-separated)', type: 'text' }
            ]
        };

        window.addEventListener('load', () => {
            if (authToken) {
                showDashboard();
                loadStats();
                loadServices();
            }
        });

        document.getElementById('login-form').addEventListener('submit', login);

        async function login(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch(\`\${API_URL}/admin/login\`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                if (!response.ok) throw new Error('Invalid credentials');

                const data = await response.json();
                authToken = data.token;
                localStorage.setItem('adminToken', authToken);
                showDashboard();
                loadStats();
                loadServices();
            } catch (error) {
                document.getElementById('login-error').textContent = error.message;
                document.getElementById('login-error').classList.add('show');
            }
        }

        function logout() {
            localStorage.removeItem('adminToken');
            authToken = null;
            document.getElementById('auth-view').style.display = 'flex';
            document.getElementById('dashboard-view').style.display = 'none';
            document.getElementById('login-form').reset();
        }

        function showDashboard() {
            document.getElementById('auth-view').style.display = 'none';
            document.getElementById('dashboard-view').style.display = 'block';
        }

        async function loadStats() {
            try {
                const response = await fetch(\`\${API_URL}/admin/stats\`, {
                    headers: { 'Authorization': \`Bearer \${authToken}\` }
                });
                const data = await response.json();
                document.getElementById('stats').innerHTML = \`
                    <div class="stat-card">
                        <h3>\${data.services}</h3>
                        <p>Services</p>
                    </div>
                    <div class="stat-card">
                        <h3>\${data.resources}</h3>
                        <p>Resources</p>
                    </div>
                    <div class="stat-card">
                        <h3>\${data.jobs}</h3>
                        <p>Jobs</p>
                    </div>
                    <div class="stat-card">
                        <h3>\${data.industries}</h3>
                        <p>Industries</p>
                    </div>
                \`;
            } catch (error) {
                console.error('Error loading stats:', error);
            }
        }

        function switchTab(tab) {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            event.target.classList.add('active');
            document.getElementById(tab).classList.add('active');
            
            if (tab === 'services') loadServices();
            else if (tab === 'resources') loadResources();
            else if (tab === 'jobs') loadJobs();
            else if (tab === 'industries') loadIndustries();
        }

        async function loadServices() {
            try {
                const response = await fetch(\`\${API_URL}/admin/services\`, {
                    headers: { 'Authorization': \`Bearer \${authToken}\` }
                });
                const services = await response.json();
                renderTable('services-list', services, 'service');
            } catch (error) {
                console.error('Error loading services:', error);
            }
        }

        async function loadResources() {
            try {
                const response = await fetch(\`\${API_URL}/admin/resources\`, {
                    headers: { 'Authorization': \`Bearer \${authToken}\` }
                });
                const resources = await response.json();
                renderTable('resources-list', resources, 'resource');
            } catch (error) {
                console.error('Error loading resources:', error);
            }
        }

        async function loadJobs() {
            try {
                const response = await fetch(\`\${API_URL}/admin/jobs\`, {
                    headers: { 'Authorization': \`Bearer \${authToken}\` }
                });
                const jobs = await response.json();
                renderTable('jobs-list', jobs, 'job');
            } catch (error) {
                console.error('Error loading jobs:', error);
            }
        }

        async function loadIndustries() {
            try {
                const response = await fetch(\`\${API_URL}/admin/industries\`, {
                    headers: { 'Authorization': \`Bearer \${authToken}\` }
                });
                const industries = await response.json();
                renderTable('industries-list', industries, 'industry');
            } catch (error) {
                console.error('Error loading industries:', error);
            }
        }

        function renderTable(elementId, items, type) {
            const container = document.getElementById(elementId);
            if (items.length === 0) {
                container.innerHTML = '<p style="text-align: center; color: #666;">No items yet</p>';
                return;
            }

            let html = '<table>';
            const keys = Object.keys(items[0]).filter(k => k !== 'id' && k !== 'createdAt' && k !== 'updatedAt').slice(0, 3);
            
            html += '<tr><th>' + keys.join('</th><th>') + '</th><th>Actions</th></tr>';
            
            items.forEach(item => {
                html += '<tr>';
                keys.forEach(key => {
                    let value = item[key];
                    if (typeof value === 'object') value = JSON.stringify(value).substring(0, 50);
                    if (typeof value === 'string' && value.length > 50) value = value.substring(0, 50) + '...';
                    html += \`<td>\${value}</td>\`;
                });
                html += \`<td class="actions">
                    <button class="edit-btn" onclick="editItem('\${type}', '\${item.id}')">Edit</button>
                    <button class="delete-btn" onclick="deleteItem('\${type}', '\${item.id}')">Delete</button>
                </td></tr>\`;
            });
            
            html += '</table>';
            container.innerHTML = html;
        }

        function openModal(type) {
            currentType = type;
            editingId = null;
            const config = formConfigs[type];
            let html = '';
            
            config.forEach(field => {
                if (field.type === 'textarea') {
                    html += \`<div class="form-group full">
                        <label>\${field.label}</label>
                        <textarea name="\${field.name}" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-family: inherit;"></textarea>
                    </div>\`;
                } else {
                    html += \`<div class="form-group">
                        <label>\${field.label}</label>
                        <input type="\${field.type}" name="\${field.name}" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                    </div>\`;
                }
            });

            document.getElementById('form-fields').innerHTML = html;
            document.getElementById('modal-title').textContent = \`Add \${type.charAt(0).toUpperCase() + type.slice(1)}\`;
            document.getElementById('modal').classList.add('active');
            document.getElementById('modal-form').onsubmit = (e) => saveItem(e, type);
        }

        async function editItem(type, id) {
            currentType = type;
            editingId = id;
            document.getElementById('modal-title').textContent = \`Edit \${type.charAt(0).toUpperCase() + type.slice(1)}\`;
            
            try {
                const response = await fetch(\`\${API_URL}/admin/\${type}s\`, {
                    headers: { 'Authorization': \`Bearer \${authToken}\` }
                });
                const items = await response.json();
                const item = items.find(i => i.id === id);
                
                const config = formConfigs[type];
                let html = '';
                
                config.forEach(field => {
                    const value = item[field.name] || '';
                    if (field.type === 'textarea') {
                        html += \`<div class="form-group full">
                            <label>\${field.label}</label>
                            <textarea name="\${field.name}" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-family: inherit;">\${value}</textarea>
                        </div>\`;
                    } else {
                        html += \`<div class="form-group">
                            <label>\${field.label}</label>
                            <input type="\${field.type}" name="\${field.name}" value="\${value}" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                        </div>\`;
                    }
                });

                document.getElementById('form-fields').innerHTML = html;
                document.getElementById('modal').classList.add('active');
                document.getElementById('modal-form').onsubmit = (e) => saveItem(e, type);
            } catch (error) {
                console.error('Error loading item:', error);
            }
        }

        async function deleteItem(type, id) {
            if (!confirm('Are you sure?')) return;
            
            try {
                const response = await fetch(\`\${API_URL}/admin/\${type}s/\${id}\`, {
                    method: 'DELETE',
                    headers: { 'Authorization': \`Bearer \${authToken}\` }
                });
                
                if (response.ok) {
                    showSuccess(type, 'Item deleted successfully');
                    if (type === 'service') loadServices();
                    else if (type === 'resource') loadResources();
                    else if (type === 'job') loadJobs();
                    else if (type === 'industry') loadIndustries();
                }
            } catch (error) {
                showError(type, 'Error deleting item');
            }
        }

        async function saveItem(e, type) {
            e.preventDefault();
            const form = document.getElementById('modal-form');
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            const method = editingId ? 'PUT' : 'POST';
            const url = editingId ? \`\${API_URL}/admin/\${type}s/\${editingId}\` : \`\${API_URL}/admin/\${type}s\`;

            try {
                const response = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': \`Bearer \${authToken}\`
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    closeModal();
                    showSuccess(type, editingId ? 'Item updated successfully' : 'Item added successfully');
                    
                    if (type === 'service') loadServices();
                    else if (type === 'resource') loadResources();
                    else if (type === 'job') loadJobs();
                    else if (type === 'industry') loadIndustries();
                    
                    loadStats();
                }
            } catch (error) {
                showError(type, 'Error saving item');
            }
        }

        function closeModal() {
            document.getElementById('modal').classList.remove('active');
            document.getElementById('modal-form').reset();
            editingId = null;
        }

        function showError(type, message) {
            const el = document.getElementById(\`\${type}-error\`);
            el.textContent = message;
            el.classList.add('show');
            setTimeout(() => el.classList.remove('show'), 3000);
        }

        function showSuccess(type, message) {
            const el = document.getElementById(\`\${type}-success\`);
            el.textContent = message;
            el.classList.add('show');
            setTimeout(() => el.classList.remove('show'), 3000);
        }
    </script>
</body>
</html>
`;
}
