var globals = require('./globals');


exports.get = function(req, res){
  res.render('results', {
    title: 'Results',
    pageid: 'resultspage',
    ingrlist: req.session.outtext,
    matchcount: req.session.matchcount,
    cache: false
  })
}