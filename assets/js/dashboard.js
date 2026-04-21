// Dashboard Charts Initialization
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('usersChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['طلاب متطوعين', 'مشرفين أكاديميين', 'مدراء نظام'],
            datasets: [{
                label: 'عدد المستخدمين',
                data: [158, 12, 2],
                backgroundColor: ['#2ecc71', '#3498db', '#e74c3c'],
                borderRadius: 5,
                maxBarThickness: 60
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true, ticks: { font: { family: 'Cairo' } } },
                x: { ticks: { font: { family: 'Cairo' } } }
            }
        }
    });
});
