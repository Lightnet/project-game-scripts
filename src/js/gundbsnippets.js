
Gun.chain.live = function(cb, opt){
  return this.on(function(val, field){
    delete val._;
    cb.call(this, val, field);
  }, opt);
}

Gun.chain.value = function(cb, opt){
  return this.val(function(val, field){
    delete val._;
    cb.call(this, val, field);
  }, opt);
}

Gun.chain.each = function () {
  var each = this.map();
  return this.val.apply(each, arguments)
}

function gunObjDataAssign(self,data){
    for(var i in data){
        if(typeof data[i] === 'object'){
            if(data[i] !=null){
                //console.log(data[i]);
                var id = data[i]['#'];
                data[i] = {}; //clear id hash
                self.get(id).val((objdata)=>{
                    delete objdata._;
                    data[i] = objdata;
                    //console.log(objdata);
                    gunObjDataAssign(self,objdata);
                });
            }
        }
    }
}

Gun.chain.valueobj = function (cb, opt) {
  return this.val(function (val, field) {

      if(val !=null){
          delete val._;
      }
      gunObjDataAssign(this,val);
      cb.call(this, val, field);
  }, opt);
};

Gun.chain.liveobj = function (cb, opt) {
  return this.on(function (val, field) {
    delete val._;
    gunObjDataAssign(this,val);
    cb.call(this, val, field);
  }, opt);
};

Gun.chain.eachobj = function () {
  var each = this.map();
  return this.valueobj.apply(each, arguments);
};
