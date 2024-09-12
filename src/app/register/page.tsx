import { RegisterForm } from '@/components/register-form';

export default async function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-6 min-w-[50%] max-w-full rounded-lg p-6 text-3xl font-bold shadow-lg dark:bg-secondary dark:text-gray-400 dark:text-secondary-foreground">
        Register
        <small className="mt-2 block text-sm font-light italic">
          Daftar akun sekarang dan akses ke aplikasi
        </small>
      </h1>
      <RegisterForm />
    </main>
  );
}
