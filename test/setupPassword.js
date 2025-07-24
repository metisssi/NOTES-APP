const passport = require('passport');

function mockGooglePassport() {
  jest.spyOn(passport, 'authenticate').mockImplementation((strategy, options, callback) => {
    console.log('Mocked passport.authenticate called:', strategy, options, typeof callback);
    
    if (strategy === 'google') {
      // Случай вызова с options.scope — начальный редирект
      if (options && options.scope) {
        return (req, res) => {
          res.redirect('https://accounts.google.com/o/oauth2/v2/auth?mocked=true');
        };
      }
      
      // Случай, когда options — функция, т.е. коллбек (callback)
      if (typeof options === 'function') {
        // options здесь — это callback
        return (req, res, next) => {
          const user = req.query.success === 'true' ? { id: 1 } : false;
          options(null, user, null); // вызываем коллбек
          if (user) {
            return res.redirect('/dashboard');
          } else {
            return res.redirect('/login-failure');
          }
        };
      }
      
      // Случай, когда options — объект с successRedirect и failureRedirect
      if (options && (options.successRedirect || options.failureRedirect)) {
        return (req, res) => {
          if (req.query.success === 'true') {
            return res.redirect(options.successRedirect);
          } else {
            return res.redirect(options.failureRedirect);
          }
        };
      }
    }

    // Если не google или что-то другое — пропускаем дальше
    return (req, res, next) => next();
  });
}

module.exports = { mockGooglePassport };
