const input_element = document.querySelector('.input');
const output_result_element = document.querySelector('.result .value');
const output_operation_element = document.querySelector('.operation .value');

function createButtons() {
	const BUTTONS_PER_ROW = 4;
	let added_buttons = 0;

	calculator_buttons.forEach((button) => {
		if (added_buttons % BUTTONS_PER_ROW === 0) {
			input_element.innerHTML += `<div class="row"></div>`;
		}

		const row = document.querySelector('.row:last-child');
		row.innerHTML += `<button id="${button.name}">${button.symbol}</button>`;
		added_buttons++;
	});
}

createButtons();

input_element.addEventListener('click', (event) => {
	const target_btn = event.target;

	calculator_buttons.forEach((button) => {
		if (button.name === target_btn.id) calculate(button);
	});
});

let data = {
	operation: [],
	result: [],
};

function calculate(button) {
	switch (button.type) {
		case 'operator':
			data.operation.push(button.symbol);
			data.result.push(button.formula);
			break;
		case 'number':
			data.operation.push(button.symbol);
			data.result.push(button.formula);
			break;
		case 'key':
			if (button.name === 'clear') {
				data.operation = [];
				data.result = [];
				updateOutputResult(0);
			} else if (button.name === 'delete') {
				data.operation.pop();
				data.result.pop();
			}
			break;
		case 'calculate':
			let join_result = data.result.join('');
			let result;

			try {
				result = eval(join_result);
			} catch (error) {
				if (error instanceof SyntaxError) {
					result = 'SyntaxError';
					updateOutputResult(result);
					return;
				}
			}

			result = formatResult(result);
			updateOutputResult(result);

			data.operation = [];
			data.result = [];

			data.operation.push(result);
			data.result.push(result);
			return;
	}
	updateOutputOperation(data.operation.join(''));
}

function updateOutputOperation(operation) {
	output_operation_element.innerHTML = operation;
}

function updateOutputResult(result) {
	output_result_element.innerHTML = result;
}

function formatResult(result) {
	const MAX_OUTPUT_NUMBER_LENGTH = 10;
	const OUTPUT_PRECISION = 5;

	if (digitNumber(result) > MAX_OUTPUT_NUMBER_LENGTH) {
		if (isFloat(result)) {
			const result_int = parseInt(result);
			const result_int_length = digitNumber(result_int);

			if (result_int_length > MAX_OUTPUT_NUMBER_LENGTH) {
				return result.toPrecision(OUTPUT_PRECISION);
			} else {
				const num_of_digits_after_point = MAX_OUTPUT_NUMBER_LENGTH - result_int_length;
				return result.toFixed(num_of_digits_after_point);
			}
		} else {
			return result.toPrecision(OUTPUT_PRECISION);
		}
	} else {
		return result;
	}
}

function digitNumber(number) {
	return number.toString().length;
}

function isFloat(number) {
	return number % 1 !== 0;
}
