export const BATON_PLACEHOLDER: Baton = {
	id: 0,
	name: '',
	mac: '',
};

export const TEAM_PLACEHOLDER: Team = {
	id: 0,
	name: '',
	batonId: 0,
};

export const STATION_PLACEHOLDER: Station = {
	id: 0,
	name: '',
	distanceFromStart: 0,
	isBroken: false,
	url: '',
};

export const SWITCHOVER_PLACEHOLDER: SwitchOver = {
	id: 0,
	newLapSource: 0,
	timestamp: Date.now(),
};
