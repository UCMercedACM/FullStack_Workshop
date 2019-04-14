import React, { Component } from 'react';
import axios from "axios";

class truckStats extends Component {
    state = {
        //for date table
        date: "",
        time: "",
        //for inspection table
        truck_id: "",
        battery: "GOOD",
        starter: "GOOD",
        clutch: "GOOD",
        comment: "",
        posted: ""
      }

      handleChange = (event) =>{
        this.setState({[event.target.name]: event.target.value});
        console.log(event.target.name, event.target.value);
      }

      handleSubmit = (event) =>{
          event.preventDefault();               //prevents refreshing of page when submit is clicked
          //object that will be sent to backend
          const truck = {
              date: this.state.date,
              time: this.state.time,
              truck_id: this.state.truck_id,
              battery: this.state.battery,
              starter: this.state.starter,
              comment: this.state.comment,
              clutch: this.state.clutch
          }
          //endPoint to post data to backEnd
          axios.post("http://localhost:5000/postStatus", {truck})
          .then(res=>{
              const posted = res.data;
              this.setState({posted});
          })
        
      }
    render() { 
        return (
            <React.Fragment>
                <h1 className = "title">REPORT TRUCK STATUS</h1>
                <form onSubmit = {this.handleSubmit}>
                  <div className = "field">
                            <div className = "columns">
                                <div className = "column is-2">
                                    <label className = "label">DATE:</label>
                                    <input placeholder = "xx-xx-xxxx" onChange = {this.handleChange} className = "input" type = "text" name = "date"/>
                                </div>
                                <div className = "column is-2">
                                    <label className = "label">TIME:</label>
                                    <input placeholder = "00:00:00TM" onChange = {this.handleChange} className = "input" type = "text" name = "time"/>
                                </div>
                                <div className = "column is-3">
                                    <label className = "label">TRUCK ID:</label>
                                    <input onChange = {this.handleChange} className = "input" type = "text" name = "truck_id"/>
                                </div>                                               
                            </div>
                            <div className = "field">
                                <div className = "columns">
                                    <div className = "column is-2">
                                        <label className = "label">BATTERY:</label>
                                        <div className = "select">
                                            <select name = "battery" onChange = {this.handleChange}>
                                                <option>GOOD</option>
                                                <option>BAD</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className = "column is-2">
                                        <label className = "label">CLUTCH:</label>
                                        <div className = "select">
                                            <select name = "clutch" onChange = {this.handleChange}>
                                                <option>GOOD</option>
                                                <option>BAD</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className = "column is-2">
                                        <label className = "label">STARTER:</label>
                                        <div className = "select">
                                            <select name = "starter" onChange = {this.handleChange}>
                                                <option>GOOD</option>
                                                <option>BAD</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <article className="media">
                                <div className="media-content">
                                    <div className="field">
                                    <p className="control">
                                    <textarea type ="text" name = "comment" className="textarea"
                                        onChange = {this.handleChange} placeholder="Add a comment..."/>
                                    </p>
                                    </div>
                                </div>
                            </article>
                            <br/>
                            <div className = "field">
                                <button className = "button is-success">SUBMIT</button>
                            </div>
                    </div>
                </form>
                <span className = "title has-text-info">{this.state.posted}</span>
            </React.Fragment>
          );
    }
}
 
export default truckStats;