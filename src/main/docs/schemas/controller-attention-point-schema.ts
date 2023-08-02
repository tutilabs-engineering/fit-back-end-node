export const controllerAttentionPoint = {
  type: 'object',
  properties: {
    specifications: {
      type: 'string',
    },
    evaluation_technique: {
      type: 'string',
    },
    sample: {
      type: 'string',
    },
    reaction_plan: {
      type: 'string',
    },
    ce: {
      type: 'string',
    },
  },
  required: [
    'specifications',
    'evalutaion_technique',
    'sample',
    'reaction_plan',
  ],
}
