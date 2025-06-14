import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const mockStats = {
  total: 1200,
  average: 150,
  max: 300,
  min: 50,
};

const cleanupData = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
  datasets: [
    {
      label: 'Kg recolectados',
      data: [100, 200, 150, 300, 450],
      backgroundColor: 'rgba(34,197,94,0.5)',
      borderColor: 'rgba(34,197,94,1)',
      borderWidth: 2,
    },
  ],
};

const categoryData = {
  labels: ['Plástico', 'Vidrio', 'Metal', 'Orgánico', 'Otros'],
  datasets: [
    {
      label: 'Porcentaje',
      data: [40, 20, 15, 10, 15],
      backgroundColor: [
        'rgba(59,130,246,0.7)',
        'rgba(251,191,36,0.7)',
        'rgba(239,68,68,0.7)',
        'rgba(16,185,129,0.7)',
        'rgba(107,114,128,0.7)',
      ],
    },
  ],
};

const EcoChainDashboard: React.FC = () => {
  const cleanupChartRef = useRef<HTMLCanvasElement>(null);
  const categoryChartRef = useRef<HTMLCanvasElement>(null);
  const cleanupChartInstance = useRef<Chart | null>(null);
  const categoryChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    // Destruye gráficos previos si existen
    if (cleanupChartInstance.current) {
      cleanupChartInstance.current.destroy();
    }
    if (categoryChartInstance.current) {
      categoryChartInstance.current.destroy();
    }

    // Gráfico de limpiezas
    if (cleanupChartRef.current) {
      cleanupChartInstance.current = new Chart(cleanupChartRef.current, {
        type: 'bar',
        data: cleanupData,
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: 'Limpiezas por mes' },
          },
        },
      });
    }

    // Gráfico de categorías
    if (categoryChartRef.current) {
      categoryChartInstance.current = new Chart(categoryChartRef.current, {
        type: 'doughnut',
        data: categoryData,
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom' },
            title: { display: true, text: 'Porcentaje por categoría' },
          },
        },
      });
    }

    // Limpieza al desmontar
    return () => {
      if (cleanupChartInstance.current) {
        cleanupChartInstance.current.destroy();
        cleanupChartInstance.current = null;
      }
      if (categoryChartInstance.current) {
        categoryChartInstance.current.destroy();
        categoryChartInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">EcoChain Analysis</h1>
        <p className="text-gray-600">Visualización de datos de limpiezas ambientales</p>
      </header>

      <div className="dashboard grid gap-6 md:grid-cols-2">
        <div className="stats-card bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Estadísticas Totales</h2>
          <div className="stats-grid grid grid-cols-2 gap-4">
            <div className="stat-item text-center">
              <span className="stat-value text-2xl font-bold">{mockStats.total}</span>
              <div className="stat-label text-gray-500">Total recolectado</div>
            </div>
            <div className="stat-item text-center">
              <span className="stat-value text-2xl font-bold">{mockStats.average}</span>
              <div className="stat-label text-gray-500">Promedio</div>
            </div>
            <div className="stat-item text-center">
              <span className="stat-value text-2xl font-bold">{mockStats.max}</span>
              <div className="stat-label text-gray-500">Máximo</div>
            </div>
            <div className="stat-item text-center">
              <span className="stat-value text-2xl font-bold">{mockStats.min}</span>
              <div className="stat-label text-gray-500">Mínimo</div>
            </div>
          </div>
        </div>

        <div className="chart-container bg-white rounded shadow p-4">
          <canvas ref={cleanupChartRef}></canvas>
        </div>
        <div className="chart-container bg-white rounded shadow p-4">
          <canvas ref={categoryChartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default EcoChainDashboard;