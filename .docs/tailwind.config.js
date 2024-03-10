/* eslint-disable node/prefer-global/process */
module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './**/*.{js,vue,ts,md}',
    ],
    options: {
      safelist: ['html', 'body'],
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    prefix: 'oku-',
  },
}
