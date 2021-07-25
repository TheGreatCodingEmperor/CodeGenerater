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

//read file
const readFile = './Models/Documents/FirstDocument.cs';
fs.readFile(readFile,(err,data)=>{
    if(err){
        console.log(err);
    }
    else{
        // console.log(data);//byte array
        // console.log(data.toString());
        let content = data.toString();
        var re = /(public|private|protected)?\s+[a-z]*\??\s+[a-zA-Z_]*\s+{\s*get;\s*set;\s*}/g;
        let found = content.match(re);
        console.log(found)
        for(var property of found){
            var scope_type = /(public|private|protected)?\s+[a-z]*\??/;
            var body = /[a-zA-Z_]*/;
            var bottom = /{\s*get;\s*set;\s*}/;
            let p = property.replace(/(public|private|protected)?\s+[a-z]*\??/,'').replace(/{\s*get;\s*set;\s*}/,'').trim();    
            let type = property.replace(/(public|private|protected)?/,'').replace(/[a-zA-Z_]*\s+{\s*get;\s*set;\s*}/,'').trim();
            console.log(type,p,camelCase(p));
        }
    }
})