import { useState } from 'react';
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router,  Switch, Route, Link} from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from './shared/graphql';

import MyNav from './components/Navbar';
import AddFromModal from './components/AddFormModal';
import FormList from './components/FormList';
import ViewForm from './components/FormList/ViewForm'

import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './App.module.css';

//Image
import Add_Icon from '../assets/plus.png'

function App() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Router>
    <ApolloProvider client={client}>
      {/* Toast */}
      <ToastContainer />
      {/* Add Form Modal */}
      <AddFromModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      {/* Navbar */}
      <MyNav />
      <a onClick={() => setModalShow(true)}>
        <div className={styles.add_form_div}>
          <img src={Add_Icon} alt="Add" className={styles.add_form_button_img} />
          <p className="text-muted mt-2">Add More Forms</p>
        </div>
      </a>
       <Switch>
          <Route path="/" exact>
            <FormList />
          </Route>
          <Route path="/:slug" exact>
            <ViewForm />
          </Route>
        </Switch>
    </ApolloProvider>
    </Router>
  );
}

export default App;
