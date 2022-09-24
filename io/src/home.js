import './App.css';

function Home() {
  return (
    <body>
      <h1 class='text-center text-white'>Visualizador de algoritmos</h1>
      <br></br>
      <div class="text-center"></div>
      <br></br>
      <div class="text-center">        
        <div class="btn-group-lg btn-group-vertical">          
        <button type="button" class="btn btn-secondary btn-outline-white" data-toggle="tooltip" data-placement="bottom" title="Algoritmo bla bla bla">
          Rutas más cortas 
        </button>
        <li > </li>
        <button type="button" class="btn btn-secondary btn-block btn-outline-white" data-toggle="tooltip" data-placement="bottom" title="Algoritmo bla bla bla">
          Problema de la mochila
        </button>
        <li > </li>
        <button type="button" class="btn btn-secondary btn-block btn-outline-white" data-toggle="tooltip" data-placement="bottom" title="Algoritmo bla bla bla">
          Reemplazo de equipos
        </button>
        <li > </li>
        <button type="button" class="btn btn-secondary btn-block btn-outline-white" data-toggle="tooltip" data-placement="bottom" title="Algoritmo bla bla bla">
          Árboles Binarios de Búsqueda Óptimos
        </button>
        <li > </li>
        <button type="button" class="btn btn-secondary btn-block btn-outline-white" data-toggle="tooltip" data-placement="bottom" title="Algoritmo bla bla bla">
          Series Deportivas
        </button>
        <li > </li>
        <button type="button" class="btn btn-secondary btn-block btn-outline-white" data-toggle="tooltip" data-placement="bottom" title="Algoritmo bla bla bla">
            Multiplicación de Matrices 
        </button>
        <li> </li>
        <button type="button" class="btn btn-secondary btn-block btn-outline-white" data-toggle="tooltip" data-placement="bottom" title="Algoritmo bla bla bla">
          Salir del Programa
        </button>        
        </div>
      </div>
    </body>
  );
}

export default Home;