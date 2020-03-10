var mongoose = require('mongoose')

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
   
        useUnifiedTopology : true
   }
   mongoose.connect('mongodb+srv://Flozemma:Astuce69@cluster0-pxxdj.mongodb.net/masanteaunaturel',
    options,    
    function(err) {
     console.log(err);
    }
   );

   module.exports = mongoose