// Дэлгэцтэй ажиллах контроллер
var uiController = (function() {
    let DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        addBtn: '.add__btn'
    }

    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        getDOMstrings: function(){
            return DOMstrings;
        }
    };
})();
// Санхүүтэй ажиллах контроллер
var financeController = (function() {
    let Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    let Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    let data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        }
    };
    
})();
// Програмын холбогч контроллер
var appController = (function(uiController, financeController) {
    let ctrlAddItem = function() {
        // Оруулах өгөгдлийг дэлгэцнээё олж авна
        console.log(uiController.getInput());
        // Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулна
        // Олж авсан өгөгдлүүдээ тохирох хэсэгт нь гаргана
        // Төсвийг тооцоолно
        // Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана
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