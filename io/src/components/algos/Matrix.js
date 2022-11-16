import '../../App.css';
import React from 'react';
import FloydMenu from '../home-menu/floydMenu';
import FloydModal from '../FloydModal';
import fileSaver from "file-saver";


function isNumber(char) {
    if (typeof char !== 'string') {
      return false;
    }
  
    if (char.trim() === '') {
      return false;
    }
  
    return !isNaN(char);
  }
  
 
class MatrixComp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dims:[],
            res:[]
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
     
      return [R,M]
   }

 print0ptimal_parens=(s, i, j)=>{
    if(i == j){
        this.state.res.push("A")
        this.state.res.push(i)
    }else{
    this.state.res.push(" ( ")

    this.print0ptimal_parens(s, i, s[i-1][j-1])
    this.print0ptimal_parens(s, s[i-1][j-1] + 1, j)
    this.state.res.push(" ) ")
    }
 }

 parseRes=()=>{
    let ans = []
    for(let k = 0; k <this.state.res.length; k++){
        ans.push(this.state.res[k])
    }
    console.log(ans)
    for(let i = 0 ; i < ans.length; i ++){
        if(Number.isInteger(ans[i])){
            if(ans[i+1]=='A'){
                
                ans.splice(i+1,0, '•')
                i++
                
                console.log(ans)

            }
        }
    }
    return ans;
 }
   
  
      
    render(){            
            
  let l =this.props.dims
  //l = [[4,6],[6,2],[2,7]]
  
  let g = []
  for(let k = 0 ; k < l.length; k ++){
      g.push(k+1)
  }
  let multMatT = this.multMat(l);
  //let a = this.getOrderMat(multMatT[0],g)
  this.state.res = []
   this.print0ptimal_parens(multMatT[0],1,multMatT[0].length)
   let a = this.parseRes()
   

        
       
        //let  m =this.calculateLocalia(this.props.pqh,this.props.pqr,this.props.mejorDeN,this.props.localias.reverse()) 
        //console.log(m, this.props.pqh,this.props.pqr,this.props.mejorDeN, this.props.localias)
        //console.log(a)
        //console.log(this.state.tablaP)
        //this.setAddModalOpen(true);
        //console.log(this.calcularRutaCorta(3,2))
        console.log(multMatT[1])
        
    
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
class DimensionComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           id:this.props.id,
           anteriorCol: this.props.anteriorCol,
           col: this.props.col,
           siguiente:this.props.anteriorCol,
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

        <input id = {'PR'+(this.props.id)} style = {{display:"inline",maxWidth:"18%"}}   defaultValue={this.props.anteriorCol} class='form-controlDimsRow form-control text-white bg-dark' type="text"></input>
        <li style = {{display:"inline",opacity:'0'}}>----</li>
        <p style = {{display:"inline"}} class=' text-white'>Col  </p>    
        <input onChange={this.changeColRow}style = {{display:"inline",maxWidth:"18%"}}   defaultValue={this.state.col}  class='form-controlDimsCol form-control text-white bg-dark' type="text"></input>
        
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

        this.setState({inputLinkClicked:false})
        this.setState({matsAmount:[]})
        this.setState({dims:[]})
        this.setState({dimsData:[]})

        const reader = new FileReader();
    
        reader.onload = (e) => {
            
          const text = e.target.result;

          console.log(text)
          console.log(text.split(","))
          let datos = text.split(",")

          document.getElementById('numMatrices').value = parseInt(datos.length)
          

          let matriz = []
          this.state.dims=[]
          for (let i=0; i<datos.length; i++) {

            let separador = datos[i].split("x")
            let fila = separador[0]
            let columna = separador[1]
            matriz.push(fila, columna)
            this.updateClassMat2(datos.length, fila, columna,i)
          }
                          
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
        console.log(this.state.dimsData)
        let string = ""
        for (let i=0; i<this.state.dimsData.length; i++) {
            if (i === this.state.dimsData.length-1) {
                string += this.state.dimsData[i][0] + "x" + this.state.dimsData[i][1]    
            } else {
                string += this.state.dimsData[i][0] + "x" + this.state.dimsData[i][1] + ","
            }
        }
        
        const blob = new Blob( [
            string
        ], { type: 'text/plan;charset=utf8'});
        fileSaver.saveAs( blob, "matriz.txt");

    }
    updateClassMat = (e)=>{
        let num = parseInt(e.target.value)
        this.state.dims = []
        for(let i = 0  ; i < num ; i++){
            let inst = <DimensionComp anterior = {""}id = {i}></DimensionComp>;
            
            
            
            this.state.dims.push(<h4 style = {{display:"inline",borderRadius:"10%"}}class = 'bg-dark text-primary'>{'A'+(i+1)}</h4>,inst)
            console.log(this.state.dims)
        }
        


        this.setState({matsAmount:parseInt(e.target.value)})
        
        
        
        

    }

    updateClassMat2 = (n, fila, columna,i)=>{
        let num = parseInt(n)
        

            let l = this.state.dims.length
            let anterior=false;
            let inst;            
            inst = <DimensionComp anteriorCol = {fila} col = {columna} id = {l}></DimensionComp>;
            
            
            
            this.state.dims.push(<h4 style = {{display:"inline",borderRadius:"10%"}}class = 'bg-dark text-primary'>{'A'+(i+1)}</h4>, inst)
            console.log(this.state.dims)

            
            
        


        this.setState({matsAmount:parseInt(n)})
        
        
        
        

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
        <div  id = "1" class = "p-5 ms-auto">       
        <h1 className='text-center text-white'>Multiplicación de matrices </h1>            
        <div className="mb-3 cont">            
        <h2 id="fileInput" className=' text-primary'>Seleccionar un archivo de prueba:</h2>            
        <input  className=" form-control text-white bg-dark" type="file" id="formFile" onChange={this.setd}></input>
        <br></br>
        
        
        <h2 className=' text-white'> Crear dinámicamente:</h2>    
        <br></br>
        <p className=' text-white'>Ingrese la cantidad de matrices</p>         
        <input id="numMatrices" onChange={this.updateClassMat} class='form-control text-white bg-dark' type="number"></input><br/>
        
        

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
            <button onClick={this.saveFile} type="button" class="btn btn-secondary btn-outline-white">Grabar archivo</button>
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





