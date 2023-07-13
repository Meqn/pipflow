module.exports = {
  build: {
    fileHash: false
  },
  tasks: [
    {
      type: 'html',
      input: './src/views/**/*.{html,htm,art,ejs}',
      base: './src/views',
      compiler: 'artTemplate',
      compilerOptions: {
        data: {
          title: 'pipFlow',
          author: 'Merven',
          content: 'The pipflow is a great framework',
          year: '2024',
        }
      }
    },
    {
      type: 'style',
      input: './src/styles/*.{scss,sass,css}',
      compiler: 'sass',
    },
    {
      type: 'script',
      input: './src/scripts/*.{js,mjs}',
      compiler: 'babel',
      module: true
    }
  ]
}
