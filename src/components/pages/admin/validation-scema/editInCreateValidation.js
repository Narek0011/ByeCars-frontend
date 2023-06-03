import * as yup from "yup";

export const schema = yup.object({
  brand_id: yup.string().required(),
  model: yup.string().required(),
  petrol: yup.string().required(),
  sedan: yup.string().required(),
  box: yup.string().required(),
  year: yup.string().required(),
  location: yup.string().required(),
  mileage: yup.number().required().typeError('Mileage must be a number.'),
  price: yup.number().required().typeError('Price must be a number.'),
  sale: yup.number().required().typeError('Sale must be a number.'),
});