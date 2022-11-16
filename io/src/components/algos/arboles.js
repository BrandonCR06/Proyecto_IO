import '../../App.css';
import React from "react";
import fileSaver from "file-saver";


class ArbolAlgo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            llaves: this.props.llaves,
            pesos: this.props.pesos
        };  
    }


    
    arbolOptimo=(keys, p)=>{
        let A = []
        //Tabla de respuesta
        let R = []
        let colstart = 0
        let rowstart = 1
        let n = keys.length
        for (let i = 0 ; i < keys.length+1;i++){
            let k = []
            let s = []
            for (let j = 0 ; j < keys.length+1;j++){
                k.push(undefined)
                s.push(undefined)
            }
            A.push(k)
            R.push(s)
        }

        
    
        for (let i = 1 ; i < n+2 ; i++){

            A[i-rowstart][i-1] = 0
            R[i-rowstart][i-1] = 0
        }
        
        
        for (let i = 1 ; i < n+1; i++){
            A[i-rowstart][i] = p[i-1]
            R[i-rowstart][i] = keys[i-1]
        }

        
        // Arbol minimo desde i a j

        let i = 1
        let j=2
        let rj = j
        while(i < n+1 && rj<n+1){	
            while(j< n+1){
                let  vals = []
                let kas = []
                
                for (let k =  i; k< j+1; k++){
                    
                    let sumk = 0
                    for (let g = i; g<j+1; g++) {
                        sumk = sumk + p[g-1]
                    }
                    vals.push(A[i-rowstart][k-1]+A[k+1-rowstart][j]+sumk)
                    kas.push(k)                    
                }
                
                console.log(") = ",Math.min(...vals), ", K elegido = ", kas[vals.indexOf(Math.min(...vals))])
                A[i-rowstart][j] = Math.round(Math.min(...vals)	* 100) / 100
                
                R[i-rowstart][j] = kas[vals.indexOf(Math.min(...vals))]
                j+=1
                i+=1		
            } 
            i = 1
            rj = rj+1
            j = rj
        }
        console.log("TABLA R")
        console.log(R)	
        console.log()
        console.log("TABLA M")
        console.log(A)
        return [A,R]
    }   

    makeParameter1 = (llaves, pesos)=>{
        let result = llaves.map(function(value, index) {
            return [llaves[index], pesos[parseInt(index)]];
        });
        return result
    }

    sortArray(x, y) {
        if (x[0] < y[0]) {return -1;}
        if (x[0] > y[0]) {return 1;}
        return 0;
    }

    listLlaves(lista) {
        let list = []
        for (let i=0; i<lista.length; i++) {
            console.log(lista[i][0])
            list.push(lista[i][0])
        }
        return list
    }

    listPesos(lista) {
        let list = []
        for (let i=0; i<lista.length; i++) {
            list.push(lista[i][1])
        }
        return list
    }


    render ()

    {


        // Se junta en una lista cada llave con su peso
        let l = this.makeParameter1(this.state.llaves, this.state.pesos.map(parseFloat))
        console.log(l)

        //let l =[[5,9],[9,3],[3,4],[4,6],[6,7],[7,8]]
        //console.log("ARBOL A PROCESAR")
        //console.log(l)

        //let arbol = this.arbolOptimo(this.state.llaves, this.state.pesos);

        //let ej1k =[1,2,3,4]	
        //let ej1p =[0.18,0.32,0.39,0.11]	
        console.log(this.state.llaves)
        console.log(this.state.pesos)

        // Se ordena alfabeticamente ese arreglo
        let ordenado = l.sort(this.sortArray)
        console.log("ordenado")
        console.log(ordenado)

        // Se obtiene nuevamente las llaves y pesos
        let llavesOrdenado = this.listLlaves(ordenado)
        let pesosOrdenado = this.listPesos(ordenado)

        

        // Se llama al funciòn
        let arbol = this.arbolOptimo(llavesOrdenado, pesosOrdenado);
       
        return (
            <div>
            <h4 class='text-white'>Tabla R</h4>            
            {desplegarTablas([Tabla([],arbol[1])])}

            <br></br>
            <h4 class='text-white'>Tabla A</h4>
            {desplegarTablas([Tabla([],arbol[0])])}
             </div>
        )
    }






}


