# Angular Login CRUD Project

Este proyecto es una aplicación de ejemplo que muestra un sistema de inicio de sesión y CRUD (Create, Read, Update, Delete) utilizando Angular. Permite a los usuarios autenticarse, ver una lista de usuarios, agregar nuevos usuarios, editar usuarios existentes y eliminar usuarios.

## Instalación

```bash
# Clonar el repositorio
gh repo clone DxrkMxn/angular-login-crud-project
cd angular-login-crud-project

# Instalar dependencias
npm install

#USO:
# Iniciar la aplicación
ng serve

# Abre tu navegador web y accede a http://localhost:4200 para ver la aplicación en funcionamiento.

# Componentes
# La aplicación consta de los siguientes componentes:

# UserList: Muestra una lista de usuarios con funcionalidades de paginación, edición y eliminación.
# UserForm: Permite agregar nuevos usuarios o editar usuarios existentes.
# Login: Pantalla de inicio de sesión para autenticar a los usuarios.
# Servicios
# Los servicios utilizados en la aplicación son:

# UserService: Gestiona las operaciones CRUD de los usuarios.
# AuthService: Maneja la autenticación de usuarios.
# Librerías y Dependencias
# Además de las dependencias predeterminadas de Angular, el proyecto también utiliza las siguientes librerías y dependencias:

# Angular Material: Proporciona componentes y estilos predefinidos para una interfaz de usuario moderna.
# ngx-loading: Biblioteca para mostrar indicadores de carga durante las operaciones asíncronas.
# Generación de Usuarios de Prueba
# El archivo src/app/user-list/user-list.component.ts contiene un código de ejemplo para generar 30 usuarios de prueba con datos aleatorios. Puedes utilizar este # código para crear una lista inicial de usuarios en tu aplicación.

# Contribuciones
# Si deseas contribuir a este proyecto, siéntete libre de abrir un problema o enviar una solicitud de extracción. Estamos abiertos a sugerencias y mejoras.