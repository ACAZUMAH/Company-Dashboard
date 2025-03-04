import { GraphQLFormattedError  } from 'graphql'

type Error = {
    message: string,
    statusCode: string
}

export const getGraphqlErrors = (body: Record<'errors', GraphQLFormattedError[] | undefined>): Error | null => {
    if(!body){
        return {
            message: 'Unknown error',
            statusCode: "INTERNAL_SERVER_ERROR"
        }
    }

    if('errors' in body){
        const errors = body?.errors

        const messages = errors?.map((error) => error?.message)?.join('')
        const code = errors?.[0].extensions?.statusCode

        return {
            message: messages || JSON.stringify(errors),
            statusCode: code || 500
        }
    }

    return null
}