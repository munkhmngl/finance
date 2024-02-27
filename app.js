// Дэлгэцтэй ажиллах контроллер
let uiController = (function(){
   let DOMstrings = {
      inputType: '.add__type',
      inputDesc: '.add__description',
      inputValue: '.add__value',
      addBtn: '.add__btn',
      dateYear: '.budget__title--year',
      dateMonth: '.budget__title--month'
   };
   
   let desktopTime = function(){
      let nowDate = new Date();
      uiController.getInput().year.textContent = nowDate.getFullYear();
      uiController.getInput().month.textContent = nowDate.getMonth() + 1;
   };

   return {
      getInput: function(){
         return {
            type: document.querySelector(DOMstrings.inputType).value,
            desc: document.querySelector(DOMstrings.inputDesc).value,
            value: document.querySelector(DOMstrings.inputValue).value,
            year: document.querySelector(DOMstrings.dateYear),
            month: document.querySelector(DOMstrings.dateMonth)
         }
      },
      getDOMstring: function(){
         return DOMstrings;
      },
      getTime: function(){
         return desktopTime();
      }
   }
})();
// Санхүүтэй ажиллах контроллер
let fiController = (function(){
   let Income = function(id, desc, value){
      this.id = id;
      this.desc = desc;
      this.value = value;
   };

   let Expense = function(id, desc, value){
      this.id = id;
      this.desc = desc;
      this.value = value;
   };

   let data = {
      allItems: {
         inc: [],
         exp: []
      },
      totals: {
         inc: 0,
         exp: 0
      }
   }
})();
// Програмын холбогч контроллер
let appController = (function(uiController, fiController){
   let ctrlAddItem = function(){
      // 1. Оруулах өгөгдлийг дэлгэцээс олж авна
      console.log(uiController.getInput());
      // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулна тэнд хадгална
      // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана
      // 4. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
   }

   let setupEventListeners = function(){
      
      let DOM = uiController.getDOMstring();

      document.querySelector(DOM.addBtn).addEventListener('click', () =>{
         ctrlAddItem();
      });
   
      document.addEventListener('keypress', (el) => {
         if(el.keyCode === 13 || el.which === 13){
            ctrlAddItem();
         }
      });
   };

   return {
      init: function(){
         console.log('Application started...');
         setupEventListeners();
         uiController.getTime();
      }
   }
})(uiController, fiController);

appController.init();