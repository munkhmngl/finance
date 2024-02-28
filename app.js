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

   return {
      getInput: function(){
         return {
            type: document.querySelector(DOMstrings.inputType).value,
            desc: document.querySelector(DOMstrings.inputDesc).value,
            value: document.querySelector(DOMstrings.inputValue).value
         }
      },
      getDOMstring: function(){
         return DOMstrings;
      },
      getDesktopTime: function(){
         let nowDate = new Date();
         document.querySelector(DOMstrings.dateYear).textContent = nowDate.getFullYear();
         document.querySelector(DOMstrings.dateMonth).textContent = nowDate.getMonth() + 1;

      },
      addListItem: function(item, type){
         // Орлого зарлагын элементийг агуулсан html-ийг бэлгэнэ
         let html, list;
         if(type === 'inc'){
            list = '.income__list';
            html = '<div class="item clearfix" id="income-$$ID$$"><div class="item__description">$$DESC$$</div><div class="right clearfix"><div class="item__value">+ $$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
         } else {
            list = '.expenses__list';
            html = '<div class="item clearfix" id="expense-$$ID$$"><div class="item__description">$$DESC$$</div><div class="right clearfix"><div class="item__value">- $$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
         }
         // Тэр html дотроо орлого зарлагын утгуудыг REPLACE ашиглаж өөрчилж өгнө
         html = html.replace('$$ID$$', item.id);
         html = html.replace('$$DESC$$', item.desc);
         html = html.replace('$$VALUE$$', item.value);
         // Бэлтгэсэн html ээ dom руу хийж өгнө
         document.querySelector(list).insertAdjacentHTML('beforeend', html);
      }
   };
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
      items: {
         inc: [],
         exp: []
      },
      totals: {
         inc: 0,
         exp: 0
      }
   };
   return {
      addItem: function(type, desc, val){
         let item, id;
         if(data.items[type].length === 0) {
            id = 1;
         } else {
            id = data.items[type][data.items[type].length - 1].id + 1;
         }

         if(type === 'inc') {
            item = new Income(id, desc, val)
         } else {
            item = new Expense(id, desc, val)
         }

         data.items[type].push(item);
         return item;
      },
      seeData: function(){
         return data;
      }
   }
})();
// Програмын холбогч контроллер
let appController = (function(uiController, fiController){
   let ctrlAddItem = function(){
      // 1. Оруулах өгөгдлийг дэлгэцээс олж авна
      let input = uiController.getInput();
      // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулна тэнд хадгална
      let item = fiController.addItem(input.type, input.desc, input.value);
      // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана
      uiController.addListItem(item, input.type);
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
         uiController.getDesktopTime();
         setupEventListeners();
      }
   }
})(uiController, fiController);

appController.init();