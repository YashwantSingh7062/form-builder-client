import * as Yup from "yup";

export const AddFormSchema = Yup.object().shape({
    name: Yup
        .string()
        .trim("Name cannot include leading and trailing spaces")
        .strict(true)
        .min(3, ({ min }) => `Name must be at least ${min} characters`)
        .max(150, ({ max }) => `Name must be less than ${max} characters`)
        .required("Name is required"),
});

export const AddQuestionSchema = Yup.object().shape({
    questions: Yup.array()
        .of(
            Yup.object().shape({
                question: Yup.string().min(4, 'too short!!').required('Question is Required'),
                question_type: Yup.string().required('Please select question type.'),
                answer: Yup.array()
                        .of(
                            Yup.string().required('Value should not be empty!.')
                        )
                        .required('Must have options')
                        .min(1, 'Minimum of 1 Options'),
            })
        )
        .required('Must have Question.') 
        .min(1, 'Minimum of 1 Question'),
});