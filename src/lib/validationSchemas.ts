import * as Yup from 'yup';

export const AddContactSchema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  address: Yup.string().required(),
  description: Yup.string().required(),
  image: Yup.string().url().required(),
  owner: Yup.string().required(),
});

export const AddNoteSchema = Yup.object({
  note: Yup.string().required(),
  owner: Yup.string().required(),
  contactId: Yup.number().required(),
});

export const EditContactSchema = Yup.object({
  id: Yup.number().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  address: Yup.string().required(),
  description: Yup.string().required(),
  image: Yup.string().url().required(),
  owner: Yup.string().required(),
});
