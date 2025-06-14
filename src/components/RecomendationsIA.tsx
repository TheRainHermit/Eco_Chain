import React, { useEffect, useState } from "react";
//bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-2xl
import { Bot } from "lucide-react";

const RECOMMENDATIONS = [
  "Apaga las luces cuando no las necesites para ahorrar energía.",
  "Reduce el uso de plásticos de un solo uso.",
  "Recicla y separa correctamente tus residuos.",
  "Utiliza transporte público, bicicleta o camina siempre que puedas.",
  "Ahorra agua cerrando el grifo mientras te cepillas los dientes.",
  "Compra productos locales y de temporada.",
  "Planta un árbol y cuida las áreas verdes.",
  "Evita el desperdicio de alimentos planificando tus compras.",
  "Reutiliza bolsas, envases y ropa.",
  "Apoya energías renovables y tecnologías limpias.",
];

const INTERVAL = 10000; //10 segundos

export const RecomendationsIA = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % RECOMMENDATIONS.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-2xl mb-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Bot size={24} />
            <h2 className="text-2xl font-semibold">Recomendaciones Ambientales</h2>
          </div>
          <div className="p-4 bg-green-100 rounded-lg shadow text-green-900 text-center font-semibold transition-all duration-500">
            {RECOMMENDATIONS[index]}
          </div>
        </div>
      </div>
    </div>
 
  );
};
//export default RecomendationsIA;
