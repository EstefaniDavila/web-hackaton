import { useForm } from 'react-hook-form';
import { Button } from '@/components/custom/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

export function NotificationsForm() {
  const form = useForm();

  function onSubmit(data) {
    toast({
      title: 'Has enviado los siguientes valores:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormItem className='space-y-3'>
          <FormLabel>Notificarme sobre...</FormLabel>
          <FormControl>
            <RadioGroup className='flex flex-col space-y-1'>
              <FormItem className='flex items-center space-x-3 space-y-0'>
                <FormControl>
                  <RadioGroupItem value='all' />
                </FormControl>
                <FormLabel className='font-normal'>
                  Todos los mensajes nuevos
                </FormLabel>
              </FormItem>
              <FormItem className='flex items-center space-x-3 space-y-0'>
                <FormControl>
                  <RadioGroupItem value='mentions' />
                </FormControl>
                <FormLabel className='font-normal'>
                  Mensajes directos y menciones
                </FormLabel>
              </FormItem>
              <FormItem className='flex items-center space-x-3 space-y-0'>
                <FormControl>
                  <RadioGroupItem value='none' />
                </FormControl>
                <FormLabel className='font-normal'>Nada</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>

        <div>
          <h3 className='mb-4 text-lg font-medium'>Notificaciones por correo electrónico</h3>
          <div className='space-y-4'>
            <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
              <div className='space-y-0.5'>
                <FormLabel className='text-base'>
                  Correos electrónicos de comunicación
                </FormLabel>
                <FormDescription>
                  Recibe correos electrónicos sobre la actividad de tu cuenta.
                </FormDescription>
              </div>
              <FormControl>
                <Switch />
              </FormControl>
            </FormItem>
            <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
              <div className='space-y-0.5'>
                <FormLabel className='text-base'>Correos electrónicos de marketing</FormLabel>
                <FormDescription>
                  Recibe correos electrónicos sobre nuevos productos, características y más.
                </FormDescription>
              </div>
              <FormControl>
                <Switch />
              </FormControl>
            </FormItem>
            <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
              <div className='space-y-0.5'>
                <FormLabel className='text-base'>Correos electrónicos sociales</FormLabel>
                <FormDescription>
                  Recibe correos electrónicos para solicitudes de amistad, seguidores y más.
                </FormDescription>
              </div>
              <FormControl>
                <Switch />
              </FormControl>
            </FormItem>
            <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
              <div className='space-y-0.5'>
                <FormLabel className='text-base'>Correos electrónicos de seguridad</FormLabel>
                <FormDescription>
                  Recibe correos electrónicos sobre la actividad y seguridad de tu cuenta.
                </FormDescription>
              </div>
              <FormControl>
                <Switch disabled aria-readonly />
              </FormControl>
            </FormItem>
          </div>
        </div>

        {/* <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
          <FormControl>
            <Checkbox />
          </FormControl>
          <div className='space-y-1 leading-none'>
            <FormLabel>
              Usar configuraciones diferentes para mis dispositivos móviles
            </FormLabel>
            <FormDescription>
              Puedes administrar tus notificaciones móviles en la página de{' '}
              <Link
                to='/settings'
                className='underline decoration-dashed underline-offset-4 hover:decoration-solid'
              >
                ajustes móviles
              </Link>
            </FormDescription>
          </div>
        </FormItem> */}

        <Button type='submit'>Actualizar notificaciones</Button>
      </form>
    </Form>
  );
}
