MODULES.mapFunctions = {};
MODULES.mapFunctions.rVoidHDRatio = Infinity;
MODULES.mapFunctions.rVoidVHDRatio = Infinity;
MODULES.mapFunctions.rVoidHDInfo = Infinity;
MODULES.mapFunctions.portalZone = Infinity;
MODULES.mapFunctions.workerRatio = null;
MODULES.mapFunctions.runUniqueMap = '';

function isDoingSpire() {
	return isActiveSpireAT() || disActiveSpireAT();
}

//Unique Maps
const uniqueMaps = {
	//Universe 1 Unique Maps
	'The Block': {
		zone: 11,
		challenges: ["Scientist", "Trimp"],
		speedrun: 'blockTimed',
		universe: 1
	},
	'The Wall': {
		zone: 15,
		challenges: [],
		speedrun: 'wallTimed',
		universe: 1
	},
	'Dimension of Anger': {
		zone: 20,
		challenges: ["Discipline", "Metal", "Size", "Frugal", "Coordinate"],
		speedrun: 'angerTimed',
		universe: 1
	},
	'Trimple Of Doom': {
		zone: 33,
		challenges: ["Meditate", "Anger"],
		speedrun: 'doomTimed',
		universe: 1
	},
	'The Prison': {
		zone: 80,
		challenges: ["Electricity", "Mapocalypse"],
		speedrun: 'prisonTimed',
		universe: 1
	},
	'Imploding Star': {
		zone: 170,
		challenges: ["Devastation"],
		speedrun: 'starTimed',
		universe: 1
	},
	'Bionic Wonderland': {
		zone: 125,
		challenges: ["Crushed"],
		speedrun: 'bionicTimed',
		universe: 1
	},

	//Universe 2 Unique Maps
	'Big Wall': {
		zone: 8,
		challenges: [""],
		speedrun: 'bigWallTimed',
		universe: 2
	},
	'Dimension of Rage': {
		zone: 15,
		challenges: ["Unlucky"],
		speedrun: '',
		universe: 2
	},
	'Prismatic Palace': {
		zone: 20,
		challenges: [""],
		speedrun: 'palaceTimed',
		universe: 2
	},
	'Atlantrimp': {
		zone: 33,
		challenges: [""],
		speedrun: 'atlantrimpTimed',
		universe: 2
	},
	'Melting Point': {
		zone: 50,
		challenges: [""],
		speedrun: 'meltingTimed',
		universe: 2
	},
	'The Black Bog': {
		zone: 6,
		challenges: [""],
		speedrun: '',
		universe: 2
	},
	'Frozen Castle': {
		zone: 174,
		challenges: [""],
		speedrun: 'starTimed',
		universe: 2
	}
};

//Unique Maps
function shouldRunUniqueMap(map) {
	const challenge = game.global.challengeActive;
	const isC3 = game.global.runningChallengeSquared || challengeActive('Mayhem') || challengeActive('Pandemonium') || challengeActive('Desolation');
	const isDaily = challengeActive('Daily');
	const mapData = uniqueMaps[map.name];
	const uniqueMapSetting = getPageSetting('uniqueMapSettingsArray');

	if (mapData === undefined || game.global.world < mapData.zone) {
		return false;
	}
	if (game.global.universe !== mapData.universe) {
		return false;
	}
	if (!isC3 && mapData.challenges.includes(challenge) && !challengeActive('')) {
		return true;
	}
	if (mapData.speedrun && shouldSpeedRun(game.achievements[mapData.speedrun])) {
		return true;
	}

	if (MODULES.mapFunctions.runUniqueMap === map.name) {
		if (game.global.mapsActive && getCurrentMapObject().location === MODULES.mapFunctions.runUniqueMap) MODULES.mapFunctions.runUniqueMap = '';
		return true;
	}

	if (game.global.universe === 1) {
		const liquified = game.global.gridArray && game.global.gridArray[0] && game.global.gridArray[0].name == "Liquimp";
		if (map.name === 'The Block') {
			//We need Shieldblock
			if (!game.upgrades.Shieldblock.allowed && getPageSetting('equipShieldBlock')) {
				return true;
			}
			if (game.mapUnlocks.TheBlock.canRunOnce && uniqueMapSetting.The_Block.enabled && game.global.world >= uniqueMapSetting.The_Block.zone && (game.global.lastClearedCell + 2 >= uniqueMapSetting.The_Block.cell || liquified)) {
				return true;
			}
		} else if (map.name === 'The Wall') {
			//We need Bounty
			if (!game.upgrades.Bounty.allowed && !game.talents.bounty.purchased) {
				return true;
			}
			if (game.mapUnlocks.TheWall.canRunOnce && uniqueMapSetting.The_Wall.enabled && game.global.world >= uniqueMapSetting.The_Wall.zone && (game.global.lastClearedCell + 2 >= uniqueMapSetting.The_Wall.cell || liquified)) {
				return true;
			}
		} else if (map.name === 'Dimension of Anger') {
			//Unlock the portal
			if (!game.talents.portal.purchased && document.getElementById("portalBtn").style.display === "none") {
				return true;
			}
			if (game.mapUnlocks.Portal.canRunOnce && uniqueMapSetting.Dimension_of_Anger.enabled && game.global.world >= uniqueMapSetting.Dimension_of_Anger.zone && (game.global.lastClearedCell + 2 >= uniqueMapSetting.Dimension_of_Anger.cell || liquified)) {
				return true;
			}
		} else if (map.name === 'Trimple Of Doom') {
			//Unlock the Relentlessness perk
			if (game.portal.Relentlessness.locked) {
				return true;
			}
			if (game.mapUnlocks.AncientTreasure.canRunOnce && uniqueMapSetting.Trimple_of_Doom.enabled && game.global.world >= uniqueMapSetting.Trimple_of_Doom.zone && (game.global.lastClearedCell + 2 >= uniqueMapSetting.Trimple_of_Doom.cell || liquified)) {
				if (getPageSetting('spamMessages').map_Details && game.global.preMapsActive) debug('Running ' + map.name + ' on zone ' + game.global.world + '.');
				return true;
			}
		} else if (map.name === 'The Prison') {
			if (game.mapUnlocks.ThePrison.canRunOnce && uniqueMapSetting.The_Prison.enabled && game.global.world >= uniqueMapSetting.The_Prison.zone && (game.global.lastClearedCell + 2 >= uniqueMapSetting.The_Prison.cell || liquified)) {
				if (getPageSetting('spamMessages').map_Details && game.global.preMapsActive) debug('Running ' + map.name + ' on zone ' + game.global.world + '.');
				return true;
			}
		} else if (map.name === 'Imploding Star') {
			if (game.mapUnlocks.ImplodingStar.canRunOnce && uniqueMapSetting.Imploding_Star.enabled && game.global.world >= uniqueMapSetting.Imploding_Star.zone && (game.global.lastClearedCell + 2 >= uniqueMapSetting.Imploding_Star.cell || liquified)) {
				if (getPageSetting('spamMessages').map_Details && game.global.preMapsActive) debug('Running ' + map.name + ' on zone ' + game.global.world + '.');
				return true;
			}
		}
	} else if (game.global.universe === 2) {
		if (currentMap === 'Quagmire Farm' && map.name === 'The Black Bog') {
			return true;
		}
		else if (map.name === 'Big Wall') {
			// we need Bounty
			if (!game.upgrades.Bounty.allowed && !game.talents.bounty.purchased) {
				return true;
			}
		} else if (map.name === 'Dimension of Rage') {
			// unlock the portal
			if (document.getElementById("portalBtn").style.display === "none" && game.upgrades.Rage.done == 1 && uniqueMapSetting.Dimension_of_Rage.enabled && game.global.world >= uniqueMapSetting.Dimension_of_Rage.zone && game.global.lastClearedCell + 2 >= uniqueMapSetting.Dimension_of_Rage.cell) {
				return true;
			}
		} else if (map.name === 'Prismatic Palace') {
			//100% prismatic shield bonus
			if (game.mapUnlocks.Prismalicious.canRunOnce && uniqueMapSetting.Prismatic_Palace.enabled && game.global.world >= uniqueMapSetting.Prismatic_Palace.zone && game.global.lastClearedCell + 2 >= uniqueMapSetting.Prismatic_Palace.cell) {
				return true;
			}
		} else if (map.name === 'Atlantrimp') {
			// maybe get the treasure
			if (game.mapUnlocks.AncientTreasure.canRunOnce && uniqueMapSetting.Atlantrimp.enabled && game.global.world >= uniqueMapSetting.Atlantrimp.zone && game.global.lastClearedCell + 2 >= uniqueMapSetting.Atlantrimp.cell) {
				if (getPageSetting('spamMessages').map_Details && game.global.preMapsActive) debug('Running ' + map.name + ' on zone ' + game.global.world + '.');
				return true;
			}
		} else if (map.name === 'Melting Point') {
			// maybe get extra smithiesvar 
			var currChallenge = game.global.challengeActive.toLowerCase()
			meltsmithy =
				(challengeActive('Mayhem') || challengeActive('Pandemonium') || challengeActive('Desolation')) && getPageSetting(currChallenge) && getPageSetting(currChallenge + 'MP') > 0 ? getPageSetting(currChallenge + 'MP') :
					isC3 && uniqueMapSetting.MP_Smithy_C3.enabled && uniqueMapSetting.MP_Smithy_C3.value > 0 ? uniqueMapSetting.MP_Smithy_C3.value :
						isDaily && uniqueMapSetting.MP_Smithy_Daily.enabled && uniqueMapSetting.MP_Smithy_Daily.value > 0 ? uniqueMapSetting.MP_Smithy_Daily.value :
							!isC3 && !isDaily && uniqueMapSetting.MP_Smithy.enabled && uniqueMapSetting.MP_Smithy.value > 0 ? uniqueMapSetting.MP_Smithy.value :
								Infinity;
			if (game.mapUnlocks.SmithFree.canRunOnce &&
				((!isC3 && !isDaily && uniqueMapSetting.Melting_Point.enabled && game.global.world >= uniqueMapSetting.Melting_Point.zone && game.global.lastClearedCell + 2 >= uniqueMapSetting.Melting_Point.cell) ||
					(meltsmithy !== Infinity && meltsmithy <= game.buildings.Smithy.owned))) {
				if (getPageSetting('spamMessages').map_Details && game.global.preMapsActive) debug('Running ' + map.name + ' at ' + game.buildings.Smithy.owned + ' smithies on zone ' + game.global.world + '.');
				return true;
			}
		} else if (map.name === 'Frozen Castle') {
			// maybe get the treasure
			var frozencastle = !challengeActive('Hypothermia') && uniqueMapSetting.Frozen_Castle.enabled && game.global.world >= uniqueMapSetting.Frozen_Castle.zone && game.global.lastClearedCell + 2 >= uniqueMapSetting.Frozen_Castle.cell;
			var hypothermia = challengeActive('Hypothermia') && !VoidMaps().shouldRun &&
				game.global.world >= (getPageSetting('hypothermiaDefaultSettings').frozencastle[0] !== undefined ? parseInt(getPageSetting('hypothermiaDefaultSettings').frozencastle[0]) : 200) &&
				game.global.lastClearedCell + 2 >= (getPageSetting('hypothermiaDefaultSettings').frozencastle[1] !== undefined ? parseInt(getPageSetting('hypothermiaDefaultSettings').frozencastle[1]) : 99);
			if (frozencastle || hypothermia) {
				if (getPageSetting('spamMessages').map_Details && game.global.preMapsActive) debug('Running ' + map.name + ' on zone ' + game.global.world + '.');
				return true;
			}
		}
	}
	return false;
}

function runUniqueMap(mapName, dontRecycle) {
	if (game.global.mapsActive && getCurrentMapObject().name === mapName) return;
	if (challengeActive('Insanity')) return;
	if (mapName === 'Atlantrimp' && game.global.universe === 1) mapName = 'Trimple Of Doom'
	var zone = game.global.world;
	var cell = game.global.lastClearedCell + 2;
	if (mapName === 'Melting Point' && (!game.mapUnlocks.SmithFree.canRunOnce || zone < 55 || (zone === 55 && cell < 56))) return
	if ((mapName === 'Atlantrimp' || mapName === 'Trimple Of Doom') && (!game.mapUnlocks.AncientTreasure.canRunOnce || zone < 33 || (zone === 33 && cell < 32))) return

	if (!game.global.preMapsActive && !game.global.mapsActive)
		mapsClicked();
	if (!dontRecycle && game.global.mapsActive && getCurrentMapObject().name !== mapName) {
		mapsClicked();
		recycleMap();
	}
	MODULES.mapFunctions.runUniqueMap = mapName;

	if (game.global.preMapsActive) {
		for (var map in game.global.mapsOwnedArray) {
			if (game.global.mapsOwnedArray[map].name === mapName) {
				selectMap(game.global.mapsOwnedArray[map].id)
				rRunMap();
				debug('Running ' + mapName + ' on zone ' + game.global.world + '.');
				if (mapName === 'Atlantrimp' || mapName === 'Trimple Of Doom') rBSRunningAtlantrimp = true;
			}
		}
	}
}

//Void Maps
const voidPrefixes = Object.freeze({
	'Poisonous': 10,
	'Destructive': 11,
	'Heinous': 20,
	'Deadly': 30
});

var voidSuffixes = Object.freeze({
	'Descent': 7.077,
	'Void': 8.822,
	'Nightmare': 9.436,
	'Pit': 10.6
});

function getVoidMapDifficulty(map) {
	if (!map) {
		return 99999;
	}
	var score = 0;
	for (const [prefix, weight] of Object.entries(voidPrefixes)) {
		if (map.name.includes(prefix)) {
			score += weight;
			break;
		}
	}
	for (const [suffix, weight] of Object.entries(voidSuffixes)) {
		if (map.name.includes(suffix)) {
			score += weight;
			break;
		}
	}
	return score;
}

function selectEasierVoidMap(map1, map2) {
	if (getVoidMapDifficulty(map2) > getVoidMapDifficulty(map1)) {
		return map1;
	} else {
		return map2;
	}
}

function VoidMaps() {

	var rDoVoids = false;
	const mapName = 'Void Map';
	const farmingDetails = {
		shouldRun: false,
		mapName: mapName
	};

	if (!getPageSetting('voidMapDefaultSettings').active) return farmingDetails;
	var module = MODULES['mapFunctions'];

	const totalPortals = getTotalPortals();
	const isC3 = game.global.runningChallengeSquared || challengeActive('Mayhem') || challengeActive('Pandemonium') || challengeActive('Desolation');
	const isDaily = challengeActive('Daily');
	const dailyReduction = isDaily && game.global.universe === 2 ? dailyModiferReduction() : 0;
	const dailyAddition = dailyOddOrEven();
	const currChall = game.global.challengeActive;
	const rVMBaseSettings = getPageSetting('voidMapSettings');

	var rVMIndex;

	//Reset void HD Index if not on the right portal/zone/cell as it was initially run.
	if (module.rVoidHDIndex !== Infinity && module.rVoidHDInfo !== (totalPortals + "_" + game.global.world + "_" + (game.global.lastClearedCell + 2))) module.rVoidHDIndex = Infinity;

	for (var y = 0; y < rVMBaseSettings.length; y++) {
		var currSetting = rVMBaseSettings[y];
		var world = currSetting.world + dailyReduction + dailyAddition.skipNextZone;
		if (!currSetting.active || game.global.lastClearedCell + 2 < currSetting.cell) continue;
		if (game.global.world < world) continue;
		if (game.global.world > (currSetting.maxvoidzone + dailyReduction)) continue;
		if (currSetting.runType !== 'All') {
			if (!isC3 && !isDaily && (currSetting.runType !== 'Filler' ||
				(currSetting.runType === 'Filler' && (currSetting.challenge !== 'All' && currSetting.challenge !== currChall)))) continue;
			if (isDaily && currSetting.runType !== 'Daily') continue;
			if (isC3 && (currSetting.runType !== 'C3' ||
				(currSetting.runType === 'C3' && (currSetting.challenge3 !== 'All' && currSetting.challenge3 !== currChall)))) continue;
		}
		if (((currSetting.maxvoidzone + dailyReduction) === game.global.world) ||
			(game.global.world - world >= 0 &&
				//Running voids regardless of HD if we reach our max void zone / Running voids if our voidHDRatio is greater than our target value. Will automatically run voids if HD Ratio on next zone is too high! aka can't gamma burst
				(currSetting.voidHDRatio < voidHDRatio || currSetting.hdRatio < HDRatio || (voidHDRatio * 100) < calcHDRatio(game.global.world + 1, 'void')))) {
			rVMIndex = y;
			if (module.rVoidHDRatio === Infinity) module.rVoidHDRatio = HDRatio;
			if (module.rVoidVHDRatio === Infinity) module.rVoidVHDRatio = voidHDRatio;
			module.rVoidHDIndex = y;
			module.rVoidHDInfo = (totalPortals + "_" + game.global.world + "_" + (game.global.lastClearedCell + 2));
			break;
		}
		else
			continue;
	}

	if (rVMIndex >= 0 || module.rVoidHDIndex !== Infinity) {
		var rVMSettings = rVMBaseSettings[rVMIndex >= 0 ? rVMIndex : module.rVoidHDIndex];
		var rVMJobRatio = rVMSettings.jobratio
		var shouldPortal = rVMSettings.portalAfter

		if (game.global.totalVoidMaps > 0) {
			rDoVoids = true;
			var stackedMaps = Fluffy.isRewardActive('void') ? countStackedVoidMaps() : 0;
		}

		var status = 'Void Maps: ' + game.global.totalVoidMaps + ((stackedMaps) ? " (" + stackedMaps + " stacked)" : "") + ' remaining'

		farmingDetails.shouldRun = rDoVoids;
		farmingDetails.mapName = mapName;
		farmingDetails.jobRatio = rVMJobRatio;
		farmingDetails.repeat = false;
		farmingDetails.status = status;
	}

	if (currentMap === mapName && !rDoVoids) {
		mappingDetails(mapName);
		resetMapVars();
		module.rVoidHDIndex = Infinity;
		module.rVoidHDRatio = Infinity;
		module.rVoidVHDRatio = Infinity;
		module.rVoidHDInfo = Infinity;
		//Setting portal zone to current zone if setting calls for it
		if (shouldPortal) module.portalZone = game.global.world;
	}

	return farmingDetails;
}

MODULES.mapFunctions.rMBHealthFarm = false;
var rMBHealthFarm = false;

