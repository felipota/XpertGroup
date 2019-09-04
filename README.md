# XpertGroup
Cube Sumation

## Capas
### Para esta solucion se crearon tres proyectos:
* ##### **API** : Capa de presentación / API.
* ##### **Services** : Capa de negocio.
* ##### **Test** : Proyecto de pruebas unitarias.

## Contratos
### Para la capa de servicios se creó la Interface:
* ##### **ICubeSumation** : Es el contrato para la implementación de CubeSumation.

## Clases
### Para la capa de servicios se creó la siguiente Clase:
* ##### **CubeSumation** : Es la Implementación de Cube sumation.
### Para la capa de servicios se creó el siguiente Modelo:
* ##### **QueryDTO** : Es el objeto de trasferencia de información desde la capa de presentación hacia el API.

## Mecanismo de entrada
Como mecanismo de entrada se utilizó una página SPA construida con el framework de javascript Angular, en el cual a través de un campo 
 "input" dentro de un formulario se valida el formato del input. Una vez esta validado se itera por la cantidad de intentos.
Cada iteración regresa su respectivo output el cual es mostrado en una tabla.


## Preguntas

* ### La responsabilidad única es el primer Principio SOLID el cual consiste en delegar propósitos únicos a las clases que se crean de esta manera los cambios en estas implementaciones tienen menos oportunidades de contener bugs.
* ### El código limpio es un código fácil de entender y modificar por cualquiera.
