import Home from '@/pages/Home';
import DetailDocument from '@/pages/DetailDocument';
import SignIn from '@pages/SignIn';
import SignUp from '@pages/SignUp';
import Result from '@/pages/Result';

//
const publicRoutes = [
  { path: '/', component: SignIn },
  { path: '/sign-in', component: SignIn },
  { path: '/sign-up', component: SignUp },
  { path: '/result', component: Result },
];

const privateRoutes = [
  { path: '/home', component: Home },
  { path: '/detail-document/:id', component: DetailDocument },
  { path: '/result', component: Result },
];

export { privateRoutes, publicRoutes };
