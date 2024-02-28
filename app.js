// Дэлгэцтэй ажиллах контроллер
let uiController = (function(){
   let DOMstrings = {
      inputType: '.add__type',
      inputDesc: '.add__description',
      inputValue: '.add__value',
      addBtn: '.add__btn',
      dateYear: '.budget__title--year',
      dateMonth: '.budget__title--month',
      incomeList: '.income__list',
      expenseList: '.expenses__list',
      uldegdel: '.budget__value',
      niitOrlogo: '.budget__income--value',
      niitZarlaga: '.budget__expenses--value',
      huvi: '.budget__expenses--percentage'
   };

   return {
      getInput: function(){
         return {
            type: document.querySelector(DOMstrings.inputType).value,
            desc: document.querySelector(DOMstrings.inputDesc).value,
            value: parseInt(document.querySelector(DOMstrings.inputValue).value)
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
      clearFilds: function(){
         let fields = document.querySelectorAll(DOMstrings.inputDesc + ', ' + DOMstrings.inputValue);
         let fieldsArr = Array.prototype.slice.call(fields);
         fieldsArr.forEach(el => {
            el.value = '';
         });
         // курсор эхлэх цэгт аваачих тохиргоо
         fieldsArr[0].focus();
      },
      desktopValue: function(total){
         document.querySelector(DOMstrings.uldegdel).textContent = '+' + total.tusuv;
         document.querySelector(DOMstrings.niitOrlogo).textContent = '+' + total.totalInc;
         document.querySelector(DOMstrings.niitZarlaga).textContent = '-' + total.totalExp;
         document.querySelector(DOMstrings.huvi).style.display = 'block';
         document.querySelector(DOMstrings.huvi).textContent = total.huvi + '%';
      },
      clearDesk: function(){
         document.querySelector(DOMstrings.uldegdel).textContent = '';
         document.querySelector(DOMstrings.niitOrlogo).textContent = '';
         document.querySelector(DOMstrings.niitZarlaga).textContent = '';
         document.querySelector(DOMstrings.huvi).style.display = 'none';
      },
      addListItem: function(item, type){
         // Орлого зарлагын элементийг агуулсан html-ийг бэлгэнэ
         let html, list;
         if(type === 'inc'){
            list = DOMstrings.incomeList;
            html = '<div class="item clearfix" id="income-$$ID$$"><div class="item__description">$$DESC$$</div><div class="right clearfix"><div class="item__value">+ $$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
         } else {
            list = DOMstrings.expenseList;
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
      },
      tusuv: 0,
      protsent: 0
   };

   let calcTotals = function(type){
      let sum = 0;
      data.items[type].forEach((el) => {
         sum += el.value;
      });
      data.totals[type] = sum;
   };

   return {
      calculator: function(type){
         calcTotals(type);
         data.tusuv = data.totals.inc - data.totals.exp;
         data.protsent = Math.round((data.totals.exp / data.totals.inc) * 100);
      },
      sumTotals: function(){
         return {
            tusuv: data.tusuv,
            huvi: data.protsent,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp
         }
      },
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
         if(input.desc !== '' && input.value !== ''){
            // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулна тэнд хадгална
            let item = fiController.addItem(input.type, input.desc, input.value);
            // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана
            uiController.addListItem(item, input.type);
            uiController.clearFilds();
            // 4. Төсөвийг тооцоолно
            fiController.calculator(input.type);
            // 5. Эцсийн үлдэгдэл 
            let total = fiController.sumTotals();
            // 6. Тооцоог дэлгэцэнд гаргана.
            uiController.desktopValue(total);
         }
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
         uiController.clearDesk();
         setupEventListeners();
      }
   }
})(uiController, fiController);

appController.init();