function MapBonus() {

	var rShouldMaxMapBonus = false;
	var mapAutoLevel = Infinity;

	const mapName = 'Map Bonus';
	const farmingDetails = {
		shouldRun: false,
		mapName: mapName
	};

	//if (!getPageSetting('mapBonusDefaultSettings').active && !isDoingSpire()) return farmingDetails;

	//Setting up variables and checking if we should use daily settings instead of regular Map Bonus settings
	const isC3 = game.global.runningChallengeSquared || challengeActive('Mayhem') || challengeActive('Pandemonium') || challengeActive('Desolation') || challengeActive('Desolation');
	const isDaily = challengeActive('Daily');
	const currChall = game.global.challengeActive;
	const rMBZone = getPageSetting('mapBonusZone');
	const rMBBaseSettings = getPageSetting('mapBonusSettings');

	const rMBDefaultSettings = getPageSetting('mapBonusDefaultSettings');
	var rMBshouldDoHealthMaps = getPageSetting('mapBonusStacks') > game.global.mapBonus && HDRatio > getPageSetting('mapBonusRatio') && game.global.mapBonus !== 10;
	var rMBspireMapStack = getPageSetting('MaxStacksForSpire') && isDoingSpire() && game.global.mapBonus !== 10;
	var rMBIndex = null;
	if (getPageSetting('mapBonusDefaultSettings').active) {
		for (var y = 0; y < rMBBaseSettings.length; y++) {
			//Skip iterating lines if map bonus is capped.
			if (game.global.mapBonus === 10) continue;
			var currSetting = rMBBaseSettings[y];
			if (!currSetting.active || game.global.lastClearedCell + 2 < currSetting.cell || game.global.world > currSetting.endzone) continue;
			if (currSetting.runType !== 'All') {
				if (!isC3 && !isDaily && (currSetting.runType !== 'Filler' ||
					(currSetting.runType === 'Filler' && (currSetting.challenge !== 'All' && currSetting.challenge !== currChall)))) continue;
				if (isDaily && currSetting.runType !== 'Daily') continue;
				if (isC3 && (currSetting.runType !== 'C3' ||
					(currSetting.runType === 'C3' && (currSetting.challenge3 !== 'All' && currSetting.challenge3 !== currChall)))) continue;
			}
			if (game.global.world - rMBZone[y] >= 0)
				rMBIndex = rMBZone.indexOf(rMBZone[y]);
			else
				continue;
		}
	}

	if ((rMBIndex !== null && rMBIndex >= 0) || rMBshouldDoHealthMaps || rMBspireMapStack) {
		var rMBSettings = rMBIndex !== null ? rMBBaseSettings[rMBIndex] : rMBDefaultSettings;
		var rMBRepeatCounter = 0;
		if (rMBIndex !== null) {
			rMBRepeatCounter = 1
		}
		rMBRepeatCounter = rMBspireMapStack ? 10 : rMBIndex !== null && rMBshouldDoHealthMaps && rMBSettings.repeat !== getPageSetting('mapBonusStacks') ?
			Math.max(rMBSettings.repeat, getPageSetting('mapBonusStacks')) : rMBIndex === null ? getPageSetting('mapBonusStacks') : rMBSettings.repeat
		var rMBSpecial = rMBSettings.special !== '0' ? rMBSettings.special : '0';
		if (rMBSpecial === undefined || rMBSpecial === 'undefined') rMBSpecial = 'lmc';
		rMBSpecial = getAvailableSpecials(rMBSpecial);
		var rMBMapLevel = rMBIndex !== null ? rMBSettings.level : game.global.universe === 1 ? (0 - game.portal.Siphonology.level) : 0;
		var rMBJobRatio = rMBSettings.jobratio;
		var rMBautoLevel = game.global.universe === 2 && (rMBSettings.autoLevel || rMBIndex === null);
		var rMBminZone = game.global.universe === 1 ? (0 - game.portal.Siphonology.level) : 0
		if (rMBSettings.autoLevel) {
			if (game.global.mapRunCounter === 0 && game.global.mapsActive && mapRepeats !== 0) {
				game.global.mapRunCounter = mapRepeats;
				mapRepeats = 0;
			}

			var autoLevel_Repeat = rAutoLevel;
			mapAutoLevel = callAutoMapLevel(currentMap, rAutoLevel, rMBSpecial, 10, rMBminZone, true);
			if (mapAutoLevel !== Infinity) {
				if (autoLevel_Repeat !== Infinity && mapAutoLevel !== autoLevel_Repeat) mapRepeats = game.global.mapRunCounter + 1;
				rMBMapLevel = mapAutoLevel;
			}
		}

		if (rMBRepeatCounter > game.global.mapBonus) {
			rShouldMaxMapBonus = true;
			if (rMBshouldDoHealthMaps) rMBHealthFarm = true;
			else rMBHealthFarm = false;
		}
		var repeat = game.global.mapsActive && ((getCurrentMapObject().level - game.global.world) !== rMBMapLevel || (getCurrentMapObject().bonus !== rMBSpecial && (getCurrentMapObject().bonus !== undefined && rMBSpecial !== '0')) || game.global.mapBonus >= (rMBRepeatCounter - 1));
		var status = (rMBspireMapStack ? 'Spire ' : '') + 'Map Bonus: ' + game.global.mapBonus + "/" + rMBRepeatCounter;

		if (rShouldMaxMapBonus) farmingDetails.shouldRun = rShouldMaxMapBonus || rMBHealthFarm;
		farmingDetails.mapName = mapName;
		farmingDetails.mapLevel = rMBMapLevel;
		farmingDetails.autoLevel = rMBautoLevel;
		farmingDetails.jobRatio = rMBJobRatio;
		farmingDetails.special = rMBSpecial;
		farmingDetails.mapRepeats = rMBRepeatCounter;
		farmingDetails.repeat = !repeat;
		farmingDetails.status = status;
	}

	if (currentMap === mapName && (game.global.mapBonus >= rMBRepeatCounter || !farmingDetails.shouldRun)) {
		mappingDetails(mapName, rMapSettings.mapLevel, rMapSettings.special);
		resetMapVars();
		rMBHealthFarm = false;
		mapRepeats = 0;
	}
	return farmingDetails;
}

function MapFarm() {

	var rShouldMapFarm = false;
	var mapAutoLevel = Infinity;
	const mapName = 'Map Farm';
	const farmingDetails = {
		shouldRun: false,
		mapName: mapName
	};

	if (!getPageSetting('mapFarmDefaultSettings').active) return farmingDetails;
	const dontRecycleMaps = challengeActive('Trappapalooza') || challengeActive('Archaeology') || challengeActive('Berserk') || game.portal.Frenzy.frenzyStarted !== -1 || !newArmyRdy() || currentMap === 'Prestige Raiding';
	const isC3 = game.global.runningChallengeSquared || challengeActive('Mayhem') || challengeActive('Pandemonium') || challengeActive('Desolation');
	const isDaily = challengeActive('Daily');
	const totalPortals = getTotalPortals();
	const currChall = game.global.challengeActive;
	const dailyAddition = dailyOddOrEven();

	const rMFBaseSetting = getPageSetting('mapFarmSettings');
	var rMFIndex;

	//Checking to see if any lines are to be run.
	for (var y = 0; y < rMFBaseSetting.length; y++) {
		var currSetting = rMFBaseSetting[y];
		var world = currSetting.world + dailyAddition.skipNextZone;
		if (dailyAddition.skipZone) continue;
		if (!currSetting.active || currSetting.done === totalPortals + "_" + game.global.world || game.global.lastClearedCell + 2 < currSetting.cell || game.global.world < world || game.global.world > (currSetting.endzone + dailyAddition.skipNextZone) || (game.global.world > world && currSetting.repeatevery === 0)) {
			continue;
		}
		if (currSetting.runType !== 'All') {
			if (!isC3 && !isDaily && (currSetting.runType !== 'Filler' ||
				(currSetting.runType === 'Filler' && (currSetting.challenge !== 'All' && currSetting.challenge !== currChall)))) continue;
			if (isDaily && currSetting.runType !== 'Daily') continue;
			if (isC3 && (currSetting.runType !== 'C3' ||
				(currSetting.runType === 'C3' && (currSetting.challenge3 !== 'All' && currSetting.challenge3 !== currChall)))) continue;
		}
		if (game.global.world === world || ((game.global.world - world) % currSetting.repeatevery === 0)) {
			rMFIndex = y;
			break;
		}
	}

	if (rMFIndex >= 0) {
		var rMFSettings = rMFBaseSetting[rMFIndex];
		var rMFMapLevel = rMFSettings.level;
		var rMFSpecial = rMFSettings.special;
		var rMFRepeatCounter = rMFSettings.repeat;
		if (rMFRepeatCounter === -1) rMFRepeatCounter = Infinity;
		var rMFJobRatio = rMFSettings.jobratio;
		var rMFAtlantrimp = !game.mapUnlocks.AncientTreasure.canRunOnce ? false : rMFSettings.atlantrimp;
		var rMFGather = rMFSettings.gather;

		if (rMFSettings.autoLevel) {
			if (game.global.mapRunCounter === 0 && game.global.mapsActive && mapRepeats !== 0) {
				game.global.mapRunCounter = mapRepeats;
				mapRepeats = 0;
			}

			var autoLevel_Repeat = rAutoLevel;
			mapAutoLevel = callAutoMapLevel(currentMap, rAutoLevel, rMFSpecial, null, null, false);
			if (mapAutoLevel !== Infinity) {
				if (autoLevel_Repeat !== Infinity && mapAutoLevel !== autoLevel_Repeat) mapRepeats = game.global.mapRunCounter + 1;
				rMFMapLevel = mapAutoLevel;
			}
		}

		//When running Wither make sure map level is lower than 0 so that we don't accumulate extra stacks.
		if (challengeActive('Wither') && rMFMapLevel >= 0)
			rMFMapLevel = -1;
		//If you're running Transmute and the rMFSpecial variable is either LMC or SMC it changes it to LSC/SSC.
		rMFSpecial = (getAvailableSpecials(rMFSpecial))

		if (rMFRepeatCounter > game.global.mapRunCounter)
			rShouldMapFarm = true;

		//Marking setting as complete if we've run enough maps.
		if (currentMap === mapName && game.global.mapRunCounter >= rMFRepeatCounter) {
			mappingDetails(mapName, rMFMapLevel, rMFSpecial);
			resetMapVars(rMFSettings);
			rShouldMapFarm = false;
			if (rMFAtlantrimp) runUniqueMap('Atlantrimp', dontRecycleMaps);
			saveSettings();
		}
		var repeatNumber = rMFRepeatCounter === Infinity ? '∞' : rMFRepeatCounter;
		var repeat = game.global.mapsActive && ((getCurrentMapObject().level - game.global.world) !== rMFMapLevel || (getCurrentMapObject().bonus !== rMFSpecial && (getCurrentMapObject().bonus !== undefined && rMFSpecial !== '0')) || game.global.mapRunCounter + 1 === rMFRepeatCounter);
		var status = 'Map Farm: ' + game.global.mapRunCounter + "/" + repeatNumber;

		farmingDetails.shouldRun = rShouldMapFarm;
		farmingDetails.mapName = mapName;
		farmingDetails.mapLevel = rMFMapLevel;
		farmingDetails.autoLevel = rMFSettings.autoLevel;
		farmingDetails.jobRatio = rMFJobRatio;
		farmingDetails.special = rMFSpecial;
		farmingDetails.mapRepeats = rMFRepeatCounter;
		farmingDetails.gather = rMFGather;
		farmingDetails.runAtlantrimp = rMFAtlantrimp;
		farmingDetails.repeat = !repeat;
		farmingDetails.status = status;
	}

	return farmingDetails;
}

function TributeFarm() {

	var rShouldTributeFarm = false;
	var rShouldMetFarm = false;
	var mapAutoLevel = Infinity;
	const mapName = 'Tribute Farm';
	const farmingDetails = {
		shouldRun: false,
		mapName: mapName
	};

	if (!getPageSetting('tributeFarmDefaultSettings').active || (game.buildings.Tribute.locked && game.jobs.Meteorologist.locked)) return farmingDetails;
	var rShouldTributeFarm = false;
	var rShouldMetFarm = false;
	const isC3 = game.global.runningChallengeSquared || challengeActive('Mayhem') || challengeActive('Pandemonium') || challengeActive('Desolation');
	const isDaily = challengeActive('Daily');
	const dontRecycleMaps = challengeActive('Trappapalooza') || challengeActive('Archaeology') || challengeActive('Berserk') || game.portal.Frenzy.frenzyStarted !== -1 || !newArmyRdy() || currentMap === 'Prestige Raiding';
	const totalPortals = getTotalPortals();
	const currChall = game.global.challengeActive;
	const rTrFBaseSetting = getPageSetting('tributeFarmSettings');
	const dailyAddition = dailyOddOrEven();
	var rTrFIndex;

	//Identifying which map line to run.
	for (var y = 0; y < rTrFBaseSetting.length; y++) {
		var currSetting = rTrFBaseSetting[y];
		var world = currSetting.world + dailyAddition.skipNextZone;
		if (dailyAddition.skipZone) continue;
		if (!currSetting.active || currSetting.done === totalPortals + "_" + game.global.world || game.global.world < world || game.global.world > (currSetting.endzone + dailyAddition.skipNextZone) || (game.global.world > world && currSetting.repeatevery === 0) || game.global.lastClearedCell + 2 < currSetting.cell) {
			continue;
		}
		if (currSetting.runType !== 'All') {
			if (!isC3 && !isDaily && (currSetting.runType !== 'Filler' ||
				(currSetting.runType === 'Filler' && (currSetting.challenge !== 'All' && currSetting.challenge !== currChall)))) continue;
			if (isDaily && currSetting.runType !== 'Daily') continue;
			if (isC3 && (currSetting.runType !== 'C3' ||
				(currSetting.runType === 'C3' && (currSetting.challenge3 !== 'All' && currSetting.challenge3 !== currChall)))) continue;
		}
		if (game.global.world === world || ((game.global.world - world) % currSetting.repeatevery === 0)) {
			rTrFIndex = y;
			break;
		}
	}

	if (rTrFIndex >= 0) {
		//Initialing variables
		var rTrFSettings = rTrFBaseSetting[rTrFIndex];
		var rTrFMapLevel = rTrFSettings.level
		var rTrFTributes = game.buildings.Tribute.locked == 1 ? 0 : rTrFSettings.tributes;
		var rTrFMeteorologists = game.jobs.Meteorologist.locked == 1 ? 0 : rTrFSettings.mets;
		var rTrFSpecial = getAvailableSpecials('lsc', true);
		var rTrFJobRatio = rTrFSettings.jobratio;
		var rTrFbuyBuildings = rTrFSettings.buildings;
		var rTrFAtlantrimp = !game.mapUnlocks.AncientTreasure.canRunOnce ? false : rTrFSettings.atlantrimp;

		//AutoLevel code.
		if (rTrFSettings.autoLevel) {
			if (game.global.mapRunCounter === 0 && game.global.mapsActive && mapRepeats !== 0) {
				game.global.mapRunCounter = mapRepeats;
				mapRepeats = 0;
			}
			var autoLevel_Repeat = rAutoLevel;
			mapAutoLevel = callAutoMapLevel(currentMap, rAutoLevel, rTrFSpecial, null, null, false);
			if (mapAutoLevel !== Infinity) {
				if (autoLevel_Repeat !== Infinity && mapAutoLevel !== autoLevel_Repeat) mapRepeats = game.global.mapRunCounter + 1;
				rTrFMapLevel = mapAutoLevel;
			}
		}

		if (challengeActive('Wither') && rTrFMapLevel >= 0)
			rTrFMapLevel = -1;

		//When mapType is set as Map Count work out how many Tributes/Mets we can farm in the amount of maps specified.
		if (rTrFSettings.mapType === 'Map Count') {
			if (rTrFTributes !== 0) {
				var tributeMaps = currentMap === mapName ? rTrFTributes - game.global.mapRunCounter : rTrFTributes;
				var tributeTime = tributeMaps * 25;
				if (tributeMaps > 4) tributeTime += (Math.floor(tributeMaps / 5) * 45);
				var foodEarnedTributes = game.resources.food.owned + scaleToCurrentMapLocal(simpleSecondsLocal("food", tributeTime, true, rTrFJobRatio), false, true, rTrFMapLevel);
				rTrFTributes = game.buildings.Tribute.purchased + calculateMaxAffordLocal(game.buildings.Tribute, true, false, false, false, 1, foodEarnedTributes);
			}
			if (rTrFMeteorologists !== 0) {
				var meteorologistTime = (currentMap === mapName ? rTrFMeteorologists - game.global.mapRunCounter : rTrFMeteorologists) * 25;
				if (rTrFMeteorologists > 4) meteorologistTime += (Math.floor(rTrFMeteorologists / 5) * 45);
				var foodEarnedMets = game.resources.food.owned + scaleToCurrentMapLocal(simpleSecondsLocal("food", meteorologistTime, true, rTrFJobRatio), false, true, rTrFMapLevel);
				rTrFMeteorologists = game.jobs.Meteorologist.owned + calculateMaxAffordLocal(game.jobs.Meteorologist, false, false, true, false, 1, foodEarnedMets);
			}
		}

		if (rTrFTributes > game.buildings.Tribute.purchased || rTrFMeteorologists > game.jobs.Meteorologist.owned) {
			if (rTrFTributes > game.buildings.Tribute.purchased)
				rShouldTributeFarm = true;
			if (rTrFMeteorologists > game.jobs.Meteorologist.owned)
				rShouldMetFarm = true;
		}

		if (rShouldTributeFarm && !getPageSetting('buildingsType')) buyTributes();

		//Figuring out if we have enough resources to run Atlantrimp when setting is enabled.
		if (rTrFAtlantrimp && (rShouldTributeFarm || rShouldMetFarm) && (game.global.world > 33 || (game.global.world === 33 && game.global.lastClearedCell + 2 > 50))) {
			var tributeCost = 0;
			var metCost = 0;

			if (rTrFTributes > game.buildings.Tribute.purchased) {
				for (x = 0; x < rTrFTributes - game.buildings.Tribute.purchased; x++) {
					tributeCost += Math.pow(1.05, game.buildings.Tribute.purchased) * 10000;
				}
			}
			if (rTrFMeteorologists > game.jobs.Meteorologist.owned) {
				for (x = 0; x < rTrFMeteorologists - game.jobs.Meteorologist.owned; x++) {
					metCost += Math.pow(game.jobs.Meteorologist.cost.food[1], game.jobs.Meteorologist.owned + x) * game.jobs.Meteorologist.cost.food[0];
				}
			}
			var totalTrFCost = tributeCost + metCost;

			var barnCost = 0;
			if (totalTrFCost > (game.resources.food.max * (1 + (game.portal.Packrat.modifier * game.portal.Packrat.radLevel))))
				barnCost += game.buildings.Barn.cost.food();
			totalTrFCost += barnCost;

			//Figuring out how much Food we'd farm in the time it takes to run Atlantrimp. Seconds is 165 due to avg of 5x caches (20s per), 4x chronoimps (5s per), 1x jestimp (45s)
			var resourceFarmed = scaleToCurrentMapLocal(simpleSecondsLocal("food", 165, true, rTrFJobRatio), false, true, rTrFMapLevel);

			if ((totalTrFCost > game.resources.food.owned - barnCost + resourceFarmed) && game.resources.food.owned > totalTrFCost / 2) {
				runUniqueMap("Atlantrimp", dontRecycleMaps);
			}
		}
		//Recycles map if we don't need to finish it for meeting the tribute/meteorologist requirements
		if (currentMap === mapName && !rShouldTributeFarm && !rShouldMetFarm) {
			mappingDetails(mapName, rTrFMapLevel, rTrFSpecial, rTrFTributes, rTrFMeteorologists);
			resetMapVars(rTrFSettings);
			if (!dontRecycleMaps && game.global.mapsActive) {
				mapsClicked(true);
				recycleMap();
			}
			rTrFbuyBuildings = false;
			return farmingDetails;
		}

		var repeat = game.global.mapsActive && ((getCurrentMapObject().level - game.global.world) !== rTrFMapLevel || (getCurrentMapObject().bonus !== rTrFSpecial && (getCurrentMapObject().bonus !== undefined && rTrFSpecial !== '0')));
		var status = rTrFTributes > game.buildings.Tribute.owned ?
			'Tribute Farm: ' + game.buildings.Tribute.owned + "/" + rTrFTributes :
			'Meteorologist Farm: ' + game.jobs.Meteorologist.owned + "/" + rTrFMeteorologists;

		farmingDetails.shouldRun = rShouldTributeFarm || rShouldMetFarm;
		farmingDetails.mapName = mapName;
		farmingDetails.mapLevel = rTrFMapLevel;
		farmingDetails.autoLevel = rTrFSettings.autoLevel;
		farmingDetails.jobRatio = rTrFJobRatio;
		farmingDetails.special = rTrFSpecial;
		farmingDetails.shouldTribute = rShouldTributeFarm;
		farmingDetails.tribute = rTrFTributes;
		farmingDetails.shouldMeteorologist = rShouldMetFarm;
		farmingDetails.meteorologist = rTrFMeteorologists;
		farmingDetails.runAtlantrimp = rTrFAtlantrimp;
		farmingDetails.buyBuildings = rTrFbuyBuildings;
		farmingDetails.repeat = !repeat;
		farmingDetails.status = status;
	}

	return farmingDetails;
}

MODULES.mapFunctions.smithyMapCount = [0, 0, 0];

