import defaultTheme from 'tailwindcss/defaultTheme'

import { getIconCollections, iconsPlugin } from '@egoist/tailwindcss-icons'

export default <Partial<any>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'DM Sans fallback', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    iconsPlugin({
      // Select the icon collections you want to use
      collections: getIconCollections(['fa-brands', 'heroicons', 'ph', 'ic', 'logos']),
    }),
  ],
}
