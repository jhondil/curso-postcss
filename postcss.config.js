module.exports = {
  plugins: [
     require('postcss-preset-env')({
     autoprefixer:{
       grid:true,
       stage:1,
     }
    }),
    require('postcss-apply'),
    require('postcss-custom-media')({
      preserve: false,
  }),
  require('postcss-custom-selectors')
  ]
}