function SmithyFarm() {

	const mapName = 'Smithy Farm';
	const farmingDetails = {
		shouldRun: false,
		mapName: mapName
	};

	if (game.buildings.Smithy.locked || (!getPageSetting('smithyFarmDefaultSettings').active && !challengeActive('Quest')) || (challengeActive('Quest') && currQuest() !== 10) || challengeActive('Transmute') || challengeActive('Pandemonium')) return farmingDetails;

	var rShouldSmithyFarm = false;
	var rShouldSmithyGemFarm = false;
	var rShouldSmithyWoodFarm = false;
	var rShouldSmithyMetalFarm = false;
	var mapAutoLevel = Infinity;

	const isC3 = game.global.runningChallengeSquared || challengeActive('Mayhem') || challengeActive('Pandemonium') || challengeActive('Desolation');
	const isDaily = challengeActive('Daily');
	const dontRecycleMaps = challengeActive('Trappapalooza') || challengeActive('Archaeology') || challengeActive('Berserk') || game.portal.Frenzy.frenzyStarted !== -1 || !newArmyRdy() || currentMap === 'Prestige Raiding';
	const totalPortals = getTotalPortals();
	const currChall = game.global.challengeActive;
	const rSFBaseSetting = getPageSetting('smithyFarmSettings');
	const dailyAddition = dailyOddOrEven();

	var rSFIndex;

	for (var y = 0; y < rSFBaseSetting.length; y++) {
		var currSetting = rSFBaseSetting[y];
		var world = currSetting.world + dailyAddition.skipNextZone;
		if (dailyAddition.skipZone) continue;
		if (!currSetting.active || currSetting.done === totalPortals + "_" + game.global.world || game.global.world < world || game.global.world > (currSetting.endzone + dailyAddition.skipNextZone) || (game.global.world > world && currSetting.repeatevery === 0) || game.global.lastClearedCell + 2 < currSetting.cell) {
			continue;
		}
		if (currSetting.runType !== 'All') {
			if (!isC3 && !isDaily && (currSetting.runType !== 'Filler' ||
				(currSetting.runType === 'Filler' && (currSetting.challenge !== 'All' && currSetting.challenge !== currChall)))) continue;
			if (isDaily && currSetting.runType !== 'Daily') continue;
			if (isC3 && (currSetting.runType !== 'C3' ||
				(currSetting.runType === 'C3' && (currSetting.challenge3 !== 'All' && currSetting.challenge3 !== currChall)))) continue;
		}
		if (game.global.world === world || ((game.global.world - world) % currSetting.repeatevery === 0)) {
			rSFIndex = y;
			break;
		}
	}

	if (rSFIndex >= 0 || currQuest() === 10) {

		var mapBonus;
		if (game.global.mapsActive) mapBonus = getCurrentMapObject().bonus;

		var rSFSettings = rSFBaseSetting[rSFIndex];
		var rSFMapLevel = challengeActive('Quest') ? -1 : rSFSettings.level;
		var rSFSpecial = getAvailableSpecials('lmc', true);
		var rSFJobRatio = '0,0,0,0';
		var rSFSmithies = challengeActive('Quest') ? getPageSetting('questSmithyMaps') : rSFSettings.repeat;

		if (currQuest() === 10 || rSFSettings.autoLevel) {
			if (game.global.mapRunCounter === 0 && game.global.mapsActive && MODULES.mapFunctions.smithyMapCount !== [0, 0, 0] && typeof getCurrentMapObject().bonus !== 'undefined') {
				if (mapBonus === 'lsc' || mapBonus === 'ssc') game.global.mapRunCounter = MODULES.mapFunctions.smithyMapCount[0];
				else if (mapBonus === 'lwc' || mapBonus === 'swc') game.global.mapRunCounter = MODULES.mapFunctions.smithyMapCount[1];
				else if (mapBonus === 'lmc' || mapBonus === 'smc') game.global.mapRunCounter = MODULES.mapFunctions.smithyMapCount[2];
			}

			var autoLevel_Repeat = rAutoLevel;
			mapAutoLevel = callAutoMapLevel(currentMap, rAutoLevel, rSFSpecial, null, null, false);
			if (mapAutoLevel !== Infinity) {
				if (autoLevel_Repeat !== Infinity && mapAutoLevel !== autoLevel_Repeat) {
					if (game.global.mapsActive && typeof mapBonus !== 'undefined') {
						if (mapBonus === 'lsc' || mapBonus === 'ssc') MODULES.mapFunctions.smithyMapCount[0] = (game.global.mapRunCounter + 1);
						else if (mapBonus === 'lwc' || mapBonus === 'swc') MODULES.mapFunctions.smithyMapCount[1] = (game.global.mapRunCounter + 1);
						else if (mapBonus === 'lmc' || mapBonus === 'smc') MODULES.mapFunctions.smithyMapCount[2] = (game.global.mapRunCounter + 1);
					}
				}
				rSFMapLevel = mapAutoLevel;
			}
		}
		if (challengeActive('Wither') && rSFMapLevel >= 0)
			rSFMapLevel = -1;

		//Initialising base food & metal vars for calcs later on
		var woodBase = scaleToCurrentMapLocal(simpleSecondsLocal("wood", 1, true, '0,1,0'), false, true, rSFMapLevel);
		var metalBase = scaleToCurrentMapLocal(simpleSecondsLocal("metal", 1, true, '0,0,1'), false, true, rSFMapLevel);

		//When mapType is set as Map Count work out how many Smithies we can farm in the amount of maps specified.
		if ((currQuest() === 10 || rSFSettings.mapType === 'Map Count') && rSFSmithies !== 0) {
			var smithyCount = 0;
			//Checking total map count user wants to run
			var totalMaps = currentMap === mapName ? rSFSmithies - game.global.mapRunCounter : rSFSmithies;
			//Calculating cache + jestimp + chronoimp
			var mapTime = totalMaps * 25;
			if (totalMaps > 4) mapTime += (Math.floor(totalMaps / 5) * 45);
			var smithy_Cost_Mult = game.buildings.Smithy.cost.gems[1];

			//Calculating wood & metal earned then using that info to identify how many Smithies you can afford from those values.
			var woodEarned = woodBase * mapTime;
			var metalEarned = metalBase * mapTime;
			var woodSmithies = game.buildings.Smithy.purchased + getMaxAffordable(Math.pow((smithy_Cost_Mult), game.buildings.Smithy.owned) * game.buildings.Smithy.cost.wood[0], (game.resources.wood.owned + woodEarned), (smithy_Cost_Mult), true);
			var metalSmithies = game.buildings.Smithy.purchased + getMaxAffordable(Math.pow((smithy_Cost_Mult), game.buildings.Smithy.owned) * game.buildings.Smithy.cost.wood[0], (game.resources.metal.owned + metalEarned), (smithy_Cost_Mult), true);

			if (woodSmithies > 0 && metalSmithies > 0) {
				//Taking the minimum value of the 2 to see which is more reasonable to aim for
				smithyCount = Math.min(woodSmithies, metalSmithies)

				//Figuring out Smithy cost of the 2 different resources
				var rSFWoodCost = getBuildingItemPrice(game.buildings.Smithy, 'wood', false, smithyCount - game.buildings.Smithy.purchased);
				var rSFMetalCost = getBuildingItemPrice(game.buildings.Smithy, 'metal', false, smithyCount - game.buildings.Smithy.purchased);

				//Looking to see how many maps it would take to reach this smithy target
				var rSFWoodMapCount = Math.floor((rSFWoodCost - game.resources.wood.owned) / (woodBase * 34));
				var rSFMetalMapCount = Math.floor((rSFMetalCost - game.resources.metal.owned) / (metalBase * 34));
				//If combined maps for both resources is higher than desired maps to be run then will farm 1 less smithy
				if ((rSFWoodMapCount + rSFMetalMapCount) > rSFSmithies) rSFSmithies = smithyCount - 1
				else rSFSmithies = smithyCount;
			}
			else rSFSmithies = 1;
		}

		rSFGoal = 0;
		var smithyGemCost = getBuildingItemPrice(game.buildings.Smithy, 'gems', false, rSFSmithies - game.buildings.Smithy.purchased);
		var smithyWoodCost = getBuildingItemPrice(game.buildings.Smithy, 'wood', false, rSFSmithies - game.buildings.Smithy.purchased);
		var smithyMetalCost = getBuildingItemPrice(game.buildings.Smithy, 'metal', false, rSFSmithies - game.buildings.Smithy.purchased);

		if (rSFSmithies > game.buildings.Smithy.purchased) {
			if (smithyGemCost > game.resources.gems.owned) {
				rShouldSmithyGemFarm = true;
				rSFSpecial = getAvailableSpecials('lsc', true);
				rSFJobRatio = '1,0,0,0';
				rSFGoal = prettify(smithyGemCost) + ' gems.';
			}
			else if (smithyWoodCost > game.resources.wood.owned) {
				rShouldSmithyWoodFarm = true;
				rSFSpecial = getAvailableSpecials('lwc', true);
				rSFJobRatio = '0,1,0,0';
				rSFGoal = prettify(smithyWoodCost) + ' wood.';
			}
			else if (smithyMetalCost > game.resources.metal.owned) {
				rShouldSmithyMetalFarm = true;
				rSFSpecial = getAvailableSpecials('lmc', true);
				rSFJobRatio = '0,0,1,0';
				rSFGoal = prettify(smithyMetalCost) + ' metal.';
			}
			rShouldSmithyFarm = true;
		}

		if ((!getPageSetting('buildingsType') || !getPageSetting('buildingSettingsArray').Smithy.enabled || challengeActive('Hypothermia')) && rShouldSmithyFarm && rSFSmithies > game.buildings.Smithy.purchased && canAffordBuilding('Smithy', false, false, false, false, 1)) {
			buyBuilding("Smithy", true, true, 1);
		}

		//Recycles map if we don't need to finish it for meeting the farm requirements
		if (currentMap === mapName) {
			if (game.global.mapsActive && typeof mapBonus !== 'undefined' && ((!rShouldSmithyGemFarm && mapBonus.includes('sc')) || (!rShouldSmithyWoodFarm && mapBonus.includes('wc')) || (!rShouldSmithyMetalFarm && mapBonus.includes('mc')))) {
				var mapProg = game.global.mapsActive ? ((getCurrentMapCell().level - 1) / getCurrentMapObject().size) : 0;
				var mappingLength = (mapProg > 0 ? Number(((game.global.mapRunCounter + mapProg)).toFixed(2)) : game.global.mapRunCounter);
				if (mapBonus === 'lsc' || mapBonus === 'ssc') MODULES.mapFunctions.smithyMapCount[0] = mappingLength;
				else if (mapBonus === 'lwc' || mapBonus === 'swc') MODULES.mapFunctions.smithyMapCount[1] = mappingLength;
				else if (mapBonus === 'lmc' || mapBonus === 'smc') MODULES.mapFunctions.smithyMapCount[2] = mappingLength;
				if (!dontRecycleMaps) {
					mapsClicked(true);
					recycleMap();
				}
			}
			if (!rShouldSmithyFarm) {
				mappingDetails(mapName, rSFMapLevel, rSFSpecial, rSFSmithies);
				MODULES.mapFunctions.smithyMapCount = [0, 0, 0];
				HDRatio = calcHDRatio(game.global.world, 'world');
				if (!challengeActive('Quest') && rSFSettings.meltingPoint) runUniqueMap('Melting Point', dontRecycleMaps);
				resetMapVars(rSFSettings);
				return farmingDetails;
			}
		}

		var repeat = game.global.mapsActive && ((getCurrentMapObject().level - game.global.world) !== rSFMapLevel || mapBonus !== rSFSpecial);
		var status = 'Smithy Farming for ' + rSFGoal;

		farmingDetails.shouldRun = rShouldSmithyFarm;
		farmingDetails.mapName = mapName;
		farmingDetails.mapLevel = rSFMapLevel;
		farmingDetails.autoLevel = currQuest() === 10 ? true : rSFSettings.autoLevel;
		farmingDetails.jobRatio = rSFJobRatio;
		farmingDetails.special = rSFSpecial;
		farmingDetails.smithies = rSFSmithies;
		farmingDetails.farmGoal = rSFGoal;
		farmingDetails.gemFarm = rShouldSmithyGemFarm;
		farmingDetails.repeat = !repeat;
		farmingDetails.status = status;

	}
	return farmingDetails;
}

var rWFDebug = 0;

function WorshipperFarm() {
	const mapName = 'Worshipper Farm';
	const farmingDetails = {
		shouldRun: false,
		mapName: mapName
	};
	if (game.jobs.Worshipper.locked || !getPageSetting('worshipperFarmDefaultSettings').active) return farmingDetails;
	const isC3 = game.global.runningChallengeSquared || challengeActive('Mayhem') || challengeActive('Pandemonium') || challengeActive('Desolation');
	const isDaily = challengeActive('Daily');
	const currChall = game.global.challengeActive;
	const rWFBaseSetting = getPageSetting('worshipperFarmSettings');
	const rWFDefaultSetting = getPageSetting('worshipperFarmDefaultSettings');
	const dailyAddition = dailyOddOrEven();

	var rShouldWorshipperFarm = false;
	var rShouldSkip = false;
	var mapAutoLevel = Infinity;

	var rWFIndex;
	for (var y = 0; y < rWFBaseSetting.length; y++) {
		var currSetting = rWFBaseSetting[y];
		var world = currSetting.world + dailyAddition.skipNextZone;
		if (dailyAddition.skipZone) continue;
		if (!currSetting.active || currSetting.done === totalPortals + "_" + game.global.world || game.global.world < world || game.global.lastClearedCell + 2 < currSetting.cell || game.global.world > (currSetting.endzone + dailyAddition.skipNextZone) || (game.global.world > world && currSetting.repeatevery === 0)) {
			continue;
		}
		if (currSetting.runType !== 'All') {
			if (!isC3 && !isDaily && (currSetting.runType !== 'Filler' ||
				(currSetting.runType === 'Filler' && (currSetting.challenge !== 'All' && currSetting.challenge !== currChall)))) continue;
			if (isDaily && currSetting.runType !== 'Daily') continue;
			if (isC3 && (currSetting.runType !== 'C3' ||
				(currSetting.runType === 'C3' && (currSetting.challenge3 !== 'All' && currSetting.challenge3 !== currChall)))) continue;
		}
		if (game.global.world === world || ((game.global.world - world) % currSetting.repeatevery === 0)) {
			rWFIndex = y;
			break;
		}
	}

	if (rWFIndex >= 0) {
		var rWFSettings = rWFBaseSetting[rWFIndex];
		rWFGoal = rWFSettings.worshipper;
		var rWFMapLevel = rWFSettings.level;
		var rWFJobRatio = rWFSettings.jobratio;
		var rWFSpecial = getAvailableSpecials('lsc', true);

		if (rWFSettings.autoLevel) {
			if (game.global.mapRunCounter === 0 && game.global.mapsActive && mapRepeats !== 0) {
				game.global.mapRunCounter = mapRepeats;
				mapRepeats = 0;
			}
			var autoLevel_Repeat = rAutoLevel;
			mapAutoLevel = callAutoMapLevel(currentMap, rAutoLevel, rWFSpecial, null, null, false);
			if (mapAutoLevel !== Infinity) {
				if (autoLevel_Repeat !== Infinity && mapAutoLevel !== autoLevel_Repeat) mapRepeats = game.global.mapRunCounter + 1;
				rWFMapLevel = mapAutoLevel;
			}
		}

		if (challengeActive('Wither') && rWFMapLevel >= 0) rWFMapLevel = -1;
		if (rWFDefaultSetting.shipSkipEnabled && game.jobs.Worshipper.owned != 50 && game.stats.zonesCleared.value != rWFDebug && (scaleToCurrentMapLocal(simpleSecondsLocal("food", 20, true, rWFJobRatio), false, true, rWFMapLevel) < (game.jobs.Worshipper.getCost() * rWFDefaultSetting.shipskip))) {
			debug("Skipping Worshipper farming on zone " + game.global.world + " as 1 " + rWFSpecial + " map doesn't provide " + rWFDefaultSetting.shipskip + " or more Worshippers. Evaluate your map settings to correct this");
			rWFDebug = game.stats.zonesCleared.value;
		}
		if (game.jobs.Worshipper.owned !== 50 && rWFGoal > game.jobs.Worshipper.owned && game.stats.zonesCleared.value !== rWFDebug)
			rShouldWorshipperFarm = true;

		if (currentMap !== mapName && game.jobs.Worshipper.owned >= rWFGoal)
			rShouldSkip = true;

		if (currentMap === mapName && !rShouldWorshipperFarm) {
			mappingDetails(mapName, rWFMapLevel, rWFSpecial);
			if (getPageSetting('spamMessages').map_Details && rShouldSkip) debug("Worshipper Farm (Z" + game.global.world + ") skipped as Worshipper goal has been met (" + game.jobs.Worshipper.owned + "/" + rWFGoal + ").");
			resetMapVars(rWFSettings);
		}

		var repeat = game.global.mapsActive && ((getCurrentMapObject().level - game.global.world) !== rWFMapLevel || (getCurrentMapObject().bonus !== rWFSpecial && (getCurrentMapObject().bonus !== undefined && rWFSpecial !== '0')));
		var status = 'Worshipper Farm: ' + game.jobs.Worshipper.owned + "/" + rWFGoal;

		farmingDetails.shouldRun = rShouldWorshipperFarm;
		farmingDetails.mapName = mapName;
		farmingDetails.mapLevel = rWFMapLevel;
		farmingDetails.autoLevel = rWFSettings.autoLevel;
		farmingDetails.jobRatio = rWFJobRatio;
		farmingDetails.special = rWFSpecial;
		farmingDetails.worshipper = rWFGoal;
		farmingDetails.repeat = !repeat;
		farmingDetails.status = status;
		farmingDetails.gather = 'food';

	}
	return farmingDetails;
}

//Daily (bloodthirst), Balance, Unbalance & Storm Destacking
function MapDestacking() {

	const mapName = 'rDestack';
	const farmingDetails = {
		shouldRun: false,
		mapName: mapName
	};

	if (
		!(getPageSetting('balance') && challengeActive('Balance')) &&
		!(getPageSetting('unbalance') && challengeActive('Unbalance')) &&
		!(getPageSetting('storm') && challengeActive('Storm')) &&
		!(challengeActive('Daily') && getPageSetting('bloodthirstDestack') && typeof game.global.dailyChallenge.bloodthirst !== 'undefined')
	)
		return farmingDetails;

	var rShouldDestack = false;
	var rDMapLevel = -(game.global.world - 6);
	var rDSpecial = getAvailableSpecials('fa');
	var rDDestack = 0;

	//Balance Destacking
	if (challengeActive('Balance')) {
		var balanceZone = getPageSetting('balanceZone') > 0 ? getPageSetting('balanceZone') : Infinity;
		var balanceStacks = getPageSetting('balanceStacks') > 0 ? getPageSetting('balanceStacks') : Infinity;
		rShouldDestack = ((gammaMaxStacks(true) - game.heirlooms.Shield.gammaBurst.stacks !== 0) && game.global.world >= balanceZone && (game.challenges.Balance.balanceStacks >= balanceStacks || (getPageSetting('balanceImprobDestack') && game.global.lastClearedCell + 2 == 100 && game.challenges.Balance.balanceStacks != 0)));
		rDDestack = game.challenges.Balance.balanceStacks;
	}

	//Unbalance Destacking
	if (challengeActive('Unbalance')) {
		var unbalanceZone = getPageSetting('unbalanceZone') > 0 ? getPageSetting('unbalanceZone') : Infinity;
		var unbalanceStacks = getPageSetting('unbalanceStacks') > 0 ? getPageSetting('unbalanceStacks') : Infinity;
		rShouldDestack = ((gammaMaxStacks(true) - game.heirlooms.Shield.gammaBurst.stacks !== 0) && game.global.world >= unbalanceZone && (game.challenges.Unbalance.balanceStacks >= unbalanceStacks || (getPageSetting('unbalanceImprobDestack') && game.global.lastClearedCell + 2 == 100 && game.challenges.Unbalance.balanceStacks != 0)));
		rDDestack = game.challenges.Unbalance.balanceStacks;
	}

	//Bloodthirst Destacking
	if (challengeActive('Daily') && !game.global.mapsActive && game.global.dailyChallenge.bloodthirst.stacks >= dailyModifiers.bloodthirst.getFreq(game.global.dailyChallenge.bloodthirst.strength) - 1) {
		rShouldDestack = true;
		rDDestack = game.global.dailyChallenge.bloodthirst.stacks;
	}

	//Storm Destacking
	if (challengeActive('Storm')) {
		var stormZone = getPageSetting('stormZone') > 0 ? getPageSetting('stormZone') : Infinity;
		var stormStacks = getPageSetting('stormStacks') > 0 ? getPageSetting('stormStacks') : Infinity;
		rShouldDestack = (game.global.world >= stormZone && (game.challenges.Storm.beta >= stormStacks && game.challenges.Storm.beta != 0));
		rDDestack = game.challenges.Storm.beta;
	}

	if (!game.jobs.Explorer.locked && game.global.mapsActive && getCurrentMapObject().level == 6 &&
		(
			(challengeActive('Balance') && !rShouldDestack && game.challenges.Balance.balanceStacks == 0) ||
			(challengeActive('Daily') && !rShouldDestack && game.global.dailyChallenge.bloodthirst.stacks === 0) ||
			(challengeActive('Unbalance') && !rShouldDestack && game.challenges.Unbalance.balanceStacks == 0) ||
			(challengeActive('Storm') && !rShouldDestack && game.challenges.Storm.beta == 0)
		)
	) {
		mapsClicked(true);
		recycleMap();
	}

	var repeat = game.global.mapsActive && ((getCurrentMapObject().level - game.global.world) !== rDMapLevel || (getCurrentMapObject().bonus !== rDSpecial && (getCurrentMapObject().bonus !== undefined && rDSpecial !== '0')) || (getCurrentMapObject().size - getCurrentMapCell().level) > rDDestack);

	var status = 'Destacking: ' + rDDestack + ' stacks remaining';

	farmingDetails.shouldRun = rShouldDestack;
	farmingDetails.mapName = mapName;
	farmingDetails.mapLevel = rDMapLevel;
	farmingDetails.autoLevel = false;
	farmingDetails.special = rDSpecial;
	farmingDetails.destack = rDDestack;
	farmingDetails.repeat = !repeat;
	farmingDetails.status = status;


	return farmingDetails;
}

