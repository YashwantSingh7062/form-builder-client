import { useState } from 'react';
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import { Modal, Button, Container } from 'react-bootstrap';
import { toast } from "react-toastify";

// Components
import Loading from '../Loader';
import AddQuestionModal from '../AddQuestionModal';
// Shared Components
import FormikControl from '../../shared/components/FormikControl';
// Validation
import { AddFormSchema } from '../../shared/validations';
// Query
import { NEW_FORM_FRAGMENT } from '../../shared/query/sharedFragment';
import { ADD_FORM } from '../../shared/query';

function AddFormModal(props) {
    const [formId, setFormId] = useState(0);
    const [modalShow, setModalShow] = useState(false);
    const [addForm, { loading }] = useMutation(ADD_FORM, {
        onCompleted: (data) => {
            setFormId(data.addForm.form._id)
            // toast(data.addForm.message);
            props.onHide();
            setModalShow(true);
        },
        update(cache, { data: { addForm } }) {
            cache.modify({
                fields: {
                    forms(existingForm = {}, options) {
                        const newFormRef = cache.writeFragment({
                            data: addForm.form,
                            fragment: NEW_FORM_FRAGMENT,
                        });
                        return {
                            ...existingForm,
                            forms: [newFormRef, ...existingForm.forms]
                        };
                    },
                },
            });
        },
    });

    if (loading) return <Loading />
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create New Form
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="py-3">
                        <Formik
                            initialValues={{ name: "" }}
                            onSubmit={(values) => addForm({ variables: { form: values } })}
                            validationSchema={AddFormSchema}
                        >
                            {(formik) => (
                                <Form>
                                    <FormikControl
                                        control="input"
                                        parentClass="form-group"
                                        name="name"
                                        className={`form-control ${formik.touched.name && formik.errors.name && "is-invalid"}`}
                                        placeholder="Name"
                                        required
                                    />
                                    <div className="form-group mt-3">
                                        <button type="submit" className="btn btn-primary w-100" >Add Questions</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Container>
                </Modal.Body>
            </Modal>

            <AddQuestionModal
                formId={formId}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default AddFormModal;
