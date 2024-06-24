import { Home } from '@/pages/home';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ bookId: '123' }),
}));

jest.mock('@/features/ui/header/MenuDropdown', () => ({
  MenuDropdown: () => <div>MenuDropdown</div>,
}));

jest.mock('@/features/auth', () => ({
  useAuth: () => ({
    isLoggedIn: jest.fn(() => true),
  }),
}));

describe('Home Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Home component correctly', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    expect(
      screen.getByText('Willkommen auf unserer Homepage'),
    ).toBeInTheDocument();
  });

  test('renders MenuDropdown component', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    expect(screen.getByText('MenuDropdown')).toBeInTheDocument();
  });

  test('displays bookId if present in URL params', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  test('renders Suche section', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    expect(screen.getByText('Suche')).toBeInTheDocument();
    expect(
      screen.getByText(/Stöbere in unserem riesigen Katalog/),
    ).toBeInTheDocument();
  });

  test('renders Neues Buch section when logged in', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    expect(screen.getByText('Neues Buch')).toBeInTheDocument();
    expect(
      screen.getByText(/Kreiere dein eigenes literarisches Meisterwerk/),
    ).toBeInTheDocument();
  });

  test('renders Diagramme section', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    expect(screen.getByText('Diagramme')).toBeInTheDocument();
    expect(
      screen.getByText(/Erhalte Einblicke in die Lesegewohnheiten/),
    ).toBeInTheDocument();
  });
});