//Prestige variables == TO GET SORTED LATER!
MODULES.mapFunctions.prestigeMapArray = new Array(5);
MODULES.mapFunctions.prestigeFragMapBought = false;
MODULES.mapFunctions.prestigeRunningMaps = false;
MODULES.mapFunctions.prestigeRaidZone = 0;

function PrestigeRaiding() {

	const mapName = 'Prestige Raiding'
	const farmingDetails = {
		shouldRun: false,
		mapName: mapName
	};

	if (!getPageSetting('raidingDefaultSettings').active) return farmingDetails;

	var rShouldPrestigeRaid = false;
	const isC3 = game.global.runningChallengeSquared || challengeActive('Mayhem') || challengeActive('Pandemonium') || challengeActive('Desolation');
	const isDaily = challengeActive('Daily');
	const currChall = game.global.challengeActive;
	const rRaidingDefaultSetting = getPageSetting('raidingDefaultSettings');
	const rRaidingBaseSetting = getPageSetting('raidingSettings');

	var rRaidingIndex;

	for (var y = 0; y < rRaidingBaseSetting.length; y++) {
		const currSetting = rRaidingBaseSetting[y];
		var targetPrestige = challengeActive('Mapology') ? autoTrimpSettings['mapologyPrestige'].selected : currSetting.prestigeGoal !== 'All' ? equipmentList[currSetting.prestigeGoal].Upgrade : 'GamesOP';
		var raidZones = currSetting.raidingzone

		if (!currSetting.active || game.global.world < currSetting.world || (game.global.world > currSetting.world && currSetting.repeatevery === 0) || game.global.world > currSetting.endzone || game.global.lastClearedCell + 2 < currSetting.cell) {
			continue;
		}
		if (currSetting.repeatevery !== 0 && game.global.world > currSetting.world) {
			var times = currSetting.repeatevery;
			var repeats = Math.round((game.global.world - currSetting.world) / times);
			if (repeats > 0) raidZones += (times * repeats);
		}

		if (equipsToGet(raidZones, targetPrestige)[0] === 0) continue;
		if (currSetting.runType !== 'All') {
			if (!isC3 && !isDaily && (currSetting.runType !== 'Filler' ||
				(currSetting.runType === 'Filler' && (currSetting.challenge !== 'All' && currSetting.challenge !== currChall)))) continue;
			if (isDaily && currSetting.runType !== 'Daily') continue;
			if (isC3 && (currSetting.runType !== 'C3' ||
				(currSetting.runType === 'C3' && (currSetting.challenge3 !== 'All' && currSetting.challenge3 !== currChall)))) continue;
		}
		if (game.global.world === currSetting.world || ((game.global.world - currSetting.world) % currSetting.repeatevery === 0)) {
			rRaidingIndex = y;
			break;
		}
	}

	if (rRaidingIndex >= 0) {
		//Setting up variables and checking if we should use daily settings instead of normal Prestige Farm settings
		var rRaidingSettings = rRaidingBaseSetting[rRaidingIndex];
		var rPRRecycle = rRaidingDefaultSetting.recycle;
		var rPRFragFarm = rRaidingSettings.raidingDropdown;
		var incrementMaps = rRaidingDefaultSetting.incrementMaps;

		if (equipsToGet(raidZones, targetPrestige)[0] > 0) {
			rShouldPrestigeRaid = true;
		}

		var special = getAvailableSpecials('p');
		var status = 'Prestige Raiding: ' + equipsToGet(raidZones, targetPrestige)[0] + ' items remaining';

		if (MODULES.mapFunctions.prestigeRaidZone > 0 && MODULES.mapFunctions.prestigeFragMapBought) status = 'Prestige frag farm to: ' + prettify(prestigeTotalFragCost(raidZones, targetPrestige, special, incrementMaps, true));

		var mapsToRun = game.global.mapsActive ? equipsToGet(getCurrentMapObject().level, targetPrestige)[1] : Infinity;
		var specialInMap = game.global.mapsActive && game.global.mapGridArray[getCurrentMapObject().size - 2].special === targetPrestige;
		var repeat = (game.global.mapsActive &&
			(mapsToRun === 1 || (specialInMap && mapsToRun === 2))
		);

		farmingDetails.shouldRun = rShouldPrestigeRaid;
		farmingDetails.mapName = mapName;
		farmingDetails.autoLevel = false;
		farmingDetails.mapLevel = raidZones;
		farmingDetails.recycle = rPRRecycle;
		farmingDetails.prestigeGoal = targetPrestige;
		farmingDetails.fragSetting = rPRFragFarm;
		farmingDetails.raidzones = raidZones;
		farmingDetails.special = special;
		farmingDetails.repeat = !repeat;
		farmingDetails.status = status;
		farmingDetails.incrementMaps = incrementMaps;
	}


	//Resetting variables and recycling the maps used
	if (!rShouldPrestigeRaid && (currentMap === mapName || MODULES.mapFunctions.prestigeMapArray[0] != undefined)) {
		if (currentMap === mapName) debug(mapName + " (Z" + game.global.world + ") took " + formatTimeForDescriptions(timeForFormatting(mappingTime)) + ".");
		if (rRaidingDefaultSetting.recycle && game.global.preMapsActive) {
			for (var x = 0; x < MODULES.mapFunctions.prestigeMapArray.length; x++) {
				recycleMap(getMapIndex(MODULES.mapFunctions.prestigeMapArray[x]));
			}
		}
		MODULES.mapFunctions.prestigeMapArray = new Array(5);
		MODULES.mapFunctions.prestigeRaidZone = 0;
	}

	return farmingDetails;
}

//Running Prestige Raid Code
function runPrestigeRaiding(raidingSettings) {
	if (!raidingSettings) return;
	if (raidingSettings.mapName !== 'Prestige Raiding') return;
	var raidzones = raidingSettings.raidzones;
	const targetPrestige = raidingSettings.prestigeGoal
	const special = raidingSettings.special;
	const incrementMaps = raidingSettings.incrementMaps;
	var equipsToFarm = equipsToGet(raidzones, targetPrestige)[0];

	while (equipsToFarm === equipsToGet(raidzones - 1, targetPrestige)[0]) {
		raidzones--;
	}
	MODULES.mapFunctions.prestigeRaidZone = raidzones;

	const canAffordMaps = prestigeTotalFragCost(raidzones, targetPrestige, special, incrementMaps);

	if (MODULES.mapFunctions.prestigeMapArray[0] === undefined) {
		if (canAffordMaps) {
			if (MODULES.mapFunctions.prestigeFragMapBought) {
				if (game.global.repeatMap)
					repeatClicked();
				if (game.global.preMapsActive)
					MODULES.mapFunctions.prestigeFragMapBought = false;
			}
		}
		else if (game.global.preMapsActive) {
			MODULES.mapFunctions.prestigeFragMapBought = false;
			if (!MODULES.mapFunctions.prestigeFragMapBought) {
				fragmap();
				if ((updateMapCost(true) <= game.resources.fragments.owned)) {
					buyMap();
					selectMap(game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id);
					runMap();
					debug("Prestige Raiding running fragment farming map");
					MODULES.mapFunctions.prestigeFragMapBought = true;
				}
			}
		}
	}

	if (!MODULES.mapFunctions.prestigeFragMapBought && game.global.preMapsActive) {
		document.getElementById("mapLevelInput").value = game.global.world;
		incrementMapLevel(1);
		if (MODULES.mapFunctions.prestigeMapArray[0] === undefined) {
			for (var x = 0; x < 5; x++) {
				if (!incrementMaps && x > 0) continue;
				if (prestigeMapHasEquips(x, raidzones, targetPrestige)) {
					prestigeRaidingSliders(x, raidzones, special);
					if ((updateMapCost(true) <= game.resources.fragments.owned)) {
						buyMap();
						MODULES.mapFunctions.prestigeMapArray[x] = (game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id);
						debug("Prestige Raiding" + " (Z" + game.global.world + ") bought map #" + [(x + 1)]);
					}
				}
			}
			MODULES.mapFunctions.prestigeMapArray = MODULES.mapFunctions.prestigeMapArray.filter(function (e) { return e.replace(/(\r\n|\n|\r)/gm, "") });
		}

		for (var x = MODULES.mapFunctions.prestigeMapArray.length; x > -1; x--) {
			if (game.global.preMapsActive && MODULES.mapFunctions.prestigeMapArray[x] !== undefined && prestigeMapHasEquips(x, raidzones, targetPrestige)) {
				debug("Prestige Raiding" + " (Z" + game.global.world + ") running map #" + [(MODULES.mapFunctions.prestigeMapArray.length - x)]);
				selectMap(MODULES.mapFunctions.prestigeMapArray[x]);
				runMap();
				MODULES.mapFunctions.prestigeRunningMaps = true;
			}
		}
	}

	if (game.global.preMapsActive && MODULES.mapFunctions.prestigeRunningMaps)
		runMap();
}

function PrestigeClimb() {

	const mapName = 'Prestige Climb'
	const farmingDetails = {
		shouldRun: false,
		mapName: mapName
	};

	if (challengeActive('Frugal')) return farmingDetails;
	if (challengeActive('Mapology') && !getPageSetting('mapology')) return farmingDetails;

	const targetPrestige = challengeActive('Mapology') ? getPageSetting('mapologyPrestige') : getPageSetting('Prestige');
	if (targetPrestige === "Off") return farmingDetails;

	var customVars = MODULES["maps"];
	var skippedPrestige = false;
	var needPrestige = false;

	const prestigeList = ['Supershield', 'Dagadder', 'Bootboost', 'Megamace', 'Hellishmet', 'Polierarm', 'Pantastic', 'Axeidic', 'Smoldershoulder', 'Greatersword', 'Bestplate', 'Harmbalest', 'GambesOP'];
	const metalPrestigeList = ['Dagadder', 'Megamace', 'Polierarm', 'Axeidic', 'Greatersword', 'Harmbalest', 'Bootboost', 'Hellishmet', 'Pantastic', 'Smoldershoulder', 'Bestplate', 'GambesOP'];

	var mapLevel = 0;
	const z = game.global.world;

	//Prestige
	if (getPageSetting('ForcePresZ') !== -1 && (game.global.world) >= getPageSetting('ForcePresZ')) {
		needPrestige = (offlineProgress.countMapItems(game.global.world) !== 0);
	} else
		needPrestige = game.mapUnlocks[targetPrestige] && game.mapUnlocks[targetPrestige].last + 5 <= (game.global.world);

	const prestigeInfo = equipsToGet(z, targetPrestige);

	//Figure out how many equips to farm for && maps to run to get to that value
	var prestigeToFarmFor = prestigeInfo[0];
	var mapsToRun = prestigeInfo[1];

	if (!challengeActive('Mapology')) {
		//Prestige Skip 1
		if (needPrestige && getPsString("gems", true) > 0 && (getPageSetting('PrestigeSkip1_2') == 1 || getPageSetting('PrestigeSkip1_2') == 2)) {
			var numUnbought = 0;
			for (const p of metalPrestigeList) {
				if (game.upgrades[p].allowed - game.upgrades[p].done > 0)
					numUnbought++;
			}
			if (numUnbought >= customVars.SkipNumUnboughtPrestiges) {
				needPrestige = false;
				skippedPrestige = true;
			}
		}

		//Prestige Skip 2
		if ((needPrestige || skippedPrestige) && (getPageSetting('PrestigeSkip1_2') == 1 || getPageSetting('PrestigeSkip1_2') == 3)) {
			const numLeft = prestigeList.filter(targetPrestige => game.mapUnlocks[targetPrestige].last <= (game.global.world) - 5);
			const shouldSkip = numLeft <= customVars.UnearnedPrestigesRequired;
			if (shouldSkip != skippedPrestige) {
				needPrestige = !needPrestige;
				skippedPrestige = !skippedPrestige;
			}
		}
	}
	if (prestigeToFarmFor === 0) needPrestige = false;

	var special = getAvailableSpecials('p');

	if (currentMap === mapName && !needPrestige) {
		mappingDetails(mapName, 0, special);
		resetMapVars();
	}

	if (!needPrestige) return farmingDetails;

	if (game.options.menu.mapLoot.enabled != 1) toggleSetting('mapLoot');
	var status = 'Prestige Climb: ' + prestigeToFarmFor + ' items remaining';

	var repeat = !(
		game.global.mapsActive && (
			mapsToRun > (getCurrentMapObject().bonus === 'p' && (game.global.lastClearedMapCell !== getCurrentMapObject().size - 2) ? 2 : 1) ||
			(getCurrentMapObject().level - game.global.world) !== mapLevel ||
			(getCurrentMapObject().bonus !== special &&
				(getCurrentMapObject().bonus !== undefined && special !== '0')
			)
		)
	);

	farmingDetails.shouldRun = needPrestige;
	farmingDetails.mapName = mapName;
	farmingDetails.status = status;
	farmingDetails.repeat = !repeat;
	farmingDetails.mapLevel = mapLevel;
	farmingDetails.autoLevel = true;
	farmingDetails.special = special;
	farmingDetails.prestigeToFarmFor = prestigeToFarmFor;
	farmingDetails.mapsToRun = mapsToRun;

	return farmingDetails;
}

function BionicRaiding() {

	const mapName = 'Bionic Raiding'
	const farmingDetails = {
		shouldRun: false,
		mapName: mapName
	};

	if (!getPageSetting('bionicRaidingDefaultSettings').active) return farmingDetails;
	if (challengeActive('Experience') && game.global.world > 600) return farmingDetails;
	if (challengeActive('Mapology') && !getPageSetting('mapology')) return farmingDetails;

	var rShouldBionicRaid = false;
	const isC3 = game.global.runningChallengeSquared;
	const isDaily = challengeActive('Daily');
	const currChall = game.global.challengeActive;
	const rBionicRaidingBaseSetting = getPageSetting('bionicRaidingSettings');

	var index;

	for (var y = 0; y < rBionicRaidingBaseSetting.length; y++) {
		const currSetting = rBionicRaidingBaseSetting[y];
		var targetPrestige = challengeActive('Mapology') ? autoTrimpSettings['mapologyPrestige'].selected : currSetting.prestigeGoal !== 'All' ? equipmentList[currSetting.prestigeGoal].Upgrade : 'GamesOP';
		var raidZones = currSetting.raidingzone
		if (!currSetting.active || game.global.world < currSetting.world || game.global.world > currSetting.endzone || (game.global.world > currSetting.world && currSetting.repeatevery === 0) || game.global.world > currSetting.endzone || game.global.lastClearedCell + 2 < currSetting.cell) {
			continue;
		}
		if (currSetting.repeatevery !== 0 && game.global.world > currSetting.world) {
			var times = currSetting.repeatevery;
			var repeats = Math.round((game.global.world - currSetting.world) / times);
			if (repeats > 0) raidZones += (times * repeats);
		}
		if (equipsToGet(raidZones, targetPrestige)[0] === 0) continue;
		if (currSetting.runType !== 'All') {
			if (!isC3 && !isDaily && (currSetting.runType !== 'Filler' ||
				(currSetting.runType === 'Filler' && (currSetting.challenge !== 'All' && currSetting.challenge !== currChall)))) continue;
			if (isDaily && currSetting.runType !== 'Daily') continue;
			if (isC3 && (currSetting.runType !== 'C3' ||
				(currSetting.runType === 'C3' && (currSetting.challenge3 !== 'All' && currSetting.challenge3 !== currChall)))) continue;
		}
		if (game.global.world === currSetting.world || ((game.global.world - currSetting.world) % currSetting.repeatevery === 0)) {
			index = y;
			break;
		}
	}

	if (index >= 0) {
		//Setting up variables and checking if we should use daily settings instead of normal Prestige Farm settings
		var rBionicRaidingSetting = rBionicRaidingBaseSetting[index];
		var rBionicRaidingSetting = rBionicRaidingSetting;
		var raidzonesBW = raidZones;

		if (equipsToGet(raidzonesBW, targetPrestige)[0] > 0) {
			rShouldBionicRaid = true;
		}
		var status = 'Raiding to BW' + raidzonesBW + ': ' + equipsToGet(raidzonesBW, targetPrestige)[0] + ' items remaining';

		var mapsToRun = game.global.mapsActive ? equipsToGet(getCurrentMapObject().level, targetPrestige)[1] : Infinity;
		var specialInMap = game.global.mapsActive && game.global.mapGridArray[getCurrentMapObject().size - 2].special === targetPrestige;
		var repeat = (game.global.mapsActive &&
			(mapsToRun === 1 || (specialInMap && mapsToRun === 2) ||
				getCurrentMapObject().location !== 'Bionic')
		);

		farmingDetails.shouldRun = rShouldBionicRaid;
		farmingDetails.mapName = mapName;
		farmingDetails.repeat = !repeat
		farmingDetails.raidingZone = raidzonesBW;
		farmingDetails.status = status;
	}

	if (currentMap === mapName && !rShouldBionicRaid) {
		mappingDetails(mapName, 0);
		resetMapVars();
	}

	return farmingDetails;
}

function runBionicRaiding(bionicPool) {
	if (!bionicPool) return false;

	if (!game.global.preMapsActive && !game.global.mapsActive) {
		mapsClicked(true);
		if (!game.global.preMapsActive) {
			mapsClicked(true);
		}
	}

	const raidingZone = challengeActive('Experience') && game.global.world > 600 ? getPageSetting('experienceEndBW') : rMapSettings.raidingZone
	if (game.global.preMapsActive) {
		selectMap(findLastBionicWithItems(bionicPool).id);
	}
	if ((findLastBionicWithItems(bionicPool).level >= raidingZone
		|| findLastBionicWithItems(bionicPool).level < raidingZone)
		&& game.global.preMapsActive) {
		runMap();
	}
}

function Experience() {

	var mapName = 'Experience'
	const farmingDetails = {
		shouldRun: false,
		mapName: mapName
	};

	if (!challengeActive('Experience') || !getPageSetting('experience')) return farmingDetails;

	var shouldExperience = false;
	const wonderStartZone = getPageSetting('experienceStartZone') >= 300 ? getPageSetting('experienceStartZone') : Infinity;
	const hyperspeed2 = game.talents.liquification3.purchased ? 75 : game.talents.hyperspeed2.purchased ? 50 : 0;
	const special = (Math.floor(game.global.highestLevelCleared + 1) * (hyperspeed2 / 100) >= game.global.world ? "0" : "fa");
	const mapLevel = 0;

	if (game.global.world >= wonderStartZone && game.global.world >= game.challenges.Experience.nextWonder) {
		shouldExperience = true;
		var status = 'Experience: Farming Wonders';
	}
	else {
		shouldExperience = game.global.world > 600 && game.global.world >= getPageSetting('experienceEndZone');
		if (shouldExperience) mapName = 'Bionic Raiding';
		var status = 'Experience: Ending Challenge';
	}
	var repeat = game.global.mapsActive && ((getCurrentMapObject().level - game.global.world) !== mapLevel || (getCurrentMapObject().bonus !== special && (getCurrentMapObject().bonus !== undefined && special !== '0')) || game.global.world < game.challenges.Experience.nextWonder);

	if (currentMap === mapName && !shouldExperience) {
		mappingDetails(mapName, mapLevel, special);
		resetMapVars();
	}

	if (shouldExperience) farmingDetails.shouldRun = shouldExperience;
	farmingDetails.mapName = mapName;
	farmingDetails.mapLevel = mapLevel;
	farmingDetails.autoLevel = true;
	farmingDetails.special = special;
	farmingDetails.repeat = !repeat;
	farmingDetails.status = status;

	return farmingDetails;
}

