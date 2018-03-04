import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class Game extends React.Component{
  constructor(props){
   super(props);
      this.state ={
          value:'',
          arr:Array(15).fill(null),
          flag:Array(15).fill(false),
          toshow:true,

          previousval:'',
          previousindex:'',
          total:0

      }
  }
  clickfun= (val,index) =>{
      console.log('clicked');
      const arr=this.state.arr.slice();
      arr[index]=val;
       this.setState({
       value:val,
       arr:arr
     })
     console.log(arr);

     var previousindex=this.state.previousindex;
     var previousval=this.state.previousval;
     if(previousval===''){
        this.setState({
           previousval:val,
           previousindex:index
        })
     }
      else if(previousval!=='' && previousval===val){
          this.setState({
            total:this.state.total+10,
            previousval:'',
            previousindex:'',
          })
     }
        else{
        const arr=this.state.arr.slice();
         setTimeout(()=>{
           arr[previousindex]='';
           arr[index]='';
           this.setState({
             arr:arr,
             previousval:'',
             previousindex:''
           })
         }
            , 500);

     }
  };
   render(){
      return(
        <div className="Cards">
        <h1>Match Pair </h1>
        <div className="cards1">
         <button className="button" onClick={()=>this.clickfun('A',0)}>{this.state.arr[0]}</button>
         <button className="button" onClick={()=>this.clickfun('B',1)}>{this.state.arr[1]}</button>
         <button className="button" onClick={()=>this.clickfun('C',2)}>{this.state.arr[2]}</button>
         <button className="button" onClick={()=>this.clickfun('D',3)}>{this.state.arr[3]}</button>
         </div>
         <div className="cards2">
          <button className="button" onClick={()=>this.clickfun('C',4)}>{this.state.arr[4]}</button>
          <button  className="button"onClick={()=>this.clickfun('D',5)}>{this.state.arr[5]}</button>
          <button className="button" onClick={()=>this.clickfun('E',6)}>{this.state.arr[6]}</button>
          <button className="button" onClick={()=>this.clickfun('F',7)}>{this.state.arr[7]}</button>
          </div>
          <div className="cards3">
           <button className="button" onClick={()=>this.clickfun('G',8)}>{this.state.arr[8]}</button>
           <button className="button" onClick={()=>this.clickfun('H',9)}>{this.state.arr[9]}</button>
           <button className="button" onClick={()=>this.clickfun('G',10)}>{this.state.arr[10]}</button>
           <button className="button" onClick={()=>this.clickfun('H',11)}>{this.state.arr[11]}</button>
           </div>
           <h2>Score{this.state.total}</h2>
       </div>


      );

   }

}


ReactDOM.render(<Game />, document.getElementById('root'));
