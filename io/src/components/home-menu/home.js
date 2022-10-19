
import { notAvailable } from '../../libs/sweetAlert.js';

import '../../App.css';

function Home() {
  return (
    <body class = "p-4">
      <h1 class='text-center text-white'>Visualizador de algoritmos</h1>
      <br></br>
      <div class="text-center"></div>
      <br></br>
      <div class="text-center">        
        <div class="btn-group-lg btn-group-vertical">          
        <a href="/Floyd" type="button" class="btn btn-secondary btn-outline-white" data-toggle="tooltip" data-placement="bottom" title="Algoritmo de análisis sobre grafos para encontrar el camino mínimo" >
          Rutas más cortas 
        </a>
        <li > </li>
        <a type="button" class="btn btn-secondary btn-block btn-outline-white" data-toggle="tooltip" data-placement="bottom" title="Es un problema de optimización combinatoria, es decir, que busca la mejor solución entre un conjunto finito de posibles soluciones a un problema." href = "/Knapsack">
          Problema de la mochila
        </a>
        <li > </li>
        <button type="button" class="btn btn-secondary btn-block btn-outline-white" data-toggle="tooltip" data-placement="bottom" title="Es una decisión que involucra aspectos de carácter estratégico debido a que ella determina los niveles de operación, las necesidades de mantención y la capacidad productiva." onClick = {notAvailable}>
          Reemplazo de equipos
        </button>
        <li > </li>
        <button type="button" class="btn btn-secondary btn-block btn-outline-white" data-toggle="tooltip" data-placement="bottom" title="Es un tipo particular de árbol binario que presenta una estructura de datos en forma de árbol usada para tomar desiciones de la mejor forma posible" onClick = {notAvailable}>
          Árboles Binarios de Búsqueda Óptimos
        </button>
        <li > </li>
        <button type="button" class="btn btn-secondary btn-block btn-outline-white" data-toggle="tooltip" data-placement="bottom" title="Problemas en los cuales se calcula la probabilidades de victorias de equipos de deportes con respecto a sus posibilidades de ganar en casa o de visita" onClick = {notAvailable}>
          Series Deportivas
        </button>
        <li > </li>
        <button type="button" class="btn btn-secondary btn-block btn-outline-white" data-toggle="tooltip" data-placement="bottom" title="Consiste en combinar linealmente dos o más matrices mediante la adición de sus elementos dependiendo de su situación dentro de la matriz origen respetando el orden de los factores." onClick = {notAvailable}>
            Multiplicación de Matrices  
        </button>
        <li> </li>
        <button type="button" class="btn btn-secondary btn-block btn-outline-white" data-toggle="tooltip" data-placement="bottom" title="Botón para salir del programa" >
          Salir del Programa
        </button>        
        </div>
      </div>
    </body>
  );
}

export default Home;