;(function($, window, document, undefined){//传入undefined，为了让document之后的不在传入其他的变量
    'use strict';//用严格模式  js本身为弱语言，严格模式可以提高效率
    //1.定义插件名字和默认值的变量
    var pluginName = 'stepByStep',
        defaults ={};//默认的值
    //2.定义构造函数
    function Plugin(element, options){
        //将以下东西绑定到Plugin的构造函数中去
        this.element = element;//传入DOM的节点，绑定DOM节点
        this.options = options;//选项，传入的方法和属性
        this._defaults = defaults;//传入默认值
        this.name = pluginName;//传入插件的名字
        this.init();//调用自己的方法
    };
    //3.绑定方法
    Plugin.prototype = {
        init : function(){
            alert(11)
        }
    };
    //4.绑定到fn上，可以用jQuery的方式调用他
    $.fn[pluginName] = function(options){
        return this.each(function(){
            if(!$.data(this, 'plugin_' + pluginName)){
                // debugger;
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        })
    }

})(jQuery, window, document)