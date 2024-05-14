module.exports = {
  
    selectOption : function (status, options) {
        
        return options.fn(this).replace(new RegExp('value=\"'+status+'\"'), '$&selected="selected"');
    },
    
    // isEmpty: function (obj) {
    //     for(let key in obj) {
    //         if(obj.hasOwnProperty(key)) {
    //             return false;
    //         }
    //     }
        
    //     return true;
    // }

    isEmpty: function (obj) {
        console.log('Checking if object is empty:', obj);
    if (!obj || Object.keys(obj).length === 0) {
        return true; // Handle null, undefined, or empty objects
    }
    return false;
    }
    
    
    
};