import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Bell } from "lucide-react";
import BeautifulCountdown from "./BeautifulCountdown";
import { Separator } from "@radix-ui/react-dropdown-menu";

const news = [
  {
    title: 'Keiko se fuga con todo dinero',
    img: 'https://www.politicaexterior.com/wp-content/uploads/venezuela_elecciones-mayo-2018-960x640.jpg',
    descripcion: 'la candidata a la presidencia se escapa del pais con dinero recolectado de lavado de activos',
  },
  {
    title: 'Keiko se fuga con todo dinero',
    img: 'https://www.politicaexterior.com/wp-content/uploads/venezuela_elecciones-mayo-2018-960x640.jpg',
    descripcion: 'la candidata a la presidencia se escapa del pais con dinero recolectado de lavado de activos',
  },
  {
    title: 'Keiko se fuga con todo dinero',
    img: 'https://www.politicaexterior.com/wp-content/uploads/venezuela_elecciones-mayo-2018-960x640.jpg',
    descripcion: 'la candidata a la presidencia se escapa del pais con dinero recolectado de lavado de activos',
  },

]

const Dashboard = () => {

  return (
    <div className="space-y-10 p-6 w-full">

            {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-56 md:h-72 rounded-2xl overflow-hidden shadow-xl"
      >
        <img
          src="https://www.celag.org/wp-content/uploads/2018/10/PORTADA-PERU%CC%81.jpg"
          className="object-cover w-full h-full brightness-75"
        />

        <div className="absolute inset-0 flex flex-col justify-center px-8 text-white">
          <h1 className="text-3xl md:text-4xl font-bold drop-shadow-lg">ELECCIONES 2026</h1>
          <p className="text-lg mt-2 font-medium drop-shadow-md">
            PARTICIPA
            DECIDE
            VOTA
          </p>
          {/* COUNTDOWN ARRIBA DEL HERO */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex justify-center mb-2"
        >
          <div className=" p-4 rounded-2xl shadow-md border max-w-lg w-full">
            <BeautifulCountdown />
          </div>
      </motion.div>
        </div>
      </motion.div>

      <Separator className="my-4" />

     {/* CARDS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card className="bg-yellow-300 rounded-2xl shadow-lg border-blue-100 hover:shadow-2xl transition-all">
                <CardHeader className="flex flex-row items-center gap-3">
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded-xl mb-2"
                  />

                  <p className="text-gray-600 text-sm">{item.descripcion}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

    </div>
  );
};

export default Dashboard;
