# Travel-Planner
Es una aplicación para ayudar a los usuarios a planificar sus viajes, dependiendo de la configuración que los usuarios quieran poner en su panel de configuración (dinero que quieran gastar, duración del viaje, etc).

# Instalación
Los pasos a seguir para la correcta instalación del repositorio son:
1. Clonar el repositorio con el comando git clone https://github.com/Rumi18/Travel-Planner.git
2. Acceder a la carpeta Travel-Planer
3. Bajar la rama dev mediante el comando git branch dev remotes/origin/dev
4. Moverse a dicha rama mediante el comando git checkout dev
5. Ejecutar el comando npm run node_module. Este comando solo se tendrá que ejecutar la primera vez, cuando se hace la conación del proyecto.
6. Ejecutar el comando npm start. Levanta el servidor para correr la aplicación.

Tras finalizar estos pasos se observa que la aplicación ya se encuentra corriendo en la dirección http://localhost:4200

# Ramas

Existen dos ramas principales en el proyecto:

- Rama master:
Contiene la versión estable que se despliega en el servidor de Azure. Cada cierto tiempo se hace una copia de seguridad de esta rama.

- Rama dev:
Contiene la versión en desarrollo del proyecto. Las nuevas tareas que se hayan realizado junto con su correspondiente batería de pruebas se subirán a esta rama. Cuando se realice la validación del documento de batería de pruebas por parte de otra persona ajena al desarrollo de la tarea será cuando se realice el merge con la rama master, para que quede integrado en la nueva versión.

Además de estas dos ramas, por cada tarea realizada se tendrá que crear una nueva rama de desarrollo para esa tarea, y una vez completado el desarrollo será cuando se realice el pull request a la rama dev.
