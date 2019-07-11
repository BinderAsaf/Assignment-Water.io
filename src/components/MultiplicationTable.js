import React, { Component } from 'react';
import { Table } from 'reactstrap';
import {observer} from 'mobx-react'

export class MultiplicationTable extends Component {
    displayName = MultiplicationTable.name
    constructor(props)
    {
        super(props);
        this.fibList= Object.values(this.fibonacciUpToN(225));
        
    }
    //calc fib series up to given N - return a series as list
    fibonacciUpToN = (numMax)=>
    {
        var x;
        for(var fibArray = [0,1], i=0,j=1,k=0; ;i=j,j=x,k++ ){
            x=i+j;
            if(x>numMax) break;
            fibArray.push(x);
        }
        return fibArray;
    }
    //return a number based on current bas state
    getInBase = (num)=>{
        if(this.props.store.Base ==="Decimal")
            return num;
        else if(this.props.store.Base === "Binary")
            return (+num).toString(2);  
        else
            return  (+num).toString(16).toUpperCase();      
    }
    //create and return a table row
    createTableRow = (rowNum)=> {
        var line = [];
        for (let i = 1; i <= this.props.store.TableSize; i++) {
            line.push(i);
        }
        //create single row of a table
        var tdElements = line.map( (x) =>{
            let key = rowNum.toString()+x.toString();
            let title = rowNum+'*'+x+"="+(x*rowNum);
            let color = null;
            //check if value exist in fib list - add css class if true
            if(Object.values( this.fibList).indexOf(x*rowNum)>-1)
                color="fibColor";
            // check if index is in selected row or column - add css class if true    
            if(rowNum ===  this.props.store.findX || x === this.props.store.findY)    
                color="MarkColor";
            // check for indexes as exact position - add css class if true    
            if(rowNum ===  this.props.store.findX && x === this.props.store.findY)    
                color="ExactPositionColor"  ;  
            return(
               <td className={color} key={key} title={title}>{this.getInBase(x*rowNum)}</td>
            )
        });
        var rowHeader = (<th >{this.getInBase(rowNum)}</th>)
        return (<tr key={rowNum}>{rowHeader}{tdElements}</tr>);

    }
    //create and return a table heading
    createTableHeader = ()=> {
        var line = [];
        for (let i = 1; i <=this.props.store.TableSize; i++) {
            line.push(i);
        }
        //create single row of a table
        var tdElements = line.map( (x) =>{
            let key = x.toString();
            
            return (<th key={key} >{this.getInBase(x)}</th>)
        });
        //first cell is empty
        var firstCell = <th></th>
        //return whole header
        return (<tr key='header'>{firstCell}{tdElements}</tr>);

    }
    //return full matrix
    createTable = ()=> {
        var line = [];

        //create table header
        line.push(this.createTableHeader());
        //create content of table body
        for(let i=1; i<=this.props.store.TableSize; i++)
        {
            line.push(this.createTableRow(i))
        }
        return line;
    }

    render() {
      return (
        <div className="tableDiv" >
            <Table bordered >
                <tbody>
                {this.createTable()}
                </tbody>
            </Table>
        </div>
      );
    }
  }
MultiplicationTable = observer(MultiplicationTable)
export default MultiplicationTable;