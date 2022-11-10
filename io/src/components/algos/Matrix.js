import '../../App.css';
import React from 'react';
import FloydMenu from '../home-menu/floydMenu';
import FloydModal from '../FloydModal';
import fileSaver from "file-saver";



 
class SeriesD extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            localias: this.props.localias,            
             pqh : this.props.pqh,
             pqr : this.props.pqr,
             mejorDeN: this.props.mejorDeN,
          modalOpen: false
        };
      
      }

      
     
      
     
    
    
       multiplyDimension=(dim1,dim2)=>{
      //n x m x k
      
      let n = dim1[0] 
      let m = dim2[1]
      let k = dim1[1]
      //print(n,m,k, "=", n*m*k)
      return n*m*k
       }
   multiplyDimension3=(dim1,dim2,dim3)=>{   
      let n = dim1[0]
      let m = dim2[1] 
      let k = dim3[1]
      return n*m*k
   }
  
   multMat=(dim)=>{
      let M = []
      //Tabla de respuesta
      let R = []
      let colstart = 0
      let rowstart =0
      let n = dim.length
      for (let i = 0 ; i < dim.length;i++){
          let k = []
          let s = []
          for (let j = 0 ; j < dim.length;j++){
              k.push(undefined)
              s.push(undefined)
          }
          M.push(k)
          R.push(s)
      
    }
  
      for (let i = 0 ; i < n ; i++){
          M[i][i] = 0
          R[i][i] = 0
      }
      
      
      for (let i = 1 ; i < n ; i++){
          M[i-1][i] = this.multiplyDimension(dim[i-1],dim[i] )
          R[i-1][i] = i
      }
      
      
          
      
      
      
      let i = 0	
      let j=2
      let rj = j
      while(i < n && rj<n){	
          while(j< n){		
             let  vals = []
              let kas = []
              
              for (let k =  i; k< j; k++){
                  let dimij = this.multiplyDimension3(dim[i],dim[j],dim[k])				
                  
                  vals.push(M[i][k] + M[k+1][j] +dimij)
                  kas.push(k)		
                  //print(f"M[{i}][{k}] + M[{k+1}][{j}] + {dimij} =",M[i][k],"+",M[k+1][j], "+",dimij, "=",round(M[i][k] + M[k+1][j] +dimij ,4))
                  //print(f"A[{i}][{k-1}] + A[{k+1}][{j}] + {round(sumk,4)} =",A[i-rowstart][k-1],"+",A[k+1-rowstart][j],"+", round(sumk,4),"=",round(A[i-rowstart][k-1] + A[k+1-rowstart][j] + round(sumk,4),4))						
              }
              //print(") = ",min(vals), ", K elegido = ", kas[vals.indexOf(Math.min(...vals))])	
              
              M[i][j] =Math.min(...vals)	
              
              R[i][j] = kas[vals.indexOf(Math.min(...vals))]+1
              j+=1
              i+=1		
          } 
          i = 0
          rj = rj+1
          j = rj
      }
      console.log("TABLA R")
      console.log(R)	
      console.log()
      console.log("TABLA M")
      console.log(M)
      return [R,M]
   }
   getOrderMat=(M,matList)=>{
      let n = M.length
      let currentN = n
      let start= 0
      let res = matList
      while (true){
          
          res.splice(res.indexOf(start+1),0, '(')
  
          res.splice(res.indexOf(currentN)+1,0, ')')
          
          if(M[start][currentN-1-1]== 0){
              res.splice(res.indexOf(start+1)+1,0, 'x')
              break
          }
          if(M[start][currentN-1]==start+1){
  
              start+=1
              currentN = n
          }
          else{
              currentN-=1
          }
      }
  
      let r = ''
      console.log(res)
      for (let i = 0 ; i < res.length; i ++){
            console.log(parseInt(res[i]))
           if(!parseInt(res[i])){
                r+=res[i]+" "           

           }
            
            else {
                r+='A'+res[i]+" "
            }
                
      }
      return r
   }
  
  
      
    render(){            
            
  let l =[[5,9],[9,3],[3,4],[4,6],[6,7],[7,8]]
  //l = [[4,6],[6,2],[2,7]]
  
  let g = []
  for(let k = 0 ; k < l.length; k ++){
      g.push(k+1)
  }
  let multMatT = this.multMat(l);
  let a = this.getOrderMat(multMatT[0],g)

        
       
        //let  m =this.calculateLocalia(this.props.pqh,this.props.pqr,this.props.mejorDeN,this.props.localias.reverse()) 
        //console.log(m, this.props.pqh,this.props.pqr,this.props.mejorDeN, this.props.localias)
        console.log(a)
        //console.log(this.state.tablaP)
        //this.setAddModalOpen(true);
        //console.log(this.calcularRutaCorta(3,2))
        
    
        return (
            <div>
            
            {desplegarTablas([Tabla([],multMatT[1])])}

            <h4 class = 'text-white'>{a}</h4>
            <FloydModal isOpen={this.state.modalOpen} onClose={() => this.setAddModalOpen(false)} tablaP = {this.state.tablaP} vertices={this.props.vertices}/>
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
function Tabla(filas, matrix) {    
    //cambiar el color
    let rows = [] 
    if(matrix){
       
    for(let i =0;i <matrix.length;i++){
        let cols = []        
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

class  App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputLinkClicked: false,
            m :[],
            propLocal:0,
            propVisit:0,
            juegos:0,
            localias:[],
            localiasValues:[],
            

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

    cambiarLocalias =(e,i)=>{
        
        
        
        let arr1 = this.state.localiasValues;
        if(arr1[i] =='A'){
            
            arr1[i]= 'B'
        } else {
            
            arr1[i]= 'A'

        }
        this.setState({localiasValues:arr1})
        console.log(this.state.localiasValues)
        document.getElementById('Props'+i).innerHTML = arr1[i]
        


    }


       changeJuegos = (value) => {
            this.setState({juegos:value})
       }

       setd = (e)=>{
        //e.preventDefault();
        const reader = new FileReader();
        
        reader.onload = (e) => {
            
          const text = e.target.result;
          
          console.log("asd")
          console.log(text)
          console.log(text.split("\n"))
          let datos = text.split("\n")
          let juego = datos[0].split(",")
          let partidos = datos[1].split(",")
          document.getElementById('numJuegos').value = parseInt(juego[0])
          document.getElementById('probLocal').value = parseFloat(juego[1])
          document.getElementById('probVisita').value = parseFloat(juego[2])

          /*
          this.changeJuegos(parseInt(juego[0]))
          this.setState({propLocal:parseInt(juego[1])})
          this.setState({propVisit:parseInt(juego[2])})
          
          
          this.setState({localiasValues:partidos})
          */
          this.handlePartidos(partidos)
          this.setState({propLocal:parseFloat(juego[1])})
          this.setState({propVisit:parseFloat(juego[2])})
          
          console.log("JUEGOS->"+this.state.juegos)
          console.log("PARTIDOS->"+this.state.localiasValues)
          console.log(partidos)
          this.handleAmountGames2(parseInt(juego[0]), partidos)

                          
        };
            reader.readAsText(e.target.files[0]);
    }
    handleSeries = (e)=>{
        console.log("Propiedades")
        console.log(this.state.propLocal)
        console.log(this.state.propVisit)
        console.log(this.state.localiasValues)
        console.log(this.state.juegos)

        this.setState({inputLinkClicked:true})
    }
   
    handlePartidos = (e) => {
        this.setState({localiasValues:e})
    }


    handleAmountGames2=(e, partidos)=>{
        
        
        if(parseInt(e)*2-1 < this.state.localiasValues.length){
            for(let i  = parseInt(e)*2-1; i < this.state.localiasValues.length+1; i++){
                this.state.localiasValues.pop();
                this.state.localias.pop();
            }
        } else if(parseInt(e)*2-1 > this.state.localiasValues.length) {
            
            for(let i  = this.state.localiasValues.length ; i < parseInt(e)*2-1; i ++){
                console.log("<---->")
                console.log(this.state.localiasValues)
                console.log("<---->")
                console.log(this.state.localiasValues[i])
                this.state.localias.push([<p style = {{display:"inline"}}class= "text-white">{"Equipo Local Partido #"+ (i+1)+': '}</p>,
                
                <h2 class = "text-primary"id = {'Props'+i}style = {{display:"inline"}}>{partidos[i]}</h2>,<li style = {{display:"inline"}}>-</li>,
                <button onClick = {evt=>this.cambiarLocalias(evt,i)}style = {{display:"inline"}}class= "btn bg-dark text-white">Cambiar</button>,<br></br>,<br></br>])
                
             
            }
            
        }

        
      
        this.setState({juegos:e})
        

    }



    handleAmountGames=(e)=>{
        
        
        if(this.state.localiasValues.length==0){
            this.state.localiasValues = []

            for(let i  = 0 ; i < parseInt(e.target.value)*2-1; i ++){
                this.state.localiasValues.push('A');
                this.state.localias.push([<p style = {{display:"inline"}}class= "text-white">{"Equipo Local Partido #"+ (i+1)+': '}</p>,

            <h2 class = "text-primary" id = {'Props'+i} style = {{display:"inline"}}>{this.state.localiasValues[i]}</h2>,<li style = {{display:"inline"}}>-</li>,
            <button onClick = {evt=>this.cambiarLocalias(evt,i)}style = {{display:"inline"}}class= "btn bg-dark text-white">Cambiar</button>,<br></br>,<br></br>])
            }

        } else {
            if(parseInt(e.target.value)*2-1 < this.state.localiasValues.length){
                for(let i  = parseInt(e.target.value)*2-1; i < this.state.localiasValues.length+1; i++){
                    this.state.localiasValues.pop();
                    this.state.localias.pop();
                }
            } else if(parseInt(e.target.value)*2-1 > this.state.localiasValues.length) {
                
                for(let i  = this.state.localiasValues.length ; i < parseInt(e.target.value)*2-1; i ++){
                    this.state.localiasValues.push('A');

                    this.state.localias.push([<p style = {{display:"inline"}}class= "text-white">{"Equipo Local Partido #"+ (i+1)+': '}</p>,

                    <h2 class = "text-primary"id = {'Props'+i}style = {{display:"inline"}}>{'A'}</h2>,<li style = {{display:"inline"}}>-</li>,
                    <button onClick = {evt=>this.cambiarLocalias(evt,i)}style = {{display:"inline"}}class= "btn bg-dark text-white">Cambiar</button>,<br></br>,<br></br>])
                    
                 
                }
                
            }
        }

        
      
        this.setState({juegos:parseInt(e.target.value)})
        

    }


    saveFile = () => {        
        const blob = new Blob( [
            this.state.juegos+","+this.state.propLocal+","+this.state.propVisit+"\n",
            this.state.localiasValues
        ], { type: 'text/plan;charset=utf8'});
        fileSaver.saveAs( blob, "series.txt");

    }



  render (){
    
/**
 * 
*/
    // using the readFileSync() function
    // and passing the path to the file
    

   
    
    
        
   
    return(
        <div  id = "1" className = "p-5 ms-auto">       
        <h1 className='text-center text-white'>Series Deportivas </h1>            
        <div className="mb-3 cont">            
        <h2 id="fileInput" className=' text-primary'>Seleccionar un archivo de prueba:</h2>            
        <input  className=" form-control text-white bg-dark" type="file" id="formFile" onChange={this.setd}></input>
        <br></br>
        
        
        <h2 className=' text-white'> Crear dinámicamente:</h2>    
        <br></br>
        <p className=' text-white'>Ingrese el número de juegos</p>         
        <input id="numJuegos" onChange={this.handleAmountGames} className='form-control text-white bg-dark' type="number"></input><br/>
        
        <p  className=' text-white'>Probabilidad de que el equipo 'A' gane de LOCAL:</p>    
             
        <input id="probLocal" style = {{display:"inline-block"}} onChange={evt =>{this.setState({propLocal:parseFloat(evt.target.value)})}} className='form-control text-white bg-dark' type="number"></input><br/>
        <br></br>
        <p style = {{display:"inline-block"}} className=' text-white'>Probabilidad de que el equipo 'A' gane de VISITANTE:</p>    
        
        <input id="probVisita" onChange={evt =>{this.setState({propVisit:parseFloat(evt.target.value)})}} className='form-control text-white bg-dark' type="number"></input><br/>
        {this.state.localias.length!= 0
        ?

        <div>
               {this.state.localias.map((data) => (
  
              data
              
            ))}
          
            
        </div>

        :<></>}
        <button onClick={this.handleSeries} type="button" class="btn btn-secondary btn-outline-white">Calcular probabilidades </button><br></br>
        
        </div>

        
        
        
        
                             
        
            {this.state.inputLinkClicked?           
                <div>
                    <h2 className=' text-white'>Creado dinámicamente:</h2>            
                    <br></br>
                    <SeriesD pqh = {[this.state.propLocal,1-this.state.propLocal]} pqr = {[this.state.propVisit,1-this.state.propVisit]} localias = {this.state.localiasValues} mejorDeN = {this.state.juegos}></SeriesD> 
                    <br></br>
                    <button onClick={this.saveFile} type="button" class="btn btn-secondary btn-outline-white">Grabar archivo</button>
                    
                    
                </div>
              :

              <div></div>
            }
        
    </div>
    )
    } 
}
function Matrix(){
    return (
        <App></App>
    );

}
export  default Matrix





