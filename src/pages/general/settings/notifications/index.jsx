import { Separator } from '@/components/ui/separator'
import { NotificationsForm } from './notifications-form'

export default function SettingsNotifications() {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Notificaciones</h3>
        <p className='text-sm text-muted-foreground'>
          Configura cómo recibes las notificaciones.
        </p>

      </div>
      <Separator />
      <NotificationsForm />
    </div>
  )
}
