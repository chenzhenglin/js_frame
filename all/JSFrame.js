/**
 * 立即函数 + 闭包封装方式
 * */
/*基础对象构建*/
(function (w_) {
    var JSFrame = {
        /*基于某个对象扩展对象*/
        extend: function (tar,obj) {
            for(var i in obj){
                tar[i] = obj[i];
            }
        },
        /*基于某个对象扩展多个对象*/
        extendMore : function () {
            var _len = arguments.length, _n = 0, _target;
            if(0 === _len){
                return;
            }
            else if(1 === _len){
                _target = this;
            }
            else {
                _target = arguments[0];
                _n++;
            }
            for(;_n < _len; _n++){
                this.extend(_target,arguments[_n]);
            }
        }
    };
    JSFrame.prototype = {
    };
    w_.JSFrame = JSFrame;
})(window);


/*基础方法*/
(function (b_) {
    b_.extend(b_,{
        /*函数扩展*/
        fnExtend : function () {
            /*AOP操作方法---在Function对象原型上添加前置方法*/
            Function.prototype.before = function(func){
                /*保存当前函数*/
                var _self = this;
                /*利用闭包函数进行前置方法激活*/
                return function () {
                    var _ret = func.apply(this,arguments);
                    if(false === _ret){
                        /*传入的func中进行了return false*/
                        return false;
                    }
                    _self.apply(this,arguments);
                }

            };

            /*AOP操作方法---在Function对象原型上添加后置方法*/
            Function.prototype.after = function (func) {
                /*保存当前函数*/
                var _self = this;
                /*利用闭包函数进行后置方法激活*/
                return function () {
                    var _ret = _self.apply(this,arguments);
                    if(false === _ret){
                        /*当前函数中进行了return false*/
                        return false;
                    }
                    func.apply(this,arguments);
                }
            }
        }
    })
})(JSFrame);

/*数据操作方法*/
(function (b_) {
    /*数据类型操作方法*/
    b_.extend(b_,{
        /*返回枚举值:Null、Undefined、String、Number、Boolean、Function、Date、Array、Object、JSON*/
        type : function (tar_) {
            console.log(Object.prototype.toString.call(tar_));
            return Object.prototype.toString.call(tar_).replace(/(^\[object\s)|(]$)/g,"");
        },
        isString : function (tar_) {
            var _type = this.type(tar_);
            if("String" === _type) return true;
            else return false;
        },
        isNumber : function (tar_) {
            var _type = this.type(tar_);
            if("Number" === _type) return true;
            else return false;
        },
        isUndefined : function (tar_) {
            var _type = this.type(tar_);
            if("Undefined" === _type) return true;
            else return false;
        },
        isNull : function (tar_) {
            var _type = this.type(tar_);
            if("Null" === _type) return true;
            else return false;
        },
        isFunction : function (tar_) {
            var _type = this.type(tar_);
            if("Function" === _type) return true;
            else return false;
        },
        isDate : function (tar_) {
            var _type = this.type(tar_);
            if("Date" === _type) return true;
            else return false;
        },
        isBoolean : function (tar_) {
            var _type = this.type(tar_);
            if("Boolean" === _type) return true;
            else return false;
        },
        isArray : function (tar_) {
            var _type = this.type(tar_);
            if("Array" === _type) return true;
            else return false;
        },
        isObject : function (tar_) {
            var _type = this.type(tar_);
            if("Object" === _type) return true;
            else return false;
        },
        isJSON : function (tar_) {
            var _type = this.type(tar_);
            if("JSON" === _type) return true;
            else return false;
        }
    });
    /*字符串操作方法*/
    b_.extend(b_,{

        trim : function (tar_) {
            var _tar;
            switch (tar_){
                case "left":
                    _tar = tar_.replace(/\s*$/,"");
                    break;
                case "right":
                    _tar = tar_.replace(/^\s*/,"");
                    break;
                default:
                    _tar = tar_.replace(/(^\s*)|(\s*$)/g,"");
                    break;
            }
            return _tar;
        },

        leftTrim : function (tar_) {
            return tar_.replace(/^\s*/,"");
        },

        rightTrim : function (tar_) {
            return tar_.replace(/\s*$/,"");
        },

        /**
         *获取url地址中的参数
         */
        getQueryString: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)return unescape(r[2]);
            return null;
        },

        /*获取url中参数返回一个json对象*/
        queryString: function () {
            var _str = window.location.search, _strArr, _len, _json = {};
            if(-1<_str.indexOf("?")){
                _str = _str.substring(_str.indexOf("?"));
                _strArr = _str.split('&');
                _len = _strArr.length;
                for(var i = 0;i < _len; i++){
                    var _s = _strArr[i];
                    if(-1 < _s.indexOf("=")){
                        var _sArr = _s.split("=");
                        _json[_sArr[0]] = _sArr[1];
                    }
                }
            }
            return _json;
        },

        /**
         *  计算字符串字符数 中文占两个
         * @param str 字符串
         */
        stringLength: function (str) {
            ///获得字符串实际长度，中文2，英文1
            ///要获得长度的字符串
            var realLength = 0, len = str.length, charCode = -1;
            for (var i = 0; i < len; i++) {
                charCode = str.charCodeAt(i);
                if (charCode >= 0 && charCode <= 128) realLength += 1;
                else realLength += 2;
            }
            return realLength;
        },
    });
    /*数字操作*/
    b_.extend(b_,{
        /**
         * 生成随机数
         */
        randomNumber : function (minNum,maxNum) {
            //生成从minNum到maxNum的随机数，整数
            switch(arguments.length){
                case 1:
                    return parseInt(Math.random()*minNum+1,10);
                    break;
                case 2:
                    return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
                    break;
                default:
                    return 0;
                    break;
            }
        },
    });
    /*日期操作*/
    b_.extend(b_,{
    })
})(JSFrame);

