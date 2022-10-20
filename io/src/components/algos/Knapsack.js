import '../../App.css';
import React from 'react';
import KnapsackMenu from '../home-menu/floydMenu';
import FloydModal from '../../components/FloydModal';




 
class KnapsackAlgo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          pesos: [],
          valores :[],
          capacidad:[],
          capacidades:[]
        };
      }
      

       bounded = (v, c, horas)=>{
        
        let n = v.length
        let Tabla = new Array(horas+1);
        let A = new Array(horas+1);
        for (let k = 0 ; k < horas+1; k++){
            let col = new Array(n+1);
            let colk = new Array(n+1);
            for(let j = 0 ; j < n+1;j++){
                col [j] = 0
                colk [j] = 0

            }
            Tabla[k] = colk
            A[k] = col;
        }
        
        
        for (let i = 0; i < horas+1; i++){
            i = i
            for (let j = 1 ; j < n+1 ;j ++){
                j = j
                let bg = ""
                if(i-c[j-1] < 0  ){
                    if(j-1>=0){
                        A[i][j] = A[i][j-1]
                        //marcar con rojo
                        

                    }else{
            
                        A[i][j] = 0
                        //marcar con rojo
                    }
                    bg = "bg-danger"
                }else {
                    
                    A[i][j]  = Math.max(A[i][j-1],v[j-1]+A[i-c[j-1]][j-1])
                }
                if(A[i][j]!= A[i][j-1]){
                    bg = "bg-success"
                } else {bg = "bg-danger";}
                Tabla[i][j]=  Columns(bg, A[i][j]);
                
            }

                //if(A[i][j]!= A[i][j-1]):
        
         }
                    //marcar con verde
        console.log(Tabla);
        console.log(A);
        

            
        return Tabla;
    }

        
     
    
     
       
    

   
   
    render(){            
        
     console.log(this.props.valores,this.props.pesos,this.props.capacidad);
     
        
    
    //{this.bounded(this.props.pesos,this.props.valores,this.props.capacidad).map((row,i) =>{
        return (
            <div>
                                  
            
             <table class = "table-bordered table table-dark">
            
            {this.bounded(this.props.pesos,this.props.valores,this.props.capacidad).map((row,i) => {  
                return(
                    <thead class="thead-light">
                    <tr>
                    {row.map((col,j) => {   
                        
                        return(                                           
                            col
                        )
                        
                        
                    })}     
                    </tr>           
                    </thead>
                )
            })}            
            </table>
                
          
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



function Columns(bg,col){
    
    return (        
        <td class = {bg+" wid"} scope="col">{col}</td>
    )
}
function TablaP(filas) {    
    //cambiar el color
         
        return (                                                
                        
            
            <div >
            <h3 class = "text-white font-12">{"Tabla P"}</h3>
            <table class = "table-bordered table table-dark">
            
            {filas.map((row,i) => {  
                return(
                    <thead class="thead-light">
                    <tr>
                    {row.map((col,j) => {                              
                        return(                            
                            filas[i][j]                                                                             
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

class  App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        
            capacidad: 0,
            cantidadObjetos: 0 , 
            valores: [], 
            pesos: [] ,
            
            knapConfirmed: false
          }
      }
      cambioValPes =(evt,list,i)=>{
        let change = evt.target.value;
        if(list ===[]){
            list = new Array(this.state.cantidadObjetos);
        }
        list[i]  = change;
        
        
        




        }
     
    
      desplegarTablaInputs = ()=> {
        let listaDespliegue = []
        let listapes = []
        for(let i = 0 ; i < this.state.cantidadObjetos ; i++){
            listaDespliegue.push(
                <div class='col'>
               
        
                  <input                     
                className="input"                        
                  type={"text"}
                defaultValue = {0}
                onChange = {evt => this.cambioValPes(evt,this.state.valores, i)}
                
                >                            
                </input>            
            </div>
            )
            listapes.push(
                <div class='col'>
                 
        
                  <input                      
                className="input"                        
                  type={"text"}
                defaultValue = {0}
                onChange = {evt => this.cambioValPes(evt,this.state.pesos, i)}
                >                            
                </input>            
            </div>
        )
        }
       
        return (  
            <table class = "table-bordered table table-dark">
                <thead class="thead-light">       
                {this.state.cantidadObjetos>0 ?
                <tr>
                <th scope="col"> </th>
                <th scope="col">Valor</th>
                <th scope="col">Peso</th>
                
                </tr>:
                <div/>
                }        
                            
                     {listaDespliegue.map((row,i) => {  
                        return(
                                            
                            <tr>

                            <th scope="row">Objeto {i+1}</th>
                             <td> {listapes[i]}</td>
                             <td>     {row}</td>
                            
                            
                               
                            </tr>  
                               
                               
                            
                            
                            
                            
                )
                 })}        
                 </thead>    
                
                </table>
                
        )
        


      }
      confirmKnap = (e) =>{
        
        
        
        for(let i = 0 ; i < this.state.pesos.length; i++){
            this.state.pesos[i] = parseInt(this.state.pesos[i])
            this.state.valores[i] = parseInt(this.state.valores[i])
        }
        
        console.log(this.state.capacidad)
        
        this.setState({knapConfirmed:true});


      } 
       setd = (e)=>{
        
        
        let num = parseInt(e.target.value);

        
        this.setState({knapConfirmed:false});
        
        
        this.setState({cantidadObjetos: num});
        
    }
   
    

  render (){
    
    
/**
 * 
*/
    // using the readFileSync() function
    // and passing the path to the file
    

   
    
    
        
   
    return(
        
        <div  id = "1" className = "p-4 ms-auto">       
        
        <h1 className='text-center text-white'>Problema de la mochila</h1>            
        <div className="mb-3 cont">            
        <h4 className=' text-white'>Ingrese la cantidad de objetos</h4>            
        <input  className=" form-control text-white bg-dark" type="number" onChange={this.setd}></input>
                   
        </div>
        {this.desplegarTablaInputs()}
        {this.state.cantidadObjetos>0 ?
        <div>
            
            <br></br><br></br>
            <h4 className=' text-white'>Ingrese la capacidad máxima</h4>
            <input onChange={evt =>{this.setState({capacidad:parseInt(evt.target.value)})}} style = {{maxWidth:"10%"}}className="  form-control text-white bg-dark" type="text" ></input>
            <br></br>
            <button onClick={this.confirmKnap} type="button" class="btn btn-secondary btn-block btn-outline-white">Generar Algoritmo</button>            
            
            <br></br>
            <br></br>
        </div>
             :
                <div/>
                }     
        
        
        {this.state.knapConfirmed ?
            <KnapsackAlgo valores = {this.state.valores} capacidad = {this.state.capacidad} pesos = {this.state.pesos}/>
            :
        <div/>
        }
                             
        
           
        
    </div>
    )
    } 
}
function Knapsack(){
    return (
        <App></App>
    );

}
export  default Knapsack;





