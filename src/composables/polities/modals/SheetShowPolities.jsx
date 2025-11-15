import React, { useState } from 'react';
import {
  SheetMultiStep,
  SheetMultiStepContent,
  SheetMultiStepHeader,
  SheetMultiStepTitle,
  SheetMultiStepDescription,
  SheetMultiStepFooter
} from '@/components/custom/SheetMultiStep';

import { X, ShoppingCart, Star, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/custom/button';
import { cn } from '@/lib/utils';

const SheetShowPolities = ({ political_parties, isOpen, onOpenChange }) => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const finalPrice = political_parties?.discount
    ? political_parties.pen_price * (1 - political_parties.discount / 100)
    : political_parties?.pen_price;

  const isAvailable =
    political_parties?.status === "active" &&
    political_parties?.quantity_web > 0;

  return (
    <SheetMultiStep open={isOpen} onOpenChange={onOpenChange}>
      <SheetMultiStepContent side="right">
        <SheetMultiStepHeader>
          <SheetMultiStepTitle>Vista Previa</SheetMultiStepTitle>
          <SheetMultiStepDescription>
            Revisa los detalles del partido político registrado
          </SheetMultiStepDescription>
        </SheetMultiStepHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          
          {/* Imagen */}
          <div className="aspect-square w-full bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={political_parties?.cover_url}
              alt={political_parties?.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
              }}
            />
          </div>

          {/* Información principal */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold">
                  {political_parties?.name}
                </h3>
                {political_parties?.category && (
                  <p className="text-sm mt-1">
                    {typeof political_parties.category === 'object'
                      ? political_parties.category.name
                      : political_parties.category}
                  </p>
                )}
              </div>

              {/* Precios */}
              <div className="text-right flex-shrink-0">
                {political_parties?.discount > 0 ? (
                  <>
                    <p className="text-2xl font-bold text-red-600">
                      S/ {finalPrice.toFixed(2)}
                    </p>
                    <p className="text-sm line-through">
                      S/ {political_parties.pen_price.toFixed(2)}
                    </p>
                    <span className="inline-block mt-1 bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded">
                      -{political_parties.discount}%
                    </span>
                  </>
                ) : (
                  <p className="text-2xl font-bold">
                    S/ {political_parties.pen_price?.toFixed(2)}
                  </p>
                )}

                {political_parties?.dollar_price && (
                  <p className="text-sm mt-1">
                    $ {political_parties.dollar_price.toFixed(2)}
                  </p>
                )}
              </div>
            </div>

            {/* Estado web */}
            {political_parties?.status_web === "visible" && (
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Visible en web
              </div>
            )}

            {political_parties?.status_web === "hidden" && (
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                No visible en web
              </div>
            )}
          </div>

          {/* Descripción */}
          {political_parties?.description && (
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Descripción</h4>
              <p className="text-sm leading-relaxed">
                {political_parties.description}
              </p>
            </div>
          )}

          {/* Selector de cantidad */}
          <div className="space-y-3">
            <h4 className="font-semibold">Cantidad</h4>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={decrementQuantity}>
                <Minus size={12} />
              </Button>
              <span className="text-lg font-semibold w-12 text-center">
                {quantity}
              </span>
              <Button variant="outline" onClick={incrementQuantity}>
                <Plus size={12} />
              </Button>
            </div>
          </div>

          {/* Stock */}
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  isAvailable ? "bg-green-500" : "bg-red-500"
                )}
              />
              <span className="text-sm font-medium">
                {isAvailable ? "Disponible" : "No disponible"}
              </span>
            </div>

            {isAvailable && political_parties?.quantity_web <= 100 && (
              <span className="text-xs text-orange-600 font-medium">
                ¡Solo quedan {political_parties.quantity_web}!
              </span>
            )}
          </div>

          {/* Info adicional */}
          <div className="border-t pt-4 space-y-2 text-sm">
            <p>✓ Información validada</p>
            <p>✓ Estado actualizado</p>

            {political_parties?.provider && (
              <p className="text-xs mt-2">
                Proveedor:{" "}
                {typeof political_parties.provider === "object"
                  ? political_parties.provider.name
                  : political_parties.provider}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <SheetMultiStepFooter className="flex justify-between mt-5">
          <Button
            variant="outline"
            disabled={!isAvailable}
            className={cn(
              "w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2",
              !isAvailable && "cursor-not-allowed"
            )}
          >
            <ShoppingCart className="h-5 w-5" />
            {isAvailable ? "Agregar" : "No disponible"}
          </Button>
        </SheetMultiStepFooter>
      </SheetMultiStepContent>
    </SheetMultiStep>
  );
};

export default SheetShowPolities;
