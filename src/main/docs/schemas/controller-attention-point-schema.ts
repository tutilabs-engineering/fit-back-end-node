export const controllerAttentionPoint = {
  type: 'object',
  properties: {
    requirements: {
      type: 'string',
    },
    specifications: {
      type: 'string',
    },
    evalutaion_technique: {
      type: 'string',
    },
    control_method: {
      type: 'string',
    },
    sample: {
      type: 'string',
    },
    reaction_plan: {
      type: 'string',
    },
  },
  required: [
    'requirements',
    'specifications',
    'evalutaion_technique',
    'control_method',
    'sample',
    'reaction_plan',
  ],
}
