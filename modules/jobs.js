MODULES["jobs"] = {};

//Helium Modules
MODULES["jobs"].autoRatio7 = [1, 1, 98];
MODULES["jobs"].autoRatio6 = [1, 7, 12];
MODULES["jobs"].autoRatio5 = [1, 2, 22];
MODULES["jobs"].autoRatio4 = [1, 1.1, 10];
MODULES["jobs"].autoRatio3 = [3, 1, 4];
MODULES["jobs"].autoRatio2 = [3, 3.1, 5];
MODULES["jobs"].autoRatio1 = [1.1, 1.15, 1.2];
MODULES["jobs"].customRatio;

//Radon Modules
MODULES["jobs"].RscientistRatio = 8;
MODULES["jobs"].RscientistRatio2 = 4;
MODULES["jobs"].RscientistRatio3 = 16;
MODULES["jobs"].RscientistRatio4 = 64;
MODULES["jobs"].RscientistRatio5 = 256;
MODULES["jobs"].RscientistRatio6 = 1024;
MODULES["jobs"].RscientistRatio7 = 4098;
MODULES["jobs"].RautoRatioHaz = [1, 1, 1];
MODULES["jobs"].RautoRatio7 = [1, 1, 98];
MODULES["jobs"].RautoRatio5 = [1, 2, 22];
MODULES["jobs"].RautoRatio4 = [1, 1.1, 10];
MODULES["jobs"].RautoRatio3 = [3, 1, 4];
MODULES["jobs"].RautoRatio2 = [3, 3.1, 5];
MODULES["jobs"].RautoRatio1 = [1.1, 1.15, 1.2];
MODULES["jobs"].RcustomRatio;

function safeBuyJob(jobTitle, amount) {
	if (!Number.isFinite(amount) || amount === 0 || typeof amount === 'undefined' || Number.isNaN(amount)) {
		return false;
	}
	var freeWorkers = Math.ceil(game.resources.trimps.realMax() / 2) - game.resources.trimps.employed;
	var fireState = game.global.firing;
	var result;
	const currBuyAmt = game.global.buyAmt;
	if (amount < 0) {
		amount = Math.abs(amount);
		game.global.firing = true;
		game.global.buyAmt = amount;
		result = true;
	} else {
		game.global.firing = false;
		game.global.buyAmt = amount;
		result = canAffordJob(jobTitle, false);
		if (!result) {
			game.global.buyAmt = 'Max';
			game.global.maxSplit = 1;
			result = canAffordJob(jobTitle, false) && freeWorkers > 0;
		}
	}
	if (result) {
		debug((game.global.firing ? 'Firing ' : 'Hiring ') + prettify(amount) + ' ' + jobTitle + (amount > 1 ? 's' : ''), "jobs", "*users");
		buyJob(jobTitle, true, true);
		if (game.global.firing && !fireState) fireModeLocal();
		if (!game.global.firing && fireState) fireModeLocal();
	}
	game.global.buyAmt = currBuyAmt;
	return true;
}

function workerRatios(workerRatio) {
	var workerRatio = !workerRatio ? null : workerRatio
	if (workerRatio === null) return;

	const universeSetting = getPageSetting('jobType');

	if (universeSetting === 2) {
		var jobSettings = getPageSetting('jobSettingsArray');
		if (jobSettings[workerRatio].enabled) {
			if (challengeActive('Transmute') && workerRatio === 'Lumberjack' && jobSettings.Miner.enabled) return jobSettings[workerRatio].ratio + jobSettings.Miner.ratio;
			return jobSettings[workerRatio].ratio;
		}
		else
			return 0;
	}

	var ratioSet;
	var universe = game.global.universe === 1 ? '' : 'R';

	if (MODULES["jobs"].RcustomRatio) {
		ratioSet = MODULES["jobs"][universe + 'customRatio'];
	} else if (game.global.universe === 2 && game.global.StaffEquipped.rarity !== undefined && game.global.StaffEquipped.rarity >= 10) {
		ratioSet = MODULES["jobs"][universe + 'autoRatioHaz'];
	} else if (game.global.world >= 300) {
		ratioSet = MODULES["jobs"][universe + 'autoRatio7'];
	} else if (game.buildings.Tribute.owned > 3000 && mutations.Magma.active()) {
		ratioSet = MODULES["jobs"][universe + 'autoRatio6'];
	} else if (game.buildings.Tribute.owned > 1500) {
		ratioSet = MODULES["jobs"][universe + 'autoRatio5'];
	} else if (game.buildings.Tribute.owned > 1000) {
		ratioSet = MODULES["jobs"][universe + 'autoRatio4'];
	} else if (game.resources.trimps.realMax() > 3000000) {
		ratioSet = MODULES["jobs"][universe + 'autoRatio3'];
	} else if (game.resources.trimps.realMax() > 300000) {
		ratioSet = MODULES["jobs"][universe + 'autoRatio2'];
	} else if (challengeActive('Metal') || challengeActive('Transmute')) {
		ratioSet = [4, 5, 0];
	} else if (game.global.world < 5) {
		ratioSet = [3, 1, 1];
	}
	else {
		ratioSet = MODULES["jobs"][universe + 'autoRatio1'];
	}

	if (workerRatio.includes('Farmer')) return ratioSet[0]
	else if (workerRatio.includes('Lumber')) return ratioSet[1]
	else if (workerRatio.includes('Miner')) return ratioSet[2]
}

