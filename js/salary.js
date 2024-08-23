const allButtons = document.querySelectorAll('.btn')
const allSalarySpans = document.querySelectorAll('.salary__span')
const spinner = document.querySelector('.spinner')
const salaryResult = document.querySelector('.salary__resultWrapper')
const allInputsCheckboxes = document.querySelectorAll('.checkbox__input')

const PENSION_CONTRIBUTION_RATE = 0.0976
const DISABILITY_CONTRIBUTION_RATE_EMPLOYEE = 0.015
const DISABILITY_CONTRIBUTION_RATE_EMPLOYER = 0.065
const SICKNESS_CONTRIBUTION_RATE = 0.0245
const HEALTH_CONTRIBUTION_RATE = 0.09
const TAX_RATE = 0.12
const TAX_FREE_AMOUNT = 300
const COSTS_OF_GENERATING_INCOME_SMALL = 250
const COSTS_OF_GENERATING_INCOME_BIG = 300
// const ACCIDENT_CONTRIBUTION_RATE = 0.0167

const addAllSalaryItemsFunction = () => {
	const allSalaryItems = document.querySelectorAll('.salary__input--amount')
	let fullSalary = 0.0
	allSalaryItems.forEach(item => {
		const convertedToFloatItem = Number(parseFloat(item.value).toFixed(2))
		fullSalary = fullSalary + convertedToFloatItem
	})

	return fullSalary
}

const showSpinnerFunction = () => {
	spinner.style.opacity = 1

	setTimeout(() => {
		spinner.style.opacity = 0
		salaryResult.style.visibility = 'visible'
		salaryResult.style.opacity = 1
		salaryResult.value = 'test'
	}, 2000) // 2000 milliseconds = 2 seconds
}

const checkAllInputsFunction = () => {
	const allInputs = document.querySelectorAll('.salary__input')
	allInputs.forEach(input => {
		input.classList.remove('input-error')
		if (input.value.trim() === '') {
			input.classList.add('input-error')
		}
	})
}

const calculateNetSalaryFunction = () => {
	salaryResult.style.visibility = 'hidden'
	salaryResult.style.opacity = 0
	checkAllInputsFunction()
	const allInputsWithError = document.querySelectorAll('.input-error')

	if (allInputsWithError.length == 0) {
		let fullSalary = Number(addAllSalaryItemsFunction())
		// console.log('Pełne wynagrodzenie: ' + fullSalary)
		let penstionContributionValue = Number(parseFloat(fullSalary * PENSION_CONTRIBUTION_RATE).toFixed(2))
		// console.log('Fundusz emerytalny: ' + penstionContributionValue)
		let disabilityContributionValue = Number(parseFloat(fullSalary * DISABILITY_CONTRIBUTION_RATE_EMPLOYEE).toFixed(2))
		// console.log('Fundusz rentowy: ' + disabilityContributionValue)
		let sicknessContributionValue = Number(parseFloat(fullSalary * SICKNESS_CONTRIBUTION_RATE).toFixed(2))
		// console.log('Fundusz chorobowy: ' + sicknessContributionValue)
		let taxableIncome =
			fullSalary - (penstionContributionValue + disabilityContributionValue + sicknessContributionValue)
		// console.log('Dochód do opodatkowania:' + taxableIncome)
		let healthContributionValue = Number(parseFloat(taxableIncome * HEALTH_CONTRIBUTION_RATE).toFixed(2))
		// console.log('Składka zdrwotona:' + healthContributionValue)

		// Check BIG or SMALL costs of generating incomes

		let taxValue
		if (allInputsCheckboxes[0].checked) {
			taxValue =
				Number(parseFloat(taxableIncome - COSTS_OF_GENERATING_INCOME_SMALL).toFixed(0) * TAX_RATE).toFixed(0) -
				TAX_FREE_AMOUNT
		} else {
			taxValue =
				Number(parseFloat(taxableIncome - COSTS_OF_GENERATING_INCOME_BIG).toFixed(0) * TAX_RATE).toFixed(0) -
				TAX_FREE_AMOUNT
		}

		// Checking if the employee is younger than 26 years old

		if (!allInputsCheckboxes[1].checked) {
			taxValue = 0
		}

		// Checking if tax is not less then 0
		if (taxValue < 0) {
			taxValue = 0
		}

		// console.log('Podatek:' + taxValue)

		let netSalary =
			fullSalary -
			penstionContributionValue -
			disabilityContributionValue -
			sicknessContributionValue -
			healthContributionValue -
			taxValue

		// Checking if there is any salary item to calculate

		// const anySalaryInputsToCalculate = document.querySelectorAll('.salary__input')

		// console.log(anySalaryInputsToCalculate)

		// if (anySalaryInputsToCalculate.length == 0) {
		// 	salaryResult.textContent = 'Podaj przynajmniej jeden składnik wynagrodzenia'
		// }

		// console.log(netSalary)

		const allSalaryInputs = document.querySelectorAll('.salary__input')

		if (allSalaryInputs.length == 0) {
			allSalarySpans[0].textContent = 'Podaj przynajmniej jeden składnik wynagrodzenia'
			allSalarySpans[1].textContent = ''
		} else {
			allSalarySpans[0].textContent = 'Twoje wynagrodzenie netto to'
			allSalarySpans[1].textContent = netSalary
		}

		showSpinnerFunction()
	}
}

const clearAllInputs = () => {
	const allInputs = document.querySelectorAll('.salary__input')
	allInputs.forEach(input => {
		input.classList.remove('input-error')
		input.value = ''
	})

	allSalarySpans[0].textContent = ''
	allSalarySpans[1].textContent = ''
}

allButtons[0].addEventListener('click', calculateNetSalaryFunction)
allButtons[1].addEventListener('click', clearAllInputs)
