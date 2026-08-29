# SharedSpaceManager

## Introducción

**SharedSpaceManager** es un sistema web de gestión de reservas de espacios compartidos diseñado para que cualquier persona pueda reservar salas de reuniones, espacios de coworking y otros ambientes de trabajo de manera simple, rápida y organizada.

El sistema surge como respuesta a la creciente demanda de espacios de trabajo flexibles, donde la administración manual de reservas genera conflictos de disponibilidad, pérdida de tiempo y falta de visibilidad sobre el uso real de los espacios. SharedSpaceManager centraliza todo el proceso en una plataforma digital accesible, permitiendo a los usuarios gestionar sus reservas en cualquier momento y desde cualquier dispositivo.

---

## Funcionalidades

### Gestión de usuarios

- **Registro de usuario:** cualquier persona puede crear una cuenta en el sistema ingresando sus datos personales. Al completar el registro, el sistema envía una notificación de confirmación.
- **Inicio de sesión:** los usuarios registrados acceden a la plataforma mediante su correo electrónico y contraseña.
- **Recuperación de contraseña:** en caso de olvidar sus credenciales, el usuario puede solicitar un enlace de recuperación que el sistema envía a su correo registrado.

### Gestión de espacios

- **Consulta de espacios disponibles:** los usuarios pueden visualizar los espacios disponibles filtrando por fecha, horario y capacidad.
- **Reserva de espacio:** el usuario selecciona el espacio deseado, elige fecha y franja horaria, y confirma la reserva. El sistema verifica la disponibilidad en tiempo real.
- **Cancelación de reserva:** el usuario puede cancelar una reserva activa desde su panel personal.
- **Consulta de reservas propias:** el usuario accede al historial y estado de todas sus reservas.

### Métricas y reportes

- **Espacios más solicitados:** el sistema identifica y muestra los espacios con mayor cantidad de reservas en un período determinado.
- **Uso por horario:** se visualiza la distribución de reservas según la franja horaria, permitiendo identificar los momentos de mayor demanda.
- **Porcentaje de ocupación diaria:** el sistema calcula y presenta el nivel de ocupación de cada espacio por día, facilitando la toma de decisiones sobre la disponibilidad y administración de los mismos.

---

## **Instalacion y ejecucion (Maqueta)**

Para ejecutar el proyecto correctamente se recomienda seguir estos pasos:

- Obtener archivos del proyecto
    
  ◦ Opcion A: clonar el repositorio "SharedSpaceManager"
  
  ◦ Opcion B: descargar el archivo .ZIP del proyecto y luego descomprimirloIngresar dentro de la carpeta "maqueta"Abrir el archivo "index.html" para abrir el proyecto de manera local.
    
- Ingresar dentro de la carpeta "maqueta"
- Abrir el archivo "index.html" para abrir el proyecto de manera local.

## **Instalacion y ejecucion (Frontend)**
### 1. Instalar Node.js

Descargá e instalá Node.js desde el sitio oficial:

[https://nodejs.org/](https://nodejs.org/)

Se recomienda instalar la versión **LTS** (Long Term Support).

Para verificar que Node.js y npm se instalaron correctamente, ejecutá en la terminal:

```bash
node -v
npm -v
```

Esto debería mostrar las versiones instaladas de cada uno.

### 2. Instalar Angular CLI

Con Node.js y npm ya instalados, instalá Angular CLI de forma global ejecutando:

```bash
npm install -g @angular/cli
```

Para verificar que se instaló correctamente:

```bash
ng version
```

### 3. Clonar el repositorio

Cloná este repositorio en tu máquina local:

```bash
git clone https://github.com/usuario/nombre-del-repositorio.git
```

Luego, ingresá a la carpeta del proyecto:

```bash
cd nombre-del-repositorio
```

### 4. Instalar las dependencias del proyecto

Dentro de la carpeta del proyecto, instalá todas las dependencias necesarias:

```bash
npm install
```

## Ejecución del proyecto

Para levantar el servidor de desarrollo, ejecutá:

```bash
ng serve
```

Por defecto, la aplicación quedará disponible en:

```
http://localhost:4200/
```

La app se recargará automáticamente cada vez que modifiques algún archivo del código fuente.

---

## Tecnologías utilizadas

> HTLM5, CSS3, Bootstrap y Angular 22

---

## Equipo

- Victor Antonio Oviedo
- Agustin Tanno
- Marcos David Reinoso Cavoli
- Maribel Riesgo
- Gadiel Ezequiel Silva Monteabaro
- Fabricio Andres Cocconi Huenz