function Wither() {

	var shouldFarm = false;
	var mapAutoLevel = Infinity;

	const mapName = 'Wither Farm';
	const farmingDetails = {
		shouldRun: false,
		mapName: mapName
	};

	if (!challengeActive('Wither') || !getPageSetting('wither')) return farmingDetails;
	if (game.challenges.Wither.healImmunity > 0) return farmingDetails;

	var jobRatio = '0,0,1,0';
	var special = getAvailableSpecials('lmc', true);

	if (game.global.mapRunCounter === 0 && game.global.mapsActive && mapRepeats !== 0) {
		game.global.mapRunCounter = mapRepeats;
		mapRepeats = 0;
	}

	var autoLevel_Repeat = rAutoLevel;
	mapAutoLevel = callAutoMapLevel(currentMap, rAutoLevel, special, -1, null, false);
	if (mapAutoLevel !== Infinity) {
		if (autoLevel_Repeat !== Infinity && mapAutoLevel !== autoLevel_Repeat) mapRepeats = game.global.mapRunCounter + 1;
		var mapLevel = mapAutoLevel;
	}

	//Gamma burst info
	var gammaToTrigger = gammaMaxStacks(true) - game.heirlooms.Shield.gammaBurst.stacks;
	var gammaDmg = gammaBurstPct;
	var canGamma = gammaToTrigger <= 1 ? true : false;

	var cell = game.global.lastClearedCell + 2;
	var name = game.global.gridArray[(cell - 1)].name;
	var damageGoal = 4;

	var equalityAmt = equalityQuery(name, game.global.world, cell, 'world', 1, 'gamma');
	var ourDmg = calcOurDmg('min', equalityAmt, false, 'world', 'never', 0, false);
	var enemyHealth = calcEnemyHealthCore('world', game.global.world, cell, name, calcMutationHealth(game.global.world));

	//Checking if we can clear current zone.
	if (((ourDmg * (canGamma ? gammaDmg : 1)) * damageGoal) < enemyHealth) {
		shouldFarm = true;
	}

	//Checking if we can clear next zone.
	if (cell === 100) {
		equalityAmt = equalityQuery(name, game.global.world + 1, 100, 'world', 1, 'gamma');
		ourDmg = calcOurDmg('min', equalityAmt, false, 'world', 'never', 0, false);
		enemyHealth = calcEnemyHealthCore('world', game.global.world + 1, 100, 'Improbability', calcMutationHealth(game.global.world + 1));
		//Checking if we can clear current zone.
		if ((ourDmg * damageGoal) < enemyHealth) {
			shouldFarm = true;
		}
	}

	var damageTarget = enemyHealth / damageGoal;

	var repeat = game.global.mapsActive && ((getCurrentMapObject().level - game.global.world) !== mapLevel || (getCurrentMapObject().bonus !== special && (getCurrentMapObject().bonus !== undefined && special !== '0')));
	var status = 'Wither Farm: Curr&nbsp;Dmg:&nbsp;' + prettify(ourDmg) + " Goal&nbsp;Dmg:&nbsp;" + prettify(damageTarget);

	farmingDetails.shouldRun = shouldFarm;
	farmingDetails.mapName = mapName;
	farmingDetails.mapLevel = mapLevel;
	farmingDetails.autoLevel = true;
	farmingDetails.special = special;
	farmingDetails.jobRatio = jobRatio;
	farmingDetails.damageTarget = damageTarget;
	farmingDetails.repeat = !repeat;
	farmingDetails.status = status;

	if (currentMap === mapName && !farmingDetails.shouldRun) {
		mappingDetails(mapName, mapLevel, special);
		resetMapVars();
	}

	return farmingDetails;
}

function Quagmire() {

	var rShouldQuagFarm = false;

	const mapName = 'Quagmire Farm';
	const farmingDetails = {
		shouldRun: false,
		mapName: mapName
	};

	if (!challengeActive('Quagmire') || !getPageSetting('quagmireDefaultSettings').active) return farmingDetails;

	const rQFBaseSettings = getPageSetting('quagmireSettings');
	const totalPortals = getTotalPortals();
	var rQFIndex;
	//Checking to see if any lines are to be run.
	for (var y = 0; y < rQFBaseSettings.length; y++) {
		const currSetting = rQFBaseSettings[y];
		if (!currSetting.active || currSetting.done === totalPortals + "_" + game.global.world || game.global.world !== currSetting.world || game.global.lastClearedCell + 2 < currSetting.cell) {
			continue;
		}

		if (game.global.world === currSetting.world) {
			rQFIndex = y;
			break;
		}
	}

	if (rQFIndex >= 0) {

		var rQuagFarmSettings = rQFBaseSettings[rQFIndex];
		var rQFJobRatio = rQuagFarmSettings.jobratio
		stacksum = 0;

		for (var i = 0; i < (rQFIndex + 1); i++) {
			if (!rQFBaseSettings[i].active) continue;
			stacksum += parseInt(rQFBaseSettings[i].bogs);
		}

		totalstacks = 100 - stacksum;

		if ((game.challenges.Quagmire.motivatedStacks > totalstacks))
			rShouldQuagFarm = true;

		if (currentMap === mapName && !rShouldQuagFarm) {
			mappingDetails(mapName);
			resetMapVars(rQuagFarmSettings);
		}

		var repeat = game.global.mapsActive && (getCurrentMapObject().name !== 'The Black Bog' || (game.challenges.Quagmire.motivatedStacks - totalstacks) === 1);
		var status = 'Black Bogs: ' + (game.challenges.Quagmire.motivatedStacks - totalstacks) + " remaining";

		farmingDetails.shouldRun = rShouldQuagFarm;
		farmingDetails.mapName = mapName;
		farmingDetails.jobRatio = rQFJobRatio;
		farmingDetails.bogs = totalstacks;
		farmingDetails.repeat = !repeat;
		farmingDetails.status = status;
	}

	return farmingDetails;
}

function currQuest() {
	if (!challengeActive('Quest') || game.global.world < game.challenges.Quest.getQuestStartZone() || !getPageSetting('quest'))
		return 0;
	var questnotcomplete = game.challenges.Quest.getQuestProgress() != "Quest Complete!";
	if (game.challenges.Quest.getQuestProgress() == "Failed!") return 0;
	//Resource multipliers
	else if (game.challenges.Quest.getQuestDescription().includes("food") && questnotcomplete) return 1;
	else if (game.challenges.Quest.getQuestDescription().includes("wood") && questnotcomplete) return 2;
	else if (game.challenges.Quest.getQuestDescription().includes("metal") && questnotcomplete) return 3;
	else if (game.challenges.Quest.getQuestDescription().includes("gems") && questnotcomplete) return 4;
	else if (game.challenges.Quest.getQuestDescription().includes("science") && questnotcomplete) return 5;
	//Everything else
	else if (game.challenges.Quest.getQuestDescription() == "Complete 5 Maps at Zone level" && questnotcomplete) return 6;
	else if (game.challenges.Quest.getQuestDescription() == "One-shot 5 world enemies" && questnotcomplete) return 7;
	else if (game.challenges.Quest.getQuestDescription() == "Don't let your shield break before Cell 100" && questnotcomplete) return 8;
	else if (game.challenges.Quest.getQuestDescription() == "Don't run a map before Cell 100") return 9;
	else if (game.challenges.Quest.getQuestDescription() == "Buy a Smithy" && questnotcomplete) return 10;
	else return 0;
}

function Quest() {

	var rShouldQuest = 0;

	const mapName = 'Quest';
	const farmingDetails = {
		shouldRun: false,
		mapName: mapName
	};

	if (!challengeActive('Quest') || !getPageSetting('quest') || game.global.world < game.challenges.Quest.getQuestStartZone()) return farmingDetails;

	rShouldQuest = currQuest() == 1 ? 1 :
		currQuest() == 2 ? 2 :
			currQuest() == 3 ? 3 :
				currQuest() == 4 ? 4 :
					currQuest() == 5 ? 5 :
						currQuest() == 6 ? 6 :
							currQuest() == 7 && (calcOurDmg('min', 0, false, 'world', 'never') < calcEnemyHealthCore('world', game.global.world, 50, 'Turtlimp')) && !(game.portal.Tenacity.getMult() === Math.pow(1.4000000000000001, getPerkLevel("Tenacity") + getPerkLevel("Masterfulness"))) ? 7 :
								currQuest() == 8 ? 8 :
									currQuest() == 9 ? 9 :
										0;


	if (rShouldQuest && rShouldQuest !== 8) {
		var questArray = rShouldQuest == 1 || rShouldQuest == 4 ? ['lsc', '1'] : rShouldQuest == 2 ? ['lwc', '0,1'] : rShouldQuest == 3 || rShouldQuest == 7 ? ['lmc', '0,0,1'] : rShouldQuest === 5 ? ['fa', '0,0,0,1'] : ['fa', '1,1,1,0']
		var questSpecial = questArray[0]
		var questJobRatio = questArray[1];
		var questMax = rShouldQuest === 6 ? 10 : null;
		var questMin = rShouldQuest === 6 || (rShouldQuest === 7 && game.global.mapBonus !== 10) ? 0 : null;

		if (game.global.mapRunCounter === 0 && game.global.mapsActive && rMapRepeats !== 0) {
			game.global.mapRunCounter = rMapRepeats;
			rMapRepeats = 0;
		}
		var autoLevel_Repeat = rAutoLevel;
		mapAutoLevel = callAutoMapLevel(currentMap, rAutoLevel, questSpecial, questMax, questMin, false);
		if (mapAutoLevel !== Infinity) {
			if (autoLevel_Repeat !== Infinity && mapAutoLevel !== autoLevel_Repeat) rMapRepeats = game.global.mapRunCounter + 1;
			questMapLevel = mapAutoLevel;
		}

		var repeat = game.global.mapsActive && ((getCurrentMapObject().level - game.global.world) !== questMapLevel || (getCurrentMapObject().bonus !== questSpecial && (getCurrentMapObject().bonus !== undefined && questSpecial !== '0')) || (rShouldQuest == 6 && (game.global.mapBonus >= 4 || getCurrentMapObject().level - game.global.world < 0)));

		var status = 'Questing: ' + game.challenges.Quest.getQuestProgress();

		farmingDetails.shouldRun = rShouldQuest;
		farmingDetails.mapName = mapName;
		farmingDetails.mapLevel = questMapLevel;
		farmingDetails.autoLevel = true;
		farmingDetails.special = questSpecial;
		farmingDetails.jobRatio = questJobRatio;
		farmingDetails.repeat = !repeat;
		farmingDetails.status = status;

	}
	if (currentMap === mapName && !farmingDetails.shouldRun) {
		mappingDetails(mapName);
		resetMapVars();
		if (game.global.mapsActive) mapsClicked(true);
		if (game.global.preMapsActive && game.global.currentMapId !== '') recycleMap();
		rMapRepeats = 0;
	}

	return farmingDetails;
}

function Mayhem() {

	const mapName = 'Mayhem Destacking';
	const farmingDetails = {
		shouldRun: false,
		mapName: mapName
	};

	if (!challengeActive('Mayhem') || !getPageSetting('mayhem')) return farmingDetails;

	var rShouldMayhem = false;
	var mapAutoLevel = Infinity;

	var destackHits = getPageSetting('mayhemDestack') > 0 ? getPageSetting('mayhemDestack') : Infinity;
	var destackZone = getPageSetting('mayhemZone') > 0 ? getPageSetting('mayhemZone') : Infinity;
	var mayhemMapLevel = 0;
	var mayhemMapIncrease = getPageSetting('mayhemMapIncrease') > 0 ? getPageSetting('mayhemMapIncrease') : 0;
	var hyperspeed2 = game.talents.liquification3.purchased ? 75 : game.talents.hyperspeed2.purchased ? 50 : 0;
	var mayhemSpecial = (Math.floor(game.global.highestRadonLevelCleared + 1) * (hyperspeed2 / 100) >= game.global.world ? "lmc" : "fa");
	if (game.challenges.Mayhem.stacks > 0 && (HDRatio > destackHits || game.global.world >= destackZone))
		rShouldMayhem = true;

	if (game.global.mapRunCounter === 0 && game.global.mapsActive && mapRepeats !== 0) {
		game.global.mapRunCounter = mapRepeats;
		mapRepeats = 0;
	}
	var autoLevel_Repeat = rAutoLevel;
	mapAutoLevel = callAutoMapLevel(currentMap, rAutoLevel, mayhemSpecial, 10, (0 + mayhemMapIncrease), false);
	if (mapAutoLevel !== Infinity) {
		if (autoLevel_Repeat !== Infinity && mapAutoLevel !== autoLevel_Repeat) mapRepeats = game.global.mapRunCounter + 1;
		mayhemMapLevel = mapAutoLevel;
	}

	var repeat = game.global.mapsActive && ((getCurrentMapObject().level - game.global.world) !== mayhemMapLevel || (getCurrentMapObject().bonus !== mayhemSpecial && (getCurrentMapObject().bonus !== undefined && mayhemSpecial !== '0')) || game.challenges.Mayhem.stacks <= mayhemMapLevel + 1);
	var status = 'Mayhem Destacking: ' + game.challenges.Mayhem.stacks + " remaining";

	farmingDetails.shouldRun = rShouldMayhem;
	farmingDetails.mapName = mapName;
	farmingDetails.mapLevel = mayhemMapLevel;
	farmingDetails.autoLevel = true;
	farmingDetails.special = mayhemSpecial;
	farmingDetails.repeat = !repeat;
	farmingDetails.status = status;

	if (currentMap === mapName && !farmingDetails.shouldRun) {
		mappingDetails(mapName, mayhemMapLevel, mayhemSpecial);
		resetMapVars();
	}
	return farmingDetails;
}

function Insanity() {

	const mapName = 'Insanity Farm';
	const farmingDetails = {
		shouldRun: false,
		mapName: mapName
	};
	if (!challengeActive('Insanity') || !getPageSetting('insanityDefaultSettings').active) return farmingDetails;

	var rShouldInsanityFarm = false;
	var mapAutoLevel = Infinity;
	const totalPortals = getTotalPortals();
	const rIFBaseSettings = getPageSetting('insanitySettings');

	var rIFIndex;
	//Checking to see if any lines are to be run.
	for (var y = 0; y < rIFBaseSettings.length; y++) {
		const currSetting = rIFBaseSettings[y];
		if (!currSetting.active || currSetting.done === totalPortals + "_" + game.global.world || game.global.world !== currSetting.world || game.global.lastClearedCell + 2 < currSetting.cell) {
			continue;
		}

		if (game.global.world === currSetting.world) {
			rIFIndex = y;
			break;
		}
	}

	if (rIFIndex >= 0) {

		var rIFSettings = rIFBaseSettings[rIFIndex];
		var rIFMapLevel = rIFSettings.level;
		var rIFSpecial = rIFSettings.special;
		var rIFStacks = rIFSettings.insanity;
		var rIFJobRatio = rIFSettings.jobratio;

		if (rIFSettings.autoLevel) {
			if (game.global.mapRunCounter === 0 && game.global.mapsActive && mapRepeats !== 0) {
				game.global.mapRunCounter = mapRepeats;
				mapRepeats = 0;
			}
			var autoLevel_Repeat = rAutoLevel;
			mapAutoLevel = callAutoMapLevel(currentMap, rAutoLevel, rIFSpecial, null, null, false);
			if (mapAutoLevel !== Infinity) {
				if (autoLevel_Repeat !== Infinity && mapAutoLevel !== autoLevel_Repeat) mapRepeats = game.global.mapRunCounter + 1;
				rIFMapLevel = mapAutoLevel;
			}
		}

		if (rIFStacks > game.challenges.Insanity.maxInsanity)
			rIFStacks = game.challenges.Insanity.maxInsanity;
		if (rIFStacks > game.challenges.Insanity.insanity || (rIFSettings.destack && game.challenges.Insanity.insanity > rIFStacks))
			rShouldInsanityFarm = true;

		var repeat = game.global.mapsActive && ((getCurrentMapObject().level - game.global.world) !== rIFMapLevel || (getCurrentMapObject().bonus !== rIFSpecial && (getCurrentMapObject().bonus !== undefined && rIFSpecial !== '0')) || rIFStacks <= game.challenges.Insanity.insanity);
		var status = 'Insanity Farming: ' + game.challenges.Insanity.insanity + "/" + rIFStacks;

		farmingDetails.shouldRun = rShouldInsanityFarm;
		farmingDetails.mapName = mapName;
		farmingDetails.mapLevel = rIFMapLevel;
		farmingDetails.autoLevel = rIFSettings.autoLevel;
		farmingDetails.special = rIFSpecial;
		farmingDetails.jobRatio = rIFJobRatio;
		farmingDetails.insanity = rIFStacks;
		farmingDetails.repeat = !repeat;
		farmingDetails.status = status;

		if (currentMap === mapName && !farmingDetails.shouldRun) {
			mappingDetails(mapName, rIFMapLevel, rIFSpecial, rIFStacks);
			resetMapVars(rIFSettings.done);
		}

	}

	return farmingDetails;
}

function PandemoniumDestack() {

	var shouldPandemoniumDestack = false;
	var mapAutoLevel = Infinity;

	const mapName = 'Pandemonium Destacking';
	const farmingDetails = {
		shouldRun: false,
		mapName: mapName
	};

	if (!challengeActive('Pandemonium') || !getPageSetting('pandemonium') || game.global.world < getPageSetting('pandemoniumZone')) return farmingDetails;

	var destackHits = getPageSetting('pandemoniumDestack') > 0 ? getPageSetting('pandemoniumDestack') : Infinity;
	var destackZone = getPageSetting('pandemoniumZone') > 0 ? getPageSetting('pandemoniumZone') : Infinity;

	if (destackHits === Infinity && destackZone === Infinity) return farmingDetails;

	var pandemoniumMapLevel = 1;
	var hyperspeed2 = game.talents.liquification3.purchased ? 75 : game.talents.hyperspeed2.purchased ? 50 : 0;
	var pandemoniumSpecial = (Math.floor(game.global.highestRadonLevelCleared + 1) * (hyperspeed2 / 100) >= game.global.world ? "lmc" : game.challenges.Pandemonium.pandemonium > 7 ? "fa" : "lmc");
	var pandemoniumJobRatio = '0.001,0.001,1,0';


	if (game.global.mapRunCounter === 0 && game.global.mapsActive && mapRepeats !== 0) {
		game.global.mapRunCounter = mapRepeats;
		mapRepeats = 0;
	}
	var autoLevel_Repeat = rAutoLevel;
	mapAutoLevel = callAutoMapLevel(currentMap, rAutoLevel, pandemoniumSpecial, 10, 1, false);
	if (mapAutoLevel !== Infinity) {
		if (autoLevel_Repeat !== Infinity && autoLevel_Repeat !== mapAutoLevel) mapRepeats = game.global.mapRunCounter + 1;
		pandemoniumMapLevel = mapAutoLevel;
	}

	if (game.challenges.Pandemonium.pandemonium > 0 && (HDRatio > destackHits || game.global.world >= destackZone))
		shouldPandemoniumDestack = true;

	var repeat = game.global.mapsActive && ((getCurrentMapObject().level - game.global.world) !== pandemoniumMapLevel || (getCurrentMapObject().bonus !== pandemoniumSpecial && (getCurrentMapObject().bonus !== undefined && pandemoniumSpecial !== '0')) || ((game.challenges.Pandemonium.pandemonium - pandemoniumMapLevel) < pandemoniumMapLevel));
	var status = 'Pandemonium Destacking: ' + game.challenges.Pandemonium.pandemonium + " remaining";

	farmingDetails.shouldRun = shouldPandemoniumDestack;
	farmingDetails.mapName = mapName;
	farmingDetails.mapLevel = pandemoniumMapLevel;
	farmingDetails.autoLevel = true;
	farmingDetails.special = pandemoniumSpecial;
	farmingDetails.jobRatio = pandemoniumJobRatio;
	farmingDetails.pandemonium = game.challenges.Pandemonium.pandemonium;
	farmingDetails.repeat = !repeat;
	farmingDetails.status = status;

	if (currentMap === mapName && !shouldPandemoniumDestack) {
		mappingDetails(mapName, pandemoniumMapLevel, pandemoniumSpecial);
		resetMapVars();
	}

	return farmingDetails;
}

//Pandemonium Equip Farming
function PandemoniumFarm() {

	const mapName = 'Pandemonium Farming';
	const farmingDetails = {
		shouldRun: false,
		mapName: mapName
	};

	if (!challengeActive('Pandemonium') || !getPageSetting('pandemonium') || getPageSetting('pandemoniumAE') < 2 || game.global.world === 150 || game.global.lastClearedCell + 2 < 91 || game.challenges.Pandemonium.pandemonium > 0) return farmingDetails;

	var shouldPandemoniumFarm = false;

	var pandemoniumJobRatio = '1,1,100,0';
	var equipCost = cheapestEquipmentCost();
	var nextEquipmentCost = equipCost[1];

	var destackHits = getPageSetting('pandemoniumDestack') > 0 ? getPageSetting('pandemoniumDestack') : Infinity;
	var pandemoniumMapLevel = 1;
	var destackZone = getPageSetting('pandemoniumAEZone') > 0 ? getPageSetting('pandemoniumAEZone') : Infinity;

	var autoLevel_Repeat = rAutoLevel;
	mapAutoLevel = callAutoMapLevel(currentMap, rAutoLevel, pandemoniumSpecial, null, null, false);
	if (mapAutoLevel !== Infinity) {
		if (autoLevel_Repeat !== Infinity && autoLevel_Repeat !== mapAutoLevel) mapRepeats = game.global.mapRunCounter + 1;
		pandemoniumMapLevel = mapAutoLevel;
	}

	var pandemonium_LMC = scaleToCurrentMapLocal(simpleSecondsLocal("metal", 20, true, pandemoniumJobRatio), false, true, pandemoniumMapLevel);
	var pandemoniumSpecial = nextEquipmentCost > pandemonium_LMC ? 'hc' : 'lmc'
	var pandemoniumResourceGain = pandemoniumSpecial === 'hc' ? pandemonium_LMC * 2 : pandemonium_LMC;

	//Checking if an equipment level costs less than a cache or a prestige level costs less than a jestimp and if so starts farming.
	if (destackZone >= 2 && nextEquipmentCost < pandemoniumResourceGain && (HDRatio > destackHits || game.global.world >= destackZone))
		shouldPandemoniumFarm = true;

	var repeat = game.global.mapsActive && ((getCurrentMapObject().level - game.global.world) !== pandemoniumMapLevel || getCurrentMapObject().bonus != pandemoniumSpecial || nextEquipmentCost >= pandemoniumResourceGain);
	var status = 'Pandemonium Farming Equips below ' + prettify(pandemoniumResourceGain);

	if (shouldPandemoniumFarm) {
		farmingDetails.shouldRun = shouldPandemoniumFarm;
		farmingDetails.mapName = mapName;
		farmingDetails.mapLevel = pandemoniumMapLevel;
		farmingDetails.autoLevel = true;
		farmingDetails.special = pandemoniumSpecial;
		farmingDetails.jobRatio = pandemoniumJobRatio;
		farmingDetails.gather = 'metal';
		farmingDetails.pandemonium = game.challenges.Pandemonium.pandemonium;
		farmingDetails.repeat = !repeat;
		farmingDetails.status = status;
	}

	if (currentMap === mapName && !shouldPandemoniumFarm) {
		mappingDetails(mapName, pandemoniumMapLevel, pandemoniumSpecial);
		resetMapVars();
	}

	return farmingDetails;
}

