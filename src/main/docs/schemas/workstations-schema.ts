export const workstations = {
  type: 'object',
  properties: {
    workstation_name: {
      type: 'string',
    },
    requirements_and_specifications: {
      type: 'array',
      items: {
        $ref: '#/schemas/requirements_and_specifications',
      },
    },
    specifics_requirements_client: {
      type: 'array',
      items: {
        $ref: '#/schemas/specifics_requirements_client',
      },
    },
    devices: {
      type: 'array',
      items: {
        $ref: '#/schemas/devices',
      },
    },
    used_tools: {
      type: 'object',
      properties: {
        pliers: {
          type: 'boolean',
        },
        box_cutter: {
          type: 'boolean',
        },
        scree_printing: {
          type: 'boolean',
        },
        outros: {
          type: 'string',
        },
      },
      required: ['pliers', 'box_cutter', 'scree_printing'],
    },
    safety: {
      type: 'object',
      properties: {
        helmet: {
          type: 'boolean',
        },
        earplug: {
          type: 'boolean',
        },
        safety_goggles: {
          type: 'boolean',
        },
        safety_gloves: {
          type: 'boolean',
        },
        safety_mask: {
          type: 'boolean',
        },
        safety_boot: {
          type: 'boolean',
        },
        outros: {
          type: 'string',
        },
      },
      required: [
        'helmet',
        'earplug',
        'safety_goggles',
        'safety_gloves',
        'safety_mask',
        'safety_boot',
      ],
    },
    materials: {
      type: 'array',
      items: {
        $ref: '#/schemas/devices',
      },
    },
  },
  required: [
    'workstation_name',
    'requirements_and_specifications',
    'specifics_requirements_client',
    'devices',
    'img_layout_path',
  ],
}
