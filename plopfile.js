export default function (/** @type {import('plop').NodePlopAPI} */ plop) {
  plop.setGenerator('feature', {
    description: 'Feature Component Scaffolding',
    prompts: [
      {
        type: 'input',
        name: 'category',
        message: 'What is the component category?',
        default: 'ui',
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is the component name?',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'src/features/{{kebabCase category}}/{{kebabCase name}}',
        templateFiles: '.templates/feature/*.hbs',
        base: '.templates/feature',
      },
    ],
  });
}
