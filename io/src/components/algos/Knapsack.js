import '../../App.css';
import React from 'react';
import KnapsackMenu from '../home-menu/floydMenu';
import FloydModal from '../../components/FloydModal';




 
class KnapsackAlgo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          pesos: [],
          cantidades:[],
          valores :[],
          capacidad:[],
          capacidades:[],
          resultadoKnap:[]
        };
      }
      



       bounded = (v, c, horas,Q)=>{
        
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
                let val = 0
                let r = []
                let kElegidos = []
                for (let k = 1; k < Q[j-1]+1;k++){
                    if(i-k*c[j-1] < 0  ){
                        if(j-1>=0){
                            val = A[i][j-1]
                            //marcar con rojo
                            

                        }else{
                
                            val = 0
                            //marcar con rojo
                        }
                        bg = "bg-danger"
                    }else {
                        
                        val  = Math.max(A[i][j-1],k*v[j-1]+A[i-k*c[j-1]][j-1])
                    }
                    r.push(val);
                    kElegidos.push(k);
                    
                }   
                A[i][j] = Math.max(...r);
                let elegido = kElegidos[r.indexOf(Math.max(...r))];
                
                if(A[i][j]!= A[i][j-1]){
                    bg = "bg-success"
                } else {bg = "bg-danger";}
                if(bg==="bg-danger"){elegido = 0;}
                if(A[i][j]===0){elegido = " "}
                Tabla[i][j]=  Columns(bg, A[i][j],elegido,j); 
            }

                //if(A[i][j]!= A[i][j-1]):
        
         }
                    //marcar con verde
        
        
        
        
        

            
        return [Tabla,A];
    }

    
     unboundedDetails=(t, objetos,Z, weights, cantObjetosMax) =>{
    
    
        let i = t.length-1
        let j = t[0].length-1
        let resultado = [];
        resultado.push(<h2 class  ="text-white">Resultado: <br/></h2>)
        while (objetos.length !== 0) {
            if (t[i][j] === t[i][j-1]) {
                resultado.push(<h3  class  ="text-white">{"El "+ String(objetos[objetos.length-1]) + " no se seleccionó\n"}<br/></h3>)
                objetos.pop(objetos.length-1)
                j = j-1
            }
    
            else {
                let contador = 1
                let bandera = true
                let peso = weights[objetos.length-1]
                i = i - peso
                while (bandera) {
                    if (contador === cantObjetosMax[objetos.length-1]) {
                        bandera = false
                        
                    }else if (t[i][j-1] < t[i][j] ) {
                        
                        contador+=1            
                        i = i - peso
                    }
                    else {
                        bandera = false                
                    }
         
                }
                let va1 = "Se seleccionó"
                if(contador>1){
                    va1 = "Se seleccionaron"
                }
                resultado.push(<h3 class  ="text-white">{va1+": "+String(contador)+" "+String(objetos[objetos.length - 1])+"\n"}<br/></h3>)
                //console.log("Se selecciono: "+String(contador)+" "+String(objetos[objetos.length - 1]))
                
                objetos.pop(objetos.length-1)
                //i = contador * peso-1
                j = j - 1
                
            }
            
        }
        //console.log(t)
        resultado.push(<h3 class  ="text-white">Valor máximo obtenido:{Z} <br/></h3>)
        return resultado
        
        
    }
     /**
    let W = 12;
    let val = [6, 15, 7, 9];
    let wt = [4, 6, 2, 5];
    let n = val.length;
    let objetos = ["Obj1", "Obj2", "Obj3", "Obj4"]
    cantObjetosMax = [3,3,3,3]
    
    
    
     */
    

        
     
    
     
       
    

   
   
    render(){            
        
     
    
     //console.log(objetos)
    let data = this.bounded(this.props.pesos,this.props.valores,this.props.capacidad,this.props.cantidades);
    let TablaMap = data[0]
    let knapRes = data[1]
    
    //let W = 12;
    //let val = [6, 15, 7, 9];
    //let wt = [4, 6, 2, 5];
    //let n = val.length;
    
    //let objetos = ["Obj1", "Obj2", "Obj3", "Obj4"]
    let cantObjetosMax = []
    let objetos = []
    let pesos = []
    for(let i = 0 ; i < this.props.valores.length; i++){
        objetos.push("Objeto"+(i+1));
        cantObjetosMax.push(this.props.cantidades[i]);
        pesos.push(this.props.valores[i]);

     }
    
    
    
    let res =this.unboundedDetails(knapRes,  objetos,knapRes[this.props.capacidad][this.props.valores.length], pesos,cantObjetosMax);
    console.log(res)
    //console.log(this.unboundedDetails(knapRes, 36, objetos, wt, val, cantObjetosMax))
    //{this.bounded(this.props.pesos,this.props.valores,this.props.capacidad).map((row,i) =>{
        return (
            <div>
                                  
            
             <table class = "table-bordered table table-dark">
             
            {TablaMap.map((row,i) => {  
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

            <br></br>
            
            {res}
                
          
             </div>
        

        )
    }

    
}



function generateZ(valores) {

    let resultado = [];
    resultado.push(<h4 style={{display:"inline"}} class  ="text-white">Z = </h4>)
    //let string = "Z = "
    for (let index = 0; index < valores.length; index++) {
        
        if (index === valores.length-1) {
            resultado.push(<h4  style={{display:"inline"}}className='text-white'>{valores[index]}<small style={{display:"inline",fontSize:"14px"}} >{"obj_"+(index+1)}</small></h4>)
            
        } else {
            resultado.push(<h4 style={{display:"inline"}}className='text-white'>{valores[index]}<small style={{display:"inline",fontSize:"14px"}} >{"obj_"+(index+1)}</small>+</h4>)
        }
        
    }
    resultado.push(<br></br>)
    return (
        resultado
    )

}

function subjectTO(pesos, capacidadMaxima) {
    let resultado = [];
    for (let index = 0; index < pesos.length; index++) {
        
        if (index === pesos.length-1) {
            resultado.push(<h4  style={{display:"inline"}}className='text-white'>{pesos[index]}<small style={{display:"inline",fontSize:"14px"}} >{"obj_"+(index+1)}</small></h4>)
            
        } else {
            resultado.push(<h4 style={{display:"inline"}}className='text-white'>{pesos[index]}<small style={{display:"inline",fontSize:"14px"}} >{"obj_"+(index+1)}</small>+</h4>)
        }
        
    }
    resultado.push(resultado.push(<h4 style={{display:"inline"}}className='text-white'>{" ≤ "+capacidadMaxima}</h4>))
    resultado.push(<br></br>)
    resultado.push(<h4 style={{display:"inline"}}className='text-white'><small style={{display:"inline",fontSize:"14px"}} >obj_i</small></h4>)
    resultado.push(<h4 style={{display:"inline"}}className='text-white'> ≥ 0</h4>)
    resultado.push(<br></br>)
    return (
        resultado
    )

}


function mathematicExpression(valores, pesos, capacidad) {



    return (
        <div>
        <h4 className='text-white'>Maximizar:</h4>
        {generateZ(valores)}
        <br></br>
        <h4 className='text-white'>Sujeto a:</h4>
        {subjectTO(pesos, capacidad)}
        <br></br>
        </div>
    )

}






function Columns(bg,col,elegido,i){
    let valueDis="";
    let valueDis2="";
    let valueDis3="";
    if(elegido!==" "){
        valueDis=", x";
        valueDis2=i;
        valueDis3 = " = "+elegido
    } 
    
    

    
    return (            
        
        <td class = {bg+" wid"} scope="col">
            <p >{col}  <small style={{display:"inline",fontSize:"14px"}} >{valueDis}</small><small style={{display:"inline",fontSize:"9px"}}>{valueDis2}</small><small style={{display:"inline",fontSize:"14px"}} >{valueDis3}</small></p>
            
            
            
            
            
        </td>
        
        
        
        
        
        
    )
}

class  App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        
            capacidad: 0,
            cantidadObjetos: 0 , 
            valores: [], 
            pesos: [] ,
            cantidades: [] ,
            
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
            listapes.push([
                <div class='col'>
                 
        
                  <input                      
                className="input"                        
                  type={"text"}
                defaultValue = {0}
                onChange = {evt => this.cambioValPes(evt,this.state.pesos, i)}
                >                            
                </input>            
            </div>, 

            <div class='col'>
                 
        
                 <input                      
               className="input"                        
                 type={"text"}
               defaultValue = {0}
               onChange = {evt => this.cambioValPes(evt,this.state.cantidades, i)}
               >                            
               </input>            
           </div>]
        )
        }
       
        return (  
            <table class = "table-bordered table table-dark">
                <thead class="thead-light">       
                {this.state.cantidadObjetos>0 ?
                <tr>
                <th scope="col"> </th>
                <th scope="col">Valor</th>
                <th scope="col">Costo</th>
                <th scope="col">Cantidad disponible</th>
                
                </tr>:
                <div/>
                }        
                            
                     {listaDespliegue.map((row,i) => {  
                        return(
                                            
                            <tr>

                            <th scope="row">Objeto {i+1}</th>
                             <td> {listapes[i][0]}</td>
                             
                             <td>     {row}</td>
                             <td> {listapes[i][1]}</td>
                            
                            
                               
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
            this.state.cantidades[i] = parseInt(this.state.cantidades[i])
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
            <div>
            {mathematicExpression(this.state.pesos, this.state.valores, this.state.capacidad)}
            <KnapsackAlgo valores = {this.state.valores} cantidades = {this.state.cantidades}capacidad = {this.state.capacidad} pesos = {this.state.pesos}/>
            </div>
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





