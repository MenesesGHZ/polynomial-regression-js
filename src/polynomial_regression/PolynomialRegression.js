import * as math from "mathjs";
/**
 * ---------------------------------------------------------
 *
 * 	This Polynomial Regression model only supports having one single 
 * 	characteristic as a dependent variable for yielding one response.
 * 	
 * 	IMPORTANT: It is not have been implemented for multiple characteristics. 
 * 	
 * 	Thus you can feed the model with a row vector of features, and in the same way,
 * 	the labels must be row vector where each element represent the label itself.	   
 * 	
 * 	Theory recovered from -> 
 * 		Book:`Chapra-Canale:Numerical Methods for Engineers, Sixth Edition`;
 * 		chapter: `Least-Squares Regression #17`; pag:`470`;
 *
 * ----------------------------------------------------------
 */
class PolynomialRegression{
	constructor(){
		this.expression = "f(x) = undefined";
		this.coefficients = new Array(); 
		this.degree = NaN;
		this.f = (x) => 0;
	}	

	train(X,y,degree=1){
		try {
			const n = X.length;
			let x_pow_deg = new Array(),
				s_xiy = new Array();
			this.degree = degree;

			// computing sum of Xs to the power of `i` -> [ X^0, X^1, ... , X^i ], and computing sums
			for(let i=0;i<=this.degree;i++){
				x_pow_deg.push(X.map(x=>x**i));
				s_xiy.push(math.multiply(x_pow_deg[i],y));
			}

			//computing remaining sums for solving the `m+1` linear equations, where `m` is equal to the number of coeficients; m=this.degree
			for(let i=this.degree+1; i<=2*this.degree;i++) 
				x_pow_deg.push(X.map(el=>el**i)); 

			//fixing equation; Ax = b -> A*s_xiy = coef	
			let A = math.zeros(this.degree+1,this.degree+1)._data
			for(let i=0;i<=this.degree;i++)
				for(let j=0;j<=this.degree;j++)
					A[i][j] = math.sum(x_pow_deg[j+i]);
			A[0][0] = n;

			//solve linear equation Ax = b |  modeling f(x) in JS  |  fomating mathematical expression of the model
			this.coefficients = math.lusolve(math.lup(A),s_xiy)._data;
			this.f = (x) =>{
				return math.sum(this.coefficients.map((coef,i)=>coef*(x**i)))
			};
			this.expression = "f(x) = ".concat(
				this.coefficients.map((el,i)=> i===0? `${el}`:` + (${el}x^${i})` ).join("")
			);

		} catch (error) {
			// Error: Linear system cannot be solved since matrix is singular. |Matrix|=Det(Matrix)=0
			console.error(error);
		}
	}

	predict(X){
		const response = Array.isArray(X)? X.map((x)=>this.f(x)) : this.f(X);
		return response;
	}
}

export default PolynomialRegression;
