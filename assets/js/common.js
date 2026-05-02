/**
 * IUG VolunGate - Shared UI Interactions
 * Handles notification bell and common portal UI elements.
 */

document.addEventListener('DOMContentLoaded', () => {
    initNotifications();
});

/**
 * Initializes the notification bell dropdown logic
 */
function initNotifications() {
    const bell = document.querySelector('.bell-container');
    const dropdown = document.querySelector('.notifications-dropdown');

    if (bell && dropdown) {
        bell.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            dropdown.classList.remove('show');
        });

        // Prevent closing when clicking inside the dropdown
        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

/**
 * Mock Export Functionality
 */
function exportData(type) {
    if (type === 'pdf') {
        window.print();
    } else {
        showPortalAlert({
            title: 'تصدير البيانات',
            message: 'جاري تجهيز ملف Excel... سيتم التحميل تلقائياً عند الاكتمال.',
            type: 'success'
        });
    }
}

/**
 * Custom Portal Alert System
 * @param {Object} options - { title, message, type, confirmText, cancelText, onConfirm }
 */
function showPortalAlert(options) {
    const { 
        title = 'تنبيه', 
        message = '', 
        type = 'info', 
        confirmText = 'موافق', 
        cancelText = 'إلغاء', 
        onConfirm = null 
    } = options;

    const overlay = document.createElement('div');
    overlay.className = 'portal-alert-overlay';
    
    let iconClass = 'fa-info-circle';
    if(type === 'success') iconClass = 'fa-check-circle';
    if(type === 'warning') iconClass = 'fa-exclamation-triangle';
    if(type === 'danger') iconClass = 'fa-trash-alt';

    const cardHtml = `
        <div class="portal-alert-card alert-${type}">
            <div class="portal-alert-header">
                <div class="portal-alert-icon">
                    <i class="fas ${iconClass}"></i>
                </div>
                <div class="portal-alert-title">${title}</div>
            </div>
            <div class="portal-alert-body">
                <div class="portal-alert-msg">${message}</div>
            </div>
            <div class="portal-alert-footer">
                ${onConfirm ? `<button class="btn-alert btn-alert-secondary" id="alertCancel">${cancelText}</button>` : ''}
                <button class="btn-alert btn-alert-confirm" id="alertConfirm">${confirmText}</button>
            </div>
        </div>
    `;

    overlay.innerHTML = cardHtml;
    document.body.appendChild(overlay);

    const closeAlert = () => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 200);
    };

    overlay.querySelector('#alertConfirm').addEventListener('click', () => {
        if (onConfirm) onConfirm();
        closeAlert();
    });

    if (onConfirm) {
        overlay.querySelector('#alertCancel').addEventListener('click', closeAlert);
    }
}

/**
 * Initializes the mobile hamburger menu toggle
 */
function initMobileMenu() {
    const navbarBrand = document.querySelector('.navbar-brand-title');
    // Only inject if it's not already there and we are inside a dashboard page
    if (navbarBrand && !document.querySelector('.mobile-menu-toggle')) {
        
        // Wrap the text in a span so we can hide part of it on very small screens if needed
        if(navbarBrand.childNodes.length > 2) {
            let textNode = Array.from(navbarBrand.childNodes).find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 0);
            if(textNode) {
                const text = textNode.textContent;
                const span = document.createElement('span');
                span.textContent = text;
                navbarBrand.replaceChild(span, textNode);
            }
        }

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mobile-menu-toggle';
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        // Insert toggle at the beginning
        navbarBrand.insertBefore(toggleBtn, navbarBrand.firstChild);

        const sidebar = document.querySelector('.sidebar');
        if(sidebar) {
            const overlay = document.createElement('div');
            overlay.className = 'mobile-sidebar-overlay';
            document.body.appendChild(overlay);

            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                sidebar.classList.toggle('active');
                overlay.classList.toggle('active');
            });

            overlay.addEventListener('click', () => {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            });
            
            // Close sidebar when clicking a link on mobile
            const navLinks = sidebar.querySelectorAll('.nav-item');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        sidebar.classList.remove('active');
                        overlay.classList.remove('active');
                    }
                });
            });
        }
    }
}

// Ensure initMobileMenu is called on load
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
});
