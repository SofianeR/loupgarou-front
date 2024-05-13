const { query, body, validationResult } = require('express-validator');

const signupValidator = [
    [
        [
          body("username").notEmpty().isLength({min: 4, max: 255}),
          body("email").isEmail(),
          body("password").notEmpty().isLength({min: 4, max: 255}),
        ],
    ],
      async (req, res, next) => {
        const errors = validationResult(req);
      
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }

          // todo: formatter un message d'erreur
          next()
      }
]

const signinValidator = [
  [
      [
        body("username").notEmpty().isLength({min: 4, max: 255}),
        body("password").notEmpty().isLength({min: 4, max: 255}),
      ],
  ],
    async (req, res, next) => {
      const errors = validationResult(req);
    
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
          // todo: formatter un message d'erreur
        next()
    }
]

module.exports = {
  signupValidator,
  signinValidator
}