/*dom操作*/
(function (b_) {
    /*选择器*/
    b_.extend(b_,{
        /*JSFrame对象*/
        /*id选择器*/
        $id : function (id_) {
            /*兼容css id选择器：#demo*/
            var _s = id_.charAt(0);
            if("#" === _s) id_ = id_.substr(1);
            return document.getElementById(id_);
        },
        /*标签选择器*/
        $tag : function (tag_,parent_) {
            var _parent = parent_ || document;
            return _parent.getElementsByTagName(tag_);
        },
        /*类选择器*/
        $class : function (class_,parent_) {
            var _parent, _ele = [];
            /*兼容css类选择器：.demo*/
            if("." === class_.charAt(0)) class_ = class_.substr(1);
            /*兼容第二个参数只传入一个字符串*/
            if(JSFrame.isString(parent_)) _parent = JSFrame.$id(parent_);
            else _parent = parent_ || document;

            if(document.getElementsByClassName){
                /*浏览器支持class选择器*/
                var _e = _parent.getElementsByClassName(class_);
                for(var i = 0, _len = _e.length; i < _len; i++){
                    _ele.push(_e[i]);
                }
            }
            else {
                /*浏览器不支持class选择器，采用标签选择器筛选*/
                var _all_ele = _parent.getElementsByTagName("*"), _all_len = _all_ele.length;
                //console.log(_all_ele);
                for(var i = 0; i<_all_len; i++){
                    if(_all_ele.className){
                        var _className = _all_ele.className, _arr = this.trim(_className).split(" ");
                        for(var j = 0, _len = _arr.length; j < _len; j++){
                            var _class_name = this.trim(_arr[j]);
                            if(class_ === _class_name) _ele.push(_class_name);
                        }
                    }
                }
            }

            return _ele;
        },
        /*层次选择器 --- 后代选择器*/
        $level : function (tar_) {
            /*兼容css3空格选择器 以空格(' ')分割的后代选择器，包含第一代、第二代、第三代...*/
            var _t_arr = this.trim(tar_).split(' '), _context = [], _ele = [];
            for(var i=0,_t_len=_t_arr.length; i < _t_len; i++){
                var _t_str = this.trim(_t_arr[i]);// 单个选择字符串
                if("" !== _t_str){
                    var _s = _t_str.charAt(0);
                    /*id选择器，dom压栈*/
                    if("#" === _s){
                        var _str = _t_str.slice(_t_str.indexOf(_s)+1);
                        _pushArray([this.$id(_str)]);
                        _context.push([this.$id(_str)]);
                    }
                    /*类选择器，dom压栈*/
                    else if("." === _s){
                        var _str = _t_str.slice(_t_str.indexOf(_s)+1);
                        var _len = _context.length;
                        if(0 < _len){
                            /*_context已经有数据*/
                            for(var j = 0; j < _len; j++){
                                _pushArray(this.$class(_str,_context[i]));
                            }
                        } else {
                            /*_context没有数据、class为第一条时直接push*/
                            _pushArray(this.$class(_str));
                        }
                    }
                    /*标签选择器，dom压栈*/
                    else{
                        var _len = _context.length;
                        if(0 < _len){
                            /*_context已经有数据*/
                            for(var j = 0; j < _len; j++){
                                _pushArray(this.$tag(_t_str,_context[i]));
                            }
                        } else {
                            /*_context没有数据、class为第一条时直接push*/
                            _pushArray(this.$tag(_t_str));
                        }
                    }
                }
            }

            function _pushArray(arr_) {
                if(0 < arr_.length){
                    for(var i = 0,_len=arr_.length; i < _len; i++){
                        if(arr_[i]){
                            _ele.push(arr_[i]);
                        }
                    }
                }
            }

            return _ele;
        },
        /*层次选择器 ---子代选择器*/
        $descendant : function (tar_) {
            /*以>分割的子代选择器*/
            var _t_arr = this.trim(tar_).split('>'), _ele = [], _ele_obj={length:0};
            for(var i=0,_t_len=_t_arr.length; i < _t_len; i++){
                var _t_str = this.trim(_t_arr[i]);// 单个选择字符串
                if("" !== _t_str){
                    var _s = _t_str.charAt(0);
                    if("#" === _s){
                        /*id选择器，dom压栈*/
                        var _str = _t_str.slice(_t_str.indexOf(_s)+1);
                        _ele_obj[i] = [this.$id(_str)];
                    }
                    else if("." === _s){
                        /*类选择器，dom压栈*/
                        var _str = _t_str.slice(_t_str.indexOf(_s)+1);
                        _ele_obj[i] = new Array();
                        if(0 < i){
                            for(var j = 0,_len=_ele_obj[i-1].length; j < _len; j++){
                                var _e = _ele_obj[i-1][j];
                                _ele_obj[i]= _pushToArray(this.$class(_str,_e),_ele_obj[i]);
                            }
                        } else {
                            _ele_obj[i]= _pushToArray(this.$class(_str),_ele_obj[i]);
                        }
                    }
                    else{
                        /*标签选择器，dom压栈*/
                        _ele_obj[i] = new Array();
                        if(0 < i){
                            for(var j = 0,_len=_ele_obj[i-1].length; j < _len; j++){
                                var _e = _ele_obj[i-1][j];
                                _ele_obj[i]= _pushToArray(this.$tag(_t_str,_e),_ele_obj[i]);
                            }
                        } else {
                            _ele_obj[i]= _pushToArray(this.$tag(_t_str),_ele_obj[i]);
                        }
                    }
                    _ele_obj.length = i+1;
                }
                if(0 < _ele_obj.length){
                    _ele = _ele_obj[(_ele_obj.length - 1)];
                }
            }

            function _pushToArray(arr_,targetArr_) {
                //var _arr = Array.prototype.push.apply(targetArr_,arr_);
                for(var i = 0,_len=arr_.length; i < _len; i++){
                    var _e = arr_[i];
                    targetArr_.push(_e);
                }
                return targetArr_;
            }

            return _ele;
        },
        /*并集选择器*/
        $group : function (tar_) {
            /*#id,div,.class*/
            /*以','分割*/
            var _t_arr = this.trim(tar_).split(','), _ele = [];
            for(var i=0,_t_len=_t_arr.length; i < _t_len; i++){
                var _t_str = this.trim(_t_arr[i]);
                if("" !== _t_str){
                    var _s = _t_str.charAt(0), _index = _t_str.indexOf(_s)+1, _str = _t_str.slice(_index);
                    if("#" === _s){
                        /*id选择器，dom压栈*/
                        _pushArray([this.$id(_str)]);
                    }
                    else if("." === _s){
                        /*类选择器，dom压栈*/
                        _pushArray(this.$class(_str));
                    }
                    else{
                        /*标签选择器，dom压栈*/
                        console.log(1111);
                        _pushArray(this.$tag(_t_str));
                    }
                }
            }

            function _pushArray(arr_) {
                if(0 < arr_.length){
                    for(var i = 0,_len=arr_.length; i < _len; i++){
                        if(arr_[i]){
                            _ele.push(arr_[i]);
                        }
                    }
                }
            }

            return _ele;
        },
        /*html5选择器 querySelectorAll返回一个集合*/
        $all : function (tar_,parent_) {
            var _selector = parent_ || document;
            return _selector.querySelectorAll(tar_);
        }
    });
    /*属性操作*/
    b_.extend(b_,{
        /*设置、获取属性值。*/
        attr : function (dom_,key_,value_) {
            var _doms = this.isString(dom_)? this.$all(dom_) : dom_,
                _e = _doms[0] || _doms,
                _len = _doms.length || null;

            /*check dom*/
            if(!_e){
                throw new Error('DOM ERROR!');
            }

            /*设置属性值*/
            if(value_){
                if(_len){
                    /*设置多个属性值*/
                    for(var i=0; i < _len; i++){
                        _setAttr(_doms[i],key_,value_);
                    }
                }
                /*只设置设置单个属性值*/
                else{
                    /*设置属性值*/
                    _setAttr(_e,key_,value_);
                }
            }
            /*获取属性值*/
            else{
                /*只获取单个属性值*/
                return _getAttr(_e,key_);
            }

            function _getAttr(dom_,key_) {
                return dom_.getAttribute(key_);
            }

            function _setAttr(dom_,key_,value_) {
                dom_.setAttribute(key_,value_)

            }
        },
        /*删除属性值*/
        removeAttr : function (dom_,key_) {
            var _doms = this.isString(dom_)? this.$all(dom_) : dom_,
                _len = _doms.length || null;

            if(!_doms){
                throw new Error('DOM ERROR!');
            }

            if(_len){
                /*删除多个属性值*/
                for(var i=0; i < _len; i++){
                    _delAttr(_doms[i],key_);
                }
            }
            else{
                /*删除某个属性值*/
                _delAttr(_doms,key_);
            }

            function _delAttr(e_,k_) {
                e_.removeAttribute(k_);
            }
        },
        /*添加class*/
        addClass : function (dom_,value_) {
            var _doms = this.isString(dom_)? this.$all(dom_) : dom_,
                _len = _doms.length || null;

            if(!_doms){
                throw new Error('DOM ERROR!');
            }

            if(_len){
                /*添加多个class*/
                for(var i=0; i < _len; i++){
                    _addName(_doms[i],value_);
                }
            }
            else{
                /*添加一个属性值*/
                _addName(_doms,value_);
            }

            function _addName(e_,name_) {
                e_.className = " " + e_.className + " " + name_;
            }
        },
        /*删除class*/
        removeClass : function (dom_,value_) {
            var _doms = this.isString(dom_)? this.$all(dom_) : dom_,
                _len = _doms.length || null;

            if(!_doms){
                throw new Error('DOM ERROR!');
            }

            if(_len){
                /*添加多个dom的class*/
                for(var i=0; i < _len; i++){
                    _delName(_doms[i],this.trim(value_));
                }
            }
            else{
                /*添加一个dom的属性值*/
                _delName(_doms,value_);
            }

            function _delName(e_,name_) {
                /*兼容删除多个class*/
                var _nameArr = name_.split(' '), _class = "",
                    _oldClass=e_.className,
                    _classArr = [];
                if(_oldClass){
                    _classArr = _oldClass.split(' ');

                    for(var i = 0; i<_classArr.length; i++){
                        var _c = _classArr[i];
                        for(var j = 0; j<_nameArr.length; j++){
                            if(_c !== _nameArr[i]){
                                _class += " " + _c;
                            }
                        }
                    }
                    e_.className = _class;
                }
            }
        },
        /*判断某个class是否存在*/
        hasClass : function (dom_,value_) {
            var _doms = this.isString(dom_)? this.$all(dom_) : dom_,
                _len = _doms.length || null;

            if(!_doms){
                throw new Error('DOM ERROR!');
            }

            if(_len){
                /*添加多个dom的class*/
                return _hasName(_doms[0],this.trim(value_));
            }
            else{
                /*添加一个dom的属性值*/
                return _hasName(_doms,value_);
            }

            function _hasName(e_,name_) {
                var _class = "",
                    _oldClass=e_.className,
                    _classArr = [],
                    _flag  = false;
                if(_oldClass){
                    _classArr = _oldClass.split(' ');
                    for(var i = 0; i<_classArr.length; i++){
                        var _c = _classArr[i];
                        if(name_ === _c){
                            _flag = true;
                            break;
                        }
                    }
                    e_.className = _class;
                }
                return _flag;
            }
        },
        /*获取class，返回一个class数组*/
        getClass : function (dom_,value_) {
            var _doms = this.isString(dom_)? this.$all(dom_) : dom_,
                _dom = _doms[0] || _doms, _classArr;

            if(!_dom){
                throw new Error('DOM ERROR!');
            }

            if(_dom.className){
                _classArr = _dom.className.split(" ");
            }
            return _classArr;
        }
    });
    /*css操作*/
    b_.extend(b_,{
        /*设置、获取css样式*/
        css : function (dom_,key_,value_) {
            /*兼容传入的为dom*/
            var _doms = (-1 < this.isString(dom_))? this.$all(dom_) : dom_;

            /*check dom*/
            if(!_doms){
                throw new Error('DOM ERROR!');
            }

            if(_doms.length){
                /*设置样式*/
                if(value_){
                    for(var i = 0; i<_doms.length;i++){
                        _setStyle(_doms[i],key_,value_);
                    }
                }
                /*获取样式*/
                else {
                    return _getStyle(_doms[0],key_);
                }
            }
            /*如果不是数组*/
            else{
                /*设置样式*/
                if(value_){
                    _setStyle(_doms,key_,value_);
                }
                /*获取样式*/
                else {
                    return _getStyle(_doms,key_);
                }
            }

            function _getStyle(e_,k_) {
                if(e_.currentStyle){
                    //兼容IE
                    return e_.currentStyle[k_];
                } else {
                    return window.getComputedStyle(e_,null)[k_];
                }
            }

            function _setStyle(e_,k_,v_) {
                e_.style[k_] = v_;
            }
        },
        /*显示*/
        show : function (dom_) {
            this.css(dom_,'display','block');
        },
        /*隐藏*/
        hide : function (dom_) {
            this.css(dom_,'display','none');
        },
        /*在定位情况下，相对父元素位置。元素的相对位置top、left坐标*/
        relativePosition : function (dom_) {

            var _doms = this.isString(dom_)? this.$all(dom_) : dom_,
                _e = _doms[0] || _doms;

            /*check dom*/
            if(!_e){
                throw new Error('DOM ERROR!');
            }

            return {
                left : _getTop(_e),
                top : _getLeft(_e)
            };

            /*获取左坐标*/
            function _getLeft(ele_) {
                var _sLeft = document.documentElement.scrollLeft || 0;
                return ele_.offsetLeft - _sLeft;
            }
            /*获取上坐标*/
            function _getTop(ele_) {
                var _sTop = document.documentElement.scrollTop || 0;
                return ele_.offsetTop - _sTop;
            }
        },
        /*相对视口的，元素的绝对位置top、left坐标*/
        absolutePosition : function (dom_) {
            var _doms = this.isString(dom_)? this.$all(dom_) : dom_,
                _e = _doms[0] || _doms;

            /*check dom*/
            if(!_e){
                throw new Error('DOM ERROR!');
            }

            return {
                left : _getLeft(_e),
                top : _getTop(_e)
            };

            /*获取左坐标*/
            function _getLeft(ele_) {
                var _left = 0;
                /*支持getBoundingClientRect时，优先使用*/
                if(ele_.getBoundingClientRect){
                    _left = ele_.getBoundingClientRect().left;
                }
                /*支持offset*/
                else if(ele_.offsetLeft){
                    while (ele_){
                        _left += ele_.offsetLeft;
                        ele_ = _.offsetParent;
                    }
                    /*主要兼容老版本IE*/
                    var _sLeft = document.documentElement.scrollLeft || 0;
                    _left = _left - _sLeft;
                }
                else{
                    _left = 0;
                }

                return _left;
            }
            /*获取上坐标*/
            function _getTop(ele_) {
                var _top = 0;
                /*支持getBoundingClientRect时，优先使用*/
                if(ele_.getBoundingClientRect){
                    _top = ele_.getBoundingClientRect().top;
                }
                /*支持offset*/
                else if(ele_.offsetTop){
                    while (ele_){
                        _top += ele_.offsetTop;
                        ele_ = _.offsetParent;
                    }
                    /*主要兼容老版本IE*/
                    var _sTop = document.documentElement.scrollTop || 0;
                    _top = _top - _sTop;
                }
                else{
                    _top = 0;
                }
                return _top;
            }
        },
        //单个元素的宽
        width:function (dom_){
            var _doms = this.isString(dom_)? this.$all(dom_) : dom_,
                _e = _doms[0] || _doms;

            /*check dom*/
            if(!_e){
                throw new Error('DOM ERROR!');
            }

            var _width = 0;
            /*支持getBoundingClientRect时，优先使用*/
            if(_e.getBoundingClientRect){
                if(_e.getBoundingClientRect().width){
                    _width = _e.getBoundingClientRect().width;
                }
                else {
                    /*IE6、7没有width、height属性*/
                    _width = _e.getBoundingClientRect().right - _e.getBoundingClientRect().left;
                }
            }
            /*支持clientWidth*/
            else if(_e.clientWidth){
                _width = _e.clientWidth;
            }
            else{
                _width = 0;
            }

            return _width;
        },
        /*单个元素的高*/
        height:function (dom_){
            var _doms = this.isString(dom_)? this.$all(dom_) : dom_,
                _e = _doms[0] || _doms;

            /*check dom*/
            if(!_e){
                throw new Error('DOM ERROR!');
            }

            var _height = 0;
            /*支持getBoundingClientRect时，优先使用*/
            if(_e.getBoundingClientRect){
                if(_e.getBoundingClientRect().height){
                    _height = _e.getBoundingClientRect().height;
                }
                else {
                    /*IE6、7没有width、height属性*/
                    _height = _e.getBoundingClientRect().bottom - _e.getBoundingClientRect().top;
                }
            }
            /*支持clientWidth*/
            else if(_e.clientHeight){
                _height = _e.clientHeight;
            }
            else{
                _height = 0;
            }

            return _height;
        },
    });
    /*html操作*/
    b_.extend(b_,{
        /*获取、插入html*/
        html : function (dom_,value_) {
            var _doms = this.isString(dom_)? this.$all(dom_) : dom_;
            if(!_doms){
                throw new Error("ERROR DOM!");
            }

            if(value_){
                if(_doms.length){
                    for(var i=0; i<_doms.length;i++){
                        _setHTML(_doms[i],value_);
                    }
                }
                else {
                    _setHTML(_doms,value_);
                }
            }
            else {
                _doms = _doms[0] || dom_;
                return _getHTML(_doms);
            }

            /*设置html*/
            function _setHTML(ele_,val_) {
                ele_.innerHTML = val_;
            }

            /*获取html*/
            function _getHTML(ele_) {
                return ele_.innerHTML;
            }
        },
        /*插入文本*/
        text : function (dom_,value_) {
            var _doms = this.isString(dom_)? this.$all(dom_) : dom_;
            _doms = _doms[0] || dom_;
            if(!_doms){
                throw new Error("ERROR DOM!");
            }

            if(value_){
                _setText(_doms,value_);
            }
            else {
                return _getText(_doms);
            }

            /*设置html*/
            function _setText(ele_,val_) {
                ele_.innerText = val_;
            }

            /*获取html*/
            function _getText(ele_) {
                return ele_.innerText;
            }
        }
    });
    /*添加跑马灯操作*/
    b_.extend(b_,{
        /*
         * 设置跑马灯
         */
        setMarquee: function (e_, n_) {
            if (null != e_) {
                var _title = e_.innerHTML;
                if (this.stringLength(_title) > n_) {
                    e_.innerHTML = "<marquee>" + _title + "</marquee>";
                }
            }
        },
        /*
         * 删除跑马灯
         */
        delMarquee: function (e_, n_) {
            var _str = e_.innerHTML;
            var _index = _str.indexOf("</marquee>");
            if (_index > 0) {
                var _title = _str.substring(9, _str.indexOf("</marquee>"));
                if (this.stringLength(_title) > n_) {
                    e_.innerHTML = _title;
                }
            }
        },
    });
})(JSFrame);

