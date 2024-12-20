# Ballot Colaborators  

Este proyecto está diseñado para la gestión de boletas y cuenta con dos tipos de usuarios: **Administrador** y **Colaborador**. Está desarrollado en **Next.js 15** y utiliza **MySQL** como base de datos. Cada usuario tiene un rol con diferentes funcionalidades:  

### **Administrador**  
El administrador dispone de los siguientes menús:  
1. **Colaboradores**:  
   - Editar los datos de los colaboradores.  
   - Subir boletas y visualizar los detalles de los colaboradores.  
   - Cambiar el rol de los usuarios.  

2. **Boletas**:  
   - Visualizar todas las boletas existentes.  
   - Aplicar filtros y paginar la lista de boletas.  

### **Colaborador**  
El colaborador tiene acceso a las siguientes opciones:  
1. **Mi Perfil**:  
   - Actualizar la información personal del perfil.  

2. **Mis Boletas**:  
   - Ver un listado general de sus boletas.  
   - Descargar, visualizar e imprimir sus boletas.  

### **Autenticación**  
El método de inicio de sesión está integrado con **Google**, **Microsoft** y **GitHub**. Para que funcione correctamente, las credenciales de estas plataformas deben configurarse en el archivo `.env`.  

---
### **Diagrama de flujo sobre el funcionamiento del login**  

![Diagrama](./public/images/png/diagrama_de_flujo.png)  

---

## Configuración del Proyecto  

Asegúrate de tener las siguientes variables de entorno configuradas en el archivo `.env`:  
- `NEXT_PUBLIC_DATABASE_HOST`= Tu host de MySQL.  
- `NEXT_PUBLIC_DATABASE_USER`= Usuario de la base de datos.  
- `NEXT_PUBLIC_DATABASE_PASSWORD`= Contraseña de la base de datos.  
- `NEXT_PUBLIC_DATABASE_NAME`= Nombre de la base de datos.  
- `PORT`= Puerto de la aplicación (por defecto, 3306).  
- Credenciales para los métodos de login (**Google**, **Microsoft**, **GitHub**).  
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`=tu_google_client_id  
- `NEXT_PUBLIC_GOOGLE_CLIENT_SECRET`=tu_google_client_secret   
- `NEXT_PUBLIC_MICROSOFT_CLIENT_ID`=tu_microsoft_client_id  
- `NEXT_PUBLIC_MICROSOFT_CLIENT_SECRET`=tu_microsoft_client_secret   
- `NEXT_PUBLIC_GITHUB_CLIENT_ID`=tu_github_client_id  
- `NEXT_PUBLIC_GITHUB_CLIENT_SECRET`=tu_github_client_secret   
---

## Iniciar el Proyecto  

Primero, instala las dependencias y ejecuta los siguientes comandos:  

```bash
  yarn
  yarn build
  yarn dev
```
    