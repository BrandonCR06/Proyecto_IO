import '../../App.css';
import React, { useCallback } from 'react';
import FloydMenu from './floydMenu';




 
class FloydW extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          matrix: [],
          vertices :[]
        };
      }
      updateMatrix = (value,v) =>{
        this.setState({matrix:value,
            vertices: v
        });
        

      }
     
    
     floyd(D0){        
        let anterior = D0;
        let INFINITE = Number.MAX_SAFE_INTEGER;
        let n = D0.length; 
        let Tabla_P = new Array(n);        
        let actual = new Array(n);   
        let TablaDeTablas = [];
        let columnas = [];
        let filas = [];
        let filasP = [];        
        let colP = [];
        
        columnas.push(Columns("bg-primary bg-opacity-10 text-dark",""))
        for(let l = 0 ; l < this.props.vertices.length; l++){
            columnas.push(Columns("bg-primary bg-opacity-25 text-light",this.props.vertices[l]));
        }
        filas.push(columnas);
        filasP.push(columnas);
        columnas  =[]
        
        for (let i =0 ; i < n ; i++){
            Tabla_P[i] =new Array(n)
            let bgColor = "bg-dark";
            
            columnas.push(Columns("bg-primary bg-opacity-25 text-light",this.props.vertices[i]));
            colP.push(Columns("bg-primary bg-opacity-25 text-light",this.props.vertices[i]));
            for (let j =0 ; j < n ; j++){
                Tabla_P[i][j] = 0                
                let val = D0[i][j]
                let valP = Tabla_P[i][j];
                if(D0[i][j]===Number.MAX_SAFE_INTEGER){
                    val = "∞"                    
                    
                }
                if(Tabla_P[i][j]===Number.MAX_SAFE_INTEGER){valP = "∞"}

                columnas.push(Columns(bgColor,val))
                colP.push(Columns("bg-light bg-opacity-75 text-dark",valP))
            }	
            filas.push(columnas)	
            filasP.push(colP)            
            columnas = [];  
            colP = [];  
            
        }

        TablaDeTablas.push(Tabla(-1,filas));
        TablaDeTablas.push(TablaP(filasP));
        
        filas = [];                                
        columnas = [];
        filasP = [];
        colP = [];

        

        
        
        
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
    
            
            columnas.push(Columns("bg-primary bg-opacity-10",""))
            
            for(let l = 0 ; l < this.props.vertices.length; l++){
                columnas.push(Columns("bg-primary bg-opacity-25 text-light ",this.props.vertices[l]));
            
            }
            filas.push(columnas);
            filasP.push(columnas)
            columnas  =[]
                
            for (let i  = 0 ; i < D0.length ; i++){
                columnas.push(Columns("bg-primary bg-opacity-25 text-light ",this.props.vertices[i]));
                colP.push(Columns("bg-primary bg-opacity-25 text-light ",this.props.vertices[i]));
                for (let j = 0; j < D0.length ; j++){
                    let celda = anterior[i][j];
                    let bgColor = "bg-dark";
                    let bgP = "bg-light bg-opacity-75 text-dark";
                    let val =Math.min(anterior[i][j],anterior[i][k]+anterior[k][j]);
                    
                    actual[i][j] = Math.min(anterior[i][j],anterior[i][k]+anterior[k][j])

                    if(val!== celda){
                        bgColor = "bg-warning text-dark bg-opacity-75 text-dark";
                        bgP = bgColor
                        //Tabla_P[i][j] = k+1
                        Tabla_P[i][j] = this.props.vertices[k]
                    }
                    let valP = Tabla_P[i][j];
                    if(val ===Number.MAX_SAFE_INTEGER){
                        val = "∞"
                    }
                    colP.push(Columns(bgP,valP));
                    columnas.push(Columns(bgColor,val));
                }
                let f = columnas
                filas.push(f);
                filasP.push(colP)
                columnas = [];   
                colP = []               

                }
    
                        
                
                
                anterior = actual                                
                actual = new Array(n);                
                
                TablaDeTablas.push(Tabla(k,filas));
                TablaDeTablas.push(TablaP(filasP));
                                
                
                filas = [];
                filasP = []
                
                
                
                
                
                            
                            
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
             {datos.map(dato => {                                  
                
                return (                    
                    dato
                )
                    
                })}                       

              
        </div>
    )

}
function leerCsv(texto, sep = ",", omitHeader = false){
    let m = texto.slice(omitHeader ? texto.indexOf("\n")+1 : 0).split("\n");
    let split = m.length
    if(m[m.length-1]===""){
        split = m.length-1;
    }
    return m.slice(0,split).map(l => l.split(sep));    

}
function leerCsvHeader(texto, sep = ","){
    return texto.split("\n")[0].split(sep);

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
function Tabla(index,filas) {    
    //cambiar el color
         
        return (                                                
                        
            
            <div >
            <h3 class = "text-white font-12">{"D("+(index+1)+")"}</h3>
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
            m :[],
            vertices :[]
          }
      }
      handleAddSecondInput() {        
        this.state.inputLinkClicked = true;
      }
      changeM= (value,v) =>{
        this.setState({m:value, vertices:v});

      }
      changeV= (value) =>{
        this.setState({vertices:value});

      }
       setd = (e)=>{
        //e.preventDefault();
        const reader = new FileReader();
        
        reader.onload = (e) => {
            
          const text = e.target.result;
          
                    
          
          
          {this.changeM( parseM(leerCsv(text,",",true)),leerCsvHeader(text))}          
           
           
                          
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
    

   
    
    
        
   
    return(
        <div  id = "1"class = "p-4 ms-auto">       
        <h1 class='text-center text-white'>Algoritmo de Floyd</h1>            
        <div class="mb-3 cont">            
        <h4 class=' text-white'>Seleccionar un archivo de prueba</h4>            
        <input  class=" form-control text-white bg-dark" type="file" id="formFile" onChange={this.setd}></input>
                   
        </div>
        {FloydMenu()}
        
                             
        
            {this.state.inputLinkClicked?              
            
              <FloydW vertices = {this.state.vertices} matrix = {this.state.m}></FloydW>              
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
export  {Floyd,FloydW};

