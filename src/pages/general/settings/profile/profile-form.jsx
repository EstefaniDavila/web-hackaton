import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { Button } from '@/components/custom/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useAuth } from '@/providers/UserContext'
import { jwtDecode } from 'jwt-decode'

const profileFormSchema = z.object({
  oldPassword: z.string().min(6, 'Old password must be at least 6 characters long.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
  confirmPassword: z.string().min(6, 'Password confirmation must be at least 6 characters long.'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

export default function ProfileForm() {
  const { authTokens } = useAuth()
  const currentUser = JSON.parse(localStorage.getItem('user')) || { full_name: '' }
  const [showPasswordFields, setShowPasswordFields] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange',
    defaultValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    }
  }) 

  async function onSubmit(data) {

    try {
      const response = await fetch('http://127.0.0.1:3000/api/v1/general/users/passwords', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens?.access_token}`
        },
        body: JSON.stringify({
          old_password: data.oldPassword,
          password: data.password,
          password_confirmation: data.confirmPassword,
        }),
      })

      if (response.ok) {
        const result = await response.json()

        const newAuthTokens = {
          access_token: result.access_token,
          expires_at: result.expires_at,
          refresh_token: result.refresh_token,
        }

        localStorage.setItem('authTokens', JSON.stringify(newAuthTokens))
        window.location.reload()
        toast({
          title: 'Password updated successfully.',
          description: (
            <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
              <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        })
      } else {
        const result = await response.json()
        toast({
          title: 'Error updating password.',
          description: result.message || 'Please check your old password and try again.',
        })
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: 'Error updating password.',
        description: 'An unexpected error occurred. Please try again.',
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div>
          <FormLabel>Nombre de Usuario</FormLabel><br /><br />
          <strong>{currentUser.full_name}</strong><br />
        </div>

        <Button type='button' onClick={() => setShowPasswordFields(!showPasswordFields)}>
          {showPasswordFields ? 'Cancelar' : 'Actualizar Contraseña'}
        </Button>

        {showPasswordFields && (
          <>
            <FormField
              control={form.control}
              name='oldPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Antigua Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input {...field} type={showOldPassword ? 'text' : 'password'} placeholder='********' />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                      >
                        {showOldPassword ? 'Ocultar' : 'Mostrar'}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nueva Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input {...field} type={showNewPassword ? 'text' : 'password'} placeholder='********' />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? 'Ocultar' : 'Mostrar'}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Nueva Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input {...field} type={showConfirmPassword ? 'text' : 'password'} placeholder='********' />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Actualizar perfil</Button>
          </>
        )}
      </form>
    </Form>
  )
}
