'use client';

import type {
	AuthContextReducerState,
	AuthContextReducerAction,
	TAuthenticationContext,
	TAuthenticationContextProviderProps,
	AuthFormStates,
} from '@/lib/types/auth/auth.types';
import type {} from '@/lib/types/validation.types';
import { createContext, useContext, useMemo, useReducer, useState } from 'react';

const initialState: AuthContextReducerState = {
	name: null,
	email: null,
	otp: null,
};

function reducer(
	state: AuthContextReducerState,
	action: AuthContextReducerAction,
): AuthContextReducerState {
	switch (action.type) {
		case 'email':
			return {
				...state,
				email: action.email,
			};
		case 'name':
			return {
				...state,
				name: action.name,
			};
		case 'otp':
			return {
				...state,
				otp: action.otp,
			};
		default:
			return state;
	}
}

const AuthenticationContext = createContext<TAuthenticationContext | null>(null);

const AuthenticationContextProvider = ({ children }: TAuthenticationContextProviderProps) => {
	// state
	const [authFormState, setAuthFormState] = useState<AuthFormStates | null>(null);
	const [state, dispatch] = useReducer(reducer, initialState);

	// derived state

	// event handlers

	const values = useMemo(
		() => ({ state, dispatch, authFormState, setAuthFormState }),
		[state, authFormState],
	);

	return <AuthenticationContext.Provider value={values}>{children}</AuthenticationContext.Provider>;
};

const useAuthenticationContext = () => {
	const value = useContext(AuthenticationContext);
	if (!value)
		throw new Error(
			'You have used AuthenticationContext outside of its Provider. AuthenticationContext can only be used within a child of the AuthenticationContextProvider',
		);
	return value;
};

export { useAuthenticationContext, AuthenticationContextProvider };
