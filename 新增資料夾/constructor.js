//#region files
const fs = require('fs');

function camelCase(str){
    if(str){
        return str[0].toLowerCase()+str.substring(1,str.length);
    }
    else{
        return '';
    }
}

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

//read file
const readFile = './Models/Documents/FirstDocument.cs';
fs.readFile(readFile,(err,data)=>{
    if(err){
        // console.log(err);
    }
    else{
        let content = data.toString();
        var classStr = /(public|private|protected)?\s+class\s+[a-zA-Z_]*\s+{/g;
        var re = /(public|private|protected)?\s+[a-z]*\??\s+[a-zA-Z_]*\s+{\s*get;\s*set;\s*}/g;
        let found = content.match(classStr);
        console.log(content.indexOf(found[0]))
        content = content.splice(content.indexOf(found[0])+found[0].length,0,"\r\nhello");
        console.log(content)
        // for(var property of found){
        // }
    }
})