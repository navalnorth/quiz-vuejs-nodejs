const webpack = require('webpack');

module.exports = {
  // Indique le chemin d'accès pour le déploiement
  publicPath: process.env.NODE_ENV === 'production' ? '/<nom-du-projet>/' : '/',
  
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false), // Cette ligne est déjà ajoutée
      })
    ]
  }
};
