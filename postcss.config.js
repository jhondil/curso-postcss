module.exports = {
  plugins: [
     require('postcss-preset-env')({
     autoprefixer:{
       grid:true,
       stage:1,
     }
    }),
    require('stylelint'),
    require('postcss-custom-selectors'),
    require('postcss-apply'),
    require('postcss-import'),    
    require('postcss-nesting'),
    require('stylelint'),
    require('postcss-font-magician')({
      variants: {
        'Lato':{
          '300': ['woff'],
          '400': []
        }
      }
    }),
    require('postcss-custom-media')({
      preserve: false,
  }),
  require('cssnano'),
 
  ]
}