/*事件操作*/
(function (b_) {
    b_.extend(b_,{
        /*事件对象*/
        event : {
            /*遥控器事件监听*/
            remote : (function () {
                /*事件队列*/
                var eventLisenerQueue = {};
                /*添加事件到队列*/
                var setEventLisener = function(key_,cb_){
                    var _fn_arr = eventLisenerQueue[key_] || [];
                    _fn_arr.push(cb_);
                    eventLisenerQueue[key_] = _fn_arr;
                };
                /*从队列中触发相应事件*/
                var triggerEventLisener = function(key_,e_){
                    if(eventLisenerQueue[key_]){
                        /*默认会执行所有相同键值的遥控器事件*/
                        var _fn_arr = eventLisenerQueue[key_];
                        for(var i = 0;i < _fn_arr.length;i++){
                            _fn_arr[i](e_);
                        }
                    }
                };
                /*遥控器按键键值常量*/
                var KEY = {
                    KEY_BACK         : 8,
                    KEY_OKey         : 13,
                    KEY_BACK2        : 18,//OTT KEY BACK
                    KEY_PREV         : 33,
                    KEY_NEXT         : 34,
                    KEY_LEFT         : 37,
                    KEY_UP           : 38,
                    KEY_RIGHT        : 39,
                    KEY_DOWN         : 40,
                    KEY_CHANNEL_UP   : 257,
                    KEY_CHANNEL_DOWN : 258,
                    KEY_VOL_UP       : 259,
                    KEY_VOL_DOWN     : 260,
                    KEY_MUTE         : 261,
                    KEY_AUDIO        : 262,
                    KEY_PAUSE        : 263,
                    KEY_FF           : 264,//Fast Forward
                    KEY_FR           : 265,//Fast Rewind
                    KEY_DELETE       : 271,
                    KEY_HOME         : 272,
                    KEY_REFRESH      : 280,
                    KEY_HOME2        : 613,
                    KEY_VIRTUAL      : 768,
                    LP_DURATION      : 1000,
                };
                /*事件对象*/
                var lisener = {
                    onKeyBack : function (cb_) {
                        setEventLisener("onKeyBack",cb_);
                    },
                    onKeyOKey : function (cb_) {
                        setEventLisener("onKeyOKey",cb_);
                    },
                    onKeyBack2 : function (cb_) {
                        setEventLisener("onKeyBack2",cb_);
                    },
                    onKeyPrev : function (cb_) {
                        setEventLisener("onKeyPrev",cb_);
                    },
                    onKeyNext : function (cb_) {
                        setEventLisener("onKeyNext",cb_);
                    },
                    onKeyLeft : function (cb_) {
                        setEventLisener("onKeyLeft",cb_);
                    },
                    onKeyUp : function (cb_) {
                        setEventLisener("onKeyUp",cb_);
                    },
                    onKeyRight : function (cb_) {
                        setEventLisener("onKeyRight",cb_);
                    },
                    onKeyDown : function (cb_) {
                        setEventLisener("onKeyDown",cb_);
                    },
                    onKeyChannelUp : function (cb_) {
                        setEventLisener("onKeyChannelUp",cb_);
                    },
                    onKeyChannelDown : function (cb_) {
                        setEventLisener("onKeyChannelDown",cb_);
                    },
                    onKeyVolUp : function (cb_) {
                        setEventLisener("onKeyVolUp",cb_);
                    },
                    onKeyVolDown : function (cb_) {
                        setEventLisener("onKeyVolDown",cb_);
                    },
                    onKeyMute : function (cb_) {
                        setEventLisener("onKeyMute",cb_);
                    },
                    onKeyAuido : function (cb_) {
                        setEventLisener("onKeyAuido",cb_);
                    },
                    onKeyPause : function (cb_) {
                        setEventLisener("onKeyPause",cb_);
                    },
                    onKeyFF : function (cb_) {
                        setEventLisener("onKeyFF",cb_);
                    },
                    onKeyFR : function (cb_) {
                        setEventLisener("onKeyFR",cb_);
                    },
                    onKeyDelete : function (cb_) {
                        setEventLisener("onKeyDelete",cb_);
                    },
                    onKeyHome : function (cb_) {
                        setEventLisener("onKeyHome",cb_);
                    },
                    onKeyRefresh : function (cb_) {
                        setEventLisener("onKeyRefresh",cb_);
                    },
                    onKeyHome2 : function (cb_) {
                        setEventLisener("onKeyHome2",cb_);
                    },
                    onKeyVirtual : function (cb_) {
                        setEventLisener("onKeyVirtual",cb_);
                    },
                    onLpDuration : function (cb_) {
                        setEventLisener("onLpDuration",cb_);
                    }
                };
                /*开启遥控器事件监听*/
                document.onkeydown = function (e) {
                    var _event = window.event || e;
                    var _keyCode = _event.keyCode;
                    switch (_keyCode){
                        case KEY.KEY_BACK :
                            triggerEventLisener('onKeyBack',_event);
                            break;
                        case KEY.KEY_OKey :
                            triggerEventLisener('onKeyOKey',_event);
                            break;
                        case KEY.KEY_BACK2 :
                            triggerEventLisener('onKeyBack2',_event);
                            break;
                        case KEY.KEY_PREV :
                            triggerEventLisener('onKeyPrev',_event);
                            break;
                        case KEY.KEY_NEXT :
                            triggerEventLisener('onKeyNext',_event);
                            break;
                        case KEY.KEY_LEFT :
                            triggerEventLisener('onKeyLeft',_event);
                            break;
                        case KEY.KEY_UP :
                            triggerEventLisener('onKeyUp',_event);
                            break;
                        case KEY.KEY_RIGHT :
                            triggerEventLisener('onKeyRight',_event);
                            break;
                        case KEY.KEY_DOWN :
                            triggerEventLisener('onKeyDown',_event);
                            break;
                        case KEY.KEY_CHANNEL_UP :
                            triggerEventLisener('onKeyChannelUp',_event);
                            break;
                        case KEY.KEY_CHANNEL_DOWN :
                            triggerEventLisener('onKeyChannelDown',_event);
                            break;
                        case KEY.KEY_VOL_UP :
                            triggerEventLisener('onKeyVolUp',_event);
                            break;
                        case KEY.KEY_VOL_DOWN :
                            triggerEventLisener('onKeyVolDown',_event);
                            break;
                        case KEY.KEY_MUTE :
                            triggerEventLisener('onKeyMute',_event);
                            break;
                        case KEY.KEY_AUDIO :
                            triggerEventLisener('onKeyAuido',_event);
                            break;
                        case KEY.KEY_PAUSE :
                            triggerEventLisener('onKeyPause',_event);
                            break;
                        case KEY.KEY_FF :
                            triggerEventLisener('onKeyFF',_event);
                            break;
                        case KEY.KEY_FR :
                            triggerEventLisener('onKeyFR',_event);
                            break;
                        case KEY.KEY_DELETE :
                            triggerEventLisener('onKeyDelete',_event);
                            break;
                        case KEY.KEY_HOME :
                            triggerEventLisener('onKeyHome',_event);
                            break;
                        case KEY.KEY_REFRESH :
                            triggerEventLisener('onKeyRefresh',_event);
                            break;
                        case KEY.KEY_HOME2 :
                            triggerEventLisener('onKeyHome2',_event);
                            break;
                        case KEY.KEY_VIRTUAL :
                            triggerEventLisener('onKeyVirtual',_event);
                            break;
                        case KEY.LP_DURATION :
                            triggerEventLisener('onLpDuration',_event);
                            break;
                        default :
                            break
                    }
                };
                return lisener;
            })(),
            /*阻止默认行为*/
            stopDefaultAction : function (e_) {
                if(e_.preventDefault){
                    e_.preventDefault();
                }else{
                    /*兼容IE*/
                    e_.returnValue = false;
                }
            },
            /*阻止冒泡*/
            stopPropagation: function (e_) {
                if(e_.stopPropagation){
                    e_.stopPropagation();
                }else {
                    /*兼容IE*/
                    e_.cancelable = true;
                }
            },
        }
    });

    /*自定义事件对象*/
    function EventTarget(){
        this.handlers = {};
    }
    EventTarget.prototype = {
        constructor: EventTarget,
        addHandler: function(type, handler){
            if (typeof this.handlers[type] == "undefined"){
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);
        },
        fire: function(event){
            if (!event.target){
                event.target = this;
            }
            if (this.handlers[event.type] instanceof Array){
                var handlers = this.handlers[event.type];
                for (var i=0, len=handlers.length; i < len; i++){
                    handlers[i](event);
                }
            }
        },
        removeHandler: function(type, handler){
            if (this.handlers[type] instanceof Array){
                var handlers = this.handlers[type];
                for (var i=0, len=handlers.length; i < len; i++){
                    if (handlers[i] === handler){
                        break;
                    }
                }
                handlers.splice(i, 1);
            }
        }
    };
})(JSFrame);

