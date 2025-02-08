const { SafetryTransformer } = require('../transform');

const safetryPlugin = {
  name: 'safetry',
  setup(build) {
    const transformer = new SafetryTransformer();

    build.onLoad({ filter: /\.(js|ts)$/ }, async (args) => {
      const fs = require('fs/promises');
      const contents = await fs.readFile(args.path, 'utf8');

      if (!contents.includes('safetry')) {
        return { contents };
      }

      const { code, error } = transformer.transform(contents);
      
      if (error) {
        return {
          errors: [{
            text: `Failed to transform safetry syntax: ${error.message}`,
            location: error.loc ? {
              file: args.path,
              line: error.loc.line,
              column: error.loc.column,
            } : null,
          }],
        };
      }

      return { contents: code };
    });
  },
};

module.exports = { safetryPlugin };