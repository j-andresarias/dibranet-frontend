const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname+'/dist/pagos-dibranet'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/pagos-dibranet/index.html'));
});

app.listen(process.env.PORT || 8080);
