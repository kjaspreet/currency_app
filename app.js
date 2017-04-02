const form = document.getElementById('weather')
const ls = localStorage

window.onload = function (e){
	document.getElementById('base').value = ""
	document.getElementById('target_currency').value = "CAD" 
	document.getElementById('base_currency').value = "AUD"

}

const url = 'https://api.fixer.io/latest?base='

form.addEventListener('submit', e => {
	e.preventDefault()
	const myDIV = document.getElementById('display')
	while (myDIV.hasChildNodes()) {
		myDIV.removeChild(myDIV.lastChild)
	}

	let base_curr = document.getElementById("base_currency").value
	let base_value = document.getElementById('base').value
	let target_curr = document.getElementById("target_currency").value


	if(base_curr === target_curr)
	{
		display_handling()
	}
	else
	{
		fetch(`${url}${base_curr}`)
		.then((res) => res.json())
		.then((data) => {
			let rate = `data.rates.${target_curr}`
			let amount = (base_value * eval(rate)).toFixed(2)
			if(target_curr === "CAD")
			{
				ls.setItem('rate', JSON.stringify(eval(rate)))
				display(target_curr,null,amount,base_value)
			}
			else
			{
				display(target_curr,eval(rate),amount,base_value)
			}		

		})
		.catch((e) => console.log(`${e} something is donkin' up your wiz biz`))
	}
})

function display(target,rate,amount,base)
{
	const myDIV = document.getElementById('display')
	const myRate = document.createElement('h3')
	const myAmt = document.createElement('h3')
	if(rate === null)
	{
		rate = JSON.parse(ls.getItem('rate'))
	}
	myRate.textContent = `Rate = ${rate}`
	if(amount!= 0.00)
	{
	myAmt.textContent = `Total Amount after Currency Conversion = ${amount} ( Rate * ${base} )`
	}
	else
	{
		myAmt.textContent = "Enter base currency amount to get total amount after currency conversion"
	}
	myDIV.appendChild(myRate)
	myDIV.appendChild(myAmt)
}

function display_handling()
{
	const myDIV = document.getElementById('display')
	const myMsg = document.createElement('h3')
	myMsg.textContent = "Base and Target Currency should be different"
	myDIV.appendChild(myMsg)
}