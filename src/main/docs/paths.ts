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
  '/view-specific/{id}': findById,
  '/list-homologated': listHomologated,
  '/homologation/{id}': homologation,
}
