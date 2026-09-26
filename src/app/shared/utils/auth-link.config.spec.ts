import { AUTH_LINK_CONFIG } from './auth-link.config';

describe('AUTH_LINK_CONFIG', () => {
  it('defines login, register, and otp footer links', () => {
    expect(AUTH_LINK_CONFIG['login-register'].linkText).toBe('Register');
    const registerLogin = AUTH_LINK_CONFIG['register-login'];
    expect(registerLogin.kind === 'route' && registerLogin.route).toBe('/auth/login');
    expect(AUTH_LINK_CONFIG['otp-resend'].kind).toBe('action');
  });
});
