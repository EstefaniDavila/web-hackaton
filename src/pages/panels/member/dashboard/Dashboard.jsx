import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import BeautifulCountdown from "./BeautifulCountdown";
import { Separator } from "@radix-ui/react-dropdown-menu";

const Dashboard = () => {
  const [generalNews, setGeneralNews] = useState([]);
  const [politicalNews, setPoliticalNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const generalRes = await fetch(
          "https://johnnie-unlabouring-intriguingly.ngrok-free.dev/api/v1/admin/posts",
          { headers: { "ngrok-skip-browser-warning": "true" } }
        );

        const politicalRes = await fetch(
          "https://johnnie-unlabouring-intriguingly.ngrok-free.dev/api/v1/admin/posts/political",
          { headers: { "ngrok-skip-browser-warning": "true" } }
        );

        const generalData = await generalRes.json();
        const politicalData = await politicalRes.json();

        setGeneralNews(generalData.filter(n => n.political_party_id === null));
        setPoliticalNews(politicalData);

        setLoading(false);
      } catch (err) {
        console.error("Error obteniendo noticias:", err);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p className="p-6 text-lg">Cargando noticias...</p>;

  return (
    <div className="space-y-10 p-4 sm:p-6 w-full">

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-48 sm:h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl"
      >
        <img
          src="https://www.celag.org/wp-content/uploads/2018/10/PORTADA-PERU%CC%81.jpg"
          className="object-cover w-full h-full brightness-75"
        />

        <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg">
            ELECCIONES 2026
          </h1>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex justify-center mt-3 sm:mt-4"
          >
            <div className="p-3 sm:p-4 rounded-2xl shadow-md border bg-white/20 backdrop-blur max-w-md w-full">
              <BeautifulCountdown />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <Separator className="my-4" />

      {/* NOTICIAS GENERALES */}
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 ml-1">
        Noticias Generales
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {generalNews.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="bg-yellow-300 bg-opacity-25 rounded-2xl shadow-lg hover:shadow-2xl transition-all h-full">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-gray-900 mt-3 border-l-2 pl-4 italic">
                  {item.body}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Separator className="my-6" />

      {/* NOTICIAS DE PARTIDOS */}
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 ml-1">
        Noticias de Partidos Políticos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {politicalNews.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <Card className="bg-blue-200 bg-opacity-25 rounded-2xl shadow-lg hover:shadow-2xl transition-all h-full">
              <CardHeader>
                <CardTitle>
                  {item.title}
                  <span className="block text-sm text-blue-700 mt-1">
                    {item.political_party_name}
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-gray-900 mt-3 border-l-2 pl-4 italic">
                  {item.body}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