function Alchemy() {

	var rShouldAlchFarm = false;
	var mapAutoLevel = Infinity;

	const mapName = 'Alchemy Farm';
	const farmingDetails = {
		shouldRun: false,
		mapName: mapName
	};


	if (!challengeActive('Alchemy') || !getPageSetting('alchemyDefaultSettings').active) return farmingDetails;

	const totalPortals = getTotalPortals();
	const rAFBaseSettings = getPageSetting('alchemySettings');
	var rAFIndex;

	//Checking to see if any lines are to be run.
	for (var y = 0; y < rAFBaseSettings.length; y++) {
		const currSetting = rAFBaseSettings[y];
		if (!currSetting.active || currSetting.done === totalPortals + "_" + game.global.world || game.global.world !== currSetting.world || game.global.lastClearedCell + 2 < currSetting.cell) {
			continue;
		}

		if (game.global.world === currSetting.world) {
			rAFIndex = y;
			break;
		}
	}

	if (rAFIndex >= 0) {
		var rAFSettings = rAFBaseSettings[rAFIndex];
		var rAFMapLevel = rAFSettings.level;
		var rAFSpecial = rAFSettings.special;
		var rAFJobRatio = rAFSettings.jobratio;
		var rAFPotions = rAFSettings.potion;

		if (rAFSettings.autoLevel) {
			if (game.global.mapRunCounter === 0 && game.global.mapsActive && mapRepeats !== 0) {
				game.global.mapRunCounter = mapRepeats;
				mapRepeats = 0;
			}
			var autoLevel_Repeat = rAutoLevel;
			mapAutoLevel = callAutoMapLevel(currentMap, rAutoLevel, rAFSpecial, 10, 1, false);
			if (mapAutoLevel !== Infinity) {
				if (autoLevel_Repeat !== Infinity && mapAutoLevel !== autoLevel_Repeat) mapRepeats = game.global.mapRunCounter + 1;
				rAFMapLevel = mapAutoLevel;
			}
		}

		rMFMapLevel = mapAutoLevel;

		if (rAFSpecial.includes('l') && rAFSpecial.length === 3 && perfectMapCost(rAFMapLevel, rAFSpecial) >= game.resources.fragments.owned) rAFSpecial = rAFSpecial.charAt(0) + "sc";

		if (rAFPotions != undefined) {
			//Working out which potion the input corresponds to.
			potion = rAFPotions.charAt('0') == 'h' ? 0 :
				rAFPotions.charAt('0') == 'g' ? 1 :
					rAFPotions.charAt('0') == 'f' ? 2 :
						rAFPotions.charAt('0') == 'v' ? 3 :
							rAFPotions.charAt('0') == 's' ? 4 :
								undefined;

			//Alchemy biome selection, will select Farmlands if it's unlocked and appropriate otherwise it'll use the default map type for that herb.
			rAFBiome = alchObj.potionNames[potion] == alchObj.potionNames[0] ? game.global.farmlandsUnlocked && getFarmlandsResType() == "Metal" ? "Farmlands" : "Mountain" :
				alchObj.potionNames[potion] == alchObj.potionNames[1] ? game.global.farmlandsUnlocked && getFarmlandsResType() == "Wood" ? "Farmlands" : "Forest" :
					alchObj.potionNames[potion] == alchObj.potionNames[2] ? game.global.farmlandsUnlocked && getFarmlandsResType() == "Food" ? "Farmlands" : "Sea" :
						alchObj.potionNames[potion] == alchObj.potionNames[3] ? game.global.farmlandsUnlocked && getFarmlandsResType() == "Gems" ? "Farmlands" : "Depths" :
							alchObj.potionNames[potion] == alchObj.potionNames[4] ? game.global.farmlandsUnlocked && getFarmlandsResType() == "Any" ? "Farmlands" : game.global.decayDone ? "Plentiful" : "Random" :
								game.global.farmlandsUnlocked && getFarmlandsResType() == "Any" ? "Farmlands" : game.global.decayDone ? "Plentiful" : "Random";

			//Doing calcs to identify the total cost of all the Brews/Potions that are being farmed
			//Initialising vars
			var alchmult = rAFBiome == "Farmlands" ? 1.5 : 1;
			var potioncost = 0;
			potioncosttotal = 0;
			var potionscurrent = alchObj.potionsOwned[potion];
			//Identifying current herbs + ones that we'll get from the map we should run
			herbtotal = game.herbs[alchObj.potions[potion].cost[0][0]].cowned + (alchObj.getDropRate(game.global.world + rAFMapLevel) * alchmult);

			/* //When mapType is set as Map Count work out how many of each Potion/Brew we can farm in the amount of maps specified.
			if (rAFSettings.mapType === 'Map Count') {
				var potion = Number(rAFPotions.toString().replace(/[^\d,:-]/g, ''))
				if (potion !== 0) {
				}
			} */

			//Looping through each potion level and working out their cost to calc total cost
			for (x = potionscurrent; x < (rAFPotions.toString().replace(/[^\d,:-]/g, '')); x++) {
				var potioncost = Math.pow(alchObj.potions[potion].cost[0][2], x) * alchObj.potions[potion].cost[0][1];
				//Checking if the potion being farmed is a Potion and if so factors in compounding cost scaling from other potions owned
				if (!alchObj.potions[potion].enemyMult) {
					var potionsowned = 0;
					//Calculating total level of potions that aren't being farmed
					for (var y = 0; y < alchObj.potionsOwned.length; y++) {
						if (alchObj.potions[y].challenge != (challengeActive('Alchemy'))) continue;
						if (y != alchObj.potionNames.indexOf(alchObj.potionNames[potion]) && !alchObj.potions[y].enemyMult) potionsowned += alchObj.potionsOwned[y];
					}
					potioncost *= Math.pow(alchObj.allPotionGrowth, potionsowned);
				}
				//Summing cost of potion levels
				potioncosttotal += potioncost;
			}
			if (potion == undefined)
				debug('You have an incorrect value in AF: Potions, each input needs to start with h, g, f, v, or s.');
			else {
				if (rAFPotions.toString().replace(/[^\d:-]/g, '') > potionscurrent) {
					if (alchObj.canAffordPotion(alchObj.potionNames[potion])) {
						for (z = potionscurrent; z < rAFPotions.toString().replace(/[^\d:-]/g, ''); z++) {
							if (potion === 1) {
								if (game.herbs[alchObj.potions[potion].cost[0][0]].cowned > potioncosttotal)
									for (var x = potionscurrent; x < rAFPotions.toString().replace(/[^\d,:-]/g, ''); x++) {
										alchObj.craftPotion(alchObj.potionNames[potion]);
									}
							}
							else alchObj.craftPotion(alchObj.potionNames[potion]);
						}
					}
				}
				if (rAFPotions.toString().replace(/[^\d,:-]/g, '') > alchObj.potionsOwned[potion])
					rShouldAlchFarm = true;
			}

			var repeat = game.global.mapsActive && ((getCurrentMapObject().level - game.global.world) !== rAFMapLevel || (getCurrentMapObject().bonus !== rAFSpecial && (getCurrentMapObject().bonus !== undefined && rAFSpecial !== '0')) || herbtotal >= potioncosttotal);
			var status = 'Alchemy Farming ' + alchObj.potionNames[potion] + " (" + alchObj.potionsOwned[potion] + "/" + rAFPotions.toString().replace(/[^\d,:-]/g, '') + ")";

			farmingDetails.shouldRun = rShouldAlchFarm;
			farmingDetails.mapName = mapName;
			farmingDetails.mapLevel = rAFMapLevel;
			farmingDetails.autoLevel = rAFSettings.autoLevel;
			farmingDetails.special = rAFSpecial;
			farmingDetails.jobRatio = rAFJobRatio;
			farmingDetails.biome = rAFBiome;
			farmingDetails.herbtotal = herbtotal;
			farmingDetails.potionTotalCost = potioncosttotal;
			farmingDetails.potionName = alchObj.potionNames[potion];
			farmingDetails.potionOwned = alchObj.potionsOwned[potion];
			farmingDetails.potionGoal = rAFPotions.toString().replace(/[^\d,:-]/g, '');
			farmingDetails.repeat = !repeat;
			farmingDetails.status = status;

			if (currentMap === mapName && !farmingDetails.shouldRun) {
				mappingDetails(mapName, rAFMapLevel, rAFSpecial, alchObj.potionsOwned[potion], rAFPotions.toString().replace(/[^\d,:-]/g, ''), alchObj.potionNames[potion]);
				resetMapVars(rAFSettings);
			}
		}

	}


	if ((typeof (getPageSetting('alchemyDefaultSettings').voidPurchase) === 'undefined' ? true : getPageSetting('alchemyDefaultSettings').voidPurchase) && currentMap === 'Void Map' && game.global.mapsActive) {
		if (getCurrentMapObject().location == "Void" && (alchObj.canAffordPotion('Potion of the Void') || alchObj.canAffordPotion('Potion of Strength'))) {
			alchObj.craftPotion('Potion of the Void');
			alchObj.craftPotion('Potion of Strength');
		}
	}

	return farmingDetails;
}

function Glass() {

	var shouldFarm = false;
	var mapAutoLevel = Infinity;

	const mapName = "Glass Destacking";
	const farmingDetails = {
		shouldRun: false,
		mapName: mapName
	};

	if (!challengeActive('Glass') || !getPageSetting('glass')) return farmingDetails;

	var jobRatio = '0,0,1,0';
	var special = getAvailableSpecials('lmc', true);
	var glassStacks = getPageSetting('glassStacks');
	if (glassStacks <= 0) glassStacks = Infinity;

	if (game.global.mapRunCounter === 0 && game.global.mapsActive && mapRepeats !== 0) {
		game.global.mapRunCounter = mapRepeats;
		mapRepeats = 0;
	}

	var autoLevel_Repeat = rAutoLevel;
	mapAutoLevel = callAutoMapLevel(currentMap, rAutoLevel, special, 10, null, false);
	if (mapAutoLevel !== Infinity) {
		if (autoLevel_Repeat !== Infinity && mapAutoLevel !== autoLevel_Repeat) mapRepeats = game.global.mapRunCounter + 1;
		var mapLevel = mapAutoLevel;
	}

	//Gamma burst info
	var gammaToTrigger = gammaMaxStacks(true) - game.heirlooms.Shield.gammaBurst.stacks;
	var gammaDmg = gammaBurstPct;
	var canGamma = gammaToTrigger <= 1 ? true : false;
	var damageGoal = 2;

	var equalityAmt = equalityQuery('Snimp', game.global.world, 20, 'map', 0.75, 'gamma');
	var ourDmg = calcOurDmg('min', equalityAmt, false, 'map', 'maybe', mapLevel, false);
	var enemyHealth = calcEnemyHealthCore('map', game.global.world, 20, 'Snimp') * .75;

	//Destacking
	if ((ourDmg * damageGoal) > enemyHealth && (game.challenges.Glass.shards >= glassStacks || (game.global.mapsActive && game.challenges.Glass.shards > 2))) {
		special = 'fa';
		shouldFarm = true;
		mapLevel = 0;
	}
	//Checking if we can clear next zone or if we need to farm for our optimal level.
	else if (game.global.lastClearedCell + 2 === 100 || (game.challenges.Glass.shards >= glassStacks)) {
		equalityAmt = equalityQuery('Snimp', game.global.world + 1, 20, 'map', 0.75, 'gamma');
		ourDmg = calcOurDmg('min', equalityAmt, false, 'map', 'maybe', mapLevel, false);
		enemyHealth = calcEnemyHealthCore('map', game.global.world + 1, 20, 'Snimp') * .75;
		special = 'lmc';
		//Checking if we can clear current zone.
		if ((ourDmg * damageGoal) < enemyHealth) {
			shouldFarm = true;
		}
	}

	var damageTarget = enemyHealth / damageGoal;

	var repeat = game.global.mapsActive && ((getCurrentMapObject().level - game.global.world) !== mapLevel || (getCurrentMapObject().bonus !== special && (getCurrentMapObject().bonus !== undefined && special !== '0')));
	var status = game.global.challengeActive + ' Farm: Curr&nbsp;Dmg:&nbsp;' + prettify(ourDmg) + " Goal&nbsp;Dmg:&nbsp;" + prettify(damageTarget);

	farmingDetails.shouldRun = shouldFarm;
	farmingDetails.mapName = mapName;
	farmingDetails.mapLevel = mapLevel;
	farmingDetails.autoLevel = true;
	farmingDetails.special = special;
	farmingDetails.jobRatio = jobRatio;
	farmingDetails.damageTarget = damageTarget;
	farmingDetails.repeat = !repeat;
	farmingDetails.status = status;

	if (currentMap === mapName && !farmingDetails.shouldRun) {
		mappingDetails(mapName, mapLevel, special);
		resetMapVars();
	}

	return farmingDetails;
}

MODULES.mapFunctions.rHFBuyPackrat = false;
rHFBuyPackrat = false;

function Hypothermia() {

	var rShouldHypoFarm = false;
	var mapAutoLevel = Infinity;

	const mapName = 'Hypothermia Farm';
	const farmingDetails = {
		shouldRun: false,
		mapName: mapName
	};

	if ((!getPageSetting('hypothermiaDefaultSettings').active ||
		(!challengeActive('Hypothermia') && (!getPageSetting('hypothermiaDefaultSettings').packrat || !rHFBuyPackrat)))) return farmingDetails;

	if (getPageSetting('hypothermiaDefaultSettings').packrat) {
		if (!rHFBuyPackrat && challengeActive('Hypothermia'))
			rHFBuyPackrat = true;
		if (rHFBuyPackrat && challengeActive('')) {
			viewPortalUpgrades();
			numTab(6, true);
			buyPortalUpgrade('Packrat');
			rHFBuyPackrat = null;
			activateClicked();
		}
	}
	rHFBonfireCostTotal = 0;

	if (!challengeActive('Hypothermia')) return farmingDetails;
	const rHFBaseSettings = getPageSetting('hypothermiaSettings');
	var rHFIndex;

	//Checking to see if any lines are to be run.
	for (var y = 0; y < rHFBaseSettings.length; y++) {
		const currSetting = rHFBaseSettings[y];
		if (!currSetting.active || game.global.world !== currSetting.world || game.global.lastClearedCell + 2 < currSetting.cell) {
			continue;
		}

		if (game.global.world === currSetting.world) {
			rHFIndex = y;
			break;
		}
	}

	if (rHFIndex >= 0) {

		var rHFSettings = rHFBaseSettings[rHFIndex];
		var rHFBonfire = rHFSettings.bonfire;
		var rHFSpecial = "lwc";
		var rHFMapLevel = rHFSettings.level;
		var rHFJobRatio = rHFSettings.jobratio;
		var rHFBonfiresBuilt = game.challenges.Hypothermia.totalBonfires;
		var rHFShedCost = 0;
		//Looping through each bonfire level and working out their cost to calc total cost
		for (x = rHFBonfiresBuilt; x < rHFBonfire; x++) {
			rHFBonfireCost = 1e10 * Math.pow(100, x);
			rHFBonfireCostTotal += rHFBonfireCost;
		}
		if (rHFBonfireCostTotal > (game.resources.wood.max * (1 + (game.portal.Packrat.modifier * game.portal.Packrat.radLevel))))
			rHFShedCost += game.buildings.Shed.cost.wood();
		rHFBonfireCostTotal += rHFShedCost;

		if (rHFSettings.autoLevel) {
			if (game.global.mapRunCounter === 0 && game.global.mapsActive && mapRepeats !== 0) {
				game.global.mapRunCounter = mapRepeats;
				mapRepeats = 0;
			}

			var autoLevel_Repeat = rAutoLevel;
			mapAutoLevel = callAutoMapLevel(currentMap, rAutoLevel, rHFSpecial, null, null, false);
			if (mapAutoLevel !== Infinity) {
				if (autoLevel_Repeat !== Infinity && mapAutoLevel !== autoLevel_Repeat) mapRepeats = game.global.mapRunCounter + 1;
				rHFMapLevel = mapAutoLevel;
			}
		}

		if (rHFBonfireCostTotal > game.resources.wood.owned && rHFBonfire > game.challenges.Hypothermia.totalBonfires) {
			rShouldHypoFarm = true;
		}

		var repeat = game.global.mapsActive && ((getCurrentMapObject().level - game.global.world) !== rHFMapLevel || (getCurrentMapObject().bonus !== rHFSpecial && (getCurrentMapObject().bonus !== undefined && rHFSpecial !== '0')) || game.resources.wood.owned > game.challenges.Hypothermia.bonfirePrice || scaleToCurrentMapLocal(simpleSecondsLocal("wood", 20, true, rHFJobRatio), false, true, rHFMapLevel) + game.resources.wood.owned > rHFBonfireCostTotal);
		var status = 'Hypo Farming to ' + prettify(rHFBonfireCostTotal) + ' wood';

		farmingDetails.shouldRun = rShouldHypoFarm;
		farmingDetails.mapName = mapName;
		farmingDetails.mapLevel = rHFMapLevel;
		farmingDetails.autoLevel = rHFSettings.autoLevel;
		farmingDetails.special = rHFSpecial;
		farmingDetails.jobRatio = rHFJobRatio;
		farmingDetails.bonfire = rHFBonfire;
		farmingDetails.woodGoal = rHFBonfireCostTotal;
		farmingDetails.repeat = !repeat;
		farmingDetails.status = status;

		if (currentMap === mapName && !farmingDetails.shouldRun) {
			mappingDetails(mapName, rHFMapLevel, rHFSpecial, rHFBonfireCostTotal);
			resetMapVars(rHFSettings);
		}
	}

	return farmingDetails;
}

