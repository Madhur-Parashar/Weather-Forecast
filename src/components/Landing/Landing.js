import React from "react";
import { withRouter } from 'react-router';
import "./landing.css"

class Landing extends React.Component{
    constructor(props){
        super(props)
        this.state={
            city:''
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.handleShowChart = this.handleShowChart.bind(this)
    }
    onInputChange(event){
        this.setState({
            city: event.target.value
        })
    }
    handleShowChart(){
        this.props.history.push({pathname:'/chart/'+this.state.city})
    }
    render(){
        return(
            <div className="b-landing">
                <input value={this.state.city} onChange={this.onInputChange} placeholder="Please enter city"/>
                <button onClick={this.handleShowChart} className="b-btn-get-forecast__cta">
                    Get the forecast
                </button>
            </div>
        )
        
        
    }
}

export default withRouter(Landing)