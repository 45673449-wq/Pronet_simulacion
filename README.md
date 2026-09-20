# Pronet_simulacion

Simulación académica de Pronet System para registrar servicios, cotizaciones y estados
de seguimiento.

## Funciones

- Inicio de sesión de demostración.
- Registro de servicio nuevo.
- Descripción y dirección del servicio.
- Cotización en soles.
- Bandeja de servicios guardados.
- Estado visual **A la espera** con punto rojo.
- Persistencia local para la simulación.
- Documento académico `PA3_Rivas_Pinedo_Eneas.doc`.

## Credenciales de demostración

- Usuario: `analista@pronet.system`
- Contraseña: `pronet-demo`

## Publicación en Render

El archivo `render.yaml` deja configurado el proyecto como sitio estático. La carpeta
publicada es `artifacts/pronet-testing-simulation/dist/public`.

Para publicarlo, crea un servicio Static Site en Render conectado al repositorio
`45673449-wq/Pronet_simulacion`. La configuración del Blueprint ya define el nombre,
la carpeta publicada y el despliegue automático cuando se haga push a `main`.

> Esta simulación usa almacenamiento local del navegador. Para persistencia multiusuario
> se debe conectar posteriormente una base de datos, como Neon.