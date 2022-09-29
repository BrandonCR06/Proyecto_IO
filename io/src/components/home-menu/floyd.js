
import { notAvailable } from '../../libs/sweetAlert.js';

import '../../App.css';
import React from 'react';
class FloydW extends React.Component{
     floyd(D0){
        let anterior = D0;
        let INFINITE = 99999;
        let n = D0.length; 
        let Tabla_P = new Array(n);        
        let actual = new Array(n);   
        let TablaDeTablas = [];
        for (let i =0 ; i < n ; i++){
            Tabla_P[i] =new Array(n)
            for (let j =0 ; j < n ; j++){
                Tabla_P[i][j] = INFINITE;
            }		    
            Tabla_P[i][i] = 0
        }
    
        let z = 0;
        let columnas = [];
        let filas = [];
        
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

                    if(val!= celda){
                        bgColor = "bg-warning text-dark";
                        Tabla_P[i][j] = k+1
                    }
                    columnas.push(Columns(bgColor,val));
                }
                let f = columnas
                filas.push(f);
                columnas = [];                  

                }
    
                z = k              
                
                
                anterior = actual                                
                actual = new Array(n);                
                
                TablaDeTablas.push(Tabla(anterior,k,filas));
                filas = [];
                
                
                
                
                
                            
                            
            }   
            console.log(TablaDeTablas);
            return TablaDeTablas;
    
    
                       
        
    
    }  
                      
    render(){    
        let inf = 9999
        let  m = [[0,6,inf,4,7],
        [9,0,7,inf,inf],
        [inf,5,0,inf,14],
        [8,1,inf,0,15],
        [2,inf,2,19,0]
        ];
        let  f = [[0,inf,inf,inf,inf],
        [inf,0,inf,inf,inf],
        [inf,inf,0,inf,inf],
        [inf,inf,inf,0,inf],
        [inf,inf,inf,inf,0]
        ]    
                
        const data = this.floyd(m)
    
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

const Tdes = ({item,col}) => <td class = {item} scope="col">{col}</td>
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


function Floyd() {
  return (
    <div class = "p-4 ms-auto">       
      <h1 class='text-center text-white'>Algoritmo de Floyd</h1>
      <FloydW>
            
        </FloydW>
      
    </div>
  );
}

export default Floyd;