import React, { useContext, useEffect, useState } from 'react';
import { EditModal } from './Modal';
import { Batons } from './lists/Batons';
import { Teams } from './lists/Teams';
import { Stations } from './lists/Stations';
import { Alert, AlertDescription, AlertIcon, Button, ButtonGroup, Center, Wrap } from '@chakra-ui/react';

import '../styles/wrapper.scss';
import { GeneralContext } from '../context/general.context';

const ModuleComponents: Record<ModuleType, JSX.Element> = {
	batons: <Batons />,
	teams: <Teams />,
	stations: <Stations />,
};

export const Wrapper = () => {
	const generalCtx = useContext(GeneralContext);
	const [isEndpointSet, SetIsEndpointSet] = useState(false);
	useEffect(() => {
		SetIsEndpointSet(!!import.meta.env.VITE_TELRAAM_ENDPOINT);
	}, []);
	return (
		<div className='main-wrapper'>
			{isEndpointSet ? (
				<>
					<Center width={'100%'} height={'fit-content'}>
						<ButtonGroup variant='outline' isAttached size={'sm'}>
							{(Object.keys(ModuleComponents) as ModuleType[]).map(moduleName => (
								<Button
									colorScheme='teal'
									key={`module-btn-${moduleName}`}
									variant={generalCtx.enabledModules[moduleName] ? 'solid' : 'outline'}
									onClick={() => generalCtx.toggleModule(moduleName)}
								>
									{moduleName}
								</Button>
							))}
						</ButtonGroup>
					</Center>
					<Wrap width={'calc(100vw - .5vw)'} justify={'space-evenly'}>
						{Object.entries(generalCtx.enabledModules).map(
							([module, isEnabled]) => isEnabled && ModuleComponents[module as ModuleType]
						)}
						<EditModal />
					</Wrap>
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
