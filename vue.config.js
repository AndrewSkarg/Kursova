const path = require('path');
module.exports = {
configureWebpack: {
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'assets/img',
                publicPath: '/assets/img' // Specify the public path for images

              }
            }
          ]
        }
      ]
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000'
      }
    }
  },

    
        
};