/*存储操作*/
(function (b_) {
    var cookies = {
        set : _setCookie,
        get : _getCookie,
        del : _delCookie
    };

    /*添加到基础对象*/
    b_.cookie = cookies;

    function _setCookie(key_,value_,days_,path_) {
        var _expires    = +new Date(),
            _name       = escape(key_)   || "",
            _value      = escape(value_) || "",
            _days       = days_          || 0,
            _path       = path_? "" : (";path="+path_);
        _expires.setDate(+new Date() + _days*24*60*60*1000);
        var _expiresStr = ";expires="+_expires.toUTCString();
        document.cookie = _name + "=" + _value + _expiresStr + _path;
    }

    function _getCookie(key_) {
        var _key = escape(key_) + "=", _cookies = document.cookie;
        if(0 < _cookies.length && -1 < _cookies.indexOf(_key)){
            var _s = _cookies.substr(_cookies.indexOf(_key));
            _s = _s.substring(0,_s.indexOf(";"));
            return _s.split("=")[1];
        }
        else return "";
    }

    function _delCookie(key_,path_) {
        var _name = key_, _time = new Date(0),
            _path = path_? "" : ";path="+path_;

        document.cookie = _name+"=;expires="+_time.toUTCString()+_path;
    }

    /*缓存对象*/
    var cache = {
        data : [],
        /*添加数据*/
        set : function (key_,value_) {
            /*缓存数组中是否存在该条数据标识*/
            var _flag = false;
            for(var i = 0, _len = this.data.length; i < _len; i++){
                /*存在该条数据，则进行替换*/
                var _item = this.data[i];
                if(key_ = _item.key){
                    _flag = true;
                    _item.key = key_;
                    _item.value = value_;
                    break;
                }
            }
            if(!_flag){
                var _json = {key : key_, value : value_};
                this.data.push(_json);
            }
        },
        /*获取数据*/
        get : function (key_) {
            var _one_data = null;
            for(var i = 0, _len = this.data.length; i < _len; i++){
                var _item = this.data[i];
                if(_item.key === key_){
                    _one_data = this.data[i];
                    break;
                }
            }
            if(_one_data){
                return _one_data.value;
            }
            else {
                return '';
            }
        },
        /*删除某条数据*/
        del : function (key_) {
            for(var i = 0, _len = this.data.length; i < _len; i++){
                var _item = this.data[i];
                /*存在该条数据，则进行删除*/
                if(_item.key === key_){
                    this.data.splice(i,1);
                    break;
                }
            }
        },
        /*删除所有数据*/
        clear : function () {
            this.data = [];
        },
        /*判断某条数据是否存在*/
        has : function (key_) {
            var _flag = false;
            for(var i = 0, _len = this.data.length; i < _len; i++){
                var _item = this.data[i];
                /*存在该条数据存在则*/
                if(_item.key === key_){
                    _flag = true;
                    break;
                }
            }
            return _flag;
        }
    };
    /*添加到基础对象*/
    b_.cache = cache;

    var store = (function () {
    })()

})(JSFrame);

