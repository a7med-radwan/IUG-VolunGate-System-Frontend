// Reports Charts Initialization
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('roleDoughnut').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['طلاب', 'مشرفين', 'إداريين'],
            datasets: [{
                data: [158, 12, 2],
                backgroundColor: ['#2ecc71', '#3498db', '#e74c3c'],
                borderWidth: 5,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: { family: 'Cairo', size: 12 },
                        padding: 20
                    }
                }
            }
        }
    });
});
