export const controllerAttentionPoint = {
  type: 'object',
  properties: {
    technician: {
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
  required: ['technician', 'control_method', 'sample', 'reaction_plan'],
}
