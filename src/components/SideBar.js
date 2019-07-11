import React, { Component } from 'react';
import { Input } from 'reactstrap';
import {observer} from 'mobx-react'

export class SideBar extends Component {
    displayName = SideBar.name
    constructor(props)
    {
        super(props);
        this.state={findX:0,findY:0,valueErr:false,boundsErr:false};
        
    }
    //fill in select option for matrix size
    setOptionsInput = ()=>{
        var options = [];
        for (let i = 3; i <= 15; i++) {
            options.push(i);
        }
        return options.map( op =>{
            return ( <option key={op}>{op}</option>)
        })
    }
    //action for changing matrix size
    InputSizeChange = (e)=>{
        this.props.store.setSize(e.target.value)
        if(e.target.value < this.props.store.findX  || e.target.value < this.props.store.findY)
            this.resetValue();
    }
    //action for changing base
    InputBaseChange = (e)=>{
        
        this.props.store.setBase(e.target.value)
    }
    ChangeVal=(e)=>{
        this.setState({[ e.target.name] : e.target.value});
    }
    //action for exercise
    findValue = ()=>{
        this.setState({valueErr:false,boundsErr:false});
        if(/^\d+$/.test(this.state.findX) && /^\d+$/.test(this.state.findY)) 
        {
            
            if(this.state.findX<1 || this.state.findX > this.props.store.TableSize || this.state.findY<1 || this.state.findY > this.props.store.TableSize)
            {
                this.setState({boundsErr:true});
                return;
            } 
           
            
            this.props.store.setXY(this.state.findX,this.state.findY);
        }
            
        else this.setState({valueErr:true}); 
    }
    //reset values of exercise
    resetValue = ()=>{
        this.props.store.setXY(0,0);
        this.setState({findX:0,findY:0});
        this.setState({valueErr:false,boundsErr:false})
    }
    //error masseges handling
    errorMessage = ()=>{
        var errors=[];
        if(this.state.valueErr)
            errors.push((<h5 key="err1">Invalid values, numbers only</h5>));
        if(this.state.boundsErr)   
            errors.push((<h5 key="err2">Value error, out of bounds</h5>)); 
        return errors;
    }
    
    render() {
      return (
        <div>
            <h2><i className="glyphicon glyphicon-tint" ></i> Water.io Assignment</h2>
            <h3><i className="glyphicon glyphicon glyphicon-cog" ></i> Settings</h3>
            <h4> Matrix size</h4>
            <div className="inputDiv">
                <Input type="select" style={{width:"50%",fontSize:"12px"}}  defaultValue="10" onChange={this.InputSizeChange}>
                    {this.setOptionsInput()}
                </Input>
          </div>
          <h4> Matrix base</h4>
            <div className="inputDiv">
                <Input type="select" style={{width:"50%",fontSize:"12px"}}  defaultValue="Decimal" onChange={this.InputBaseChange}>
                    <option>Decimal</option>
                    <option>Binary</option>
                    <option>Hex</option>
                </Input>
          </div>
          <h3><i className="glyphicon glyphicon-knight" ></i> Find Me</h3>
          {this.errorMessage()}
          <div className="inputDiv">
            <Input type="text" className="InputBox" name="findX" value={this.state.findX} onChange={this.ChangeVal}/>
            <h4 style={{display:"inline-block", paddingLeft:"8px"}}>X</h4>
            <Input type="text" className="InputBox" name="findY" value={this.state.findY} onChange={this.ChangeVal}/>
          </div>
          <button className="button button" onClick={this.resetValue}>
            <i className="glyphicon glyphicon-refresh" ></i>
          </button>
          <button className="button" onClick={this.findValue}>
            <i className="glyphicon glyphicon-circle-arrow-right" ></i>
          </button>
        </div>
      );
    }
  }
SideBar = observer(SideBar)
export default SideBar;
