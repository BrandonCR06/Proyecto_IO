import React from "react";
import {Floyd,FloydW} from './floyd.js';


function nodes(list) {
    return (
        <div>
        {list.map((dato, index) => {
            return (
                <div key={index}>{dato}
                </div>
            )
        })}
        </div>
    )

}

function pesos(list) {
    return (
        <div>
        {list.map((dato, index) => {
            return (
                <div key={index}>{dato}
                </div>
            )
        })}
        </div>
    )
}


function matrizPorDefecto(list) {
    let actual = []
    let INFINITE = Number.MAX_SAFE_INTEGER;
    for (let i =0 ; i < list.length; i++){
        actual[i] = new Array(list.length);
        for (let j =0 ; j < list.length ; j++){
            actual[i][j] = INFINITE;
        }           
        actual[i][i] = 0
    }
    return actual
}



function intToChar(int) {
    // 👇️ for Uppercase letters, replace `a` with `A`
    const code = 'A'.charCodeAt(0);    
  
    return String.fromCharCode(code + int);
  }



class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            flag2: false,
            m :[],
            nodos : 0,
            listNodesName: [],
            floydBoolean: false,
            vertices: [],
            inputsPesos: [],
            matriz:[]
          }
      }

      updateInputValue(evt, index) {
        const val = evt.target.value;
        let list = this.state.listNodesName;
        list[index] = val
        this.setState({listNodesName:list})
        return list[index]
      }
      
      CreateInput(value, index) {
        return (
            <input 
                type="text" 
                className="input"
                defaultValue={value}
                value={this.state.listNodesName[index]}
                onChange={evt => this.updateInputValue(evt, index)}
                >
            </input>
        )
      }

      changeInputPeso = (value) =>{
        this.setState({inputsPesos:value});
      }


      handleChangePeso(evt, i, j) {
        const val = evt.target.value;               /*AQUI DEBE ACTUALIZARSE*/
        console.log(val)
        let list = this.state.matriz;
        list[i][j] = val
        this.changeMatriz(list);
        console.log(this.state.matriz)
        return list[i][j]
      }

    accessElement(i, j) {
        let m = this.state.matriz        
        return m[i][j]
    }
    
     generateTD(matriz, lista, i, j) {
        let val = matriz[i][j]
        if(matriz[i][j]===Number.MAX_SAFE_INTEGER){
            val = "∞"
        }
        if (matriz[i][j] == 0) {
            return(
                <div class='col'>
                    <h5 class='text-white'>De {lista[i]} → {lista[j]}</h5>
                    <input class='col-xs-1' readOnly defaultValue ='0'></input>
                </div>
            )    
        } else {
            return(
                <div class='col'>
                    <h5 class='text-white'>De {lista[i]} → {lista[j]}</h5>
                
                    <input                         
                        className="input"                        
                        type={"text"}
                        defaultValue = {val}
                        onChange={evt => this.handleChangePeso(evt, i, j)}>                            
                        </input>
                </div>
            )
        }
    }
    
     generadorInputPesos2(matriz, lista) {
        return (
        <div>
        <table class = "table-bordered table table-dark">
                
                {matriz.map((row,i) => {  
                    return(
                        <thead class="thead-light">
                        <tr>
                        {row.map((col,j) => {                              
                            return(                            
                                <td key={[i,j]}>
                                    {this.generateTD(matriz,lista, i, j)}
                                </td>
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
    
    changeMatriz = (value) =>{
        
        this.state.matriz = value;
        
        
      }
     generar_pesos = (lista) => {

        let list = []
        
        
        let matriz = matrizPorDefecto(lista)
        
        
        this.changeMatriz(matriz);

        list.push(this.generadorInputPesos2(matriz, lista))
        this.changeM(list)   
    }


      changeInputNodes = (value) => {
        this.setState({inputsPesos:value})
      }


      changeFlag = () => {
        this.state.flag = true;
      }

      changeFlag2= () => {
        this.state.flag2 = true;
      }
      changeFloydBoolean= () => {
        this.setState({floydBoolean:true});
      }

      changeM = (value) =>{
        this.setState({m:value});
      }

      


      changeInputNodes = (value) => {
        
        let list = []
        for (let i = 1; i <= +value; i++) {
            list.push(this.CreateInput(intToChar(i-1), i))
          }
        this.changeFlag()
        this.changeM(list)   
       }

       updateFinalNodeList = (list) =>{
        this.setState({vertices:list});
       }


       handleSummit = (e) => {

            let list = []
            // Obtener los nodos predeterminados
            for (let index = 0; index < this.state.m.length; index++) {
                const element = Object.values(this.state.m[index])[4]
                const defaultValue = Object.values(element)[2]                                   
                list.push(defaultValue)
            }
            if (this.state.listNodesName.length > 0) {
                for (let index = 0; index < this.state.listNodesName.length; index++) {
                    const element = this.state.listNodesName[index];
                    if (element != undefined) {
                        list[index-1] = element
                    }
                }
            }
            this.updateFinalNodeList(list)
            this.changeFlag(false)
            this.changeFlag2(true)


            // PESOS
            this.generar_pesos(list)
        }
        handleFloyd = (e) => {
            let mat = this.state.matriz;
            for(let i = 0 ; i < mat.length; i++){
                for(let j = 0 ; j < mat.length; j++){
                    mat[i][j] = Math.floor(mat[i][j]);
                }

            }
            this.changeMatriz(mat);
            
            this.changeFloydBoolean();           
          

            
        }

       setd = (e)=>{
        this.state.nodos = e.target.value
        this.changeInputNodes(this.state.nodos)

    }



    render(){

    return(
    <div  style ={{display:"inline"}} id = "1"class = "p-4 ms-auto">       
                 
        <div class="mb-3 cont">            
                        
            <h4 class='text-white'>Ingresar la cantidad de nodos</h4>
            <input  class=" form-control text-white bg-dark" type="number" id="formNodes" onChange={this.setd}></input>            
            <br></br>
            <button onClick={this.handleSummit} type="button" class="btn btn-secondary btn-block btn-outline-white">Confirmar</button>
        </div>
        
        
        {this.state.flag?
        <div>
            {nodes(this.state.m)}
        </div>
        :
            <div id="inputs"></div>
          }
        
        <br></br>
        {this.state.flag2?
        <div>
            {pesos(this.state.inputsPesos)}
            <br></br>
            <button onClick={this.handleFloyd} type="button" class="btn btn-secondary btn-block btn-outline-white">Generar algoritmo</button>
        </div>
        :
            <div id  ="pesos"></div>
          }
          
          {this.state.floydBoolean?
                
                <FloydW vertices = {this.state.vertices} matrix = {this.state.matriz}></FloydW>
                
            :
            <div id  ="caca"></div>}
              
    </div>
    )
    }
}


function FloydMenu() {
    
    return (
    <App></App>
    );

}


export default FloydMenu;
