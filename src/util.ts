import { createStandaloneToast } from '@chakra-ui/react';
import { TELRAAM_ENDPOINT } from './constant';

const toast = createStandaloneToast();

export const sortNumericId = (a: Object & { id: number }, b: Object & { id: number }) => a.id - b.id;

export const parseData = (data: any, placeholder: any): any => {
	if (Array.isArray(data)) {
		if (!Array.isArray(placeholder)) {
			throw new Error(`Data is array but placeholder isn't, type of placeholder: ${typeof placeholder}`);
		}
		return placeholder.map((d, i) => parseData(data[i], d));
	}
	if (typeof data == 'object') {
		if (typeof data != 'object') {
			throw new Error(`Data is object but placeholder isn't, type of placeholder: ${typeof placeholder}`);
		}
		const parsedData: any = {};
		Object.keys(data).forEach(d => {
			parsedData[d] = parseData(data[d], placeholder[d]);
		});
		return parsedData;
	}
	if (typeof placeholder == 'string') {
		return String(data);
	}
	if (typeof placeholder == 'number') {
		return Number(data);
	}
};

export const fetchData = async <T>(endpoint: string): Promise<T> => {
	const rawResult: Response = await fetch(`${TELRAAM_ENDPOINT}/${endpoint}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		redirect: 'follow',
	});
	if (!rawResult.ok) {
		toast({
			title: 'An fetch(GET) error occurred',
			description: `${rawResult.statusText}, check the console for more info`,
			status: 'error',
			duration: 9000,
			isClosable: true,
		});
		console.error({
			endpoint,
			resultStatus: rawResult.status,
			message: rawResult.statusText,
		});
	}
	return rawResult.json();
};

export const addData = async (endpoint: string, values: any): Promise<any> => {
	const rawResult: Response = await fetch(`${TELRAAM_ENDPOINT}/${endpoint}`, {
		method: 'POST',
		redirect: 'follow',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(values),
	});
	if (!rawResult.ok) {
		toast({
			title: 'An fetch(POST) error occurred',
			description: `${rawResult.statusText}, check the console for more info`,
			status: 'error',
			duration: 9000,
			isClosable: true,
		});
		console.error({
			endpoint,
			body: values,
			resultStatus: rawResult.status,
			message: rawResult.statusText,
		});
	}
	return rawResult.json();
};

export const deleteData = async (endpoint: string): Promise<boolean> => {
	const rawResult: Response = await fetch(`${TELRAAM_ENDPOINT}/${endpoint}`, {
		method: 'DELETE',
		redirect: 'follow',
	});
	if (!rawResult.ok) {
		toast({
			title: 'An fetch(DELETE) error occurred',
			description: `${rawResult.statusText}, check the console for more info`,
			status: 'error',
			duration: 9000,
			isClosable: true,
		});
		console.error({
			endpoint,
			resultStatus: rawResult.status,
			message: rawResult.statusText,
		});
	}
	return rawResult.json();
};

export const updateData = async (endpoint: string, body: any): Promise<boolean> => {
	const rawResult: Response = await fetch(`${TELRAAM_ENDPOINT}&/${endpoint}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		redirect: 'follow',
		body: JSON.stringify(body),
	});
	if (!rawResult.ok) {
		toast({
			title: 'An fetch(PUT) error occurred',
			description: `${rawResult.statusText}, check the console for more info`,
			status: 'error',
			duration: 9000,
			isClosable: true,
		});
		console.error({
			endpoint,
			body,
			resultStatus: rawResult.status,
			message: rawResult.statusText,
		});
	}
	return rawResult.json();
};
