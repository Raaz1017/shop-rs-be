import {CreateProductPayload} from '../handlers/createProduct';
import Joi, {ObjectSchema, ValidationResult} from 'joi';

export class Validator {
    public createBodyPayload(payload: CreateProductPayload): ValidationResult {
        const schema: ObjectSchema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().min(0).required(),
            count: Joi.number().min(0).required(),
        })

        return schema.validate(payload);
    }

    public validateUUID(uuid: string): ValidationResult {
        const schema = Joi.string().guid({
            version: [
                'uuidv4',
            ]
        });

        return schema.validate(uuid);
    }
}

export const validator = new Validator();