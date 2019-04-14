import React, { Component } from 'react';
import axios from"axios";

class MechanicFix extends Component {
    state = {
        trucks: [] // used to store truck IDs already created on backEnd
      }
    //METHODS GO HERE:





    //////////////////
    render() { 
        return (
            <React.Fragment>
                <h1 className = "title">MECHANIC FIX</h1>
                <form className = "box" onSubmit = {this.handleSubmit}>
                    <div className = "field">
                        <div className = "select">
                            <select name = "truckSelected" onChange = {this.handleChange}>
                                <option>FIX TRUCK</option>
                                {this.state.trucks.map((msg, index) => 
                                    <option >{msg[0]}</option>  
                                )}
                            </select>
                        </div> 
                    </div>

                    <div className = "field">
                        <div className = "columns">
                            <div className = "column is-2">
                                <label className = "label">BATTERY:</label>
                                <input value = {this.state.battery} onChange = {this.handleChange} className = "input" type = "text" name = "battery"/>
                            </div>
                            <div className = "column is-2">
                                <label className = "label">STARTER:</label>
                                <input value = {this.state.starter} onChange = {this.handleChange} className = "input" type = "text" name = "starter"/>
                            </div>
                            <div className = "column is-2">
                                <label className = "label">CLUTCH:</label>
                                <input value = {this.state.clutch} onChange = {this.handleChange} className = "input" type = "text" name = "clutch"/>
                            </div>                                               
                        </div>
                    </div>
                    <div className  = "field">
                        <button type ="submit" className = "button is-danger">FIX!!!</button>
                    </div>
                </form>
                <br/>
                <span className = "title has-text-danger">{this.state.fixed}</span>
            </React.Fragment>
          );
    }
}
 
export default MechanicFix;