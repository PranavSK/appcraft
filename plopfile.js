export default function (/** @type {import('plop').NodePlopAPI} */ plop) {
  plop.setGenerator('ui', {
    description: 'UI Component Scaffolding',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the component name?',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'src/features/ui/{{kebabCase name}}',
        templateFiles: '.templates/ui/*.hbs',
        base: '.templates/ui',
      },
    ],
  });

  plop.setGenerator('applet-node', {
    description: 'Applet Node Scaffolding',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the node name?',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'src/features/nodes/{{kebabCase name}}-node',
        templateFiles: '.templates/node/*.hbs',
        base: '.templates/node',
      },
    ],
  });
}
