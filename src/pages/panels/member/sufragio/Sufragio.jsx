import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MotionConfig, motion } from "framer-motion";

export default function Sufragio() {
  const steps = [
    {
      title: "1. Averigua tu local de votación",
      img: "https://cdn-icons-png.freepik.com/256/2530/2530677.png?semt=ais_white_label",
    },
    {
      title: "2. Lleva tu DNI y un lapicero",
      img: "https://cdn-icons-png.flaticon.com/512/1828/1828466.png",
    },
    {
      title: "3. Lee el croquis y carteles de orientación",
      img: "https://cdn-icons-png.flaticon.com/512/535/535239.png",
    },
    {
      title: "4. Ubica tu mesa e ingresa al establecimiento",
      img: "https://cdn-icons-png.flaticon.com/512/3039/3039387.png",
    },
  ];

  return (
    <div className="w-full p-8 text-gray-900">
      <h1 className="text-3xl font-bold text-indigo-700 text-center mb-4">
        ¿Cómo debo sufragar?
      </h1>

      <Separator className="mb-8 bg-indigo-300" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* TEXT SECTION */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-indigo-600">
            Pasos para llegar a tu mesa de votación
          </h2>

          <ul className="space-y-4 text-lg">
            {steps.map((s, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="w-8 h-8 flex items-center justify-center bg-indigo-600 text-white font-bold rounded-full">
                  {i + 1}
                </span>
                {s.title}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* IMAGE CAROUSEL */}
        <div className="flex justify-center">
          <Carousel className="w-full max-w-sm">
            <CarouselContent>
              {steps.map((step, index) => (
                <CarouselItem key={index}>
                  <div className="p-2">
                    <Card className="shadow-md border-2 border-indigo-200 rounded-2xl">
                      <CardContent className="flex flex-col items-center justify-center p-6 gap-4">
                        <img
                          src={step.img}
                          alt={step.title}
                          className="w-40 h-40 object-contain"
                        />
                        <p className="text-center text-lg font-medium text-indigo-700">
                          {step.title}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}