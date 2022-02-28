import React, { useEffect, useState } from 'react';
import { EditModal } from './Modal';
import { Batons } from './Batons';
import { Teams } from './Teams';
import { Alert, AlertDescription, AlertIcon } from '@chakra-ui/react';

import '../styles/wrapper.scss';

export const Wrapper = () => {
	const [isEndpointSet, SetIsEndpointSet] = useState(false);
	useEffect(() => {
		SetIsEndpointSet(!!import.meta.env.VITE_TELRAAM_ENDPOINT);
	}, []);
	return (
		<div className='main-wrapper'>
			{isEndpointSet ? (
				<>
					<Batons />
					<Teams />
					<EditModal />
				</>
			) : (
				<Alert
					status='error'
					flexDirection='column'
					alignItems='center'
					alignSelf={'center'}
					justifyContent='center'
					textAlign='center'
					height='200px'
					width='fit-content'
				>
					<AlertIcon />
					<AlertDescription>Hmmm, this doesn't seem right, did you copy .env?</AlertDescription>
				</Alert>
			)}
		</div>
	);
};
