import React from "react";
import {render} from "react-dom";

class Drawer extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {x:NaN,y:NaN,
			      width:400,height:400};
	}

	onMouseMove(e){
	 	this.setState({ x: (e.nativeEvent.offsetX/this.state.width).toFixed(3),
				y: (1-e.nativeEvent.offsetY/this.state.height).toFixed(3)});
	}
	
	onClick(){
		const coords = {x:this.state.x,
				y:this.state.y};
		this.props.setCoords(coords); 
	}
		

	render(){
		return(
			<div>
				<div onMouseMove={(e)=>this.onMouseMove(e)}  style={{width:this.state.width,height:this.state.height,backgroundColor:"rgba(100,100,100,0.2)"}}
			 onClick={this.onClick.bind(this)}/>
				<div className="row mt-2">
					<div className="col-6">
						<p>X: {this.state.x}</p>
					</div>
					<div className="col-6">
						<p>Y: {this.state.y}</p>
					</div>
				</div>
			</div>
		);
	}

}

export default Drawer;
