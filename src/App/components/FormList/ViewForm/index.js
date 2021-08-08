import { Card, Table, Container } from 'react-bootstrap';
import { useQuery, useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import { useParams } from 'react-router-dom'
import {toast } from 'react-toastify';

// Components
import Loading from '../../Loader';
// Queries
import { FORM, SUBMIT_FORM } from '../../../shared/query';
// Configs
import configs from '../../../shared/configs';
// Shared Components
import FormikControl from '../../../shared/components/FormikControl';

const FormList = () => {
     let { slug } = useParams();
    const { data, error, loading } = useQuery(FORM, { variables: { slug } });
     const [sumbitForm, { loading: sumbitLoading }] = useMutation(SUBMIT_FORM, {
        onCompleted: (data) => toast(data.sumbitForm.message)
    });

    const submitFormValues = (values) => sumbitForm({variables: {slug}})

    if (loading || sumbitLoading) return <Loading />
    return (<Container>
        <Card>
            <Card.Body>
                <Card.Title className="text-center my-3">{data?.form.name}</Card.Title>
                 <Formik
                    initialValues={{ name: "" }}
                    onSubmit={submitFormValues}
                >
                    {(formik) => (
                        <Form>
                            {
                                data?.form.questions.map((question) => {
                                    if(question.question_type == "drop_down"){
                                        return (
                                            <FormikControl
                                                control="select"
                                                options={[{key: `Please select value`, value: ""}, ...question.answer.map((answer, index) => ({key:answer , value: index}))]}
                                                parentClass="form-group my-4"
                                                name={question._id}
                                                label={question.question}
                                                className={`form-control`}
                                                placeholder={question.question}
                                                required
                                                key={question._id}
                                            />
                                        )
                                    }else if(question.question_type == "radio"){
                                        return (
                                             <FormikControl
                                                control="radio"
                                                options={question.answer.map((answer, index) => ({key:answer , value: `${index}`}))}
                                                parentClass="form-group my-4"
                                                name={question._id}
                                                label={question.question}
                                                className={`form-control`}
                                                key={question._id}
                                                required
                                            />
                                        )
                                    }else if(question.question_type =="multi_choice"){
                                        return (
                                             <FormikControl
                                                control="checkbox"
                                                options={question.answer.map((answer, index) => ({key:answer , value: `${index}`}))}
                                                parentClass="form-group my-4"
                                                name={question._id}
                                                label={question.question}
                                                className={`form-control`}
                                                key={question._id}
                                                required
                                            />
                                        )
                                    }else{
                                        return (
                                            <FormikControl
                                                control="input"
                                                parentClass="form-group my-2"
                                                name={question._id}
                                                className={`form-control`}
                                                placeholder={question?.question}
                                                label={question?.question}
                                                key={question._id}
                                                required
                                            />
                                        )
                                    }
                                })
                            }

                            
                            <div className="form-group mt-3">
                                <button type="submit" className="btn btn-primary w-100" >Submit</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>
    </Container>)
}

export default FormList;