/*数据请求*/
(function (b_) {
    /**
     * 公共ajax对象
     */
    function Ajax(args) {

        this.url      = args.url      || '';
        this.success  = args.success  || this.defaultSuccess;
        this.loading  = args.loading  || this.defaultLoading;
        this.error    = args.error    || this.defaultError;
        this.type     = args.type     || 'get';
        this.sync     = args.sync     || false;//默认异步方式
        this.param    = args.param    || '';
        this.mine     = args.mine     || 'text/xml';

        this.loadAjax();
    }
    Ajax.prototype = {
        /*获取request对象*/
        getRequest      : function () {
            var req;
            if(window.XMLHttpRequest){
                req = new XMLHttpRequest();
            }
            else if(window.ActiveXObject){
                /*兼容各版本IE*/
                var _versions = ['Microsoft.XMLHTTP',
                                'MSXML.XMLHTTP',
                                'Msxml2.XMLHTTP.7.0',
                                'Msxml2.XMLHTTP.6.0',
                                'Msxml2.XMLHTTP.5.0',
                                'Msxml2.XMLHTTP.4.0',
                                'MSXML2.XMLHTTP.3.0',
                                'MSXML2.XMLHTTP'];
                for(var i =0, _len=_versions.length; i < _len; i++){
                    try {
                        req = new ActiveXObject(_versions[i]);
                        if(req){
                            break
                        }
                    } catch (e){
                        req = false;
                    }
                }
            }
            return req;
        },
        /*获取CORS（跨域资源共享）对象*/
        getCORSRequest  : function () {
            var req;
            if(window.XMLHttpRequest) {
                var _xhr = new XMLHttpRequest();
                /*跨域标识*/
                if("withCredentials" in _xhr) {
                    req = _xhr
                }
                else {
                    req = null;
                }
            }
            else if("undefined" != typeof window.XDomainRequest) {
                /*IE*/
                req = new XDomainRequest();
            }
            else {
                req = null;
            }
            return req;
        },
        /*发送ajax请求入口方法*/
        loadAjax        : function () {
            this.request = "cors" != this.type ? this.getRequest() : this.getCORSRequest();
            if(this.request){
                var loader = this;
                loader.loading(loader.request);
                /*注册state变化函数*/
                loader.request.onreadystatechange = function (e) {
                    if(4 == loader.request.readyState) {
                        if((200 >= loader.request.status && loader.request.status<300) || 304 == loader.request.status) {
                            /*成功*/
                            loader.success.call(loader,loader.request.responseText);
                        }
                        else {
                            /*失败*/
                            loader.error.call(loader,loader.request.status);
                        }
                        /*删除对象*/
                        delete loader.request;
                    }
                };
                /*一是URL相对于执行代码的当前页面（当然也可以使用绝对路径）；
                二是调用open()方法并不会真正发送请求，而只是启动一个请求以备发送。*/
                loader.request.open(this.type,this.url,this.sync);
                if("post" == this.type) {
                    /*默认情况下，服务器对POST 请求和提交Web 表单的请求并不会一视同仁。因此，服务器端必须有
                    程序来读取发送过来的原始数据，并从中解析出有用的部分。不过，我们可以使用XHR 来模仿表单提
                    交：首先将Content-Type 头部信息设置为application/x-www-form-urlencoded，也就是表单
                    提交时的内容类型，其次是以适当的格式创建一个字符串
                    */
                    /*设置自定义头*/
                    loader.request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                }
                /*Firefox 最早引入了overrideMimeType()方法，用于重写XHR 响应的MIME 类型。这个方法后
                来也被纳入了XMLHttpRequest 2 级规范。因为返回响应的MIME 类型决定了XHR 对象如何处理它，所
                以提供一种方法能够重写服务器返回的MIME 类型是很有用的。
                服务器返回的MIME 类型是text/plain，但数据中实际包含的是XML。根据MIME 类型，
                即使数据是XML，responseXML 属性中仍然是null。通过调用overrideMimeType()方法，可以保
                证把响应当作XML 而非纯文本来处理。
                */
                if(loader.request.overrideMimeType) {
                    loader.request.overrideMimeType(this.mine);
                }
                /*这里的send()方法接收一个参数，即要作为请求主体发送的数据。
                如果不需要通过请求主体发送数据，则必须传入null，因为这个参数对有些浏览器来说是必需的。
                调用send()之后，请求就会被分派到服务器。*/
                loader.request.send("post" == this.type? this.param : null);
            } else {
                throw 'Ajax Object Get Failed';
            }
        },
        /*默认成功回调方法*/
        defaultSuccess  : function (data) {

        },
        /*默认的失败回调方法*/
        defaultError    : function (error) {
            throw error;
        },
        /*默认加载方法*/
        defaultLoading  : function () {

        }
    };

    /**
     * 图像Ping
     * 跨域访问：使用img标签实现
     * 缺点：1、只能发送GET。2、无法访问服务器的响应文本。
     * 只能用来浏览器到服务器间的单向通信。（日志统计）
     * */
    function _imgPing(url_) {
        var _imgTag;
        if(window.Image) {
            _imgTag = new Image();
        }
        else {
            var _body = document.getElementsByTagName("body")[0];
            _imgTag = document.createElement('img');
            _body.appendChild(_imgTag);
        }
        _imgTag.onload = _imgTag.onerror = function (e) {};
        /*发送请求*/
        _imgTag.src = url_;
    }

    /**
     * jsonp:
     * 优点：能够直接访问响应文本
     * 缺点：1、不安全，访问的文本中有可能含有恶意代码   2、不容易检测是否失败。
     * */
    function _jsonp(args_) {
        var _url        = args_.url      || '',
            _name       = args_.param.callback     || 'callback_' + Math.random().toString().substr(2, 13),
            _success_cb = args_.success  || function (data_) {},
            _error_cb   = args_.error    || function (e) {},
            _param      = args_.param    || {},
            _body       = document.getElementsByTagName('body')[0],//获取body标签
            _tag        = document.createElement('script'),//创建一个script标签
            _exec_flag  = 0;



        _param = _parseParamsToString(_param);

        if(-1 < _url.indexOf("?")) {
            _url += _param;
        }
        else {
            _url += "?"+_param;
        }

        function _parseParamsToString(param_) {
            var _arr = [];
            for(var key in param_){
                _arr.push(key+"="+param_[key]);
            }
            return _arr.join("&");
        }

        /*标签异步加载*/
        _tag.async = true;

        /*注册回调函数*/
        window[_name] = function (data_) {
            _exec_flag = 1;
            _success_cb(data_);
            /*移除script标签*/
            _body.removeChild(_tag);
            window[_name] = null;
        };

        _tag.onerror = function (e) {
            _body.removeChild(_tag);
            window[_name] = null;
            _error_cb({ret: 0, msg: 'bad data!'});
        };

        _tag.onload = _tag.onreadystatechange = function (e) {
            if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
                if (0 == _exec_flag) {
                    _error_cb({ret: 0, msg: 'bad data!'});
                }
            }
        };

        _body.appendChild(_tag);
        /*发送请求*/
        _tag.src = _url;
    }

    /*添加ajax对象*/
    b_.ajax = function() {
        /**
         * 兼容两种入参
         * 1、对象入参形式{key:value}
         * 2、普通函数入参形式([]:表示可选)(type,url,[success],[error],[loading],[sync],[param],[mine])
         *    type        必填参数，get/post/cors   cors为跨域请求
         *    url         必填参数，ajax发送地址
         *    [success]   可选参数，发送成功回调函数，建议必填
         *    [error]     可选参数，发送失败回调函数，建议填写
         *    [loading]   可选参数，准备发送ajax前调用
         *    [sync]      可选参数，异步：false,同步：true
         *    [param]     可选参数，入参可选为json入参。
         *    [mine]      可选参数，默认为text/xml
         */
        var _args = arguments;
        /*传入的为一个对象*/
        if(this.isObject(_args[0])) {
            var _args_obj   = _args[0];
                /*_type       = _args_obj.type,
                _url        = _args_obj.url,
                _onloading  = _args_obj.loading,
                _success    = _args_obj.success,
                _error      = _args_obj.error,
                _sync       = _args_obj.sync,
                _param      = _args_obj.param,
                _mine       = _args_obj.mine;*/
            new Ajax(_args_obj);
        }
        /*单个数据入参*/
        else {
            var _args_obj   = {
                    type    :   _args[0],
                    url     :   _args[1],
                    success :   _args[2],
                    error   :   _args[3],
                    loading :   _args[4],
                    sync    :   _args[5],
                    param   :   _args[6],
                    mine    :   _args[7]
                };
            new Ajax(_args_obj);
        }
    };
    /*jsonp*/
    b_.jsonp  = function () {
        /**
         * 兼容两种入参
         * 1、对象入参形式{key:value}
         * 2、普通函数入参形式([]:表示可选)(url,param,[name],[success],[error])
         *    url        必填参数，jsonp发送地址
         *    param      必填参数，可根据需求填写多个参数，callback为必填参数名。参数：{callback : 'indexDemo'}
         *    [success]  可选参数，发送成功回调函数，建议必填
         *    [error]    可选参数，发送失败回调函数，建议填写
         */
        var _args = arguments;
        /*传入的为一个对象*/
        if(this.isObject(_args[0])) {
            var _args_obj   = _args[0];
            _jsonp(_args_obj);
        }
        /*单个数据入参*/
        else {
            var _args_obj   = {
                _url    :   _args[0],
                _param     :   _args[1],
                _name :   _args[2],
                _success   :   _args[3],
                _error :   _args[4]
            };
            _jsonp(_args_obj);
        }
    };
    /*图像Ping  传入一个绝对地址*/
    b_.imgPing = _imgPing;
})(JSFrame);

