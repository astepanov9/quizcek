/*
1. вывести квиз на страницу +
2. обработчики кликов на кнопки +
3. переход к следующему вопросу +
4. валидация (нельзя не заполнить какой-то вопрос) +
5. добавление к отправке +
5.1. сбор данных +
6. отправка данных +
*/
 
const quizTemplate = (data = [], dataLength, options) => {
	const {number, title} = data;
	const {nextBtnText} = options;
	const answers = data.answers.map(item => {
		return `
		
			<label class="quiz-question__label">
				<input type="${item.type}" data-valid="false" class="quiz-question__answer" name="${data.answer_alias}" ${item.type == 'text' ? 'placeholder="Ваш вариант"' : ''} value="${item.type !== 'text' ? item.answer_title : ''}">
				<span>${item.answer_title}</span>
			</label>
		`;
	});
	
	return `
	
		<div class="quiz__content">
			<div class="quiz__questions">${number} из ${dataLength}</div>
			<div class="quiz-question">
				<div class="quiz-question__body">
				    <h3 class="quiz-question__title">${title}</h3>
				    <div class="quiz-question__answers">
					     ${answers.join('')}
				    </div>
				</div>
                <div class="quiz-question__photo"></div>
			</div>
			<button type="button" class="quiz-question__btn" data-next-btn>${nextBtnText}</button>
		</div>
	
	`;
};


// const quiz = document.querySelector('.quiz');
// quiz.innerHTML = quizTemplate(quizData[0], quizData.length);

class Quiz {
	constructor(selector, data, options) {
		this.$el = document.querySelector(selector);
		this.options = options;
		this.data = data;
		this.counter = 0;
		this.dataLength = this.data.length;
		this.resultArray = [];
		this.tmp = {};
		this.init();
		this.events();
	}

	init() {
		console.log('init!');
		this.$el.innerHTML = quizTemplate(quizData[this.counter], this.dataLength, this.options);
	}

	events() {
		console.log("events");
		this.$el.addEventListener('click', (e) => {
			if (e.target == document.querySelector('[data-next-btn]')) {
				this.addToSend();
				this.nextQuestion();
			}

			if (e.target == document.querySelector('[data-send]')) {
				this.send();
			}
		});

		this.$el.addEventListener('change', (e) => {
			if (e.target.tagName == 'INPUT') {
				if (e.target.type !== 'checkbox' && e.target.type !== 'radio') {
					let elements = this.$el.querySelectorAll('input');

					elements.forEach(el => el.checked = false);
				}

				this.tmp = this.serialize(this.$el);
			}
		});
	}

	nextQuestion() {
		if (this.valid()) {
			console.log('next question!');
			if (this.counter + 1 < this.dataLength) {
				this.counter++;
				this.$el.innerHTML = quizTemplate(quizData[this.counter], this.dataLength, this.options);

				if (this.counter + 1 == this.dataLength) {
					this.$el.insertAdjacentHTML('beforeend', `<button type="button" class="quiz-question__btn" data-send>${this.options.sendBtnText}</button>`);
					this.$el.querySelector('[data-next-btn]').remove();
				}
			}
		}
	}

	valid() {
		let isValid = false;
		let elements = this.$el.querySelectorAll('input');
		elements.forEach(el => {
			switch(el.type) {
				case 'text':
					(el.value) ? isValid = true : el.classList.add('error');
				case 'checkbox':
					(el.checked) ? isValid = true : el.classList.add('error');
				case 'radio':
					(el.checked) ? isValid = true : el.classList.add('error');
			}
		});

		return isValid;
	}

	addToSend() {
		this.resultArray = Object.assign(this.resultArray, this.tmp);
//		this.resultArray.push(this.tmp);
	}

	send() {
		if(this.valid()){
			// сохраняем последний ответ
			this.addToSend();
			// создание нового лида
			this.createBitrixLeadRequest(this.resultArray);
		}
	}

/**
 * Отправка запроса о заявке в Битрикс
 */
createBitrixLeadRequest = (questionnaire) => {
  //
  let comment = "Онлайн калькулятор." + '<br>';
  comment += "Отключения(частота): " +  questionnaire['electricity_fail'][0] + '<br>';
  comment += "Водоснабжение: " + questionnaire['water'][0]  + '<br>';
  comment += "Время автономного испольпользования: " + questionnaire['using_time'][0]  + '<br>';
  comment += "Отопление: " + questionnaire['heating'][0]  + '<br>';
  comment += "Система безопасности: " + questionnaire['security'][0]  + '<br>';
  comment += "Пожелания: " + questionnaire['special_comment'][0]  + '<br>';
  comment += "Оценка стоимости: " + questionnaire['cost'][0]  + '<br>';

  const bitrixParams = {
    name: questionnaire['client_info'][1],
    phone: questionnaire['client_info'][0],
    comment: comment,
    // метки источника трафика
    UTM_CEK_ADV: cekUTMModule.getBitrixUTMs(),
  };
  
  const formData  = new FormData();

  //отправка Лида в Битрикс
  const response = $.post('bitrixLead.php', 
	bitrixParams,
	() => {
	;
    });
};
	serialize(form) {
		let field, s = {}, subS = [];
		let valueString = '';
		if (typeof form == 'object' && form.nodeName == "FORM") {
			let len = form.elements.length;
			for (let i = 0; i < len; i++) {
				field = form.elements[i];
				
				if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
					if (field.type == 'select-multiple') {
						for (j = form.elements[i].options.length - 1; j >= 0; j--) {
							if (field.options[j].selected)
								s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
						}
					} else if ((field.type != 'checkbox' && field.type != 'radio' && field.value) || field.checked) {
						valueString += field.value + ',';
						
						subS[subS.length] = field.value;
						s[field.name] = subS;
						
						
					}
				}
			}
		}
		return s
	}
}

window.quiz = new Quiz('.quiz', quizData, {
	nextBtnText: "Вперёд",
	sendBtnText: "Хочу точный расчет со сметой"
});