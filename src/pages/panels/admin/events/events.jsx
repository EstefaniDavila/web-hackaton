import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPin } from "lucide-react";
import AddEvent from "@/composables/events/Modals/addevents";
import useFetchEvents from "@/composables/events/hooks/useFetchEvents";


export default function MeetingsCalendar() {
  const [date, setDate] = useState(new Date());
  const [typeModal, setTypeModal] = useState("")
  const [event, setEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })
  const [search, setSearch] = useState("")
  const [searchFields, setSearchFields] = useState(["title"])

  const searchParams = {search, fields: searchFields.join(',') }
  const { data: eventsData, refetch: refetchEvents } = useFetchEvents(pagination, searchParams)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 text-white min-h-screen">
        {/* IZQUIERDA */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-indigo">
            Próximos Eventos
          </h2>

          <div className="space-y-6">
            {eventsData?.events?.map((m, i) => (
              <Card key={i} className="bg-[#1e293b] border-none text-white">
                <CardContent className="flex gap-4 p-5">
                  <div className="flex-1 space-y-1">
                    <p className="font-semibold">{m.name}</p>

                    <div className="flex items-center text-gray-300 gap-2 text-sm">
                      <CalendarIcon size={15} />
                      <span>{m.date}</span>
                    </div>

                    <div className="flex items-center text-gray-400 gap-2 text-sm">
                      <MapPin size={15} />
                      <span>{m.place}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* DERECHA */}
        <div className="flex flex-col items-center gap-6">
          <Card className="bg-[#1e293b] border-none text-white p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
            />
          </Card>

          <Button
            className="bg-yellow-600 hover:bg-red-900 px-10 py-6 text-white rounded-xl text-md"
            onClick={() => setIsModalOpen(true)}
          >
            Agregar Evento
          </Button>
        </div>
      </div>

      {/* MODAL */}
      <AddEvent
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
