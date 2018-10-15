/*
*展示搜索结果:
*持久化数据记录(search),展示持久化数据记录
*/
'use strict';

var _searchResult = {
    publicId   : '',
    title      : '',
    patentee   : '',
    publicDate : '',
    IPC        : '',

    result     : function(params){
        // 存储搜索结果
        this.publicId   = params.publicId || '';
        this.title      = params.title || '';
        this.patentee   = params.patentee || '';
        this.publicDate = params.publicDate || '';
        this.IPC        = params.IPC || '';
    },

    display    : function(){
        // 在DOM中插入需要展示的查询结果
        
    }

    


}

module.exports = _searchResult