import {
  signUpPath,
  findById,
  listOnApproval,
  listHomologated,
  homologation,
} from './paths/'

export default {
  '/signup': signUpPath,
  '/list-on-approval': listOnApproval,
  '/view-specific': findById,
  '/list-homologated': listHomologated,
  '/homologation': homologation,
}
