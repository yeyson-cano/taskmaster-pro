# TaskMaster Pro

Sistema de gestión de tareas serverless para **TechFix Solutions**.

---

## Descripción

**TaskMaster Pro** es una aplicación diseñada para mejorar la asignación y seguimiento de tareas entre coordinadores y técnicos en **TechFix Solutions**. Utiliza una arquitectura serverless en AWS para proporcionar una solución escalable, eficiente y rentable.

---

## Características

- **Gestión de Tareas**: Crear, asignar, actualizar y eliminar tareas de manera eficiente.
- **Interfaz Web Responsiva**: Acceso desde dispositivos de escritorio y móviles.
- **Arquitectura Serverless**: Uso de AWS Lambda, API Gateway y DynamoDB para una implementación sin servidores.
- **Seguridad Básica**: Uso de claves de API para restringir el acceso a los endpoints.

---

## Tecnologías Utilizadas

- **Backend**: AWS Lambda, AWS API Gateway, AWS DynamoDB.
- **Infraestructura como Código**: Serverless Framework.
- **Lenguaje de Programación**: Node.js.

---

## Estructura del Proyecto

```
├── handlers/            # Funciones Lambda
│   ├── createTarea.js
│   ├── getTareas.js
│   ├── getTareaById.js
│   ├── updateTarea.js
│   └── deleteTarea.js
├── serverless.yml       # Configuración del Serverless Framework
├── package.json         # Dependencias y scripts de npm
├── .gitignore           # Archivos y carpetas a ignorar en Git
└── README.md            # Documentación del proyecto
```

---

## Prerrequisitos

- **Node.js** (versión LTS recomendada)
- **AWS CLI** configurado con credenciales
- **Serverless Framework** instalado globalmente
- **Cuenta de AWS** con los permisos necesarios

---

## Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu_usuario/taskmaster-pro.git
cd taskmaster-pro
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar AWS CLI

Asegúrate de tener configuradas tus credenciales de AWS:

```bash
aws configure
```

Ingresa tu **AWS Access Key ID**, **AWS Secret Access Key**, región y formato de salida.

---

## Despliegue

Para desplegar las funciones Lambda y los recursos en AWS, ejecuta:

```bash
serverless deploy
```

Este comando creará los recursos necesarios en AWS y mostrará los endpoints de la API.

---

## Uso

### Endpoints Principales

- **POST /tareas**

  - **Descripción:** Crear nueva tarea.
  - **Parámetros (Body):**
    - `titulo`: string
    - `descripcion`: string
    - `fechaLimite`: string (fecha en formato ISO 8601)
    - `prioridad`: string (`"alta"`, `"media"`, `"baja"`)
    - `estado`: string (`"pendiente"`, `"en progreso"`, `"completada"`)
    - `tecnico`: string (nombre del técnico asignado)
  - **Respuesta:** Tarea creada con `tareaId`.

- **GET /tareas**

  - **Descripción:** Obtener lista de tareas.
  - **Respuesta:** Lista de tareas existentes.

- **GET /tareas/{tareaId}**

  - **Descripción:** Obtener detalles de una tarea específica.
  - **Parámetros:** `tareaId` en la ruta.
  - **Respuesta:** Detalles de la tarea.

- **PUT /tareas/{tareaId}**

  - **Descripción:** Actualizar una tarea existente.
  - **Parámetros:** `tareaId` en la ruta.
  - **Body:** Campos a actualizar (`titulo`, `descripcion`, `estado`, etc.)
  - **Respuesta:** Tarea actualizada.

- **DELETE /tareas/{tareaId}**

  - **Descripción:** Eliminar una tarea.
  - **Parámetros:** `tareaId` en la ruta.
  - **Respuesta:** Confirmación de eliminación.

### Seguridad Básica

- **Claves de API**: El API Gateway está configurado para requerir una clave de API para acceder a los endpoints. Esto proporciona una capa básica de seguridad.

- **Uso de la Clave de API**: Al hacer solicitudes a los endpoints, debes incluir el encabezado `x-api-key` con el valor de la clave proporcionada.

---

## Desarrollo

### Ejecutar Localmente con Serverless Offline

**Aclaración**: Considere que no se podrán realizar solicitudes dado que no se instanciará una Base de Datos en donde guardar la información.

Para probar las funciones Lambda localmente:

1. Instala el plugin Serverless Offline si no lo tienes ya instalado:

   ```bash
   npm install serverless-offline --save-dev
   ```

2. Ejecuta el proyecto localmente:

   ```bash
   serverless offline
   ```

   Esto iniciará un servidor local en `http://localhost:3000`.

### Estructura del Código

- **handlers/**: Contiene las funciones Lambda que manejan las solicitudes HTTP.
- **serverless.yml**: Configuración del Serverless Framework y despliegue.
- **package.json**: Información del proyecto y scripts de npm.

---

## Pruebas

Puedes utilizar herramientas como **Postman** o **curl** para probar los endpoints de la API.

Ejemplo de solicitud para crear una tarea:

```bash
curl -X POST https://tu-api-endpoint/tareas \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: tu-clave-de-api' \
  -d '{
        "titulo": "Reparar computadora",
        "descripcion": "El cliente reporta que su computadora no enciende",
        "fechaLimite": "2024-11-15T00:00:00Z",
        "prioridad": "alta",
        "estado": "pendiente",
        "tecnico": "Carlos López"
      }'
```

---

## Contribuir

Las contribuciones son bienvenidas. Si deseas colaborar:

1. Haz un **fork** del repositorio.
2. Crea una **rama** para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz **commit** (`git commit -m 'Agrega nueva funcionalidad'`).
4. Haz **push** a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un **Pull Request**.

---

## Seguridad

- **No incluyas información sensible** en el código ni en los commits.
- **Asegúrate** de que el archivo `.gitignore` incluye archivos y carpetas que no deben subirse al repositorio, como `node_modules/` y cualquier archivo de configuración local.
- **Revisa tu código** antes de hacer commits para asegurarte de que no estás incluyendo credenciales o claves.

---

## Licencia

Este proyecto está licenciado bajo los términos de la **Licencia Pública General de GNU versión 3**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

## Contacto

- **Nombre:** Yeyson Samir Cano Carbajo
- **Rol:** Desarrollador Principal del Proyecto
- **Email:** yeyson.cano.carbajo@gmail.com

---

**Nota:** Este proyecto es una prueba de concepto y los nombres y datos utilizados, a excepción de los de contacto, son ficticios.
