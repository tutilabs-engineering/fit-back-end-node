export type FitModel = {
  id: number
  mold: string
  product_code: string
  client: string
  date: Date
  process: string
  Attention_point_control: Attention_point_control
  workstations: workstations
  homologation: homologation
}

type Attention_point_control = {
  technician: string
  control_method: string
  sample: string
  reaction_plan: string
}
type workstations = [
  {
    requirements_and_specifications: requirements_and_specifications
    specifics_requirements_client: specifics_requirements_client
    devices: devices
    used_tools: used_tools
    img_layout_path: img_layout_path
    safety: safety
    operation: operation
    final_product: final_product
    package_description: package_description
  }
]
type requirements_and_specifications = [
  {
    requirements: string
    specifications: string
  }
]
type specifics_requirements_client = [
  {
    requirements: string
  }
]
type devices = [
  {
    description: string
    code: string
    quantity: number
  }
]

type used_tools = {
  pliers: boolean
  box_cutter: boolean
  scree_printing: boolean
  outros: string
}

type img_layout_path = {
  img: string
}

type safety = {
  helmet: boolean
  earplug: boolean
  safety_goggles: boolean
  safety_gloves: boolean
  safety_mask: boolean
  safety_boot: boolean
  outros: string
}

type operation = [
  {
    img: string
    description: string
  }
]

type final_product = [
  {
    img: string
    description: string
  }
]
type package_description = [
  {
    img: string
    description: string
  }
]
type homologation = [
  {
    user_created: JSON
    user_homologation: JSON
  }
]
