import {observable,decorate, action} from 'mobx';

// store to manage all parameeters as shared state between sidebar and matrix
class MenuStore
{
   constructor(){
     //state of matrix size
    this.TableSize=10;
    //state of matrix base
    this.Base = "Decimal";
    //state for x value - exercise
    this.findX=0;
    //state for y value - exercise
    this.findY=0;
    
  }

  setSize = (size)=>{ 
    this.TableSize=Number(size);
  }
  setBase = (base)=>{ 
    this.Base=base;
  }
  setXY = (x,y)=>{
    this.findX=Number(x);
    this.findY=Number(y);
  }
 
}

decorate(MenuStore , {
    TableSize:observable,
    Base:observable,
    findX:observable,
    findY:observable,
    setSize:action,
    setBase:action,

    
});
const store = window.store = new MenuStore();
export default store;

