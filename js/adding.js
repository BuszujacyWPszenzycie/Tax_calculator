const salaryLine = document.querySelector('.salary__allItems')
const salaryIcons = document.querySelectorAll('.salary__icon')

const addSalaryItemFunction = () => {
	const itemWrapper = document.createElement('div')
	itemWrapper.className = 'salary__itemWrapper'

	// Create the input wrapper
	const inputWrapper = document.createElement('div')
	inputWrapper.className = 'salary__inputWrapper'

	// Create the text input
	const textInput = document.createElement('input')
	textInput.type = 'text'
	textInput.className = 'salary__input'

	// Create the number input
	const numberInput = document.createElement('input')
	numberInput.type = 'number'
	numberInput.className = 'salary__input salary__input--amount'
	numberInput.step = '0.01'
	numberInput.min = '0'

	// Append inputs to input wrapper
	inputWrapper.appendChild(textInput)
	inputWrapper.appendChild(numberInput)

	// Create the delete icon
	const deleteIcon = document.createElement('i')
	deleteIcon.className = 'ph ph-trash-simple salary__icon salary__icon--delete'
	deleteIcon.onclick = function () {
		itemWrapper.remove() // Remove the item on click
	}

	// Append input wrapper and delete icon to item wrapper
	itemWrapper.appendChild(inputWrapper)
	itemWrapper.appendChild(deleteIcon)

	salaryLine.appendChild(itemWrapper)
}

salaryIcons[0].addEventListener('click', addSalaryItemFunction)