/*动画*/
(function (b_) {
})(JSFrame);
/*源自 JavaScript高级编程设计 第十二章*/
/*function getBoundingClientRect(element){
    var scrollTop = document.documentElement.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft;
    if (element.getBoundingClientRect){
        if (typeof arguments.callee.offset != "number"){
            var temp = document.createElement("div");
            temp.style.cssText = "position:absolute;left:0;top:0;";
            document.body.appendChild(temp);
            arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
            document.body.removeChild(temp);
            temp = null;
        }
        var rect = element.getBoundingClientRect();
        var offset = arguments.callee.offset;
        return {
            left: rect.left + offset,
            right: rect.right + offset,
            top: rect.top + offset,
            bottom: rect.bottom + offset
        };
    } else {
        var actualLeft = getElementLeft(element);
        var actualTop = getElementTop(element);
        return {
            left: actualLeft - scrollLeft,
            right: actualLeft + element.offsetWidth - scrollLeft,
            top: actualTop - scrollTop,
            bottom: actualTop + element.offsetHeight - scrollTop
        }
    }

    function getElementLeft(element){
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;
        while (current !== null){
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }
        return actualLeft;
    }

    function getElementTop(element){
        var actualTop = element.offsetTop;
        var current = element.offsetParent;
        while (current !== null){
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        return actualTop;
    }
}*/

