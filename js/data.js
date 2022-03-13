const quizData = [{
    number: 1,
    title: "<strong>Часто ли у вас происходят отключения электричества?</strong>",
    answer_alias: "electricity_fail",
    answers: [{
            answer_title: "Регулярно (1 раз в месяц и чаще)",
            type: "radio"
        },
        {
            answer_title: "Иногда (1 раз в пол года)",
            type: "radio"
        },
        {
            answer_title: "Редко (1 раз в год и реже)",
            type: "radio"
        },
        {
            answer_title: "",
            type: "text"
        }
    ]
},
{
    number: 2,
    title: "<strong>Ваше водоснабжение</strong>",
    answer_alias: "water",
    answers: [{
            answer_title: "Скважина до 25 метров глубиной",
            type: "radio"
        },
        {
            answer_title: "Скважина более 25 метров глубиной",
            type: "radio"
        },
        {
            answer_title: "Центральное",
            type: "radio"
        },
        {
            answer_title: "",
            type: "text"
        }
    ]
},
{
    number: 3,
    title: "<strong>Хочу, чтобы автономной энергии хватало на полноценное пользование без экономии на...</strong>",
    answer_alias: "using_time",
    answers: [{
            answer_title: "4 часа",
            type: "radio"
        },
        {
            answer_title: "8 часов",
            type: "radio"
        },
        {
            answer_title: "12 часов",
            type: "radio"
        },
        {
            answer_title: "Более 12 часов",
            type: "radio"
        },
        {
            answer_title: "",
            type: "text"
        }
    ]
},
{
    number: 4,
    title: "<strong>Какое отопление у вас в доме?</strong>",
    answer_alias: "heating",
    answers: [{
            answer_title: "Газовое",
            type: "radio"
        },
        {
            answer_title: "Электрическое",
            type: "radio"
        },
        {
            answer_title: "Твёрдотопливное",
            type: "radio"
        },
        {
            answer_title: "",
            type: "text"
        }
    ]
},
{
    number: 5,
    title: "<strong>Имеются ли системы видеонаблюдения, сигнализация?</strong>",
    answer_alias: "security",
    answers: [{
            answer_title: "Есть",
            type: "radio"
        },
        {
            answer_title: "Нет",
            type: "radio"
        },
        {
            answer_title: "",
            type: "text"
        }
    ]
},
{
    number: 6,
    title: "<strong>Если есть какие-либо нюансы, свойственные вашей электросети, которые могут повлиять на расчёт мощности оборудования, напишите:</strong>",
    answer_alias: "special_comment",
    answers: [{
            answer_title: "Нет",
            type: "radio"
        },
        {
            answer_title: "",
            type: "text"
        }
    ]
},
{
    number: 7,
    title: "<strong>Примерная стоимость всей системы с ИБП под Ваши потребности: от <i>19 900р</i></strong>",
    answer_alias: "cost",
    answers: [{
             answer_title: "Хочу точный расчет со сметой",
             type: "radio"
    },
    ]
},
{
    number: 8,
    title: "<strong>Эксперт по ИБП уточнит детали и подготовит для Вас точный расчёт (БЕСПЛАТНО)</strong>",
    answer_alias: "client_info",
    answers: [{
             answer_title: "Ваш номер",
             type: "text"
    },
    {
             answer_title: "Имя",
             type: "text"
    }
    ]
}
];
