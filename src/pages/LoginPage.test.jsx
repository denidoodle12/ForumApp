import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import LoginPage from './LoginPage';
import authUserReducer from '../states/authUser/reducer';

/**
 * Test scenarios for LoginPage:
 * - renders the login form
 * - updates the email value from user input
 * - updates the password value from user input
 */
function buildStore() {
  return configureStore({
    reducer: {
      authUser: authUserReducer,
    },
  });
}

function renderLoginPage() {
  return render(
    <Provider store={buildStore()}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>
  );
}

describe('LoginPage', () => {
  it('should render login form with email and password inputs and submit button', () => {
    renderLoginPage();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /masuk/i })).toBeInTheDocument();
  });

  it('should update email input value when user types', async () => {
    renderLoginPage();
    const user = userEvent.setup();

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'test@example.com');

    expect(emailInput).toHaveValue('test@example.com');
  });

  it('should update password input value when user types', async () => {
    renderLoginPage();
    const user = userEvent.setup();

    const passwordInput = screen.getByLabelText(/password/i);
    await user.type(passwordInput, 'mypassword123');

    expect(passwordInput).toHaveValue('mypassword123');
  });
});
