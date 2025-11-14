import { Separator } from '@/components/ui/separator'
import { AccountForm } from './account-form'

export default function SettingsAccount() {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Cuenta</h3>
        <p className='text-sm text-muted-foreground'>
          Actualiza la configuración de tu cuenta.
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  )
}
