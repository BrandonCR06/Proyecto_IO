import '../../App.css';
import React from 'react';

/*
function G(c, x, t, n, lista, listaIndices) {
	let l = []
	let kpos = []
    if (x===n) {
        console.log("G(",x,")=0")
        return 0;
    }
    
    for (let i = x+1; i<t+1; i++) {
  	    let val = t
        if (t<n) {
    	    val = t+1
        }
        let func = 0
        if (lista[n-i]===0) {
    	    func = G(c,i,val,n,lista,listaIndices)
            lista[n-i] = func
        } else {
    	    func = lista[n-i]
        }

        l.push((c[i-x-1] + func))
        kpos.push(i)    
    }

    console.log("G(",x,")=", Math.min(...l))
    let r = []
    let minin = Math.min(...l)
    console.log(kpos)

    let largo = count(l,Math.min(...l))
    // COGER LOS POSIBLES MINIMOS
    console.log(largo)
    console.log(l)
    for (let i = 0; i<largo; i++) {
        
        console.log("INDEX =>>>>"+ l.indexOf(Math.min(...l)))

        let v = kpos[l.indexOf(Math.min(...l))]
        console.log("KPOS->"+kpos)
        console.log("v->"+v)
        r.push(v)
        console.log("antes->"+t)
        l.splice(l.indexOf(Math.min(...l)),1) 
        //l = l.filter(e => e !== Math.min(...l))
        console.log("despues->"+l)
        //kpos = kpos.filter(e => e !== v)
        kpos.splice(kpos.indexOf(v),1) 
    }

    listaIndices.push(r)
    return minin
}



function index(lista, element) {
    for (let index = 0; index < lista.length; index++) {
        if (lista[index] === element) {
            return index+1
        }
    }
}


function count(lista, element) {
    let count = 0
    for (let i = 0; i<lista.length; i++) {
        if (lista[i] === element) {
            count = count+1
        }
    }
    
    return count
}


function generarLista(n) {
	
  let lista = []
  for (let i = 0; i<n; i++) {
  	lista.push(0)
  }
	return lista
}


function reemplazoEquipos(m, precio, siguientesN) {
    
    let sumMant
    let listDif = []

    if (!Number.isInteger(m[0])) {
        for (let i = 0; i < m.length; i++) {
            sumMant = 0
            for (let j = 0; j < i+1; j++) {
                sumMant += m[j][1]  // m[j][1] = Costo de mantenimietno
            }
            let costo = (precio+sumMant)-m[i][0]
            listDif.push(costo)
        }
    } else {
        listDif = m
    }
    let listaIndices = []
    console.log("ListDif="+listDif)
    let lista = generarLista(siguientesN)
    console.log("Lista="+lista)
    let val = G(listDif, 0, m.length, siguientesN, lista, listaIndices)
    
    console.log(listaIndices)
    let proximo = listaIndices.reverse()
    console.log(listaIndices)
    console.log(proximo)

    let temp = lista
    temp.push(val)

    //console.log("ARREGLO: "+temp)
    let Gt = temp.reverse()
    
    console.log(proximo, Gt)
    let planes = []
    console.log("Plan de reemplazo")
    console.log("T G(T) Proximo")
    for (let i = 0; i < proximo.length; i++) {
        let plan = []
        //console.log(i + "\t" + Gt[i] + "\t")
        //process.stdout.write(i + "\t" + Gt[i] + "\t");
        for (let j = 0; j < proximo[i].length; j++) {
            //process.stdout.write(proximo[i][j]+",");
            //console.log(proximo[i][j]+"\t")
        }
        //process.stdout.write("\n")
    }
  
}


//let m = [[400,30],[300,40],[250,60]]
//console.log(reemplazoEquipos(m,500,5))

let m2 = [[7125,305],[5000,530],[3700,800],[3310,1100]]
console.log(reemplazoEquipos(m2, 9999, 8))
*/

