module.exports = {
  plugins: [
     require('postcss-preset-env')({
     autoprefixer:{
       grid:true,
       stage:1,
     }
    }),
    require('postcss-custom-selectors'),
    require('postcss-apply'),
    require('postcss-import'),    
    require('postcss-nesting'),
    require('postcss-custom-media')({
      preserve: false,
  })
 
  ]
}