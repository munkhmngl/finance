// Дэлгэцтэй ажиллах контроллер
var uiController = (function() {

})();
// Санхүүтэй ажиллах контроллер
var financeController = (function() {
    
})();
// Програмын холбогч контроллер
var appController = (function(uiController, financeController) {
    var ctrlAddItem = function() {
        // Оруулах өгөгдлийг дэлгэцнээё олж авна
        // Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулна
        // Олж авсан өгөгдлүүдээ тохирох хэсэгт нь гаргана
        // Төсвийг тооцоолно
        // Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана
    }
    document.querySelector('.add__btn').addEventListener('click', function(){
        ctrlAddItem();
    });

    document.addEventListener('keypress', function(e){
        if(e.key === 13 || e.which === 13){
            ctrlAddItem();
        }
    });

})(uiController, financeController);