function Smithless() {

	var shouldSmithless = false;
	var mapAutoLevel = Infinity;

	const mapName = 'Smithless Farm';
	const farmingDetails = {
		shouldRun: false,
		mapName: mapName
	};

	if (!challengeActive('Smithless') || !getPageSetting('smithless')) return farmingDetails;

	if (game.global.world % 25 === 0 && game.global.lastClearedCell == -1 && game.global.gridArray[0].ubersmith) {

		var smithlessJobRatio = '0,0,1,0';
		var smithlessSpecial = getAvailableSpecials('lmc', true);
		var smithlessMax = game.global.mapBonus != 10 ? 10 : null;
		var smithlessMin = game.global.mapBonus != 10 ? 0 : null;

		if (game.global.mapRunCounter === 0 && game.global.mapsActive && mapRepeats !== 0) {
			game.global.mapRunCounter = mapRepeats;
			mapRepeats = 0;
		}
		var autoLevel_Repeat = rAutoLevel;
		mapAutoLevel = callAutoMapLevel(currentMap, rAutoLevel, smithlessSpecial, smithlessMax, smithlessMin, false);
		if (mapAutoLevel !== Infinity) {
			if (autoLevel_Repeat !== Infinity && mapAutoLevel !== autoLevel_Repeat) mapRepeats = game.global.mapRunCounter + 1;
			smithlessMapLevel = mapAutoLevel;
		}

		var name = game.global.gridArray[0].name
		var gammaDmg = gammaBurstPct;
		var equalityAmt = equalityQuery(name, game.global.world, 1, 'world', 1, 'gamma')
		var ourDmg = calcOurDmg('min', equalityAmt, false, 'world', 'never', 0, false);
		var ourDmgTenacity = ourDmg;

		//Map Bonus
		if (game.global.mapBonus > 0 && game.global.mapBonus !== 10) {
			ourDmgTenacity /= 1 + 0.2 * game.global.mapBonus;
			ourDmgTenacity *= 5;
		}
		//Tenacity
		if (game.portal.Tenacity.radLevel > 0) {
			if (!(game.portal.Tenacity.getMult() === Math.pow(1.4000000000000001, getPerkLevel("Tenacity") + getPerkLevel("Masterfulness")))) {
				ourDmgTenacity /= game.portal.Tenacity.getMult();
				ourDmgTenacity *= Math.pow(1.4000000000000001, getPerkLevel("Tenacity") + getPerkLevel("Masterfulness"));
			}
		}

		ourDmgTenacity *= 2;
		if (equipsToGet((game.global.world + smithlessMapLevel)) > 0) ourDmgTenacity *= 1000;

		var totalDmgTenacity = (ourDmgTenacity * 2 + (ourDmgTenacity * gammaDmg * 2))

		var enemyHealth = calcEnemyHealthCore('world', game.global.world, 1, name);
		enemyHealth *= 3e15;
		const smithyThreshhold = [1, 0.01, 0.000001];
		const smithyThreshholdIndex = [0.000001, 0.01, 1];

		while (smithyThreshhold.length > 0 && totalDmgTenacity < (enemyHealth * smithyThreshhold[0])) {
			smithyThreshhold.shift();
		}

		if (smithyThreshhold.length === 0) return farmingDetails;

		var totalDmg = (ourDmg * 2 + (ourDmg * gammaDmg * 2))
		var damageTarget = (enemyHealth * smithyThreshhold[0]) / totalDmg;

		if (totalDmg < enemyHealth) {
			shouldSmithless = true;
		}

		var repeat = game.global.mapsActive && ((getCurrentMapObject().level - game.global.world) !== smithlessMapLevel || (getCurrentMapObject().bonus !== smithlessSpecial && (getCurrentMapObject().bonus !== undefined && smithlessSpecial !== '0')));
		var status = 'Smithless: Want ' + damageTarget.toFixed(2) + 'x more damage for ' + (smithyThreshholdIndex.indexOf(smithyThreshhold[0]) + 1) + '/3';

		farmingDetails.shouldRun = shouldSmithless;
		farmingDetails.mapName = mapName;
		farmingDetails.mapLevel = smithlessMapLevel;
		farmingDetails.autoLevel = true;
		farmingDetails.special = smithlessSpecial;
		farmingDetails.jobRatio = smithlessJobRatio;
		farmingDetails.damageTarget = damageTarget;
		farmingDetails.repeat = !repeat;
		farmingDetails.status = status;

		if (currentMap === mapName && !farmingDetails.shouldRun) {
			mappingDetails(mapName, smithlessMapLevel, smithlessSpecial, (smithyThreshholdIndex.indexOf(smithyThreshhold[0]) + 1));
			resetMapVars();
		}

	}

	return farmingDetails;
}

MODULES.mapFunctions.desolationContinueRunning = false;

function Desolation() {

	const mapName = 'Desolation Destacking';
	const farmingDetails = {
		shouldRun: false,
		mapName: mapName
	};

	if (game.global.stringVersion < '5.9.0') return farmingDetails;
	if (!challengeActive('Desolation') || !getPageSetting('desolation')) return farmingDetails;

	var shouldDesolation = false;
	var mapAutoLevel = Infinity;

	var destackHits = getPageSetting('desolationDestack') > 0 ? getPageSetting('desolationDestack') : Infinity;
	var destackZone = getPageSetting('desolationZone') > 0 ? getPageSetting('desolationZone') : Infinity;
	var destackStacks = getPageSetting('desolationStacks') > 0 ? getPageSetting('desolationStacks') : 300;
	var destackOnlyZone = getPageSetting('desolationOnlyDestackZone') > 0 ? getPageSetting('desolationOnlyDestackZone') : Infinity;
	var desolationMapLevel = 0;
	var desolationMapIncrease = getPageSetting('desolationMapIncrease') > 0 ? getPageSetting('desolationMapIncrease') : 0;
	var hyperspeed2 = game.talents.liquification3.purchased ? 75 : game.talents.hyperspeed2.purchased ? 50 : 0;
	var desolationSpecial = (Math.floor(game.global.highestRadonLevelCleared + 1) * (hyperspeed2 / 100) >= game.global.world ? "lmc" : "fa");
	var sliders = [9, 9, 9];
	var biome = 'Farmlands';
	var equality = false;

	if (game.challenges.Desolation.chilled >= destackStacks && (HDRatio > destackHits || game.global.world >= destackZone || game.global.world >= destackOnlyZone))
		shouldDesolation = true;

	if (game.global.mapRunCounter === 0 && game.global.mapsActive && mapRepeats !== 0) {
		game.global.mapRunCounter = mapRepeats;
		mapRepeats = 0;
	}
	if (game.global.world < destackOnlyZone) {
		var autoLevel_Repeat = rAutoLevel;
		mapAutoLevel = callAutoMapLevel(currentMap, rAutoLevel, desolationSpecial, 10, (0 + desolationMapIncrease), false);
		if (mapAutoLevel !== Infinity) {
			if (autoLevel_Repeat !== Infinity && mapAutoLevel !== autoLevel_Repeat) mapRepeats = game.global.mapRunCounter + 1;
			desolationMapLevel = mapAutoLevel;
		}
	} else {
		sliders = [0, 0, 9];
		desolationSpecial = 'fa';
		biome = 'Random';
		var trimpHealth = calcOurHealth(false, 'map');
		for (y = 10; y >= 0; y--) {
			desolationMapLevel = y;
			if (desolationMapLevel === 0) break;
			if (game.resources.fragments.owned < minMapFrag(desolationMapLevel, '0', 'Random', sliders)) continue;
			var enemyDmg = calcEnemyAttackCore('map', game.global.world + y, 1, 'Snimp', false, false, game.portal.Equality.radLevel) * 0.84 * 4;
			if (enemyDmg > trimpHealth) continue;
			break;
		}
		if (game.global.mapsActive && getCurrentMapObject().level !== game.global.world + desolationMapLevel) {
			mapsClicked(true);
			recycleMap();
		}
		equality = true;
	}

	if (!shouldDesolation && (MODULES.mapFunctions.desolationContinueRunning || (game.global.mapsActive && rMapSettings.mapName === 'Desolation Destacking'))) {
		if (game.challenges.Desolation.chilled > 0) {
			shouldDesolation = true;
			MODULES.mapFunctions.desolationContinueRunning = true;
		}
		if (!game.jobs.Explorer.locked && game.challenges.Desolation.chilled === 0) {
			if (game.global.mapBonus === 10) {
				mapsClicked(true);
				recycleMap();
			}
			MODULES.mapFunctions.desolationContinueRunning = false;
		}
	}

	var repeat = game.global.mapsActive && ((getCurrentMapObject().level - game.global.world) !== desolationMapLevel || (getCurrentMapObject().bonus !== desolationSpecial && (getCurrentMapObject().bonus !== undefined && desolationSpecial !== '0')) || game.challenges.Desolation.chilled <= desolationMapLevel + 1);
	var status = 'Desolation Destacking: ' + game.challenges.Desolation.chilled + " remaining";

	farmingDetails.shouldRun = shouldDesolation;
	farmingDetails.mapName = mapName;
	farmingDetails.mapLevel = desolationMapLevel;
	farmingDetails.autoLevel = true;
	farmingDetails.special = desolationSpecial;
	farmingDetails.mapSliders = sliders;
	farmingDetails.biome = biome;
	farmingDetails.repeat = !repeat;
	farmingDetails.status = status;
	farmingDetails.equality = equality;

	if (currentMap === mapName && !farmingDetails.shouldRun) {
		mappingDetails(mapName, desolationMapLevel, desolationSpecial);
		resetMapVars();
	}
	return farmingDetails;
}

function HDFarm() {

	const mapName = 'HD Farm';
	const farmingDetails = {
		shouldRun: false,
		mapName: mapName
	};

	if (!getPageSetting('hdFarmDefaultSettings').active) return farmingDetails;

	const isC3 = game.global.runningChallengeSquared || challengeActive('Mayhem') || challengeActive('Pandemonium') || challengeActive('Desolation');
	const isDaily = challengeActive('Daily');
	const dontRecycleMaps = challengeActive('Unbalance') || challengeActive('Trappapalooza') || challengeActive('Archaeology') || challengeActive('Berserk') || game.portal.Frenzy.frenzyStarted !== -1 || !newArmyRdy() || currentMap === 'Prestige Raiding';
	const totalPortals = getTotalPortals();
	const rHDFBaseSetting = getPageSetting('hdFarmSettings');
	const rHDFDefaultSetting = getPageSetting('hdFarmDefaultSettings');
	const currChall = game.global.challengeActive;
	var rShouldHDFarm = false;
	var rShouldSkip = false;
	var mapAutoLevel = Infinity;
	const dailyAddition = dailyOddOrEven();

	var rHDFIndex;
	for (var y = 0; y < rHDFBaseSetting.length; y++) {
		const currSetting = rHDFBaseSetting[y];
		var world = currSetting.world + dailyAddition.skipNextZone;
		if (dailyAddition.skipZone) continue;
		if (!currSetting.active || currSetting.done === totalPortals + "_" + game.global.world || world > game.global.world || game.global.world > (currSetting.endzone + dailyAddition.skipNextZone)) {
			continue;
		}
		if (currSetting.runType !== 'All') {
			if (!isC3 && !isDaily && (currSetting.runType !== 'Filler' ||
				(currSetting.runType === 'Filler' && (currSetting.challenge !== 'All' && currSetting.challenge !== currChall)))) continue;
			if (isDaily && currSetting.runType !== 'Daily') continue;
			if (isC3 && (currSetting.runType !== 'C3' ||
				(currSetting.runType === 'C3' && (currSetting.challenge3 !== 'All' && currSetting.challenge3 !== currChall)))) continue;
		}
		if (game.global.world >= world && game.global.lastClearedCell + 2 >= currSetting.cell) {
			rHDFIndex = y;
			break;
		}
		else
			continue;
	}

	if (rHDFIndex >= 0) {
		var rHDFSettings = rHDFBaseSetting[rHDFIndex];
		var rHDFMapLevel = rHDFSettings.level;
		var rHDFSpecial = getAvailableSpecials('lmc', true);
		var rHDFJobRatio = rHDFSettings.jobratio === undefined ? '0,0,1' : rHDFSettings.jobratio;
		var hdType = rHDFSettings.hdType;
		var rHDFMax = hdType === 'world' && game.global.mapBonus != 10 ? 10 : null;
		var rHDFMin = hdType === 'world' && game.global.mapBonus != 10 ? 0 : null;
		var rHDFmapCap = rHDFDefaultSetting.mapCap;

		var rHDFmaxMaps = rHDFmapCap;

		if (rHDFSettings.autoLevel) {
			if (game.global.mapRunCounter === 0 && game.global.mapsActive && mapRepeats !== 0) {
				game.global.mapRunCounter = mapRepeats;
				mapRepeats = 0;
			}

			var autoLevel_Repeat = rAutoLevel;
			mapAutoLevel = callAutoMapLevel(currentMap, rAutoLevel, rHDFSpecial, rHDFMax, rHDFMin, false);
			if (mapAutoLevel !== Infinity) {
				if (autoLevel_Repeat !== Infinity && mapAutoLevel !== autoLevel_Repeat) mapRepeats = game.global.mapRunCounter + 1;
				rHDFMapLevel = mapAutoLevel;
			}
		}
		var hdRatio = hdType === 'world' ? HDRatio : hdType === 'void' ? voidHDRatio : hdType === 'map' ? mapHDRatio : null;
		if (hdType !== 'maplevel' && hdRatio === null) return farmingDetails;

		if (hdType !== 'maplevel' ? hdRatio > equipfarmdynamicHD(rHDFIndex) : rHDFSettings.hdBase > autoLevel)
			rShouldHDFarm = true;
		//Skipping farm if map repeat value is greater than our max maps value
		if (rShouldHDFarm && game.global.mapsActive && currentMap === mapName && game.global.mapRunCounter >= rHDFmaxMaps) {
			rShouldHDFarm = false;
		}
		if (currentMap !== mapName && (hdType !== 'maplevel' ? equipfarmdynamicHD(rHDFIndex) > hdRatio : autoLevel > rHDFSettings.hdBase))
			rShouldSkip = true;

		if (((currentMap === mapName && !rShouldHDFarm) || rShouldSkip) && HDRatio !== Infinity) {
			if (hdType !== 'maplevel') hdRatio = calcHDRatio(game.global.world, hdType);
			if (!rShouldSkip) mappingDetails(mapName, rHDFMapLevel, rHDFSpecial, hdRatio, equipfarmdynamicHD(rHDFIndex));
			if (getPageSetting('spamMessages').map_Details && rShouldSkip) {
				if (hdType !== 'maplevel') debug("HD Farm (z" + game.global.world + "c" + (game.global.lastClearedCell + 2) + ") skipped as HD Ratio goal has been met (" + hdRatio.toFixed(2) + "/" + equipfarmdynamicHD(rHDFIndex).toFixed(2) + ").");
				else debug("HD Farm (z" + game.global.world + "c" + (game.global.lastClearedCell + 2) + ") skipped as HD Ratio goal has been met (Autolevel " + rHDFSettings.hdBase + "/" + autoLevel + ").");
			}
			resetMapVars(rHDFSettings);
			if (!dontRecycleMaps && game.global.mapsActive) {
				mapsClicked(true);
				recycleMap();
			}
		}

		var repeat = game.global.mapsActive && ((getCurrentMapObject().level - game.global.world) !== rHDFMapLevel || (getCurrentMapObject().bonus !== rHDFSpecial && (getCurrentMapObject().bonus !== undefined && rHDFSpecial !== '0')));
		var status = 'HD&nbsp;Farm&nbsp;to:&nbsp;' + (hdType !== 'maplevel' ? (equipfarmdynamicHD(rHDFIndex).toFixed(2) + '<br>\
		Current&nbsp;HD:&nbsp;' + hdRatio.toFixed(2)) : ((rHDFSettings.hdBase > 0 ? "+" : "") + rHDFSettings.hdBase + ' auto level')) + '<br>\
		Maps:&nbsp;' + (game.global.mapRunCounter + 1) + '/' + rHDFmaxMaps;

		farmingDetails.shouldRun = rShouldHDFarm;
		farmingDetails.mapName = mapName;
		farmingDetails.mapLevel = rHDFMapLevel;
		farmingDetails.autoLevel = rHDFSettings.autoLevel;
		farmingDetails.special = rHDFSpecial;
		farmingDetails.jobRatio = rHDFJobRatio;
		farmingDetails.HDRatio = equipfarmdynamicHD(rHDFIndex);
		farmingDetails.repeat = !repeat;
		farmingDetails.status = status;
	}

	return farmingDetails;
}

function FarmingDecision() {
	var farmingDetails = {
		shouldRun: false,
		mapName: ''
	}

	//Resetting map run counter to 0 when in world
	if (!game.global.mapsActive && !game.global.preMapsActive) {
		game.global.mapRunCounter = 0;
	}

	//Won't map till after cell 90 on Lead on Even zones
	if (challengeActive('Lead') && !game.global.runningChallengeSquared && (game.global.world % 2 == 0 || game.global.lastClearedCell + 2 <= 90)) {
		return farmingDetails;
	}
	if (!game.global.mapsUnlocked) return farmingDetails;

	//U1 map settings to check for.
	if (game.global.universe === 1) var mapTypes = [PrestigeClimb(), MapFarm(), PrestigeRaiding(), BionicRaiding(), HDFarm(), VoidMaps(), MapBonus(), Experience(), MapDestacking()];

	//Skipping map farming if in Decay and above stack count user input
	if (decaySkipMaps()) mapTypes = [PrestigeClimb(), VoidMaps()];
	if (challengeActive('Mapology')) mapTypes = [PrestigeClimb(), BionicRaiding(), VoidMaps()];

	//U2 map settings to check for.
	if (game.global.universe === 2) var mapTypes = [Desolation(), Quest(), PandemoniumDestack(), PrestigeClimb(), SmithyFarm(), MapFarm(), TributeFarm(), WorshipperFarm(), MapDestacking(), PrestigeRaiding(), Mayhem(), Insanity(), PandemoniumFarm(), Alchemy(), Hypothermia(), HDFarm(), VoidMaps(), Quagmire(), Glass(), MapBonus(), Smithless(), Wither()];

	for (const map of mapTypes) {
		if (map.shouldRun) {
			return map;
		}
	}

	return farmingDetails;
}

//RAMP - Prestige Raiding
function prestigeMapLevelToRun(number, raidzones) {
	var map;

	map = (raidzones - game.global.world - number);

	if ((raidzones - number).toString().slice(-1) == 0) map = map - 5
	if ((raidzones - number).toString().slice(-1) == 9) map = map - 5
	if ((raidzones - number).toString().slice(-1) == 8) map = map - 5
	if ((raidzones - number).toString().slice(-1) == 7) map = map - 5
	if ((raidzones - number).toString().slice(-1) == 6) map = map - 5
	return map;
}

//Checks if map we want to run has equips
function prestigeMapHasEquips(number, raidzones, targetPrestige) {
	if (equipsToGet((raidzones - number), targetPrestige)[0] > 0) return true;
	return false;
}

//Set sliders for prestige raiding
function prestigeRaidingSliders(number, raidzones, special) {
	if (!special) special = getAvailableSpecials('p');
	document.getElementById("biomeAdvMapsSelect").value = game.global.farmlandsUnlocked ? "Farmlands" : "Plentiful";
	document.getElementById("mapLevelInput").value = raidzones >= game.global.world ? game.global.world : raidzones;
	document.getElementById("advExtraLevelSelect").value = prestigeMapLevelToRun(number, raidzones);
	document.getElementById("advSpecialSelect").value = special;
	document.getElementById("lootAdvMapsRange").value = 9;
	document.getElementById("sizeAdvMapsRange").value = 9;
	document.getElementById("difficultyAdvMapsRange").value = 9;
	document.getElementById("advPerfectCheckbox").dataset.checked = true;

	//Set loot slider to 0 and perfect maps off if using frag min setting!
	if (rMapSettings.fragSetting === '1') {
		document.getElementById("lootAdvMapsRange").value = 0;
		document.getElementById("difficultyAdvMapsRange").value = 0;
		document.getElementById("advPerfectCheckbox").dataset.checked = false;
	}

	updateMapCost();

	//Gradually reduce map sliders if not using frag max setting!
	if (rMapSettings.fragSetting !== '2') {
		if (updateMapCost(true) <= game.resources.fragments.owned) return updateMapCost(true);
		document.getElementById("advPerfectCheckbox").dataset.checked = false;
		if (updateMapCost(true) <= game.resources.fragments.owned) return updateMapCost(true);
		document.getElementById("biomeAdvMapsSelect").value = "Random";
		if (updateMapCost(true) <= game.resources.fragments.owned) return updateMapCost(true);

		while (lootAdvMapsRange.value > 0 && updateMapCost(true) > game.resources.fragments.owned) {
			lootAdvMapsRange.value -= 1;
		}
		while (difficultyAdvMapsRange.value > 0 && sizeAdvMapsRange.value > 0 && updateMapCost(true) > game.resources.fragments.owned) {
			difficultyAdvMapsRange.value -= 1;
			if (updateMapCost(true) <= game.resources.fragments.owned) break;
			sizeAdvMapsRange.value -= 1;
		}
		if (updateMapCost(true) <= game.resources.fragments.owned) return updateMapCost(true);
		if (updateMapCost(true) > game.resources.fragments.owned) {
			document.getElementById("advSpecialSelect").value = "0";
			updateMapCost();
		}
		if (document.getElementById("advSpecialSelect").value == "0") return updateMapCost(true);
	}
	return updateMapCost(true);
}

//Identify total cost of prestige raiding maps
function prestigeTotalFragCost(raidZones, targetPrestige, special, incrementMaps, getCost) {
	var cost = 0;

	if (equipsToGet(raidZones, targetPrestige)[0]) {
		cost += prestigeRaidingSliders(0, raidZones, special);
	}
	if (incrementMaps) {
		if (equipsToGet((raidZones - 1), targetPrestige)[0]) {
			cost += prestigeRaidingSliders(1, raidZones, special);
		}
		if (equipsToGet((raidZones - 2), targetPrestige)[0]) {
			cost += prestigeRaidingSliders(2, raidZones, special);
		}
		if (equipsToGet((raidZones - 3), targetPrestige)[0]) {
			cost += prestigeRaidingSliders(3, raidZones, special);
		}
		if (equipsToGet((raidZones - 4), targetPrestige)[0]) {
			cost += prestigeRaidingSliders(4, raidZones, special);
		}
	}

	if (getCost) return cost;
	if (game.resources.fragments.owned >= cost) return true;
	else return false;
}

