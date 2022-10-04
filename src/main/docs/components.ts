import { apiKeyAuthSchema } from './schemas/'
import {
  badRequest,
  serverError,
  unauthorized,
  success,
  forbidden,
} from './components/'

export default {
  securitySchemes: {
    bearerAuth: apiKeyAuthSchema,
  },
  success,
  forbidden,
  badRequest,
  serverError,
  unauthorized,
}
