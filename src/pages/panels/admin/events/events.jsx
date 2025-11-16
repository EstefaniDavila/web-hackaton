import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import useFetchEvents from "@/composables/events/hooks/useFetchEvents";
import { TbPlus } from 'react-icons/tb' 
import { Button } from '@/components/ui/button'
import ModalNewEvent from "@/composables/events/Modals/modalNewEvent";
import GeneralTooltip from "@/helpers/generalTooltip"
import { TbEdit } from "react-icons/tb"
import { TbTrash } from "react-icons/tb"
import { FaBoxOpen } from "react-icons/fa";
import useEntityMutation from '@/hooks/useEntityMutation'
import ModalUpdateEvent from "@/composables/events/Modals/modalUpdateEvent";

const parseLocalDate = (dateStr) => {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export default function MeetingsCalendar() {
  const [date, setDate] = useState(new Date());
  const [selectedEventDate, setSelectedEventDate] = useState(null); // <-- NUEVO
  const [typeModal, setTypeModal] = useState("")
  const [event, setEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const [search, setSearch] = useState("")
  const [searchFields, setSearchFields] = useState(["tittle"])

  const searchParams = {search, fields: searchFields.join(',') }
  const { data: eventsData, refetch: refetchEvents } = useFetchEvents(pagination, searchParams)
  const mutation = useEntityMutation({entityName: 'event'})

  const parseApiDate = (dateString) => {
    const [datePart] = dateString.split("T");
    const [y, m, d] = datePart.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const isNearEvent = (eventDate) => {
    const today = new Date();
    const todayLocal = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const diff = (eventDate - todayLocal) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 3;
  };

  const eventDates = [...(eventsData?.events?.map(event => parseApiDate(event.date)) || [])];

  const handleOpenModal = (type, data = null) => {
    setIsModalOpen(true)
    setTypeModal(type)
    setEvent(data)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTypeModal("")
    setEvent(null)
  }

  const handleDelete = async(id) => {
    mutation.mutate(
      { action: 'delete', endpoint: `api/v1/admin/events/${id}`},
    )
  }

  const modifiers = {
    event: (date) => {
      if (!date) return false;
      // si es el evento seleccionado, no aplicamos amarillo
      if (selectedEventDate && date.toDateString() === selectedEventDate.toDateString()) return false;
      return eventDates.some(ed => ed.toDateString() === date.toDateString());
    },
    selectedEvent: (date) => {
      return selectedEventDate ? date.toDateString() === selectedEventDate.toDateString() : false;
    },
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-6 w-full min-h-[85vh] place-items-start">

        {/* IZQUIERDA */}
        <div className="w-full md:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-extrabold text-gray-800">
              Próximos Eventos
            </h2>

            <Button
              variant="outline"
              onClick={() => handleOpenModal("new")}
              className="bg-amberCustom text-black hover:bg-amber-600"
            >
              <TbPlus />
            </Button>
          </div>

          <div className="space-y-2">
            {eventsData?.events?.map((m, i) => {
              const eventDate = parseApiDate(m.date);
              const near = isNearEvent(eventDate);

              return (
                <Card
                  key={i}
                  onClick={() => setSelectedEventDate(eventDate)}
                  className={cn(
                    "cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl border-none",
                    near ? "bg-yellow-100" : "bg-white"
                  )}
                >
                  <CardContent className="flex gap-4 p-4">
                    {/* CONTENIDO PRINCIPAL */}
                    <div className="flex-1 space-y-1 cursor-pointer" onClick={() => setSelectedEventDate(eventDate)}>
                      <p className="font-bold text-gray-900 text-xl">{m.tittle}</p>
                      <div className="flex items-center gap-2 text-gray-700">
                        <CalendarIcon size={18} />
                        <span className="text-lg">{eventDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin size={18} />
                        <span className="text-lg">{m.description || 'Sin descripción'}</span>
                      </div>
                    </div>

                    {/* BOTONES A LA DERECHA */}
                    <div className="flex flex-col gap-2">
                      <GeneralTooltip
                        content="Editar Producto"
                        triggerContent={
                          <span className="bg-yellow-500 text-white rounded-full p-1">
                            <TbEdit size={20}/>
                          </span>
                        }
                        onClick={() => handleOpenModal('edit', m)}
                      />
                      <GeneralTooltip 
                        content="Eliminar Producto"
                        triggerContent={
                          <span className="bg-red-500 text-white rounded-full p-1">
                            <TbTrash size={20} />
                          </span>
                        }
                        onClick={() => handleDelete(m.id)}
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* DERECHA — CALENDARIO */}
        <div className="flex flex-col items-center justify-start w-full md:col-span-1">
          <Card className="bg-white border-none shadow-lg m-10 w-fit scale-110">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              modifiers={modifiers}
              modifiersStyles={{
                event: {
                  backgroundColor: "#facc15",
                  color: "black",
                  borderRadius: "6px",
                },
                selectedEvent: {
                  backgroundColor: "#d70026",
                  color: "white",
                  borderRadius: "6px",
                },
              }}
            />
          </Card>
        </div>
      </div>

      {typeModal === 'new' && (
        <ModalNewEvent
          isOpen={isModalOpen}
          handleClose={handleCloseModal}
          typeModal={typeModal}
          fetchData={refetchEvents}
        />
      )}

      {typeModal === 'edit' && (
        <ModalUpdateEvent
          isOpen={isModalOpen}
          event={event}
          handleClose={handleCloseModal}
          typeModal={typeModal}
          fetchData={refetchEvents}
        />
      )}
    </>
  );
}