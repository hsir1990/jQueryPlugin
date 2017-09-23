;(function($, window, document, undefined){//传入undefined，为了让document之后的不在传入其他的变量
    'use strict';//用严格模式  js本身为弱语言，严格模式可以提高效率
    //1.定义插件名字和默认值的变量
    var pluginName = 'stepByStep',
        defaults ={
            fnStepPrev : function(){
                return{
                    active : true 
                }
            },
            fnStepNext : function(){
                return{
                    active : true
                }
            }
        };//默认的值
    //2.定义构造函数
    function Plugin(element, options){
        //将以下东西绑定到Plugin的构造函数中去
        this.element = element;//传入DOM的节点，绑定DOM节点
        this.options = $.extend({}, defaults, options);//选项，传入的方法和属性//先传一个空对象，然后传入默认值，在传入自己想传入得
        this._defaults = defaults;//传入默认值
        this.name = pluginName;//传入插件的名字
        this.init();//调用自己的方法
    };
    //3.绑定方法
    Plugin.prototype = {
        init : function(){
            console.log(this.element)//打印DOM
            console.log($(this.element))//打印获取到的DOM
            this.$ele = $(this.element).removeClass('hide').addClass('show');
            this.$stepContents = this.$ele.find('li')
            this.$btnNext = this.$ele.find('.btn-step-next');
            this.$btnSubmit = this.$ele.find('.btn-step-submit');
            
            this.nextCtrl()//初始化时调用nextCtrl来创建
        },

        nextCtrl: function(){
            var _self = this;//这个方法同时可以节省资源
            this.$btnNext.on('click', function(){
                console.log(this);//这个this是点击（click）的这个对象
                console.log(_self);//这个是Plugin对象
                var $currStep = _self.$stepContents.filter('.active'),//筛选具有.active的li
                _index = $currStep.index(),
                _data = {
                    example : '这是跳到下一步前需要处理的数据'
                },
                _interface;
                //如果存在下一步回调函数就调用
                if(_self.options.fnStepNext){
                    //接受回调函数返回的数据
                    _interface = _self.options.fnStepNext(_index, _data);
                    
                }
                //如果回调返回active属性值为为true  将按钮设置成可以点击
                if(_interface.active){
                    $(this).removeClass('disable');
                };

                if($(this).hasClass('disabled')){
                    return;
                }else{
                    if(_index + 1 <= _self.maxStep){
                        _self.$stepCtrls.eq(_index + 1).addClass('active').siblings()
                    }
                }

            })
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