function desplegarTablas(datos){
    return(
        <div>                             
             {datos.map(dato => {                                  
                
                return (                    
                    dato
                )
                    
                })}                       

              
        </div>
    )

}


function ColumnsDark(bg,col){
    
    return (        
        <td  class = {bg+"noborder bg-opacity-10 wid"} scope="col">{col}</td>
    )
}
function Columns(bg,col){
    
    return (        
        <td class = {bg+" wid"} scope="col">{col}</td>
    )
}
function Tabla(filas, matrix) {    
    //cambiar el color
    let rows = [] 
    if(matrix){
    let coles = []
    coles.push(ColumnsDark('text-white bg-dark ',''))

    for(let i =0;i <matrix.length;i++){
        
        coles.push(ColumnsDark('text-white bg-dark ',i+1))
    }
    rows.push(coles)

    for(let i =0;i <matrix.length;i++){
        let cols = []        
        cols.push(ColumnsDark('text-white bg-dark ',i+1))
        for(let j =0;j <matrix.length;j++){
            
            cols.push(Columns('text-white bg-primary',matrix[i][j]))
            

        }
        rows.push(cols)
        
    }
    //filas = rows;

    }
        return (                                                
                        
            
            <div >
            
            <table class = "table-bordered table table-dark">
            
            {rows.map((row,i) => {  
                return(
                    <thead class="thead-light">
                    <tr>
                    {rows.map((col,j) => {                              
                        return(                            
                            rows[i][j]                                                                             
                        )
                        
                        
                    })}     
                    </tr>           
                    </thead>
                )
            })}            
                
            </table>            
            </div>            
        );
    
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputLinkClicked: false,
            m :[],
            nombres : [],
            listaPes: [],
            cantidadLlaves: 0,
            codigos: [],
            pesos: []
          }
      }


    setd = (e) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
          
          this.setState({codigos:[]})
          this.setState({pesos:[]})
          this.setState({cantidadLlaves:0})
          this.setState({inputLinkClicked:false})
            
          const text = e.target.result;
          
          console.log("asd")
          console.log(text)
          console.log(text.split("\n"))
          let datos = text.split("\n")
          let llaves = datos[0].split(",")
          let pesosFile = datos[1].split(",")
          document.getElementById('keys').value = llaves.length
          this.setState({cantidadLlaves:llaves.length})
          
          console.log("adasdda")
          console.log(llaves)
          console.log(pesosFile)

          this.setState({codigos:llaves})
          this.setState({pesos:pesosFile})


          //document.getElementById('probLocal').value = parseFloat(juego[1])
          //document.getElementById('probVisita').value = parseFloat(juego[2])

          /*
          this.changeJuegos(parseInt(juego[0]))
          this.setState({propLocal:parseInt(juego[1])})
          this.setState({propVisit:parseInt(juego[2])})
          
          
          this.setState({localiasValues:partidos})
          */
          //this.handlePartidos(partidos)
          //this.setState({propLocal:parseFloat(juego[1])})
          //this.setState({propVisit:parseFloat(juego[2])})
          
          //console.log("JUEGOS->"+this.state.juegos)
          //console.log("PARTIDOS->"+this.state.localiasValues)
          //console.log(partidos)
          //this.handleAmountGames2(parseInt(juego[0]), partidos)

                          
        };
            reader.readAsText(e.target.files[0]);
    }

    handleN = (e) => {
        console.log(e.target.value)
        let num = parseInt(e.target.value);
        //this.setState({knapConfirmed:false});
        this.setState({cantidadLlaves:num});
        this.setArray(num);
    }

    cambioValPes =(evt,list,i)=>{
        let change = evt.target.value;
        if(list ===[]){
            list = new Array(this.state.cantidadLlaves);
        }
        list[i]  = change;
    }

    setArray = (num)=>{
        
        let comparator = 0;
        if(this.state.cantidadLlaves<num){
            comparator = this.state.cantidadLlaves+1;
        } else {
            comparator = this.state.cantidadLlaves-1;
        }
        console.log("length"+this.state.pesos.length ,"cant"+num, "state"+comparator)
        if(num>=0){
            while(this.state.pesos.length >comparator){
                this.state.pesos.pop()
                this.state.codigos.pop()
            }
        }    
    }
     

        
    
      desplegarTablaInputs = ()=> {
        let listaDespliegue = []
        let listapes = []
        for(let i = 0 ; i < this.state.cantidadLlaves ; i++){
            listaDespliegue.push(
                <div class='col'>
                  <input                     
                className="input"                        
                  type={"text"}
                onChange = {evt => this.cambioValPes(evt,this.state.cantidadLlaves, i)}
            
                
                >                            
                </input>            
            </div>
            )
            listapes.push([
                <div class='col'>
                  <input                      
                className="input"                        
                  type={"text"}
                  id={"codigo"+i}
                
                onChange = {evt => this.cambioValPes(evt,this.state.codigos, i)}
                defaultValue={this.state.codigos[i]}
                >                            
                </input>            
            </div>, 
            <div class='col'>
                 <input                      
               className="input"                        
                 type={"text"}
               onChange = {evt => this.cambioValPes(evt,this.state.pesos, i)}
               defaultValue={this.state.pesos[i]}
               >                            
               </input>            
           </div>]
        )
        }
       
        return (  
            <table class = "table-bordered table table-dark">
                <thead class="thead-light">       
                {this.state.cantidadLlaves>0 ?
                <tr>
                <th scope="col"> </th>
                <th scope="col">Codigo</th>
                <th scope="col">Peso</th>
                </tr>:
                <div/>
                }        
                     {listaDespliegue.map((row,i) => {  
                        return(            
                            <tr>
                            <th scope="row">Llave {i+1}</th>
                             <td>{listapes[i][0]}</td>
                             <td>{listapes[i][1]}</td>
                            </tr>                     
                )
                 })}        
                 </thead>    
                
                </table>
                
        )

    }

    handleArbol = (e) => {
        this.setState({inputLinkClicked:false})
        console.log("Codigos-> "+this.state.codigos)
        console.log("Pesos->"+this.state.pesos)
        this.setState({inputLinkClicked:true})
    }

    saveFile = () => {        
        const blob = new Blob( [
            this.state.codigos+"\n",
            this.state.pesos
        ], { type: 'text/plan;charset=utf8'});
        fileSaver.saveAs( blob, "series.txt");

    }

    render(


        
    ) {
    
    return (
        <div  id = "1" class = "p-5 ms-auto">       
        <h1 className='text-center text-white'>Arboles Binarios de Busqueda Optimos</h1>            
        <div className="mb-3 cont">            
            <h2 id="fileInput" className=' text-primary'>Seleccionar un archivo de prueba:</h2>            
            <input  className=" form-control text-white bg-dark" type="file" id="formFile" onChange={this.setd}></input>
            <br></br>
            
            
            <h2 className=' text-white'> Crear dinámicamente:</h2>    
            <br></br>
            <p className=' text-white'>Ingrese el número de llaves</p>         
            <input id="keys" onChange={this.handleN} className='form-control text-white bg-dark' type="number"></input><br/>
            {this.desplegarTablaInputs()}
            </div>
            <div>
            <button onClick={this.handleArbol} type="button" class="btn btn-secondary btn-outline-white">Generar Algoritmo</button><br></br>
            {this.state.inputLinkClicked?           
                <div>
                    <h2 className=' text-white'>Creado dinámicamente:</h2>            
                    <br></br>
                    <ArbolAlgo llaves={this.state.codigos} pesos={this.state.pesos}></ArbolAlgo> 
                    <br></br>
                    <button onClick={this.saveFile} type="button" class="btn btn-secondary btn-outline-white">Grabar archivo</button>
                    
                    
                </div>
              :

              <div></div>
            }

        </div>
        </div>
    )
    }
}



function Arbol() {

    return (
        <App></App>
    )

}

export default Arbol;