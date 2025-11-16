import React from 'react';
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const steps = [
  "Extraer los materiales del paquete A y B",
  "Firma de miembros de mesa en la hoja de control de asistencia",
  "Guardar paquete C, se usa al final",
  "Revisar que el ambiente cuente con lo necesario",
  "Comprobar paquete de cédulas y firmar",
  "Pegar etiqueta “Restos electorales” en caja de material vacío",
  "Llenar acta de instalación"
];

const steps2 = [
  "Se solicita al elector el DNI y dejar en una bandeja",
  "Se solicita numero de orden y datos personales",
  "Entrega al elector de cedula doblada y firmada",
  "Asegurarse que la electora vaya sin compañia a la camara secreta",
  "Indicar colocar cedula en la anfora",
  "Indicar donde firmar y poner huella en lista de electores",
  "Pedir al elector que recoga su DNI de la bandeja"
];
const steps3 = [
  "Se solicita al elector el DNI y dejar en una bandeja",
  "Se solicita numero de orden y datos personales",
  "Entrega al elector de cedula doblada y firmada",
  "Asegurarse que la electora vaya sin compañia a la camara secreta",
  "Indicar colocar cedula en la anfora",
  "Indicar donde firmar y poner huella en lista de electores",
  "Pedir al elector que recoga su DNI de la bandeja"
];
const Tablemember = () => {
  return (
    <div className="space-y-10">

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-56 md:h-72 rounded-2xl overflow-hidden shadow-xl"
      >
        <img
          src="https://gestion.pe/resizer/gdSHUTSRz74Y9gN7TVF1HAiE2SA=/980x528/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/OICP2ZXGPNFA5LXX5IYPSRRCDY.jpg"
          className="object-cover w-full h-full brightness-75"
        />

        <div className="absolute inset-0 flex flex-col justify-center px-8 text-white">
          <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg">
            Miembro de Mesa
          </h1>
        </div>
      </motion.div>


      {/* TITLE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="px-4 md:px-8"
      >
        <h2 className="text-yellow scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          Instalación
        </h2>
      </motion.div>


      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8 items-start">

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden shadow-lg"
        >
          <img
            src="https://i.ytimg.com/vi/kthYIZqtxkg/maxresdefault.jpg"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* STEPS CARD */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-opacity-50 rounded-2xl shadow-lg border border-gray-100">
            <CardHeader>
              <CardTitle className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Pasos para la Instalación
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex gap-3 items-start"
                  >
                    <span className="scroll-m-20 text-xl font-semibold tracking-tight w-10 h-10 flex items-center justify-center bg-yellow-600  rounded-full  shadow">
                      {i + 1}
                    </span>
                    <p className="text-muted-foreground text-xl">
                      {step}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
    </div>

      <Separator className="my-6" />

      {/* TITLE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="px-4 md:px-8"
      >
        <h2 className=" text-yellow scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          SUFRAGIO
        </h2>
      </motion.div>     
      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8 items-start">

        {/* STEPS CARD */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-opacity-50 rounded-2xl shadow-lg border border-gray-100">
            <CardHeader>
              <CardTitle className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Pasos Durante Sufragio
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {steps2.map((step2, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex gap-3 items-start"
                  >
                    <span className="scroll-m-20 text-xl font-semibold tracking-tight w-10 h-10 flex items-center justify-center bg-red-600  rounded-full  shadow">
                      {i + 1}
                    </span>
                    <p className="text-muted-foreground text-xl">
                      {step2}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

        </motion.div>

         {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden shadow-lg"
        >
          <img
            src="https://img.freepik.com/fotos-premium/persona-que-emite-su-voto-caja-electoral_153912-356311.jpg?semt=ais_incoming&w=740&q=80"
            className="w-full h-full object-cover"
          />
        </motion.div>



    </div>

     {/* STEPS CARD */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-opacity-50 rounded-2xl shadow-lg border border-gray-100">
            <CardHeader>
              <CardTitle className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Pasos para la Instalación
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {steps3.map((step3, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex gap-3 items-start"
                  >
                    <span className="scroll-m-20 text-xl font-semibold tracking-tight w-10 h-10 flex items-center justify-center bg-yellow-600  rounded-full  shadow">
                      {i + 1}
                    </span>
                    <p className="text-muted-foreground text-xl">
                      {step3}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
    </div>


    </div>
  );
};

export default Tablemember;
