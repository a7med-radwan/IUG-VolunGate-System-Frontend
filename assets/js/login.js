document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const btnChangeRole = document.getElementById('btn-change-role');
    const roleDropdown = document.getElementById('role-dropdown');
    const serviceBox = document.getElementById('service-box');

    // Dynamic Role Info Elements
    const selectedIcon = document.getElementById('selected-icon');
    const selectedTitle = document.getElementById('selected-title');
    const selectedDesc = document.getElementById('selected-desc');

    // Role Option List
    const roleOptions = document.querySelectorAll('.role-option');

    // Toggle dropdown visibility
    btnChangeRole.addEventListener('click', (e) => {
        e.stopPropagation();
        roleDropdown.classList.toggle('active');
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
        if (!serviceBox.contains(e.target)) {
            roleDropdown.classList.remove('active');
        }
    });

    // Handle option selection
    roleOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove active style from all options
            roleOptions.forEach(opt => opt.classList.remove('active'));

            // Set active style for clicked option
            option.classList.add('active');

            // Extract role data
            const title = option.getAttribute('data-title');
            const desc = option.getAttribute('data-desc');
            const iconClass = option.getAttribute('data-icon');

            // Update UI text
            selectedTitle.textContent = title;
            selectedDesc.textContent = desc;

            // Update UI icon
            selectedIcon.className = `fa-solid ${iconClass}`;

            // Hide dropdown
            roleDropdown.classList.remove('active');

            // Track the role in session storage
            sessionStorage.setItem('user_role', option.getAttribute('data-role'));
        });
    });

    // Default role if not changed (student as per index.html initial state)
    if (!sessionStorage.getItem('user_role')) {
        sessionStorage.setItem('user_role', 'student');
    }

    // Form Validation (Simulation for error UI)
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual submission

        const role = sessionStorage.getItem('user_role');
        
        // Redirect based on role
        if (role === 'admin') {
            window.location.href = 'dashboard.html';
        } else if (role === 'supervisor') {
            window.location.href = 'supervisor-dashboard.html';
        } else {
            // Students or others can go to a generic landing or specific student page
            showPortalAlert({
                title: 'قيد التطوير',
                message: 'عذراً، واجهة الطالب الخاصة بالنظام هي حالياً قيد التطوير والبرمجة. ترقبوا الإطلاق قريباً!',
                type: 'info'
            });
        }
    });
});
