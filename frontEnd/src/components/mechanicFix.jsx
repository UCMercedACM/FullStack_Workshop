import React, { Component } from 'react';
import axios from"axios";
//cooluhhuuh
class MechanicFix extends Component {
    state = {
        trucks : [],
        truckSelected: "",
        clutch: "",
        starter: "",
        battery: "",
        //will store whether or not, post was made successfully
        fixed: "",
        truckSelected: ""
      }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        console.log(event.target.name, event.target.value);
        if(event.target.name === "truckSelected"){
            this.handleTruckData(event.target.value);
        }
    }

    //fetch specified truck ID by the user
    handleTruckData = (truckData) =>{
        const data  = {
            tID: truckData
        } 
        axios.post("http://localhost:5000/fetchTrucks", {data})
        .then(res =>{
            const battery = res.data[0];
            const clutch = res.data[1];
            const starter = res.data[2];
            this.setState({battery});
            this.setState({clutch});
            this.setState({starter});
        })
    }

    //used to fix truck
    handleSubmit = (event) =>{
        event.preventDefault();
        const condition = {
            battery:  this.state.battery,
            starter: this.state.starter,
            clutch: this.state.clutch,
            truckID: this.state.truckSelected
        }
        axios.post("http://localhost:5000/postFix", {condition})
        .then(res => {
            const fixed = res.data;
            this.setState({fixed});
        })
    }

    //lifecycle to fetch truck IDs
    componentDidMount () {
        axios.get("http://localhost:5000/fetchTrucks")
        .then(res =>{
            const trucks = res.data;
            this.setState({trucks});
        })
    }

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