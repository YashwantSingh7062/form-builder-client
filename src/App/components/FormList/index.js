import { Card, Table, Container } from 'react-bootstrap';
import { useQuery, useMutation } from "@apollo/client";
import {Link} from 'react-router-dom';

// Components
import Loading from '../Loader';
// Queries
import { FORMS } from '../../shared/query';
// Configs
import configs from '../../shared/configs';

const FormList = () => {
    const { data, error, loading } = useQuery(FORMS, { variables: { offset: 0, limit: 10 } });

    if (loading) return <Loading />
    return (<Container>
        <Card>
            <Card.Body>
                <Card.Title>Form Lists</Card.Title>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Url</th>
                            <th>Generated At</th>
                            <th>Total Responses</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.forms.forms.map(form => (
                                <tr key={form._id}>
                                    <td>1</td>
                                    <td title={form.name}>{configs.truncateString(form.name)}</td>
                                    <td> <Link to={`/${form.slug}`}>{form.slug}</Link></td>
                                    <td>{form.createdAt}</td>
                                    <td>{form.total_response}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    </Container>)
}

export default FormList;