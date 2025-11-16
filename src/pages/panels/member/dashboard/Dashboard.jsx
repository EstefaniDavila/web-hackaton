import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Bell } from "lucide-react";
import BeautifulCountdown from "./BeautifulCountdown";
import { Separator } from "@radix-ui/react-dropdown-menu";

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

        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="rounded-2xl shadow-lg border-blue-100 hover:shadow-2xl transition-all">
            <CardHeader className="flex flex-row items-center gap-3">
              <CalendarDays className="text-blue-600 w-7 h-7" />
              <CardTitle> Elecciones 2026 </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Próximo proceso electoral el <strong>12 de abril</strong>.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="rounded-2xl shadow-lg border-blue-100 hover:shadow-2xl transition-all">
            <CardHeader className="flex flex-row items-center gap-3">
              <MapPin className="text-green-600 w-7 h-7" />
              <CardTitle> Mi Lugar de Votación </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Verifica tu local de votación y cómo llegar usando geolocalización.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="rounded-2xl shadow-lg border-blue-100 hover:shadow-2xl transition-all">
            <CardHeader className="flex flex-row items-center gap-3">
              <Bell className="text-red-600 w-7 h-7" />
              <CardTitle> Recordatorios </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Recibe alertas sobre capacitaciones y fechas importantes.
              </p>
            </CardContent>
          </Card>
        </motion.div>

      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="flex justify-center"
      >
        <Button className="bg-blue-700 text-white px-10 py-6 rounded-xl shadow-md text-lg hover:bg-blue-800 transition-all">
          Ver información detallada
        </Button>
      </motion.div>

    </div>
  );
};

export default Dashboard;
