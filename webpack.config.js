const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "supplilink",
    projectName: "sign-in",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    externals: [
      'react',
      'react-dom',
      '@mui/material',
      '@mui/icons-material',
      '@emotion/styled',
      '@emotion/react'
    ],
    devServer: {
      port: 8081, // Specify your desired port here
      historyApiFallback: true, // Optional: for Single Page Application routing
    }
    // modify the webpack config however you'd like to by adding to this object
  }
);
};
