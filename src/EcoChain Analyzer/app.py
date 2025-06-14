"""
Módulo principal de la aplicación EcoChain Analyzer.

Este módulo proporciona una API Flask para visualizar datos de limpiezas ambientales
a partir de un archivo CSV.
"""

import os
from flask import Flask, render_template, jsonify
import pandas as pd

app = Flask(__name__)

# Configuración de rutas
app.config['DATA_FOLDER'] = 'data'
app.config['CLEANUPS_FILE'] = 'cleanups.csv'

def load_cleanup_data():
    """Carga los datos del archivo CSV.
    
    Returns:
        pandas.DataFrame: DataFrame con los datos del CSV o DataFrame vacío si hay error.
    """
    file_path = os.path.join(app.config['DATA_FOLDER'], app.config['CLEANUPS_FILE'])
    try:
        df = pd.read_csv(file_path)
        return df
    except (FileNotFoundError, pd.errors.EmptyDataError, pd.errors.ParserError) as e:
        print(f"Error loading CSV file: {e}")
        return pd.DataFrame()

@app.route('/')
def index():
    """Renderiza la página principal con los gráficos de datos."""
    return render_template('index.html')

@app.route('/api/data')
def get_data():
    """Endpoint para obtener datos en formato JSON.
    
    Returns:
        Response: JSON con los datos o mensaje de error.
    """
    df = load_cleanup_data()
    if not df.empty:
        return jsonify({
            'labels': df['category'].tolist(),
            'values': df['amount'].tolist(),
            'dates': df['date'].tolist()
        })
    return jsonify({'error': 'No data available'})

@app.route('/api/stats')
def get_stats():
    """Endpoint para obtener estadísticas resumidas.
    
    Returns:
        Response: JSON con estadísticas o mensaje de error.
    """
    df = load_cleanup_data()
    if not df.empty and 'amount' in df.columns:
        stats = {
            'total': float(df['amount'].sum()),  # Convertir a float
            'average': float(df['amount'].mean()),  # Convertir a float
            'max': float(df['amount'].max()),  # Convertir a float
            'min': float(df['amount'].min()),  # Convertir a float
            'count': int(len(df))  # Convertir a int
        }
        return jsonify(stats)
    return jsonify({'error': 'No data available'})

if __name__ == '__main__':
    app.run(debug=True)
