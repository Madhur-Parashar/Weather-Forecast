import React from "react";
import { withRouter } from 'react-router';
import axios from "axios";
import apiId from "../../utility/utility"
import { VictoryLine,VictoryTooltip ,VictoryChart,VictoryVoronoiContainer, VictoryLabel} from 'victory';
import moment from "moment";
import "./chart.css"

class Chart extends React.Component{

    constructor(props){
        super(props)
        this.state={
            data:[],
            loaded:false,
            errorMessage:false
        }
        this.populateData = this.populateData.bind(this)
    }

    populateData(list){
        let temperature =  list.map(item=>{
            return {'x':moment(item.dt_txt).format("D MMM HH:mm"),'y':item.main.temp,title:'Temperature'}
              
          })
        let pressure =  list.map(item=>{
            return {'x':moment(item.dt_txt).format("D MMM HH:mm"),'y':item.main.pressure,title:'Pressure'}
              
          })
        let humidity =  list.map(item=>{
            return {'x':moment(item.dt_txt).format("D MMM HH:mm"),'y':item.main.humidity,title:'Humidity'}
              
          })
       this.setState({
           data: [temperature,pressure,humidity]
       })
    }
  
    componentDidMount(){       
        axios.get(`http://api.openweathermap.org/data/2.5/forecast/?q=${this.props.match.params.city}&appid=${apiId}`)
        .then( (response) =>{
            // handle success
            console.log(response.data);
            this.populateData(response.data.list)
          
        })
        .catch( (error)=> {
            // handle error
            this.setState({
                errorMessage:true
            })
        })
        .finally( ()=> {
            this.setState({
                loaded:true
            })
        });
    }
    render(){
    
        return(
            <div>
                
                { this.state.loaded ?
                <div className="b-chart">
                    {this.state.errorMessage ?
                    <div>
                        City Not Found. Please enter correct city
                    </div> :  
                     this.state.data.map((item,index)=>
                        <div className="b-chart__main" key={index}>
                        <VictoryChart 
                          responsive={true}
                          containerComponent={
                            <VictoryVoronoiContainer voronoiDimension="x"
                              labels={({ datum }) => `y: ${datum.x}`}
                              labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{fill: "white"}}/>}
                            />
                          }         
                          >
                         <VictoryLabel text={item[0].title} x={225} y={30} textAnchor="middle"/>
                          <VictoryLine
                              style={{
                              data: { stroke: "#c43a31" },
                              parent: { border: "1px solid #ccc"}
                              }}
                              data={item}
                              x={1}
           
                          />
                          <VictoryLabel/>
                          
                          </VictoryChart>
                        </div>
                    )}
                    <button onClick={this.props.history.goBack} className="b-chart-go-back__cta">Go back</button>
                </div>
                
                 :'Loading...'
                }
               
              
            </div>
        )
        
        
    }
}

export default withRouter(Chart)