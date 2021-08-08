import { gql } from "@apollo/client";
import { NEW_FORM_FRAGMENT } from './sharedFragment';

export const FORMS = gql`
  ${NEW_FORM_FRAGMENT}
  query forms( $limit: Int!, $offset: Int!) {
    forms(limit: $limit, offset: $offset){
      forms{
       ...NewForm
      }
      pageInfo{
        offset
      }
    }
  }
`;

export const FORM = gql`
  ${NEW_FORM_FRAGMENT}
  query form( $slug: String!) {
    form(slug: $slug){
      ...NewForm
       questions {
        _id
        question
        question_type
        answer
      }
    }
  }
`;

export const ADD_FORM = gql`
  ${NEW_FORM_FRAGMENT}
  mutation AddFormMutation($form: FormInput!) {
    addForm(form: $form){
      message
      form{
        ...NewForm
      }
    }
  }
`;

export const ADD_QUESTION = gql`
  ${NEW_FORM_FRAGMENT}
  mutation AddQuestionsMutation($question: QuestionInput!) {
    addQuestions(question: $question){
      message
      form{
        ...NewForm
      }
    }
  }
`;

export const SUBMIT_FORM = gql`
  ${NEW_FORM_FRAGMENT}
  mutation sumbitForm($slug: String!) {
    sumbitForm(slug: $slug){
      message
      form{
        ...NewForm
      }
    }
  }
`;