export type AuthLinkVariant = 'login-register' | 'register-login' | 'otp-resend' | 'forgot-password';

type AuthLinkRouteConfig = {
  kind: 'route';
  lead: string;
  linkText: string;
  route: string;
  align: 'center' | 'end';
  size: 'sm' | 'base';
  font: 'baloo' | 'rubik';
};

type AuthLinkActionConfig = {
  kind: 'action';
  lead: string;
  linkText: string;
  align: 'center';
  size: 'base';
  font: 'baloo';
};

export type AuthLinkConfig = AuthLinkRouteConfig | AuthLinkActionConfig;

/** Copy and routing for auth footer / inline links  */
export const AUTH_LINK_CONFIG: Record<AuthLinkVariant, AuthLinkConfig> = {
  'login-register': {
    kind: 'route',
    lead: 'Dont Have An Account Yet ? ',
    linkText: 'Register',
    route: '/auth/register',
    align: 'center',
    size: 'base',
    font: 'baloo',
  },
  'register-login': {
    kind: 'route',
    lead: 'Already Have An Account? ',
    linkText: 'Login',
    route: '/auth/login',
    align: 'center',
    size: 'base',
    font: 'baloo',
  },
  'otp-resend': {
    kind: 'action',
    lead: 'Didnt Recieve Verification Code?',
    linkText: 'Resend Code?',
    align: 'center',
    size: 'base',
    font: 'baloo',
  },
  'forgot-password': {
    kind: 'route',
    lead: '',
    linkText: 'Forget Password ?',
    route: '/auth/forgot-password',
    align: 'end',
    size: 'sm',
    font: 'rubik',
  },
};
