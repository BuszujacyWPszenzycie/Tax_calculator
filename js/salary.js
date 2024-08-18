const allButtons = document.querySelectorAll('.btn')
const salarySpan = document.querySelector('.salary__span')
const spinner = document.querySelector('.spinner')
const salaryResult = document.querySelector('.salary__resultWrapper')

const PENSION_CONTRIBUTION_RATE = 0.0976
const DISABILITY_CONTRIBUTION_RATE_EMPLOYEE = 0.015
const DISABILITY_CONTRIBUTION_RATE_EMPLOYER = 0.065
const SICKNESS_CONTRIBUTION_RATE = 0.0245
const HEALTH_CONTRIBUTION_RATE = 0.09
const TAX_RATE = 0.12
const TAX_FREE_AMOUNT = 300
const COSTS_OF_GENERATING_INCOME = 250
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
		salaryResult.style.opacity = 1
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
	// Problem pojawia sie przy zmianie jednego ze składników wynagrodzenia i ponownego policzenia. Wtedy opacity nie znika wystarczająco szybko i na chwilę pojawia się wynik
	salaryResult.style.opacity = 0
	checkAllInputsFunction()

	const allInputsWithError = document.querySelectorAll('.input-error')
	if (allInputsWithError.length == 0) {
		let fullSalary = Number(addAllSalaryItemsFunction())
		let penstionContributionValue = Number(parseFloat(fullSalary * PENSION_CONTRIBUTION_RATE).toFixed(2))
		let disabilityContributionValue = Number(parseFloat(fullSalary * DISABILITY_CONTRIBUTION_RATE_EMPLOYEE).toFixed(2))
		let sicknessContributionValue = Number(parseFloat(fullSalary * SICKNESS_CONTRIBUTION_RATE).toFixed(2))
		let taxableIncome =
			fullSalary - (penstionContributionValue + disabilityContributionValue + sicknessContributionValue)
		let healthContributionValue = Number(parseFloat(taxableIncome * HEALTH_CONTRIBUTION_RATE).toFixed(2))
		let taxValue =
			Number(parseFloat(taxableIncome - COSTS_OF_GENERATING_INCOME).toFixed(0) * TAX_RATE).toFixed(0) - TAX_FREE_AMOUNT

		let netSalary =
			fullSalary -
			penstionContributionValue -
			disabilityContributionValue -
			sicknessContributionValue -
			healthContributionValue -
			taxValue

		salarySpan.textContent = parseFloat(netSalary).toFixed(2)
		showSpinnerFunction()
	}
}

const clearAllInputs = () => {
	const allInputs = document.querySelectorAll('.salary__input')
	allInputs.forEach(input => {
		input.classList.remove('input-error')
		input.value = ''
	})
}

allButtons[0].addEventListener('click', calculateNetSalaryFunction)
allButtons[1].addEventListener('click', clearAllInputs)