function fragmap() {
	var fragmentsOwned = game.resources.fragments.owned
	document.getElementById("biomeAdvMapsSelect").value = game.global.farmlandsUnlocked ? "Farmlands" : game.global.decayDone ? "Plentiful" : "Mountains";
	document.getElementById("advExtraLevelSelect").value = 0;
	document.getElementById("advSpecialSelect").value = "fa";
	document.getElementById("lootAdvMapsRange").value = 9;
	document.getElementById("sizeAdvMapsRange").value = 9;
	document.getElementById("difficultyAdvMapsRange").value = 9;
	document.getElementById("advPerfectCheckbox").dataset.checked = true;
	document.getElementById("mapLevelInput").value = game.talents.mapLoot.purchased ? game.global.world - 1 : game.global.world;
	updateMapCost();

	if (updateMapCost(true) > fragmentsOwned) {
		document.getElementById("biomeAdvMapsSelect").value = "Random";
		updateMapCost();
	}
	if (updateMapCost(true) > fragmentsOwned) {
		document.getElementById("advPerfectCheckbox").dataset.checked = false;
		updateMapCost();
	}

	while (difficultyAdvMapsRange.value > 0 && sizeAdvMapsRange.value > 0 && updateMapCost(true) > fragmentsOwned) {
		if (difficultyAdvMapsRange.value !== 0) difficultyAdvMapsRange.value -= 1;
		if (updateMapCost(true) <= fragmentsOwned) break;
		if (sizeAdvMapsRange.value !== 0) sizeAdvMapsRange.value -= 1;
	}
	if (updateMapCost(true) <= fragmentsOwned) return updateMapCost(true);

	if (updateMapCost(true) > fragmentsOwned) {
		document.getElementById("advSpecialSelect").value = 0;
		updateMapCost();
	}
}

function mapCost(pluslevel, special, biome, mapSliders, onlyPerfect) {
	maplevel = pluslevel < 0 ? game.global.world + pluslevel : game.global.world;
	if (!pluslevel || pluslevel < 0) pluslevel = 0;
	if (!special) special = '0';
	if (!biome) biome = game.global.farmlandsUnlocked && game.global.universe == 2 ? "Farmlands" : game.global.decayDone ? "Plentiful" : "Random";
	if (!mapSliders) mapSliders = [9, 9, 9];
	if (mapSliders !== [9, 9, 9]) onlyPerfect = false;
	document.getElementById("biomeAdvMapsSelect").value = biome;
	document.getElementById("advExtraLevelSelect").value = pluslevel;
	document.getElementById("advSpecialSelect").value = special;
	document.getElementById("lootAdvMapsRange").value = mapSliders[0];
	document.getElementById("sizeAdvMapsRange").value = mapSliders[1];
	document.getElementById("difficultyAdvMapsRange").value = mapSliders[2];
	document.getElementById("advPerfectCheckbox").dataset.checked = true;
	document.getElementById("mapLevelInput").value = maplevel;
	updateMapCost();

	if (!onlyPerfect) {
		if (updateMapCost(true) > game.resources.fragments.owned) {
			document.getElementById("biomeAdvMapsSelect").value = "Random";
			updateMapCost();
		}
		if (updateMapCost(true) > game.resources.fragments.owned) {
			document.getElementById("advPerfectCheckbox").dataset.checked = false;
			updateMapCost();
		}

		while (difficultyAdvMapsRange.value > 0 && sizeAdvMapsRange.value > 0 && updateMapCost(true) > game.resources.fragments.owned) {
			difficultyAdvMapsRange.value -= 1;
			if (updateMapCost(true) <= game.resources.fragments.owned) break;
			sizeAdvMapsRange.value -= 1;
		}
		if (updateMapCost(true) <= game.resources.fragments.owned) return updateMapCost(true);

		if (updateMapCost(true) > game.resources.fragments.owned) {
			document.getElementById("advSpecialSelect").value = 0;
			updateMapCost();
		}
	}

	return updateMapCost(true);
}

function fragMapFarmCost() {
	var cost = 0;

	cost = perfectMapCost(rMapSettings.mapLevel, rMapSettings.special);

	if (game.resources.fragments.owned >= cost)
		return true;
	else
		return false;
}

function fragmentFarm() {

	var rFragMapBought = false;
	//Worshipper farming
	var rFragCheck = true;
	if (fragMapFarmCost() == true) {
		rFragCheck = true;
		MODULES.maps.fragmentFarming = false;
	} else if (fragMapFarmCost() == false) {
		MODULES.maps.fragmentFarming = true;
		rFragCheck = false;
		if (!rFragCheck && rInitialFragmentMapID == undefined && !rFragMapBought && game.global.preMapsActive) {
			//debug("Check complete for fragment farming map");
			fragmap();
			if ((updateMapCost(true) <= game.resources.fragments.owned)) {
				buyMap();
				rFragMapBought = true;
				if (rFragMapBought) {
					rInitialFragmentMapID = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
					//debug("Fragment farming map purchased");
				}
			}
		}
		if (!rFragCheck && game.global.preMapsActive && !game.global.mapsActive && rFragMapBought && rInitialFragmentMapID != undefined) {
			debug("Fragment farming for a " + (rMapSettings.mapLevel >= 0 ? "+" : "") + rMapSettings.mapLevel + " " + rMapSettings.special + " map.");
			selectMap(rInitialFragmentMapID);
			runMap();
			var rFragmentMapID = rInitialFragmentMapID;
			rInitialFragmentMapID = undefined;
		}
		if (!rFragCheck && !game.global.repeatMap && game.resources.fragments.owned < perfectMapCost(rMapSettings.mapLevel, rMapSettings.special)) repeatClicked();
		if (!rFragCheck && game.resources.fragments.owned >= perfectMapCost(rMapSettings.mapLevel, rMapSettings.special) && game.global.mapsActive && rFragMapBought && rFragmentMapID != undefined) {
			if (fragMapFarmCost() == false) {
				if (!game.global.repeatMap) {
					repeatClicked();
				}
			} else if (fragMapFarmCost() == true) {
				if (game.global.repeatMap) {
					repeatClicked();
				}
				if (game.global.preMapsActive && rFragMapBought && rFragmentMapID != undefined) {
					rFragMapBought = false;
				}
				rFragCheck = true;
				MODULES.maps.fragmentFarming = false;
				debug("Fragment farming successful")
			}
		}
	} else {
		rFragCheck = true;
		MODULES.maps.fragmentFarming = false;
		debug("Fragment farming successful")
	}

	if (rFragCheck) {
		perfectMapCost(rMapSettings.mapLevel, rMapSettings.special)
	}

	updateMapCost();
}

function minMapFrag(level, specialModifier, biome, sliders) {

	if (!sliders) sliders = [9, 9, 9];
	var perfect = true;
	if (game.resources.fragments.owned < perfectMapCost_Actual(level, specialModifier, biome)) {
		perfect = false;

		while (sliders[0] > 0 && sliders[2] > 0 && perfectMapCost_Actual(level, specialModifier, biome, sliders, perfect) > game.resources.fragments.owned) {
			sliders[0] -= 1;
			if (perfectMapCost_Actual(level, specialModifier, biome, sliders, perfect) <= game.resources.fragments.owned) break;
			sliders[2] -= 1;
		}
	}

	return perfectMapCost_Actual(level, specialModifier, biome, sliders, perfect);
}

function perfectMapCost(pluslevel, special, biome) {
	maplevel = pluslevel < 0 ? game.global.world + pluslevel : game.global.world;
	if (!pluslevel || pluslevel < 0) pluslevel = 0;
	if (!special) special = '0';
	if (!biome) biome = game.global.farmlandsUnlocked && game.global.universe == 2 ? "Farmlands" : game.global.decayDone ? "Plentiful" : "Random";
	document.getElementById("biomeAdvMapsSelect").value = biome;
	document.getElementById("advExtraLevelSelect").value = pluslevel;
	document.getElementById("advSpecialSelect").value = special;
	document.getElementById("lootAdvMapsRange").value = 9;
	document.getElementById("sizeAdvMapsRange").value = 9;
	document.getElementById("difficultyAdvMapsRange").value = 9;
	document.getElementById("advPerfectCheckbox").dataset.checked = true;
	document.getElementById("mapLevelInput").value = maplevel;
	updateMapCost();

	return updateMapCost(true);
}

function perfectMapCost_Actual(plusLevel, specialModifier, biome, sliders = [9, 9, 9], perfect = true) {
	if (!specialModifier) return Infinity
	if (!plusLevel && plusLevel !== 0) return Infinity
	var specialModifier = specialModifier;
	var plusLevel = plusLevel;
	var baseCost = 0;
	//All sliders at 9
	baseCost += sliders[0];
	baseCost += sliders[1];
	baseCost += sliders[2];
	var mapLevel = game.global.world;
	if (plusLevel < 0)
		mapLevel = mapLevel + plusLevel;
	if (mapLevel < 6)
		mapLevel = 6;
	baseCost *= (game.global.world >= 60) ? 0.74 : 1;
	//Perfect checked
	if (perfect && sliders.reduce(function (a, b) { return a + b; }, 0) === 27) baseCost += 6;
	//Adding in plusLevels
	if (plusLevel > 0)
		baseCost += (plusLevel * 10)
	if (specialModifier != "0")
		baseCost += mapSpecialModifierConfig[specialModifier].costIncrease;
	baseCost += mapLevel;
	baseCost = Math.floor((((baseCost / 150) * (Math.pow(1.14, baseCost - 1))) * mapLevel * 2) * Math.pow((1.03 + (mapLevel / 50000)), mapLevel));
	baseCost *= biome !== 'Random' ? 2 : 1;
	return baseCost;
}

function shouldFarmMapCreation(pluslevel, special, biome, difficulty, loot, size) {
	//Pre-Init
	if (!pluslevel) pluslevel = 0;
	if (!special) special = getAvailableSpecials('lmc');
	if (!biome) biome = game.global.farmlandsUnlocked && game.global.universe == 2 ? "Farmlands" : game.global.decayDone ? "Plentiful" : "Mountains";
	if (!difficulty) difficulty = 0.75;
	if (!loot) loot = game.global.farmlandsUnlocked && game.singleRunBonuses.goldMaps.owned ? 3.6 : game.global.farmlandsUnlocked ? 2.6 : game.singleRunBonuses.goldMaps.owned ? 2.85 : 1.85;
	if (!size) size = 20;

	for (var mapping in game.global.mapsOwnedArray) {
		if (!game.global.mapsOwnedArray[mapping].noRecycle && (
			(game.global.world + pluslevel) == game.global.mapsOwnedArray[mapping].level) &&
			(game.global.mapsOwnedArray[mapping].bonus == special || game.global.mapsOwnedArray[mapping].bonus === undefined && special === '0') &&
			game.global.mapsOwnedArray[mapping].location == biome) {

			return (game.global.mapsOwnedArray[mapping].id);
		}
	}
	return ("create");
}

function rRunMap() {
	if (game.options.menu.pauseGame.enabled) return;
	if (game.global.lookingAtMap === "") return;
	if (game.achievements.mapless.earnable) {
		game.achievements.mapless.earnable = false;
		game.achievements.mapless.lastZone = game.global.world;
	}
	if (challengeActive('Quest') && game.challenges.Quest.questId == 5 && !game.challenges.Quest.questComplete) {
		game.challenges.Quest.questProgress++;
		if (game.challenges.Quest.questProgress == 1) game.challenges.Quest.failQuest();
	}
	var mapId = game.global.lookingAtMap;
	game.global.preMapsActive = false;
	game.global.mapsActive = true;
	game.global.currentMapId = mapId;
	mapsSwitch(true);
	var mapObj = getCurrentMapObject();
	if (mapObj.bonus) {
		game.global.mapExtraBonus = mapObj.bonus;
	}
	if (game.global.lastClearedMapCell == -1) {
		buildMapGrid(mapId);
		drawGrid(true);

		if (mapObj.location == "Void") {
			game.global.voidDeaths = 0;
			game.global.voidBuff = mapObj.voidBuff;
			setVoidBuffTooltip();
		}
	}
	if (challengeActive('Insanity')) game.challenges.Insanity.drawStacks();
	if (challengeActive('Pandemonium')) game.challenges.Pandemonium.drawStacks();
}

function dailyModiferReduction() {
	if (!challengeActive('Daily')) return 0;
	if (game.global.universe === 1) return 0;
	var dailyMods = dailyModifiersOutput().split('<br>');
	dailyMods.length = dailyMods.length - 1;
	var dailyReduction = 0;
	var settingsArray = getPageSetting('dailyPortalSettingsArray');

	for (var item in settingsArray) {
		if (item === 'portalZone' || item === 'portalChallenge') continue;
		if (!settingsArray[item].enabled) continue;
		var dailyReductionTemp = 0;
		var modifier = item;
		if (modifier.includes('Weakness')) modifier = 'Enemies stack a debuff with each attack, reducing Trimp attack by';
		if (modifier.includes('Famine')) modifier = 'less Metal, Food, Wood, and Gems from all sources';
		if (modifier.includes('Large')) modifier = 'All housing can store';

		for (var x = 0; x < dailyMods.length; x++) {
			if (dailyMods[x].includes(modifier)) {
				dailyReductionTemp = settingsArray[item].zone
			}
			if (dailyReduction > dailyReductionTemp) dailyReduction = dailyReductionTemp;
		}
	}
	return dailyReduction
}

function dailyOddOrEven() {
	var result = {
		odd: false,
		even: false,
		oddMult: 0,
		evenMult: 0,
		skipZone: 0,
		skipNextZone: 0
	}
	return result;
	if (!challengeActive('Daily')) return result;
	if (!getPageSetting('mapOddEvenIncrement')) return result;

	if (typeof game.global.dailyChallenge.oddTrimpNerf !== 'undefined') {
		result.oddMult += dailyModifiers.oddTrimpNerf.getMult(game.global.dailyChallenge.oddTrimpNerf.strength);
	}

	//Dodge Dailies
	if (typeof game.global.dailyChallenge.slippery !== "undefined") {
		var slipStr = game.global.dailyChallenge.slippery.strength / 100;
		if (slipStr > 0.15) result.evenMult += slipStr;
		else result.oddMult += slipStr
	}

	if (result.oddMult === 0 && result.evenMult === 0) return result;
	else if (result.oddMult !== 0 && result.evenMult !== 0) {
		if (Math.max(result.oddMult, result.evenMult) === result.oddMult) result.evenMult = 0;
		else result.oddMult = 0;
	}

	if (result.evenMult !== 0) {
		if (game.global.world % 2 === 0) result.skipZone = true;
		else result.skipNextZone = true;
	}
	else if (result.oddMult !== 0) {
		if (game.global.world % 2 === 1) result.skipZone = true;
		else result.skipNextZone = true;
	}

	return result;
}

function getAvailableSpecials(special, skipCaches) {

	var cacheMods = [];
	var bestMod;
	if (special === undefined || special === 'undefined') return '0';

	if (special === 'lsc') cacheMods = ['lsc', 'hc', 'ssc', 'lc'];
	else if (special === 'lwc') cacheMods = ['lwc', 'hc', 'swc', 'lc'];
	else if (special === 'lmc') cacheMods = ['lmc', 'hc', 'smc', 'lc'];
	else if (special === 'p') cacheMods = ['p', 'fa'];
	else cacheMods = [special];

	var hze = getHighestLevelCleared();
	var unlocksAt = game.global.universe === 2 ? 'unlocksAt2' : 'unlocksAt';

	for (var mod of cacheMods) {
		if (typeof mapSpecialModifierConfig[mod] === 'undefined') continue;
		if ((mod === 'lmc' || mod === 'smc') && challengeActive('Transmute')) mod = mod.charAt(0) + "wc";
		if (skipCaches && mod === 'hc') continue;
		if (mapSpecialModifierConfig[mod][unlocksAt] <= hze) {
			bestMod = mod;
			break;
		}
	}
	if (bestMod === undefined) bestMod = '0';
	return bestMod;
}

function getSpecialTime(special, maps, noImports) {
	if (!special) special = getAvailableSpecials('lmc');
	if (!maps) maps = 1;
	var specialTime = 0;

	//Figuring out loot time our selected cache gives us
	specialTime +=
		special[0] === 'l' && special.length === 3 ? 20 :
			special === 'hc' ? 10 :
				special[0] === 's' ? 10 :
					special === 'lc' ? 5 :
						0;

	specialTime *= maps;
	if (!noImports) {
		specialTime += game.unlocks.imps.Chronoimp ? (5 * maps) : 0;
		if (maps >= 4) specialTime += (Math.floor(maps / 4) * 45);
	}

	return (specialTime);
}

function resetMapVars(setting) {
	const totalPortals = getTotalPortals();
	currentMap = undefined;
	rAutoLevel = Infinity;
	mappingTime = 0;
	mapRepeats = 0;
	game.global.mapRunCounter = 0;
	if (setting) setting.done = (totalPortals + "_" + game.global.world);
	saveSettings();
}

function mappingDetails(mapName, mapLevel, mapSpecial, extra, extra2, extra3) {
	if (!getPageSetting('spamMessages').map_Details) return;
	if (!getPageSetting('autoMaps')) return;
	if (!mapName) return;

	//Figuring out exact amount of maps run
	if (mapName !== 'Smithy Farm') {
		var mapProg = game.global.mapsActive ? ((getCurrentMapCell().level - 1) / getCurrentMapObject().size) : 0;
		var mappingLength = mapProg > 0 ? (game.global.mapRunCounter + mapProg).toFixed(2) : game.global.mapRunCounter;
	}
	//Setting special to current maps special if we're in a map.
	if (game.global.mapsActive) mapSpecial = getCurrentMapObject().bonus === undefined ? "no special" : getCurrentMapObject().bonus;
	if (mapName === 'Bionic Raiding') mapSpecial = game.talents.bionic2.purchased ? 'fa' : 'no special';

	var timeMapping = mappingTime > 0 ? mappingTime : getGameTime();
	var currCell = game.global.lastClearedCell + 2;
	var message = '';
	if (mapName !== 'Void Map' && mapName !== 'Quagmire Farm' && mapName !== 'Smithy Farm' && mapName !== 'Bionic Raiding' && mapName !== 'Quest') {
		message += (mapName + " (z" + game.global.world + "c" + currCell + ") took " + (mappingLength) + " (" + (mapLevel >= 0 ? "+" : "") + mapLevel + " " + mapSpecial + ")" + (mappingLength == 1 ? " map" : " maps") + " and " + formatTimeForDescriptions(timeForFormatting(timeMapping)) + ".");
	}
	else if (mapName === 'Smithy Farm') {
		message += (mapName + " (z" + game.global.world + "c" + currCell + ") took " + MODULES.mapFunctions.smithyMapCount[0] + " food, " + MODULES.mapFunctions.smithyMapCount[1] + " wood, " + MODULES.mapFunctions.smithyMapCount[2] + " metal maps (" + (mapLevel >= 0 ? "+" : "") + mapLevel + ")" + " and " + formatTimeForDescriptions(timeForFormatting(timeMapping)) + ".");
	}
	else if (mapName === 'Quagmire Farm') {
		message += (mapName + " (z" + game.global.world + "c" + currCell + ") took " + (mappingLength) + (mappingLength == 1 ? " map" : " maps") + " and " + formatTimeForDescriptions(timeForFormatting(timeMapping)) + ".");
	}
	else {
		message += (mapName + " (z" + game.global.world + "c" + currCell + ") took " + formatTimeForDescriptions(timeForFormatting(timeMapping)) + ".");
	}

	if (mapName === 'Void Map') {
		message += " Started with " + MODULES.mapFunctions.rVoidVHDRatio.toFixed(2) + " and ended with a Void HD Ratio of " + voidHDRatio.toFixed(2) + ".";
	}

	else if (mapName === 'Tribute Farm') {
		message += " Finished with " + game.buildings.Tribute.purchased + " tributes and " + game.jobs.Meteorologist.owned + " meteorologists.";
	}

	else if (mapName === 'Smithy Farm') {
		message += " Finished with " + game.buildings.Smithy.purchased + " smithies.";
	}

	else if (mapName === 'Insanity Farm') {
		message += " Finished with " + game.challenges.Insanity.insanity + " stacks.";
	}

	else if (mapName === 'Alchemy Farm') {
		message += " Finished with " + extra + " " + extra3 + ".";
	}

	else if (mapName === 'Hypothermia Farm') {
		message += " Finished with (" + prettify(game.resources.wood.owned) + "/" + extra.toFixed(2) + ") wood.";
	}

	else if (mapName === 'Smithless Farm') {
		message += " Finished with enough damage to get " + extra + "/3 stacks.";
	}

	else if (mapName === 'HD Farm' && extra !== null) {
		message += " Finished with a HD Ratio of " + extra.toFixed(2) + "/" + extra2.toFixed(2) + ".";
	}

	else if (mapName === 'HD Farm') {
		message += " Finished with an auto level of " + (autoLevel > 0 ? "+" : "") + autoLevel + ".";
	}

	debug(message);
}