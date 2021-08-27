document.addEventListener("DOMContentLoaded", () => {

	/*<-------------------------GLOBAL VARIABLES--------------->*/

	let now = new Date();
	let _date = now.getDate();
	let _month = now.getMonth();
	let _year = now.getFullYear();

	const DATES_IN_MONTHS = [31, getFebruaryDays(_year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	
	/*<-------------------DOM ELEMENTS------------------------->*/

	const dateWrapperInner = document.getElementsByClassName("Calendar__DateWrapper__Inner")[0];


	/*<------------------EVENT DELEGATION---------------------->*/

	document.getElementsByClassName("Calendar__Month")[0].addEventListener("click", () => {
		dateWrapperInner.classList.toggle("Month");
	});

	document.getElementById("YearControlBtn--Prev").addEventListener("click", () => {
		nextYear(-1);
	});
	document.getElementById("YearControlBtn--Next").addEventListener("click", () => {
		nextYear();
	});

	generateCalendar();

	/*<-------------------FUNCTION DECLARATIONS------------------>*/

	/**
	 *
	 * generates calander based on year, month and date
	 *
	 */
	function generateCalendar(year, month) {
		let date;
		if (year && month) {
			date = new Date(year, month, 1);
		} else {
			date = new Date();
		}

		document.getElementById("Calendar__Month").innerHTML = MONTH_NAMES[date.getMonth()];
		document.getElementById("Calendar__Year__Value").innerHTML = date.getFullYear();
		document.getElementById("date").innerHTML = date.getDate();
		renderDays(date.getFullYear(), date.getMonth());
		renderMonths(MONTH_NAMES);
	}
	function nextYear(step = 1) {
		_year += step;
		if (_year === new Date().getFullYear()) {
			generateCalendar();
			return;
		}
		generateCalendar(_year, _month);
		dateWrapperInner.classList.remove("Month");
	}
	/**
	 *
	 * checks if argument is a leap year or not
	 *
	 * @param {Number} year
	 * @returns {Boolean} 
	 */
	function isLeapYear(year) {
		if (year === undefined) return false;

		return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
	}
	function setYear(newYear) {
		_year = newYear;
	}
	function setMonth(newMonth) {
		_month = newMonth;
	}
	function setDate(newDate) {
		_date = newDate;
	}
	/**
	 *
	 * returns number of days in February in a given year
	 * @param {Number} year
	 * @returns {Number} - number of days in february
	 */
	function getFebruaryDays(year) {
		return isLeapYear(year) ? 29 : 28;
	}

	function renderMonths(months) {
		let monthsWrapper = document.getElementsByClassName("Calendar__Months")[0];
		monthsWrapper.innerHTML = "";

		for (let i = 0; i < months.length; i++) {
			let monthTile = document.createElement("div");
			monthTile.innerHTML = months[i];
			monthTile.classList.add("Calendar__Months__Month");
			monthTile.addEventListener("click", evt => {
				let monthIndex = MONTH_NAMES.findIndex(monthText => monthText === evt.target.innerText);
				setMonth(monthIndex);
				generateCalendar(year, month);
				dateWrapperInner.classList.remove("Month");
			});
			monthsWrapper.appendChild(monthTile);
		}
	}

	function renderDays(year, month) {
		let firstDay = new Date(year, month).getDay();
		let daysInMonth = document.getElementById("Calendar__Dates");
		daysInMonth.innerHTML = "";

		for (let i = 0; i <= DATES_IN_MONTHS[month] - 1 + firstDay; i++) {
			let day = document.createElement("div");
			if (i >= firstDay) {
				day.innerHTML = i - firstDay + 1;
				day.classList.add("Calendar__Dates__Date");
			}
			day.onclick =  evt => {
				setDate(parseInt(evt.target.innerText));
				generateCalendar(year, month);
			};
			daysInMonth.appendChild(day);
		}
	}
	/*<------------------------------END OF FUNCTION DECLARATIONS------------------------------>*/
});