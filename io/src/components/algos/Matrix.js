import '../../App.css';
import React from 'react';
import FloydMenu from '../home-menu/floydMenu';
import FloydModal from '../FloydModal';
import fileSaver from "file-saver";



 
class MatrixComp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dims:[]
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
              res.splice(res.indexOf(start+1)+1,0, '•')
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
            
  let l =this.props.dims
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
            <h4 class = 'text-white'>Tabla R</h4>
            {desplegarTablas([Tabla([],multMatT[0])])}
            <br></br>
            <h4 class = 'text-white'>Tabla M</h4>
            {desplegarTablas([Tabla([],multMatT[1])])}
            
            <h4 class = 'text-white'>Orden de multiplicaciones:</h4>
            <h4 class = 'text-white'>{a}</h4>
            
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
            cols.push(Columns('text-white bg-primary bg-opacity-25 ',matrix[i][j]))
            

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
class DimensionComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           id:this.props.id,
           anteriorCol: this.props.anteriorCol,
           col: '',
           siguiente:'',
           anterior: this.props.anterior           

          }
        this.setColAnt();
      }
      
      setSig=(val)=>{
        this.setState({siguiente:val})


      }
      setColAnt=()=>{
        if(this.state.anterior) this.setState({anteriorCol:this.state.anterior.props.col})

      }
      changeColRow = (e)=>{
        let col1 = parseInt(e.target.value)
        console.log(this.props.id+1)
        document.getElementById('PR'+(this.props.id+1)).value = parseInt(col1)

        

      }
    render(){
        return(
        <div >
        <p style = {{display:"inline"}} class=' text-white'>Fila  </p>    

        <input id = {'PR'+(this.props.id)} style = {{display:"inline",maxWidth:"15%"}}   defaultValue={this.props.anteriorCol} class='form-controlDimsRow form-control text-white bg-dark' type="text"></input>
        <li style = {{display:"inline",opacity:'0'}}>----</li>
        <p style = {{display:"inline"}} class=' text-white'>Col  </p>    
        <input onChange={this.changeColRow}style = {{display:"inline",maxWidth:"15%"}}   defaultValue={this.state.col}  class='form-controlDimsCol form-control text-white bg-dark' type="text"></input>
        
        </div>
        
        )

    }
}

class  App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputLinkClicked: false,
           matsAmount:[],
            dims :[],
            dimsData:[]

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
        
        let row = document.getElementsByClassName('form-controlDimsRow')
        let col = document.getElementsByClassName('form-controlDimsCol')
        
        let dims = []
        for(let i = 0 ; i < row.length; i++){
            dims.push([row[i].value,col[i].value])

        

        }
        this.setState({inputLinkClicked:true,dimsData:dims})
        
    }
   
    handlePartidos = (e) => {
        this.setState({localiasValues:e})
    }


    handleMat=(e)=>{
        
        
        
        
        

        
      
        
        

    }




    saveFile = () => {        
        const blob = new Blob( [
            this.state.juegos+","+this.state.propLocal+","+this.state.propVisit+"\n",
            this.state.localiasValues
        ], { type: 'text/plan;charset=utf8'});
        fileSaver.saveAs( blob, "series.txt");

    }
    updateClassMat = (e)=>{
        let num = parseInt(e.target.value)
        if(this.state.dims.length>num){
            this.state.dims.pop()

        }
        else{
            

            let l = this.state.dims.length
            let anterior=false;
            let inst;            
            inst = <DimensionComp anterior = {anterior}id = {l}></DimensionComp>;
            
            
            
            this.state.dims.push(inst)
            console.log(this.state.dims)

            
            
        }


        this.setState({matsAmount:parseInt(e.target.value)})
        
        
        
        

    }
componentDidUpdate (){
    
    //console.log(this.state.dims)
    
}

  render (){
    
/**
 * 
*/
    // using the readFileSync() function
    // and passing the path to the file
    

   
    
    
        
   
    return(
        <div  id = "1" className = "p-5 ms-auto">       
        <h1 className='text-center text-white'>Multiplicación de matrices </h1>            
        <div className="mb-3 cont">            
        <h2 id="fileInput" className=' text-primary'>Seleccionar un archivo de prueba:</h2>            
        <input  className=" form-control text-white bg-dark" type="file" id="formFile" onChange={this.setd}></input>
        <br></br>
        
        
        <h2 className=' text-white'> Crear dinámicamente:</h2>    
        <br></br>
        <p className=' text-white'>Ingrese la cantidad de matrices</p>         
        <input id="numJuegos" onChange={this.updateClassMat} className='form-control text-white bg-dark' type="number"></input><br/>
        
        

        <br></br>
        <div>
            {this.state.dims.map((data) => (
                <div>
                    
              {data}
              <br></br>
              
              </div>
              
            ))}

          
            
        </div>
        <button onClick={this.handleSeries} type="button" class="btn btn-secondary btn-outline-white">Calcular multiplicaciones óptimas </button><br></br>

        </div>
        {this.state.inputLinkClicked?
        <div>
        <h2 className=' text-white'>Creado dinámicamente:</h2>            
        <br></br>
        <MatrixComp dims = {this.state.dimsData}></MatrixComp> 
        <br></br>
        </div>




        : <></>}
                             
        
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





