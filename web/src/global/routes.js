import Forms from 'views/Forms';
import Form from 'views/Form';
import SampleForm from 'views/SampleForm';

export const routes = {
  '/forms/:id': {
    path: '/forms/:id',
    component: Form,
    name: 'Form',
    description: '',
  },
  '/forms': {
    path: '/forms',
    component: Forms,
    name: 'Forms',
    description: '',
  },
  '/sampleform': {
    path: '/sampleform',
    component: SampleForm,
    name: 'SampleForm',
    description: '',
  },
};
