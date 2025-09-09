
// app/index.tsx
import { Redirect } from 'expo-router';

export default function Index() {
  // Por ahora redirige directamente al welcome screen
  // Aquí podrías agregar lógica para verificar si el usuario está autenticado
  return <Redirect href="/welcome" />;
}