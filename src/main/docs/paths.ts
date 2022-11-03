import {
  signUpPath,
  findById,
  findByCode,
  listOnApproval,
  listHomologated,
  updateFit,
  homologation,
  versionFit,
  disableFit,
} from './paths/'

export default {
  '/signup': signUpPath,
  '/list-on-approval': listOnApproval,
  '/view-specific/{id}': findById,
  '/view-specific/': findByCode,
  '/homologation/{id}': homologation,
  '/update/{id}': updateFit,
  '/list-homologated': listHomologated,
  '/cancel/{id}': disableFit,
  '/versioning': versionFit,
}
