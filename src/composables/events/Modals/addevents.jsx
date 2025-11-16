import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { handleChange, handleSelectChange } from "@/services/general/handlers";
import useEntityMutation from "@/hooks/useEntityMutation";

export default function AddEvent({ open, onClose, onAddEvent }) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    type_member: "",
  });

  const mutation = useEntityMutation({ entityName: 'event' });

  const handleSubmit = async () => {
    console.log('Submitting form data:', formData);
    onClose();
  
  // Usar microtask
  Promise.resolve().then(() => {
    mutation.mutate(
      { action: 'create', entity: formData, endpoint: '/api/v1/admin/events_new' },
      {
        onSuccess: () => {
          setFormData({
            title: '',
            date: '',
            description: '',
            type_member: "",
          });
          if (onAddEvent) onAddEvent();
        }
      }
    );
  });
  };

  const onChangeExtra = (name, value) => {};

  const memberOptions = [
    { value: "everybody", label: 'Todos' },
    { value: "members", label: 'Miembros de Mesa' }
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <div className="flex flex-col gap-4">
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
                  name="title"
                  placeholder="Elecciones Electorales"
                  value={formData.title}
                  onChange={(e) => handleChange(e, setFormData, onChangeExtra)}
                />
              </div>

              <div className="grid gap-2">
                <Label>Fecha del Evento</Label>
                <Input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={(e) => handleChange(e, setFormData, onChangeExtra)}
                />
              </div>

              <div className="grid gap-2">
                <Label>Descripcion del Evento</Label>
                <Input
                  type="text"
                  name="description"
                  placeholder="Acerca de que es el evento"
                  value={formData.description}
                  onChange={(e) => handleChange(e, setFormData, onChangeExtra)}
                />
              </div>

              <div className="grid gap-2">
                <Label>Destinatarios del evento</Label>
                <Select
                  value={formData.type_member}
                  onValueChange={(value) => handleSelectChange("type_member", value, setFormData, onChangeExtra)}
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    {memberOptions.map((mem) => (
                      <SelectItem key={mem.value} value={mem.value}>
                        {mem.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

            </div>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button onClick={handleSubmit} className="bg-yellow-600">
              Guardar Evento
            </Button>
          </CardFooter>
        </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