var reservedJobs = 100;

function fireModeLocal() {
	game.global.firing = !game.global.firing;
	var elem = document.getElementById("fireBtn");
	if (game.global.firing) {
		elem.className = elem.className.replace("fireBtnNotFiring", "fireBtnFiring");
		elem.innerHTML = "Firing";
	} else {
		elem.className = elem.className.replace("fireBtnFiring", "fireBtnNotFiring");
		elem.innerHTML = "Fire";
	}
}

function buyJobs() {

	if (game.jobs.Farmer.locked || game.resources.trimps.owned == 0) return;

	const universeSetting = getPageSetting('jobType');
	//Disabling autoJobs if AT AutoJobs is disabled.
	if (universeSetting === 0) return;

	var jobSettings = getPageSetting('jobSettingsArray');
	var freeWorkers = Math.ceil(Math.min(game.resources.trimps.realMax() / 2), game.resources.trimps.owned) - (game.resources.trimps.employed //-
		//U1 jobs
		//game.jobs.Geneticist.owned - game.jobs.Trainer.owned - game.jobs.Magmamancer.owned -
		//U2 jobs
		//game.jobs.Explorer.owned - game.jobs.Meteorologist.owned - game.jobs.Worshipper.owned
	);

	//Enables Firing for Jobs. It's a setting that will save hassle later by forcing it to be enalbed.
	if (!game.options.menu.fireForJobs.enabled) game.options.menu.fireForJobs.enabled = 1;

	//Do non-ratio/limited jobs first
	//Explorers
	if (jobSettings.Explorer.enabled && currentMap !== 'Tribute Farm') {
		if (!game.jobs.Explorer.locked) {
			var affordableExplorers = getMaxAffordable(
				game.jobs.Explorer.cost.food[0] * Math.pow(game.jobs.Explorer.cost.food[1], game.jobs.Explorer.owned),
				game.resources.food.owned * (jobSettings.Explorer.percent / 100),
				game.jobs.Explorer.cost.food[1],
				true
			);
			if (affordableExplorers > 0) {
				safeBuyJob('Explorer', affordableExplorers);
				freeWorkers -= affordableExplorers;
			}
		}
	}

	if (game.global.universe === 1) {
		//Trainers
		if (!game.jobs.Trainer.locked && jobSettings.Trainer.enabled) {
			var affordableTrainers = getMaxAffordable(
				game.jobs.Trainer.cost.food[0] * Math.pow(game.jobs.Trainer.cost.food[1], game.jobs.Trainer.owned),
				game.resources.food.owned * (jobSettings.Trainer.percent / 100),
				game.jobs.Trainer.cost.food[1],
				true
			);
			if (affordableTrainers > 0) {
				safeBuyJob('Trainer', affordableTrainers);
				freeWorkers -= affordableTrainers;
			}
		}
		//Magmamancers
		if (!game.jobs.Magmamancer.locked && jobSettings.Magmamancer.enabled) {
			//Only buying Magmamancers when they'll do something!
			var timeOnZone = Math.floor((new Date().getTime() - game.global.zoneStarted) / 60000);
			if (game.talents.magmamancer.purchased) {
				timeOnZone += 5;
			}
			if (game.talents.stillMagmamancer.purchased) {
				timeOnZone = Math.floor(timeOnZone + game.global.spireRows);
			}
			if (timeOnZone >= 10) {
				var affordableMagmamancer = getMaxAffordable(
					game.jobs.Magmamancer.cost.gems[0] * Math.pow(game.jobs.Magmamancer.cost.gems[1], game.jobs.Magmamancer.owned),
					game.resources.gems.owned * (jobSettings.Magmamancer.percent / 100),
					game.jobs.Magmamancer.cost.gems[1],
					true
				);
				if (affordableMagmamancer > 0) {
					safeBuyJob('Magmamancer', affordableMagmamancer);
					freeWorkers -= affordableMagmamancer;
				}
			}
		}
	}
	if (game.global.universe === 2) {
		//Meteorologists
		if (!game.jobs.Meteorologist.locked && (jobSettings.Meteorologist.enabled || rMapSettings.shouldMeteorologist) && !rBSRunningAtlantrimp) {
			var affordableMets = getMaxAffordable(
				game.jobs.Meteorologist.cost.food[0] * Math.pow(game.jobs.Meteorologist.cost.food[1], game.jobs.Meteorologist.owned),
				game.resources.food.owned * (rMapSettings.shouldMeteorologist ? 1 : (jobSettings.Meteorologist.percent / 100)),
				game.jobs.Meteorologist.cost.food[1],
				true
			);
			affordableMets = rMapSettings.shouldMeteorologist && rMapSettings.runAtlantrimp && game.mapUnlocks.AncientTreasure.canRunOnce && !(game.resources.food.owned > (typeof (totalTrFCost) === 'undefined' ? 0 : totalTrFCost)) ? 0 : affordableMets;
			if (affordableMets > 0 && !rMapSettings.shouldTribute) {
				safeBuyJob('Meteorologist', affordableMets);
				freeWorkers -= affordableMets;
			}
		}

		//Ships
		if ((!game.jobs.Worshipper.locked && game.jobs.Worshipper.owned < 50 && (jobSettings.Worshipper.enabled || currentMap === 'Worshipper Farm') && !rBSRunningAtlantrimp)) {
			var affordableShips = currentMap === 'Worshipper Farm' ? Math.floor(game.resources.food.owned / game.jobs.Worshipper.getCost()) : Math.floor((game.resources.food.owned / game.jobs.Worshipper.getCost()) * (jobSettings.Worshipper.percent / 100));
			if (affordableShips > (50 - game.jobs.Worshipper.owned))
				affordableShips = 50 - game.jobs.Worshipper.owned;
			if (affordableShips > 0) {
				safeBuyJob('Worshipper', affordableShips);
				freeWorkers -= affordableShips;
			}
		}
	}
	var nextCoordCost = 0;

	//Gather up the total number of workers available to be distributed across ratio workers
	//In the process store how much of each for later.
	if (challengeActive('Trapper') || challengeActive('Trappapalooza')) {
		freeWorkers = game.resources.trimps.owned - game.resources.trimps.employed;
		var metCoordGoal = challengeActive('Trappapalooza') && game.upgrades.Coordination.done >= getPageSetting('trappapaloozaCoords');
		if (!metCoordGoal) nextCoordCost = Math.ceil(1.25 * game.resources.trimps.maxSoldiers);
		if (nextCoordCost < freeWorkers) freeWorkers -= nextCoordCost;
	}
	var ratioWorkers = ['Farmer', 'Lumberjack', 'Miner', 'Scientist'];
	var currentworkers = [];
	for (var worker of ratioWorkers) {
		currentworkers.push(game.jobs[worker].owned);
	}
	freeWorkers += currentworkers.reduce((a, b) => { return a + b; });

	var desiredRatios = [0, 0, 0, 0];
	// Explicit firefox handling because Ff specifically reduces free workers to 0.
	var reserveMod = 1 + (game.resources.trimps.owned / 1e14) + nextCoordCost;

	freeWorkers -= (game.resources.trimps.owned > 1e6) ? reservedJobs * reserveMod : 0;

	var workerRatio;
	if ((MODULES.mapFunctions.workerRatio !== null && rShouldBoneShrine) || (getPageSetting('autoMaps') !== 0 && rMapSettings.jobRatio !== undefined)) {
		if (MODULES.mapFunctions.workerRatio !== null) workerRatio = MODULES.mapFunctions.workerRatio;
		else workerRatio = rMapSettings.jobRatio;
		desiredRatios = Array.from(workerRatio.split(','))
		desiredRatios = [desiredRatios[0] !== undefined ? Number(desiredRatios[0]) : 0, desiredRatios[1] !== undefined ? Number(desiredRatios[1]) : 0, desiredRatios[2] !== undefined ? Number(desiredRatios[2]) : 0, desiredRatios[3] !== undefined ? Number(desiredRatios[3]) : 0]

		if (scienceNeeded > 0 && scienceNeeded > game.resources.science.owned && desiredRatios[3] < 1) desiredRatios[3] = 1;
	} else {
		// Weird scientist ratio hack. Based on previous AJ, I don't know why it's like this.
		var scientistMod = MODULES["jobs"].RscientistRatio;
		if (game.jobs.Farmer.owned < 100)
			scientistMod = MODULES["jobs"].RscientistRatio2;
		if (game.global.world >= 50)
			scientistMod = MODULES["jobs"].RscientistRatio3;
		if (game.global.world >= 65)
			scientistMod = MODULES["jobs"].RscientistRatio4;
		if (game.global.world >= 90)
			scientistMod = MODULES["jobs"].RscientistRatio5;
		if (game.global.world >= 120)
			scientistMod = MODULES["jobs"].RscientistRatio6;
		if (game.global.world >= 150)
			scientistMod = MODULES["jobs"].RscientistRatio7;

		if (scienceNeeded > 0 && scienceNeeded > game.resources.science.owned) scientistMod = 1;
		for (var worker of ratioWorkers) {
			if (!game.jobs[worker].locked) {
				if (worker == "Scientist") {
					desiredRatios[ratioWorkers.indexOf(worker)] = 1;
					continue;
				}
				else
					desiredRatios[ratioWorkers.indexOf(worker)] = scientistMod * parseFloat(workerRatios(universeSetting == 2 ? worker : 'R' + worker + 'Ratio'))
			}
		}
	}

	if (game.global.universe === 2 && workerRatio === undefined) {
		//Setting farmers to 0 if past NFF zone & in world.
		if (jobSettings.FarmersUntil.enabled && game.global.world >= jobSettings.FarmersUntil.zone)
			desiredRatios[0] = 0;
		//Setting lumberjacks to 0 if Melting Point has been run.
		if (jobSettings.NoLumberjacks.enabled && !game.mapUnlocks.SmithFree.canRunOnce)
			desiredRatios[1] = 0;
	}

	//Adding Miners to Farmer ratio if in Transmute or Metal challenges
	if (challengeActive('Metal') || challengeActive('Transmute')) {
		desiredRatios[1] += desiredRatios[2];
		desiredRatios[2] = 0;
	}

	var totalFraction = desiredRatios.reduce((a, b) => { return a + b; });
	totalFraction = totalFraction == 0 ? 1 : totalFraction
	var desiredWorkers = [0, 0, 0, 0];
	var totalWorkerCost = 0;
	for (var i = 0; i < ratioWorkers.length; i++) {
		desiredWorkers[i] = Math.floor(freeWorkers * desiredRatios[i] / totalFraction - currentworkers[i]);
		if (desiredWorkers[i] > 0) totalWorkerCost += game.jobs[ratioWorkers[i]].cost.food * desiredWorkers[i];
	}

	if (totalWorkerCost > game.resources.food.owned) {
		// Buy max on food and then var the next frame take care of the rest.
		var buyAmountStore = game.global.buyAmt;
		game.global.buyAmt = "Max";

		buyJob('Farmer', true, true);

		game.global.buyAmt = buyAmountStore;
	} else {

		// Fire anything that we need to fire to free up workers
		for (var i = 0; i < desiredWorkers.length; i++) {

			if (desiredWorkers[i] > 0) continue;
			if (Math.abs(desiredWorkers[i]) <= 0) continue;

			var buyAmountStore = game.global.buyAmt;
			var fireState = game.global.firing;

			game.global.firing = (desiredWorkers[i] < 0);
			game.global.buyAmt = Math.abs(desiredWorkers[i]);
			buyJob(ratioWorkers[i], true, true);

			game.global.firing = fireState;
			game.global.buyAmt = buyAmountStore;
		}

		// Buy up workers that we need to
		for (var i = 0; i < desiredWorkers.length; i++) {

			if (desiredWorkers[i] <= 0) continue;

			var buyAmountStore = game.global.buyAmt;
			var fireState = game.global.firing;

			game.global.firing = (desiredWorkers[i] < 0);
			game.global.buyAmt = Math.abs(desiredWorkers[i]);

			buyJob(ratioWorkers[i], true, true);

			game.global.firing = fireState;
			game.global.buyAmt = buyAmountStore;
		}
	}
}
