
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
        for (let i =0 ; i < n ; i++){
            Tabla_P[i] =new Array(n)
            for (let j =0 ; j < n ; j++){
                Tabla_P[i][j] = INFINITE;
            }		    
            Tabla_P[i][i] = 0
        }
       
        
     
    
        let z = 0;
        let lista = new Array(n);
        
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
                console.log(k,r,"Values:",actual[k][r] ,"   ",anterior[k][r]);  
                actual[k][r] = anterior[k][r];   
                                      
                actual[r][k] = anterior[r][k];                
                console.log(r,k,"Values:",actual[r][k] ,"   ",anterior[r][k]);                                                                  
              
            }	
    
            
            
                                        
            for (let i  = 0 ; i < D0.length ; i++){
                for (let j = 0; j < D0.length ; j++){
                    let celda = anterior[i][j];
                    let val =Math.min(anterior[i][j],anterior[i][k]+anterior[k][j]);
                    actual[i][j] = Math.min(anterior[i][j],anterior[i][k]+anterior[k][j])
                    if(val!= celda){
                        Tabla_P[i][j] = k+1
                    }
                }                    
                }
    
                z = k              
                anterior = actual
                console.log(anterior);
    
                actual = new Array(n);
    
                
                
                
                            
                            
            }   
            return anterior;
    
    
                       
        
    
    }  
                  
    
    render(){    
        let inf = 999
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
        console.log(this.floyd(m));
        
   
   
        
    
        return (
            <h1 class='text-center text-white'>Algoritmo de fd</h1>
        

        )
    }

}
function Floyd() {
  return (
    <div class = "p-4">       
      <h1 class='text-center text-white'>Algoritmo de Floyd</h1>
      <FloydW>

        </FloydW>
      
    </div>
  );
}

export default Floyd;