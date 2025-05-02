// useContactData.test.tsx
import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { ContactProvider, useContacts, Contact } from './useContactData';

const mockUsers: Omit<Contact, 'photo'>[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', phone: '111-111-1111' },
  { id: 2, name: 'Bob',   email: 'bob@example.com',   phone: '222-222-2222' },
];

describe('useContacts hook', () => {
  globalThis.fetch = jest.fn();
  const fetchSpy = jest.spyOn(globalThis, 'fetch');

  beforeAll(() => {
    fetchSpy.mockResolvedValue({
        json: async () => mockUsers
      } as unknown as Promise<Response>);
  });

  afterAll(() => {
    fetchSpy.mockRestore();
  });

  const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ContactProvider>{children}</ContactProvider>
  );

  it('adds a contact', () => {
    const { result } = renderHook(() => useContacts(), { wrapper });

    const newContact: Contact = {
      id: 3,
      name: 'Carol',
      email: 'carol@example.com',
      phone: '333-333-3333',
      photo: 'https://example.com/photo.jpg',
    };

    act(() => {
      result.current.addContact(newContact);
    });

    expect(result.current.contacts).toEqual(
      [
        expect.objectContaining({ 
          email: 'carol@example.com', 
          photo: expect.any(String),
          name: 'Carol',
          phone: '333-333-3333',
          id: 3,
        }),
      ]
    );
  });

  it('updates a contact', () => {
    const { result } = renderHook(() => useContacts(), { wrapper });

    act(() => {
      result.current.addContact({ id: 4, name: 'Dave', email: 'dave@example.com', phone: '444-444-4444', photo: undefined });
    });
    act(() => {
      result.current.updateContact({ id: 4, name: 'David', email: 'dave@example.com', phone: '444-444-4444', photo: undefined });
    });

    expect(result.current.contacts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'David' }),
      ])
    );
  });

  it('removes a contact by email', () => {
    const { result } = renderHook(() => useContacts(), { wrapper });

    act(() => {
      result.current.addContact({ id: 5, name: 'Eve', email: 'eve@example.com', phone: '555-555-5555', photo: undefined });
      result.current.handleRemove('eve@example.com');
    });

    expect(result.current.contacts).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ email: 'eve@example.com' }),
      ])
    );
  });

  it('fetches contacts when refetchContacts is called', async () => {
    const { result } = renderHook(() => useContacts(), { wrapper });

    act(() => {
      result.current.refetchContacts();
    });

    await waitFor(() => {
      expect(result.current.contacts).toHaveLength(mockUsers.length);
    });

    expect(result.current.contacts![0]).toMatchObject({
      ...mockUsers[0],
      photo: expect.stringContaining('/women/1.jpg'),
    });
  });
});