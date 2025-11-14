import React, { useState } from 'react';
import { SheetMultiStep, SheetMultiStepContent, SheetMultiStepHeader, SheetMultiStepTitle, SheetMultiStepDescription, SheetMultiStepFooter } from '@/components/custom/SheetMultiStep';
import { X, ShoppingCart, Star, Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/custom/button';

const SheetShowProduct = ({ product, isOpen, onOpenChange }) => {
  const [quantity, setQuantity] = useState(1)
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const finalPrice = product?.discount 
    ? product.pen_price * (1 - product.discount / 100)
    : product?.pen_price;

  const isAvailable = product?.status === "active" && product?.quantity_web > 0;

  return (
    <SheetMultiStep open={isOpen} onOpenChange={onOpenChange}>
      <SheetMultiStepContent side="right">
        <SheetMultiStepHeader>
          <SheetMultiStepTitle>Vista Previa del Producto</SheetMultiStepTitle>
          <SheetMultiStepDescription>Revisa los detalles antes de agregar al carrito</SheetMultiStepDescription>
        </SheetMultiStepHeader>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            <div className="aspect-square w-full bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.cover_url}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
                }}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold">{product.name}</h3>
                  {product.category && (
                    <p className="text-sm mt-1">
                      {typeof product.category === 'object' ? product.category.name : product.category}
                    </p>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  {product.discount > 0 ? (
                    <>
                      <p className="text-2xl font-bold text-red-600">
                        S/ {finalPrice.toFixed(2)}
                      </p>
                      <p className="text-sm line-through">
                        S/ {product.pen_price.toFixed(2)}
                      </p>
                      <span className="inline-block mt-1 bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded">
                        -{product.discount}%
                      </span>
                    </>
                  ) : (
                    <p className="text-2xl font-bold">
                      S/ {product.pen_price.toFixed(2)}
                    </p>
                  )}
                  {product.dollar_price && (
                    <p className="text-sm mt-1">
                      $ {product.dollar_price.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>

              {/* Badge de estado */}
              {product.status_web === "visible" && (
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Visible en web para clientes
                </div>
              )}
              {product.status_web === "hidden" && (
                <div className="inline-flex items-center gap-2 bg-green-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  No es visible en web para clientes
                </div>
              )}
            </div>

            {/* Descripción */}
            {product.description && (
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Descripción</h4>
                <p className="text-sm leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Selector de cantidad */}
            <div className="space-y-3">
              <h4 className="font-semibold">Cantidad</h4>
              <div className="flex items-center gap-3">
                <Button variant="outline"
                  onClick={decrementQuantity}
                >
                  <Minus size={12}/>
                </Button>
                <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                <Button variant="outline"
                  onClick={incrementQuantity}
                >
                  <Plus size={12}/>
                </Button>
              </div>
            </div>

            {/* Stock disponible */}
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  isAvailable ? "bg-green-500" : "bg-red-500"
                )} />
                <span className="text-sm font-medium">
                  {isAvailable ? 'Disponible' : 'No disponible'}
                </span>
              </div>
              {isAvailable && product.quantity_web <= 100 && (
                <span className="text-xs text-orange-600 font-medium">
                  ¡Solo quedan {product.quantity_web}!
                </span>
              )}
            </div>

            {/* Información adicional */}
            <div className="border-t pt-4 space-y-2 text-sm">
              <p>✓ Envío gratis en compras mayores a S/ 100</p>
              <p>✓ Devoluciones gratis en 30 días</p>
              <p>✓ Garantía de satisfacción</p>
              {product.provider && (
                <p className="text-xs mt-2">
                  Proveedor: {typeof product.provider === 'object' ? product.provider.name : product.provider}
                </p>
              )}
            </div>
          </div>

          {/* Footer fijo con botón */}
          <SheetMultiStepFooter className="flex justify-between mt-5">
            <Button variant="outline"
              disabled={!isAvailable}
              className={cn(
                "w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors",
                isAvailable
                  ? ""
                  : " cursor-not-allowed"
              )}
            >
              <ShoppingCart className="h-5 w-5" />
              {isAvailable ? 'Agregar al Carrito' : 'Producto No Disponible'}
            </Button>
          </SheetMultiStepFooter>
      </SheetMultiStepContent>
    </SheetMultiStep>
  );
}

export default SheetShowProduct