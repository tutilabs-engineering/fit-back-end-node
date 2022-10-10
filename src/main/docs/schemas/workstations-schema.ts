export const workstations = {
  type: 'object',
  properties: {
    workstation_name: {
      type: 'string',
    },
    Used_tools: {
      type: 'object',
      properties: {
        pliers: {
          type: 'boolean',
        },
        box_cutter: {
          type: 'boolean',
        },
        screen_printing: {
          type: 'boolean',
        },
        outros: {
          type: 'string',
        },
      },
      required: ['pliers', 'box_cutter', 'screen_printing'],
    },
    Safety: {
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
        sap_code: {
          type: 'number',
        },
        description: {
          type: 'string',
        },
        quantity: {
          type: 'number',
        },
      },
    },
    Devices: {
      type: 'array',
      items: {
        description: 'string',
        code: 'string',
        quantity: 'number',
      },
    },
    specifics_requirements_client: {
      type: 'array',
      items: {
        description: 'string',
      },
    },
    Images_operations: {
      type: 'array',
      items: {
        description: 'string',
      },
    },
    Images_package_description: {
      type: 'array',
      items: {
        description: 'string',
      },
    },
    Images_final_product: {
      type: 'array',
      items: {
        description: 'string',
      },
    },
  },
  required: [
    'workstation_name',
    'Used_tools',
    'Safety',
    'materials',
    'Devices',
    'specifics_requirements_client',
    'Images_operations',
    'Images_package_description',
    'Images_final_product',
  ],
}
