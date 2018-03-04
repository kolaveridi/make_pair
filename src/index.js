import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class Game extends React.Component{
  constructor(props){
   super(props);

      this.size = 8; // now bigger sizes work but it needs power of two can be improved
      this.grid = this.initialize(this.size);
      this.rows = this.size;
      this.columns = this.size;

      this.state ={
          value:'',
          arr:this.grid,
          previousval:'', // use camel case .. previousVal
          previousRow:'',
          previousCol:'',
          'currentindex':'',
          total:0
      }

  }

  range = (start,end) => {
    return Array(end-start).fill(null).map((val,index) => start+index);
  }

  shuffle = (array) => {
    for(var i = 0; i < array.length; i++) {
      let destination = Math.floor(Math.random() * (array.length - i));
      let temp = array[i];
      array[i] = array[destination];
      array[destination] = temp
    }

    return array;
  }

  initialize = (size) => {
    var oneHalf = Array((size*size)/2).fill(null).map((_,index) => String.fromCharCode(65+index));
    var whole = oneHalf.concat(oneHalf.slice());
    var shuffled = this.shuffle(whole)

    var grid = []
    for (var i = 0; i < size; i ++) {
      var row = []
      for (var j = 0; j < size; j++) {
        row.push({
          'value':shuffled[i*size+j],
          'revealed':false,
        });
      }
      grid.push(row);
    }
    return grid;
  }

  clickfun= (val,row,column) =>{

    this.setState(() => {
      this.state.arr[row][column].revealed = true;
      return { 'arr' : this.state.arr};
    });
    // get rid of previousVal as it can be obtained from previous row
     var previousRow =this.state.previousRow;
     var previousCol = this.state.previousCol;
     var previousval=this.state.previousval;
     if(previousval===''){
        this.setState({
           previousval:val,
           previousCol:column,
           previousRow:row,
        })
     }
      else if(previousval===val && !(row === this.state.previousRow && column === this.state.previousCol)){
          this.setState({
            total:this.state.total+10,
            previousval:'',
            previousCol:'',
            previousRow:'',
          })
     }
        else{
        const arr=this.state.arr.slice();
        let prevRow = this.state.previousRow;
        let prevCol = this.state.previousCol;
        let theRow = row;
        let theCol = column;

         setTimeout(()=>{
           this.setState(() => {
             this.state.arr[theRow][theCol].revealed = false;
             this.state.arr[prevRow][prevCol].revealed = false;
             return {
                  'grid' : this.state.arr,
                  'previousval' : '',
                  'previousRow' : '',
                  'previousCol' : '',
              };
           });
         }
            , 500);

     }
  };

   renderGrid = () => {
     // this is hacky make this a functional component
     // range should be separate util method
     let component = this;
     return this.range(0,this.rows).map((row)=> {
      return <div className="cards1">
        {
          this.range(0,component.columns).map((column) => {
            let letter = component.state.arr[row][column].value;
            let displayed = (component.state.arr[row][column].revealed) ? letter : "";
           return  <button className="button" onClick={()=>component.clickfun(letter,row,column)}>{displayed}</button>;
         })
        }

   </div>;

 });
 }

   render(){
      return(
        <div className="Cards">
        <h1>Match Pair </h1>
        {
          this.renderGrid()

        }

           <h2>Score : {this.state.total}</h2>
       </div>


      );

   }

}


ReactDOM.render(<Game />, document.getElementById('root'));
