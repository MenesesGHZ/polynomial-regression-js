import React from "react";
import {render} from "react-dom";
import grid from "../assets/grid.png";

/*-----------------------------------------------------
 *
 *	This component changes the state of the `x_array` and `y_array`
 *	sending a pair of (x,y) coordinate to the setCoords() from the <Main/>. 
 *	The coordinates are normalized with respect from the `width` and `height`.
 *	Also the component renders the current hover coords. 
 *	Whereas when the user makes a click on the grid, it adds the hover coords (x,y) respectively.
 *	If the component has `hoverMode=True`, the user does not need to click in order to add a coord.
 *	
 * ----------------------------------------------------
 */
	
class Drawer extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {x:NaN,y:NaN,hoverMode:false};
		this.width = this.height = 400;
	}

	onMouseMove(e){
	 	this.setState({ x: parseFloat((e.nativeEvent.offsetX/this.width).toFixed(3)),
				y: parseFloat(((this.height-e.nativeEvent.offsetY)/this.height).toFixed(3))},
			()=>{if(this.state.hoverMode) this.addCoord()}
		);	
	}

	toggleHoverMode(){
		this.setState({hoverMode:!this.state.hoverMode});
	}
	
	addCoord(){
		const coord = {x:this.state.x,
		               y:this.state.y};
		this.props.addCoord(coord); 
	}

	render(){
		return(
			<div>
				<div className="row mb-4">
					<div className="col-6 d-flex justify-content-center">
						<div>
						<p>Hover Mode: [{this.state.hoverMode?"ON":"OFF"}]</p>
						<div className="w-100 d-flex justify-content-center">
							<button type="button" className="btn btn-success" onClick={this.toggleHoverMode.bind(this)}>toggle</button>
						</div>
						</div>
					</div>
					<div className="col-6 d-flex justify-content-center">
						<div>
						<p>Reset Button:</p>
						<div className="w-100 d-flex justify-content-center">
							<button type="button" className="btn btn-danger" onClick={this.props.resetCoords}>reset</button>
						</div>
						</div>	
					</div>
				</div>
				<div className="d-flex justify-content-center">
					<div  onMouseMove={(e)=>this.onMouseMove(e)}  
						style={{width:this.width,height:this.height,backgroundColor:"rgba(100,100,100,0.1)",backgroundImage:`url(${grid})`}}
						onClick={this.addCoord.bind(this)}/>
				</div>
				<div className="row mt-2">
					<div className="col-6 d-flex justify-content-center">
						<p>X: {this.state.x}</p>
					</div>
					<div className="col-6 d-flex justify-content-center">
						<p>Y: {this.state.y}</p>
					</div>
				</div>	
				
			</div>
		);
	}
}


export default Drawer;
