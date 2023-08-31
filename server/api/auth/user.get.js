import { entityTransformer } from "../../transformers/entity"

export default defineEventHandler((e) => {
return {
    user: entityTransformer(e.context.auth?.user, ['password'])
}
}) 