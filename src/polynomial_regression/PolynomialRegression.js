import * as math from "mathjs";


class PolynomialRegression{
	/**
	 * IMPORTANT: This Polynomial Regression model only supports having one single characteristic as a dependent variable for yielding one response.
	 * 	      It is not have been implemented for multiple characteristics. 
	 * 	      Thus you can feed the model with a column vector where each element represent a feature.
	 * 	      Also in the same way, the labels must be column vector where each element represent a label itself.	   
	 */

	constructor(){
		this.model_expression = null;
		this.degree = NaN;
	}	

	train(X,y,degree=1){
		//full batch fashion ;)
		const n = math.size(X)[0],
			this.degree = degree;
//		//responses
//		const y_predicted = this.predict(x);
//		//residuals
//		const r = math.subtract(y,y_predicted);
//		//sum of the square of the residuals
//		const sqr = math.sum(math.pow(r));
		//computing derivates of the `polynomial model` with respect of `a_i`, and sums
		let derivates_sqr = new Array(),
			x_pow_deg = new Array(),
			s_xiy = new Array(),
			der_sqr_ai = null;
		for(let i=0;i<=this.degree;i++){
			// [ X^0, X^1, ... , X^i ]
			x_pow_deg.push(math.pow(X,i));
			
		//	//computing derivates
		//	der_sqr_ai = math.multiply(-2,math.multiply(x_pow_deg[i],r));
		//	derivates_sqr.push(der_sqr_ai);

			//computing sums
			s_xiy.push(math.multiply(x_pow_deg[i],y));
		}
		//computing remaing sums for solving the `m+1` linear equations, 
		//where `m` is equal to the number of coeficients; m=this.degree
		for(let i=this.degree+1; i<=2*this.degree;i++){
			x_pow_deg.push(math.pow(X,i));
		}
		let U = math.matrix(math.zeros([this.degree+1,this.degree+1])).data
		//fixing equation
		for(let i=0;i<this.degree;i++){ 
			for(let j=0;j<this.degree;j++){
				U[i][j] = x_pow_deg[j+i];
			}
		}
		const coef = math.usolve(U,s_xiy);
		console.log(coef)
	}

	predict(x){
		/**
		 * x: A column vector of scalars, or a scalar.
		 * return: A column vector of responses, or a scalar.   
		 */
	}
}

export default PolynomialRegression;
