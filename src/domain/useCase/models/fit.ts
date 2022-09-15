export type FitModel = {
  id: string
  product_description: string
  mold: string
  product_code: string
  client: string
  date: Date
  process: string
  Controller_attention_point: Controller_attention_point[]
  Workstations: workstations[]
}

type Controller_attention_point = {
  evaluation_technique: string
  control_method: string
  sample: string
  reaction_plan: string
  requirements: string
  specifications: string
}

type workstations = {
  specifics_requirements_client: specifics_requirements_client[]
  Devices: devices[]
  Used_tools: used_tools
  img_layout_path: string
  Safety: safety
  materials: materials[]
  Image_operation: operation[]
  Image_final_product: final_product[]
  Image_package_description: package_description[]
}
type materials = {
  sap_code: string
  description: string
  quantity: number
}

type specifics_requirements_client = {
  description: string
}

type devices = {
  description: string
  code: string
  quantity: number
}

type used_tools = {
  pliers: boolean
  box_cutter: boolean
  screen_printing: boolean
  outros: string
  workstationId: number
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

type operation = {
  img_path: string
  description: string
}

type final_product = {
  img_path: string
  description: string
}

type package_description = {
  img_path: string
  description: string
}
