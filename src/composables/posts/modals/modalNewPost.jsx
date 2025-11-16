import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import useEntityMutation from '@/hooks/useEntityMutation'

export default function ModalNewPost({ isOpen, handleClose, fetchData }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [source, setSource] = useState(null);

  const mutation = useEntityMutation({
    entityName: "post"
  });

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("post[title]", title);
    formData.append("post[body]", body);
    if (source) {
      formData.append("post[source]", source);
    }

    await mutation.mutateAsync({
      action: "create",
      endpoint: "/api/v1/admin/posts_new",
      entity: formData
    });

    fetchData();
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Crear Nueva Publicación</DialogTitle>
        </DialogHeader>

        <Card className="border-none shadow-none">
          <CardContent>
            <div className="flex flex-col gap-6">

              {/* Título */}
              <div className="grid gap-2">
                <Label>Título</Label>
                <Input
                  type="text"
                  placeholder="Escribe un título aquí..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Contenido */}
              <div className="grid gap-2">
                <Label>Contenido</Label>
                <Textarea
                  placeholder="Escribe el contenido aquí..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </div>

              {/* Imagen */}
              <div className="grid gap-2">
                <Label>Imagen</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSource(e.target.files[0])}
                />
              </div>

            </div>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button onClick={handleSubmit} className="bg-amberCustom hover:bg-amber-600">
              Guardar Publicación
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
