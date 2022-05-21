import resolve from '@rollup/plugin-node-resolve'; // locate and bundle dependencies in node_modules 
import commonjs from '@rollup/plugin-commonjs';

export default {
	input: 'src/main.js',
	output: [
		{
			format: 'umd',
			name: 'MYAPP',
			file: 'assets/js/calculator.js'
		}
	],
	plugins: [ resolve(), commonjs({
		include: 'node_modules/**'
	  }) ]
};
