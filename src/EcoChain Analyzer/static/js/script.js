document.addEventListener('DOMContentLoaded', function() {
    // Obtener datos de la API
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
                return;
            }
            
            // Crear gráfico de líneas para tendencias temporales
            const lineCtx = document.getElementById('cleanupChart').getContext('2d');
            new Chart(lineCtx, {
                type: 'line',
                data: {
                    labels: data.dates,
                    datasets: [{
                        label: 'Cantidad recolectada',
                        data: data.values,
                        backgroundColor: 'rgba(46, 125, 50, 0.2)',
                        borderColor: 'rgba(46, 125, 50, 1)',
                        borderWidth: 2,
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Tendencia de recolección por fecha',
                            font: {
                                size: 16
                            }
                        },
                        legend: {
                            position: 'top',
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Cantidad'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Fecha'
                            }
                        }
                    }
                }
            });

            // Crear gráfico de barras por categoría
            const barCtx = document.getElementById('categoryChart').getContext('2d');
            new Chart(barCtx, {
                type: 'bar',
                data: {
                    labels: data.labels,
                    datasets: [{
                        label: 'Cantidad por categoría',
                        data: data.values,
                        backgroundColor: 'rgba(46, 125, 50, 0.7)',
                        borderColor: 'rgba(46, 125, 50, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Distribución por categoría',
                            font: {
                                size: 16
                            }
                        },
                        legend: {
                            position: 'top',
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Cantidad'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Categoría'
                            }
                        }
                    }
                }
            });
        });

    // Obtener estadísticas
    fetch('/api/stats')
        .then(response => response.json())
        .then(stats => {
            if (stats.error) {
                console.error(stats.error);
                return;
            }
            
            document.getElementById('total').textContent = stats.total.toLocaleString();
            document.getElementById('average').textContent = stats.average.toFixed(2);
            document.getElementById('max').textContent = stats.max;
            document.getElementById('min').textContent = stats.min;
        });
});