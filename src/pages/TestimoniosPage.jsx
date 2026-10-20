import Testimonios from '../components/Testimonios';
import { usePageTitle } from '../hooks/usePageTitle';

const TestimoniosPage = () => {
  usePageTitle('Testimonios');
  return <Testimonios />;
};

export default TestimoniosPage;
