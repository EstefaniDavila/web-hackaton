import { AppearanceForm } from './appearance-form'
import { Separator } from '@/components/ui/separator'

export default function SettingsAppearance() {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Apariencia</h3>
        <p className='text-sm text-muted-foreground'>
          Personaliza la apariencia de la aplicación. Cambia automáticamente entre temas claro y oscuro.
        </p>

      </div>
      <Separator />
      <AppearanceForm />
    </div>
  )
}
