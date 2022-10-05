import {
  signUpPath,
  findById,
  listOnApproval,
  listHomologated,
  homologation,
  versionFit,
  disableFit,
} from './paths/'

export default {
  '/signup': signUpPath,
  '/list-on-approval': listOnApproval,
  '/view-specific/{id}': findById,
  '/homologation/{id}': homologation,
  '/list-homologated': listHomologated,
  '/cancel/{id}': disableFit,
  '/versioning': versionFit,
}
