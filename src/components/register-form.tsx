'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from './ui/toaster';
import { registerFormSchema } from '@/lib/zod';
import { register } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';

export function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    try {
      setIsSubmitting(true);
      const res = await register(values);
      if (res.success) {
        toast({
          title: 'Pendaftaran Berhasil',
          description: res.message,
          variant: 'success',
        });
        setTimeout(() => {
          router.push('/login');
        }, 1000);
      } else {
        if (res.errors) {
          // Set form errors
          Object.entries(res.errors).forEach(([key, value]) => {
            form.setError(key as never, { message: value![0] });
          });
        } else {
          toast({
            title: 'Pendaftaran Gagal',
            description: res.message,
            variant: 'destructive',
          });
        }
      }
    } catch (error) {
      toast({
        title: 'Unexpected Error',
        description: 'An unexpected error occurred. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="min-w-[50%] space-y-6 rounded-lg bg-white p-6 shadow-lg ring-1 ring-gray-200 dark:bg-secondary dark:text-white">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nama
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Masukkan nama anda"
                    className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage className="text-red-500 dark:text-red-500/70" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="Masukkan email anda"
                    className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-500/70" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="new-password"
                    placeholder="Masukkan password anda"
                    className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-500/70" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Konfirmasi Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="new-password"
                    placeholder="Konfirmasi Password"
                    className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-500/70" />
              </FormItem>
            )}
          />
          <Button
            disabled={isSubmitting}
            className="from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 w-full rounded-md bg-gradient-to-r py-2 font-semibold text-secondary shadow-md transition-all duration-200"
            type="submit">
            {isSubmitting ? 'Mendaftar...' : 'Daftar'}
          </Button>
        </form>
      </Form>
      <Toaster />
    </>
  );
}
