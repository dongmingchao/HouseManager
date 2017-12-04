function mix(str) {
    var secret = Math.round(Math.random()*9+1);
    var finpass=[];
    for(var i=0;i<str[1].length;i+=secret){
        finpass.push(str[1].slice(i,i+secret));
    }
    finpass=finpass.join(str[0]);
    return {
        account:str[0],
        passwd:finpass,
        secret:secret
    };
}
exports.mix=mix;