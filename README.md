# Edu_Code Web

Web oficial/prototipo de **Edu_Code**, adaptada a la identidad visual espacial del proyecto y a su estado real de desarrollo.

## Incluye

- Landing de Edu_Code con contenido alineado al proyecto real.
- Capturas reales del menú y autenticación de Godot.
- Secciones de gameplay, progresión, A.D.A. y stack.
- Página `/reset-password` para completar el flujo de recuperación de contraseña de Supabase.
- Actualización de contraseña usando únicamente la Project URL, Publishable Key y el access token temporal del enlace de recuperación.

## Desarrollo local

```bash
npm install
cp .env.example .env
npm run dev
```

Rellena `.env` con:

```env
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

La Publishable Key es apropiada para un cliente web. **Nunca** coloques `service_role`, `sb_secret_...` u otras credenciales administrativas en este proyecto.

## Recuperación de contraseña

Una vez desplegada la web, la URL de recuperación debería ser, por ejemplo:

```text
https://tu-dominio-o-host/reset-password
```

Después del despliegue hay que actualizar Supabase:

1. `Authentication -> URL Configuration`.
2. Agregar la URL desplegada a `Redirect URLs`.
3. Configurar la solicitud `/auth/v1/recover` de Godot para usar esa URL como redirect de recuperación, si el código actual sigue enviando `localhost:3000`.
4. Solicitar **un correo nuevo** de recuperación. Los enlaces antiguos seguirán apuntando al redirect anterior.

## Hosting

Es una SPA de Vite. El hosting debe devolver `index.html` para `/reset-password`. En hosts como Cloudflare Pages o Vercel, configura fallback/rewrite de SPA si fuese necesario.

## Contenido que se dejó intencionalmente como roadmap

- A.D.A. aparece como sistema en desarrollo.
- SQL, Java y otras etapas aparecen como próximas fases.
- No se publicitan precios, 200+ misiones, autocompletado u otras funciones no confirmadas en la implementación actual.
