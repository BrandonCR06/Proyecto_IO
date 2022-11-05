import '../../App.css';
import React from 'react';
import FloydMenu from '../home-menu/floydMenu';
import FloydModal from '../../components/FloydModal';




 
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

      
      updateMatrix = (value,v) =>{
        this.setState({matrix:value,
            vertices: v
        });
        

      }
      
     
    
    

     calculateLocalia=(normal_prob,local_visitor_prob,mejor_de_n,l)=>{
        let m = []		
        for (let i = 0 ; i < mejor_de_n+1; i++){
            let k = []
            for (let j = 0 ; j < mejor_de_n+1;j++){
                k.push(0)
            }
            m.push(k)
        }

        //m[0] = [ 1 for c in range(mejor_de_n+1)]
        let  k = 0
        let f = []
        for(let c = 0 ; c < mejor_de_n+1; c++){
            f.push(1)
        }
        m[0] = f;

        for (let i = 0 ; i < mejor_de_n+1; i++){
            for (let j = 0 ; j < mejor_de_n+1;j++){
                if(i!= 0 && j!=0){

                    //m[i][j] = (m[i-1][j] *normal_prob[0])+(m[i][j-1] *normal_prob[1])
                    //print(f"Tabla[{i}][{j}] = {round(m[i-1][j],4)} * {normal_prob[0]} + {round(m[i][j-1],4)} * {normal_prob[1]} = {round(m[i][j],4)}")
                    if(l[(i+j)-2]=="A"){

                        m[i][j] = (m[i-1][j] *normal_prob[0])+(m[i][j-1] *normal_prob[1])
                    }else{
                        m[i][j] = (m[i-1][j] *local_visitor_prob[0])+(m[i][j-1] *local_visitor_prob[1])
                    }
                }
            }        
            
        }
        console.log(m)
        return m;
        }

     
       
    

        render(){            
        
       
        let  m =this.calculateLocalia(this.props.pqh,this.props.pqr,this.props.mejorDeN,this.props.localias) 
        console.log(m, this.props.pqh,this.props.pqr,this.props.mejorDeN, this.props.localias)
        //console.log(this.state.tablaP)
        //this.setAddModalOpen(true);
        //console.log(this.calcularRutaCorta(3,2))
        
    
        return (
            <div>
                                  
            
            {desplegarTablas([Tabla([],m)])}
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
function Tabla(filas, matrix) {    
    //cambiar el color
    let rows = [] 
    if(matrix){
       
    for(let i =0;i <matrix.length;i++){
        let cols = []        
        for(let j =0;j <matrix.length;j++){
            if(i==matrix.length-1 && j== matrix.length-1){
                cols.push(Columns('text-white bg-primary',matrix[i][j]))
            } else {
                cols.push(Columns('text-dark bg-warning',matrix[i][j]))
            }
            

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
    handleSeries = (e)=>{
        this.setState({inputLinkClicked:true})
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
        <h2 className=' text-primary'>Seleccionar un archivo de prueba:</h2>            
        <input  className=" form-control text-white bg-dark" type="file" id="formFile" onChange={this.setd}></input>
        <br></br>
        
        
        <h2 className=' text-white'> Crear dinámicamente:</h2>    
        <br></br>
        <p className=' text-white'>Ingrese el número de juegos</p>         
        <input onChange={this.handleAmountGames} className='form-control text-white bg-dark' type="number"></input><br/>
        
        <p  className=' text-white'>Probabilidad de que el equipo 'A' gane de LOCAL:</p>    
             
        <input style = {{display:"inline-block"}} onChange={evt =>{this.setState({propLocal:parseFloat(evt.target.value)})}} className='form-control text-white bg-dark' type="number"></input><br/>
        <br></br>
        <p style = {{display:"inline-block"}} className=' text-white'>Probabilidad de que el equipo 'A' gane de VISITANTE:</p>    
        
        <input onChange={evt =>{this.setState({propVisit:parseFloat(evt.target.value)})}} className='form-control text-white bg-dark' type="number"></input><br/>
        {this.state.localias.length!= 0
        ?

        <div>
               {this.state.localias.map((data) => (
  
              data
              
            ))}
          
            
        </div>

        :<></>}
        <button onClick={this.handleSeries} type="button" class="btn btn-secondary btn-outline-white">Calcular probabilidades </button>
        </div>

        
        
        
        
                             
        
            {this.state.inputLinkClicked?           
                <div>
                    <h2 className=' text-white'>Creado dinámicamente:</h2>            
                    <br></br>
                    <SeriesD pqh = {[this.state.propLocal,1-this.state.propLocal]} pqr = {[this.state.propVisit,1-this.state.propVisit]} localias = {this.state.localiasValues} mejorDeN = {this.state.juegos}></SeriesD> 
                    
                    
                </div>
              :

              <div></div>
            }
        
    </div>
    )
    } 
}
function Series(){
    return (
        <App></App>
    );

}
export  {Series,SeriesD};