class EquipoAlgo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          reventa: [400,300,250],
          mantenimiento:[30,40,60],
          ganacia :[],
          cantAnnios:5,
          precio:500,
          parametro1:[],
          resultadoEquipo:[]
        };
    }
    

    makeParameter1 = (reventa, mantenimiento)=>{
        let result = reventa.map(function(value, index) {
            return [reventa[index], mantenimiento[index]];
        });
        return result
    }


    generarLista = (n) => {
        
        let lista = []
        for (let i = 0; i<n; i++) {
            lista.push(0)
        }
        return lista
    }

    count = (lista, element) => {
        let count = 0
        for (let i = 0; i<lista.length; i++) {
            if (lista[i] === element) {
                count = count+1
            }
        }
        
        return count
    }

    G = (c, x, t, n, lista, listaIndices)=>{
        let l = []
        let kpos = []
        if (x===n) {
            console.log("G(",x,")=0")
            return 0;
        }
        
        for (let i = x+1; i<t+1; i++) {
              let val = t
            if (t<n) {
                val = t+1
            }
            let func = 0
            if (lista[n-i]===0) {
                func = this.G(c,i,val,n,lista,listaIndices)
                lista[n-i] = func
            } else {
                func = lista[n-i]
            }
    
            l.push((c[i-x-1] + func))
            kpos.push(i)    
        }
    
        console.log("G(",x,")=", Math.min(...l))
        let r = []
        let minin = Math.min(...l)
        console.log(kpos)
    
        let largo = this.count(l,Math.min(...l))
        // COGER LOS POSIBLES MINIMOS
        console.log(largo)
        console.log(l)
        for (let i = 0; i<largo; i++) {
            
            console.log("INDEX =>>>>"+ l.indexOf(Math.min(...l)))
    
            let v = kpos[l.indexOf(Math.min(...l))]
            console.log("KPOS->"+kpos)
            console.log("v->"+v)
            r.push(v)
            console.log("antes->"+t)
            l.splice(l.indexOf(Math.min(...l)),1) 
            //l = l.filter(e => e !== Math.min(...l))
            console.log("despues->"+l)
            //kpos = kpos.filter(e => e !== v)
            kpos.splice(kpos.indexOf(v),1) 
        }
    
        listaIndices.push(r)
        return minin
    }


    reemplazoEquipos = (m, precio, siguientesN)=>{
    
        let sumMant
        let listDif = []
        console.log("m ->"+m)
        if (!Number.isInteger(m[0])) {
            for (let i = 0; i < m.length; i++) {
                sumMant = 0
                for (let j = 0; j < i+1; j++) {
                    sumMant += m[j][1]  // m[j][1] = Costo de mantenimietno
                }
                let costo = (precio+sumMant)-m[i][0]
                listDif.push(costo)
            }
        } else {
            listDif = m
        }
        let listaIndices = []
        console.log("ListDif="+listDif)
        let lista = this.generarLista(siguientesN)
        console.log("Lista="+lista)
        let val = this.G(listDif, 0, m.length, siguientesN, lista, listaIndices)
        
        console.log(listaIndices)
        let proximo = listaIndices.reverse()
        console.log(listaIndices)
        console.log(proximo)
    
        let temp = lista
        temp.push(val)
    
        //console.log("ARREGLO: "+temp)
        let Gt = temp.reverse()
        
        console.log(proximo, Gt)
        
        let resultado = []
        resultado.push(<h2 class  ="text-white">Plan de reemplazo<br/></h2>)
        resultado.push(<h2 class  ="text-white">T   G(T)    Proximo<br/></h2>)
        console.log("Plan de reemplazo")
        console.log("T \t\t G(T) \t\t Proximo")
        for (let i = 0; i < proximo.length; i++) {
            let plan = []
            resultado.push(<h2 style={{display:"inline"}} className='text-white'>{i + "\t\t" + Gt[i] + "\t\t"}</h2>)
            //console.log(i + "\t" + Gt[i] + "\t")
            //process.stdout.write(i + "\t" + Gt[i] + "\t");
            for (let j = 0; j < proximo[i].length; j++) {
                //process.stdout.write(proximo[i][j]+",");
                //console.log(proximo[i][j]+"\t")
                resultado.push(<h2 style={{display:"inline"}} className='text-white'>{proximo[i][j]+","}</h2>)
            }
            resultado.push(<br/>)
            //process.stdout.write("\n")
        }


        return resultado


    }








    render() {

        

        let parametro1 = this.makeParameter1(this.state.reventa, this.state.mantenimiento)
        
        console.log("Mantenimiento ->"+this.state.mantenimiento)
        console.log("Reventa ->"+this.state.reventa)
        console.log("Parametro 1 ->"+parametro1)
        let res = this.reemplazoEquipos(parametro1, this.state.precio, this.state.cantAnnios);


        return (
        <div>
                                    
            {console.log("Mantenimiento ->"+this.state.mantenimiento)}
            {console.log("Reventa ->"+this.state.reventa)}
            {console.log("Parametro 1 ->"+parametro1)}
            <table className =  "table-bordered table table-dark">
                
            {this.state.parametro1.map((row,i) => {  
                return(
                    <thead className = "thead-light">
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





class  App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          precio: 0,
          cantAnnios:1,
          reventa: [],
          mantenimiento:[],
          ganacia :[],
          equipoConfirmed: false
        };
      }

    
    
    
    
    setd = (e)=>{
            
        let num = parseInt(e.target.value);
        this.setState({equipoConfirmed:false});
        this.setState({cantAnnios: num});
    }

    cambioValores =(evt,list,i)=>{
        let change = evt.target.value;
        if(list ===[]){
            list = new Array(this.state.cantAnnios);
        }
        list[i]  = change;
    }

    desplegarTablaInputs = ()=> {
        let listaDespliegue = []
        let listapes = []
        for(let i = 0 ; i < this.state.cantAnnios ; i++){
            listaDespliegue.push(
                <div className = 'col'>
                  <input                     
                className="input"                        
                  type={"text"}
                defaultValue = {0}
                onChange = {evt => this.cambioValores(evt,this.state.reventa, i)}
                
                >                            
                </input>            
            </div>
            )
            listapes.push([
                <div className = 'col'>
                  <input                      
                className="input"                        
                  type={"text"}
                defaultValue = {0}
                onChange = {evt => this.cambioValores(evt,this.state.mantenimiento, i)}
                >                            
                </input>            
            </div>, 

            <div className = 'col'>
                 <input                      
               className="input"                        
                 type={"text"}
               defaultValue = {0}
               onChange = {evt => this.cambioValores(evt,this.state.ganacia, i)}
               >                            
               </input>            
           </div>]
        )
        }
       

        return (  
            <table className =  "table-bordered table table-dark">
                <thead className = "thead-light">       
                {this.state.cantAnnios>0 ?
                <tr>
                <th scope="col"> </th>
                <th scope="col">Precio de reventa</th>
                <th scope="col">Costo del mantanimiento</th>
                <th scope="col">Ganancia recibida por año</th>
                
                </tr>:
                <div/>
                }        
                            
                     {listaDespliegue.map((row,i) => {  
                        return(        
                            <tr>
                            <th scope="row">Año {i+1}</th>
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

    confirmEquipo = (e) =>{
        for(let i = 0 ; i < this.state.reventa.length; i++){
            this.state.reventa[i] = parseInt(this.state.reventa[i])
            this.state.mantenimiento[i] = parseInt(this.state.mantenimiento[i])
            this.state.ganacia[i] = parseInt(this.state.ganacia[i])
        }
        console.log(this.state.precio)
        
        this.setState({equipoConfirmed:true});

      } 



    render() {
        return (
            <div  id = "1" className = "p-4 ms-auto">
                <h1 className='text-center text-white'>Reemplazo de equipos</h1>            
                <div className="mb-3 cont">            
                    <br></br>
                    <h4 className=' text-white'>Ingrese el costo inicial del equipo</h4>         
                    <input onChange={evt =>{this.setState({precio:parseInt(evt.target.value)})}} className='form-control text-white bg-dark' type="text"></input><br/>
                    <h4 className=' text-white'>Seleccione la vida util del proyecto</h4>            
                    <input  defaultValue="1" className=" form-control text-white bg-dark" type="number" min="1" max="10"></input><br/>
                    <h4 className=' text-white'>Seleccione el plazo del proyecto</h4>  
                    <input  onChange={this.setd} defaultValue="1" className=" form-control text-white bg-dark" type="number" min="1" max="30" ></input>
                </div>
                <div>,
                    {this.desplegarTablaInputs()}
                    <br></br><br></br>
                    {console.log(this.state.mantenimiento)}
                    <button onClick={this.confirmEquipo} type="button" className = "btn btn-secondary btn-block btn-outline-white">Generar Algoritmo</button>            
            
                    <br></br>
                    <br></br>
                </div>
                <div/>
            {this.state.equipoConfirmed ?
                <div>
                <EquipoAlgo reventa = {this.state.reventa} mantenimiento = {this.state.mantenimiento} precio = {this.state.precio} cantAnnios = {this.state.cantAnnios} ganacia = {this.state.ganacia}/>
            </div>
            :
            <div></div>
            }
        </div>
        )
    }






}


function Equipo(){
    return (
        <App></App>
    );

}
export  default Equipo;
