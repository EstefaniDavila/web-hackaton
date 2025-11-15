import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function AddEvent({ open, onClose, onAddEvent }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");

  const handleSubmit = () => {
    onAddEvent({
      name,
      date,
      place,
    });

    onClose(); // cerrar modal eventos
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Agregar un Nuevo Evento</DialogTitle>
        </DialogHeader>

        <Card className="border-none shadow-none">
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Nombre del Evento</Label>
                <Input
                  type="text"
                  placeholder="Elecciones Electorales"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label>Fecha del Evento</Label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label>Lugar del Evento</Label>
                <Input
                  type="text"
                  placeholder="Municipalidad"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button onClick={handleSubmit} className="bg-yellow-600">
              Guardar Evento
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
