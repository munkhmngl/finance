// Дэлгэцтэй ажиллах контроллер
let uiController = (function(){

})();
// Санхүүтэй ажиллах контроллер
let fiController = (function(){

})();
// Програмын холбогч контроллер
let appController = (function(uiController, fiController){
   let ctrlAddItem = function(){
      // 1. Оруулах өгөгдлийг дэлгэцээс олж авна
      // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулна тэнд хадгална
      // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана
      // 4. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
   }
   
   document.querySelector('.add__btn').addEventListener('click', function(){
      ctrlAddItem();
   });

   document.addEventListener('keypress', function(event){
      if(event.keyCode === 13 || event.which === 13){
         ctrlAddItem();
      }
   });
})(uiController, fiController);