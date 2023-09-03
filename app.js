// Дэлгэцтэй ажиллах контроллер
var uiController = (function() {
    let DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        addBtn: '.add__btn',
        incomeList: '.income__list',
        expenseList: '.expenses__list'
    }

    return {
        getMonth: function(){
            let month = new Date().getMonth();
            document.querySelector('.budget__title--month').insertAdjacentElement('beforeend', month);
            console.log(month);
        },
        getInput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseInt(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        getDOMstrings: function(){
            return DOMstrings;
        },
        clearFields: function(){
            let fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            // Convert List to Array
            var fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(el => {
                el.value = '';
            });
            fieldsArr[0].focus();
        },
        addListItem: function(item, type){
            // Орлого зарлагыи элементийг агуулсан html-ийг бэлтгэнэ
            let html, list;
            if(type === 'inc'){
                list = DOMstrings.incomeList;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESXRIPTIN$$</div><div class="right clearfix"><div class="item__value">+ $$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                list = DOMstrings.expenseList;
                html ='<div class="item clearfix" id="expense-%id%"><div class="item__description">$$DESXRIPTIN$$</div><div class="right clearfix"><div class="item__value">- $$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // Тэр HTML дотроо орлого зарлагын утгуудыг REPLACE ашиглаж өөрчилж өгнө
            html = html.replace('%id%', item.id);
            html = html.replace('$$DESXRIPTIN$$', item.description);
            html = html.replace('$$VALUE$$', item.value);
            // Бэлтгэсэн HTML ээ DOM руу хийж өгнө
            document.querySelector(list).insertAdjacentHTML('beforeend', html);
        }
    };
})();
// Санхүүтэй ажиллах контроллер
var financeController = (function() {
    let Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    let Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    let calculateTotal = function(type){
        let sum = 0;
        data.items[type].forEach(el => {
            sum += el.value;
        });
        data.totals[type] = sum;
    };
    let data = {
        items: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
        tusuv : 0,
        huvi: 0
    };
    return {
        tusuvTuluv: function(){
            calculateTotal('inc');
            calculateTotal('exp');
            data.tusuv = data.totals.inc - data.totals.exp;
            data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
        },
        tusuvEnd: function(){
            return {
                tusuv: data.tusuv,
                huvi: data.huvi,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp
            }
        },
        addItem: function(type, desc, val){
            let item, id;
            data.items[type].length === 0 ? id = 1 : id = data.items[type][data.items[type].length - 1].id + 1;
            type === 'inc' ? item = new Income(id, desc, val) : item = new Expense(id, desc, val);
            data.items[type].push(item);
            return item;
        },
        seeData: function(){
            return data;
        }
    }
})();
// Програмын холбогч контроллер
var appController = (function(uiController, financeController) {
    let ctrlAddItem = function() {
        // Оруулах өгөгдлийг дэлгэцнээё олж авна
        let input = uiController.getInput();
        if(input.description !== '' && input.value !== ''){
            // Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулна
            let item = financeController.addItem(input.type, input.description, input.value);
            // Олж авсан өгөгдлүүдээ тохирох хэсэгт нь гаргана
            uiController.addListItem(item, input.type);
            uiController.clearFields();
            // Төсвийг тооцоолно
            financeController.tusuvTuluv();
            // Эцсийн үлдэгдэл
            let oldData = financeController.tusuvEnd();
            //тооцоог дэлгэцэнд гаргана
            console.log(oldData);
        }
    };

    let setupEventListeners = function(){
        let DOM = uiController.getDOMstrings();
        document.querySelector(DOM.addBtn).addEventListener('click', function(){
            ctrlAddItem();
        });
        document.addEventListener('keypress', function(e){
            if(e.key === 13 || e.which === 13){
                ctrlAddItem();
            }
        });
    };

    return {
        init: function() {
            console.log('Программ эхлэх...');
            setupEventListeners();
        }
    }

})(uiController, financeController);

appController.init();