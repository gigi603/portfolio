module.exports = {
  chainWebpack: (config) => {
    // Règles pour les fichiers Vue
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .end()

    // Règles pour les fichiers JavaScript
    config.module
      .rule('js')
      .use('babel-loader')
      .loader('babel-loader')
      .tap((options) => {
        // Modifier les options de babel-loader si nécessaire
        return options;
      });
  },
};