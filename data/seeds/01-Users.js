const bcrypt = require('bcryptjs');
const passwordStrength = 8;

exports.seed = function(knex) {
  return knex('Users').insert([
    {
      //id: 1,
      Email: 'pauledwards@gmail.com',
      Password: bcrypt.hashSync('bwptptumts2!', passwordStrength),
      FirstName: 'Paul',
      LastName: 'Edwards',
      Location: 'Brea, California',
      ImagePath: 'https://lh3.googleusercontent.com/u8vwOmXSdzQWjC6SO6hzySVPC5yktNnmfdn0vbNtPeWhswq9f0sneO_hDOD2ydXd-uKR6v3BhTIfSb7kuYk1nmz6UJcpywwbPPxdmp2Unpc8HmddRFMnggUKbIrDlDc2XZBQ0JoW_FCUQDgHKxFhdBOSvTsAwREV_ROtkCtwslKUlZnnCqjErG-2NXHB65e2mPBzqf9O6f2dvvmIQMbToTpc1d2qKk2s03EfS8xRyLaGmNKnjxLDzNV3CRaGRqJ_kuYVe1KAZUkUslliU8JSZCRmSBXIm-eL0AXH_JM_eEFRrYPi4Ii3wWIvyM7wM-RadwRtqqqPccws2leCdPypecgtKWRAHTBxjoaGdyTQtpbFzmXX9jcRuIPg-EwdFpoMHLcvXG36plYxGsh0ODIeXLc0o57fLgoAq_fTCAxGkWDNJeXQQQ5HgA8dX8QOIwcrOGRpHf4Av-b67UhVPEaRh76IGxRUsDgqbEWfOfKvNPIaStyqWvGtPxj8WNp6GD2S25zf3MKA3R8LecDSjFpFVBG8s4Yad1hWwm7rXgo_DSN1UmmUmpf_Vg1aJ4D8sVF8VyLi17NOnsg5CEVZmj-qa0J-JpAB3fPlFXnbVDuVOGgVYAsIpE9_Y1L2yIDi0KyFOHfL2YtfO3sf-mV9WIPQVNVRQ4Ls5Wcq6bPh8tH_rVwD6XKTd1e7MyA=s915-no',
      Phone: '+1.909.235.9872'
    },
    {
      //id: 2,
      Email: 'kimberly.a.edwards@gmail.com',
      Password: bcrypt.hashSync('<3_W!f3y', passwordStrength),
      FirstName: 'Kimberly',
      LastName: 'Edwards',
      Location: 'Brea, California'
    },
  ]);
};
