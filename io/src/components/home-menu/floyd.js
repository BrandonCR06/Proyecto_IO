import '../../App.css';
import React, { useCallback } from 'react';





 
class FloydW extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          matrix: []
        };
      }
      updateMatrix = (value) =>{
        this.setState({matrix:value});

      }
    
     floyd(D0){        
        let anterior = D0;
        let INFINITE = 99999;
        let n = D0.length; 
        let Tabla_P = new Array(n);        
        let actual = new Array(n);   
        let TablaDeTablas = [];
        let columnas = [];
        let filas = [];
        for (let i =0 ; i < n ; i++){
            Tabla_P[i] =new Array(n)
            let bgColor = "bg-dark";
            for (let j =0 ; j < n ; j++){
                Tabla_P[i][j] = INFINITE;
                let val = D0[i][j]
                if(D0[i][j]===Number.MAX_SAFE_INTEGER){
                    val = "∞"
                }
                columnas.push(Columns(bgColor,val))
            }	
            filas.push(columnas)	
            columnas = [];    
            Tabla_P[i][i] = 0
        }

        TablaDeTablas.push(Tabla(anterior,-1,filas));
        filas = []

        
        
        
        //Inicio del algoritmo
        
        for(let k = 0; k < D0.length ; k++){		                                    
            for (let i =0 ; i < D0.length ; i++){
                actual[i] = new Array(D0.length);
                for (let j =0 ; j < D0.length ; j++){
                    actual[i][j] = INFINITE;
                }           
                actual[i][i] = 0
            } 
    
            
            for(let r = 0 ; r < D0.length;  r ++){                                
                actual[k][r] = anterior[k][r];   
                                      
                actual[r][k] = anterior[r][k];                
                
              
            }	
    
            
            
                                        
            for (let i  = 0 ; i < D0.length ; i++){
                for (let j = 0; j < D0.length ; j++){
                    let celda = anterior[i][j];
                    let bgColor = "bg-dark";
                    let val =Math.min(anterior[i][j],anterior[i][k]+anterior[k][j]);
                    actual[i][j] = Math.min(anterior[i][j],anterior[i][k]+anterior[k][j])

                    if(val!== celda){
                        bgColor = "bg-warning text-dark";
                        Tabla_P[i][j] = k+1
                    }
                    if(val ===Number.MAX_SAFE_INTEGER){
                        val = "∞"
                    }
                    columnas.push(Columns(bgColor,val));
                }
                let f = columnas
                filas.push(f);
                columnas = [];                  

                }
    
                        
                
                
                anterior = actual                                
                actual = new Array(n);                
                
                TablaDeTablas.push(Tabla(anterior,k,filas));
                filas = [];
                
                
                
                
                
                            
                            
            }   
            
            return TablaDeTablas;
    
    
                       
        
    
    }  
                      
    render(){            
        
        const data = this.floyd(this.props.matrix)
    
        return (
            
            desplegarTablas(data)
        

        )
    }

}

function desplegarTablas(datos){
    return(
        <div>                             
             {datos.map((dato,index) => {                                  
                
                return (                    
                    datos[index]
                )
                    
                })}                       

              
        </div>
    )

}
function leerCsv(texto, sep = ",", omitHeader = false){
    return texto.slice(omitHeader ? texto.indexOf("\n") : 0).split("\n").map(l => l.split(sep));    

}


function Columns(bg,col){
    return (        
        <td class = {bg} scope="col">{col}</td>
    )
}
function Tabla(data,index,filas) {    
    //cambiar el color
         
        return (                                                
                        
            
            <div >
            <h3 class = "text-white font-12">{"D("+(index+1)+")"}</h3>
            <table class = "table table-dark">
            
            {data.map((row,i) => {  
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

function F(m){
    return (
        <Floyd matrix = {m}>

        </Floyd>
    )

}
function parseM(arr){
    let m = new Array(arr.length);
    for(let i = 0 ; i < arr.length; i++){
        m[i] = new Array(arr.length);
        for(let j = 0 ; j< arr.length; j++){
            if(arr[i][j]==="inf"){
                m[i][j] = Number.MAX_SAFE_INTEGER;
            } else{
                m[i][j] = Math.floor(arr[i][j]);
            }
            
        }
            
    }
    return m;

}
class  App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputLinkClicked: false,
            m :[]
          }
      }
      handleAddSecondInput() {        
        this.state.inputLinkClicked = true;
      }
      changeM= (value) =>{
        this.setState({m:value});

      }
       setd = (e)=>{
        //e.preventDefault();
        const reader = new FileReader();
        
        reader.onload = (e) => {
            
          const text = e.target.result;
          {this.changeM( parseM(leerCsv(text)))}
           
           
                          
        };
            reader.readAsText(e.target.files[0]);
        this.handleAddSecondInput()        
    }
   
    

  render (){
    
/**
 * 
*/
    // using the readFileSync() function
    // and passing the path to the file
    

    // use the toString() method to convert
    // Buffer into String
    
    //console.log(leerCsv(texto));    
        
    let inf = 9999;
    let g = [[0,6,inf,4,7],
    [9,0,7,inf,inf],
    [inf,5,0,inf,14],
    [8,1,inf,0,15],
    [2,inf,2,19,0]]
    return(
        <div id = "1"class = "p-4 ms-auto">       
        <h1 class='text-center text-white'>Algoritmo de Floyd</h1>            
        <input  type = "file" onChange={this.setd}/>             
                               
            {this.state.inputLinkClicked?              
            
              <FloydW matrix = {this.state.m}></FloydW>              
              :

              <div></div>
            }
              
    </div>
    )
    } 
}
function Floyd(){
    return (
        <App></App>
    );

}

export default Floyd;