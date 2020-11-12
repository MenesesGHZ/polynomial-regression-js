import * as math from "mathjs";


class PolynomialRegression{
	/**
	 * IMPORTANT: This Polynomial Regression model only supports having one single characteristic as a dependent variable for yielding one response.
	 * 	      It is not have been implemented for multiple characteristics. 
	 * 	      Thus you can feed the model with a column vector where each element represent a feature.
	 * 	      Also in the same way, the labels must be column vector where each element represent a label itself.	   
	 */

	constructor(){
		this.expression = "f(x) = undefined";
		this.coefficients = new Array(); 
		this.degree = NaN;
		this.f = undefined;
	}	

	train(X,y,degree=1){
		const n = X.length;
		let x_pow_deg = new Array(),
			s_xiy = new Array();
		this.degree = degree;

		// computing sum of Xs to the power of `i` -> [ X^0, X^1, ... , X^i ], and computing sums
		for(let i=0;i<=this.degree;i++){
			x_pow_deg.push(X.map(el=>el**i));
			s_xiy.push(math.multiply(x_pow_deg[i],y));
		}

		//computing remaing sums for solving the `m+1` linear equations, where `m` is equal to the number of coeficients; m=this.degree
		for(let i=this.degree+1; i<=2*this.degree;i++) 
			x_pow_deg.push(X.map(el=>el**i)); 
		
		//fixing equation; Ax = b -> A*s_xiy = coef	
		let A = math.zeros(this.degree+1,this.degree+1)._data
		for(let i=0;i<=this.degree;i++)
			for(let j=0;j<=this.degree;j++)
				A[i][j] = math.sum(x_pow_deg[j+i]);
		A[0][0] = n;

		//solve linear equation Ax = b |  modeling f(x) in JS  |  fomating mathematical expression of the model
		this.coefficients = math.usolve(A,s_xiy);
		this.f = (x) =>{
			return math.sum(this.coefficients.map((coef,i)=>coef*(x**i)))
		};
		this.expression = "f(x) = ".concat(
			this.coefficients.map((el,i)=> i===0? `${el}`:` + ${el}x^${i}` ).join("")
		);
		
	}

	predict(X){
		// x: row vector.
		// return: row vector.   
		const response = X.map((x)=>this.f(x));
		return response;
	}
}

export default PolynomialRegression;
