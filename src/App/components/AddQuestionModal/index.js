import { Formik, Form, FieldArray, Field } from "formik";
import { useMutation } from "@apollo/client";
import { Modal, Container } from 'react-bootstrap';
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons'

// Components
import Loading from '../Loader';
// Shared Components
import FormikControl from '../../shared/components/FormikControl';
// Validation
import { AddQuestionSchema } from '../../shared/validations';
// Query
import { ADD_QUESTION } from '../../shared/query';
// Css
import styles from './addQuestion.module.css';

function AddQuestionModal({ formId, ...modalProps }) {
    const [addQuestions, { loading }] = useMutation(ADD_QUESTION, {
        onCompleted: (data) => {
            modalProps.onHide();
            toast(data.addQuestions.message);
        }
    });
    const addQuestionsArr = (values) => {
        addQuestions({ variables: { question: { form: formId, ...values } } })
    }

    if (loading) return <Loading />
    return (
        <Modal
            {...modalProps}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Questions
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className="pb-3">
                    <Formik
                        initialValues={{ questions: [{ question_type: "", question: "", answer: [""] }] }}
                        onSubmit={addQuestionsArr}
                        validationSchema={AddQuestionSchema}
                    >
                        {(formik) => {
                            let { values, touched, errors } = formik;

                            return (<Form>
                                <FieldArray
                                    name="questions"
                                    render={arrayHelpers => (
                                        <>
                                            <button
                                                type="button"
                                                className={`btn btn-info mb-2 ${styles.float_right}`}
                                                onClick={() => arrayHelpers.push({ question: '', question_type: '', answer: [""] })}
                                            >
                                                <FontAwesomeIcon icon={faPlus} /> New Question
                                        </button>
                                        <div className={styles.float_clearfix}></div>
                                            <div>
                                                {values.questions.map((question, index) => (
                                                    <div key={index} className="border p-3 my-3">
                                                        <h5 className={`${styles.float_left} mb-3`}>Question {index + 1}</h5>
                                                        {index != 0 && 
                                                            <a className={`${styles.answerButtons} ${styles.float_right} mb-2`} onClick={() => arrayHelpers.remove(index)}>
                                                                <FontAwesomeIcon icon={faTrashAlt} />
                                                            </a>
                                                        }
                                                        
                                                        <FormikControl
                                                            control="input"
                                                            parentClass="form-group my-2"
                                                            name={`questions[${index}].question`}
                                                            className={`form-control `}
                                                            placeholder="Question"
                                                            required
                                                        />
                                                        <FormikControl
                                                            control="select"
                                                            options={[
                                                                { value: "", key: "Select Question Type" },
                                                                { value: "drop_down", key: "Drop Down" },
                                                                { value: "text", key: "Text" },
                                                                { value: "multi_choice", key: "Multichoice Checkbox" },
                                                                { value: "radio", key: "Single Select Radio" }
                                                            ]}
                                                            parentClass="form-group my-2"
                                                            name={`questions[${index}].question_type`}
                                                            className={`form-control`}
                                                            placeholder="Question Type"
                                                            required
                                                        />
                                                        {
                                                        question.question_type &&
                                                             <FieldArray
                                                            name={`questions[${index}].answer`}
                                                            render={answerHelper => {
                                                                if(question.question_type == "text" && values.questions[index].answer.length > 1) {
                                                                    for(let i = 1; i <= values.questions[index].answer.length - 1; i++ ){
                                                                       answerHelper.remove(i); 
                                                                    }
                                                                }
                                                                return(<div>
                                                                    {values.questions[index].answer && values.questions[index].answer.length > 0 ? (
                                                                        values.questions[index].answer.map((option, answerIndex) => (
                                                                            <div key={answerIndex}>
                                                                                {
                                                                                question.question_type == 'text' ?
                                                                                    <FormikControl
                                                                                        control="input"
                                                                                        parentClass="form-group my-2 "
                                                                                        name={`questions.[${index}].answer.${answerIndex}`}
                                                                                        className={`form-control`}
                                                                                        placeholder="Write Here...."
                                                                                        required
                                                                                    />
                                                                                :
                                                                                <div className="row">
                                                                                    <div className="col-10">
                                                                                        <FormikControl
                                                                                            control="input"
                                                                                            parentClass="form-group my-2"
                                                                                            name={`questions.[${index}].answer.${answerIndex}`}
                                                                                            className={`form-control`}
                                                                                            placeholder="Option"
                                                                                            required
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-1 pt-2">
                                                                                        <a className={styles.answerButtons}
                                                                                            onClick={() => answerHelper.remove(answerIndex)}
                                                                                        >
                                                                                            <FontAwesomeIcon icon={faTrashAlt} />
                                                                                        </a>
                                                                                    </div>
                                                                                    <div className="col-1 pt-2">
                                                                                        <a className={styles.answerButtons}
                                                                                            onClick={() => answerHelper.insert(answerIndex + 1, '')}><FontAwesomeIcon icon={faPlus} /></a>
                                                                                    </div>
                                                                                </div>
                                                                                }
                                                                            </div>
                                                                        ))
                                                                    ) : (
                                                                            <a className={`${styles.anchor_tag} my-2 mr-2`} onClick={() => answerHelper.push('')}>
                                                                                Add options
                                                                            </a>
                                                                        )}
                                                                </div>)
                                                            }}
                                                        />
                                                            }
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                />
                                <div className="form-group mt-3">
                                    <button type="submit" className="btn btn-primary w-100" >Submit</button>
                                </div>
                            </Form>
                            )
                        }}
                    </Formik>
                </Container>
            </Modal.Body>
        </Modal>
    );
}

export default AddQuestionModal;
