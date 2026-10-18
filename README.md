# Esquiú 3 - Sistema de Gestión y Reserva de Canchas de Fútbol

## Introducción

**Esquiú 3** es una plataforma web desarrollada para la gestión y reserva de turnos en el complejo de fútbol referente de Córdoba. Permite a los jugadores y equipos consultar disponibilidad en tiempo real, reservar canchas de fútbol (Fútbol 8 y Fútbol 11, tanto en césped sintético como natural) y organizar sus partidos de forma ágil, cómoda y sin intermediarios.

El sistema digitaliza el proceso tradicional de reservas telefónicas o presenciales, evitando superposiciones de turnos, optimizando la ocupación del predio y facilitando la administración integral de las canchas, estados y horarios.

---

## Funcionalidades Principales

### Gestión de Usuarios y Autenticación
- **Registro de jugadores:** creación de cuentas con validación de datos personales.
- **Inicio de sesión y roles:** acceso diferenciado para clientes/jugadores y administradores del complejo.
- **Perfil de usuario:** consulta y administración de datos de contacto.

### Reserva de Canchas y Turnos
- **Disponibilidad en tiempo real:** visualización de canchas libres filtrando por fecha, franja horaria y tipo de cancha (Fútbol 8, Fútbol 11, superficie sintética o natural).
- **Control de disponibilidad:** verificación automática que previene solapamiento de horarios o reservas sobre canchas en mantenimiento.
- **Confirmación instantánea:** asignación de turno con detalles de fecha, horario y cancha seleccionada.
- **Mis Reservas:** panel donde cada usuario visualiza sus próximos partidos, estado del turno (pendiente, confirmada, cancelada o finalizada) y su historial.
- **Cancelación de turnos:** posibilidad de dar de baja una reserva desde el panel personal.

### Panel de Administración (Gestión del Predio)
- **Gestión de canchas:** alta, modificación y control de estado de las canchas (disponible / mantenimiento).
- **Control de reservas:** supervisión general de turnos, confirmaciones y cancelaciones.
- **Métricas operativas:** visualización de demanda por horarios y niveles de ocupación de las canchas.

---

## Instalación y ejecución (Maqueta)

Para visualizar la maqueta estática inicial del proyecto:

1. **Obtener los archivos:**
   - **Opción A:** Clonar el repositorio:
     ```bash
     git clone https://github.com/Hacknet-ISPC/SharedSpaceManager.git
     ```
   - **Opción B:** Descargar el archivo `.ZIP` desde GitHub y descomprimirlo.

2. Ingresar a la carpeta `maqueta`.
3. Abrir el archivo `index.html` en el navegador.

---

## Instalación y ejecución (Frontend)

El frontend está desarrollado con **Angular** y **Bootstrap**.

### 1. Requisitos previos
- **Node.js** (versión LTS recomendada) → [https://nodejs.org/](https://nodejs.org/)
- **Angular CLI** instalado globalmente:
  ```bash
  npm install -g @angular/cli
  ```

### 2. Clonar e ingresar al proyecto
```bash
git clone https://github.com/Hacknet-ISPC/SharedSpaceManager.git
cd SharedSpaceManager/frontend
```

### 3. Instalar dependencias
```bash
npm install
```

### 4. Ejecución del Frontend

Para utilizar la aplicación completa se requieren dos terminales:

**Terminal 1 — Servidor de desarrollo Angular:**
```bash
ng serve
```
> La aplicación estará disponible en: `http://localhost:4200/`

**Terminal 2 — JSON Server (Mock API para desarrollo):**
```bash
npm run server
```
> La API simulada estará disponible en: `http://localhost:3000/` con endpoints para `usuarios`, `roles`, `espacios`/`canchas`, `reservas` y `desarrolladores`.

---

## Instalación y ejecución (Backend)

El backend está desarrollado con **Django** y **Django REST Framework**, conectado a una base de datos **MySQL**.

### Requisitos previos
- **Python 3.10+** → [https://www.python.org/](https://www.python.org/)
- **MySQL Server** → [https://www.mysql.com/](https://www.mysql.com/)

### 1. Crear y activar el entorno virtual
Dentro de la carpeta `backend`:

```bash
cd backend

# Crear entorno virtual
python -m venv venv

# Activar en Windows
venv\Scripts\activate

# Activar en Linux/Mac
source venv/bin/activate
```

### 2. Instalar dependencias
```bash
pip install -r requirements.txt
```

### 3. Configuración del archivo `.env`
Crear un archivo `.env` dentro de la carpeta `backend` con las credenciales de conexión:

```env
DB_NAME=esquiu3
DB_USER=root
DB_PASSWORD=tu_contraseña_mysql
DB_HOST=127.0.0.1
DB_PORT=3306
```

### 4. Base de datos y migraciones
Crear la base de datos en MySQL:
```sql
CREATE DATABASE esquiu3 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Aplicar las migraciones de Django:
```bash
python manage.py migrate
```

### 5. Iniciar el servidor Django
```bash
python manage.py runserver
```
> El servidor quedará activo en: `http://localhost:8000/`

### Endpoints principales del Backend

| Módulo | Endpoint | Descripción |
|---|---|---|
| **Canchas** | `http://localhost:8000/api/v1/canchas/` | Listado y detalle de canchas, tipos y superficies |
| **Reservas** | `http://localhost:8000/api/v1/reservas/` | Creación, consulta y cancelación de turnos |
| **Usuarios** | `http://localhost:8000/api/v1/usuarios/` | Registro, autenticación y gestión de usuarios |
| **Admin Django** | `http://localhost:8000/admin/` | Panel administrativo nativo |

---

## Tecnologías Utilizadas

### Frontend
- **Angular 22**
- **TypeScript**
- **HTML5 & CSS3**
- **Bootstrap 5.3**
- **JSON Server**

### Backend & Base de Datos
- **Python**
- **Django 6.1**
- **Django REST Framework**
- **MySQL**
- **django-cors-headers**
- **python-dotenv**

---

## Equipo de Desarrollo

| Integrante | Rol | Contacto |
|---|---|---|
| Victor Antonio Oviedo | Desarrollador | [LinkedIn](https://www.linkedin.com/in/victor-a-oviedo/) |
| Agustín Tanno | Desarrollador | [LinkedIn](https://www.linkedin.com/in/agustin-tanno-6513542a9/) |
| Marcos David Reinoso Cavoli | Desarrollador | [LinkedIn](https://www.linkedin.com/in/marcos-david-reinoso-cavoli-67a954375/) |
| Maribel Riesgo | Desarrolladora | [LinkedIn](https://www.linkedin.com/in/maribel-riesgo/) |
| Gadiel Ezequiel Silva Monteabaro | Desarrollador | [LinkedIn](https://www.linkedin.com/in/gadiel-silva-monteabaro-4353a9273/) |
| Fabricio Andrés Cocconi Huenz | Desarrollador | [LinkedIn](https://www.linkedin.com/in/fabricio-andr%C3%A9s-cocconi-huenz-9592ab356/) |
