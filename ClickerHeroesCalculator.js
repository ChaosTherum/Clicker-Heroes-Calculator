//This was made by VikeStep and stennett

//Initialising Global Variables
var savedata = ""; 												//This savedata will be in the same format as the export from Clicker Heroes itself
var parsedsavedata = Array();								//Associative Array of the essential data from the imported save data

var herodata = Array();										//The data for all heroes will be an array of associated arrays (so herodata[0]["name"] will return "Cid, the Helpful Adventurer")
var heronames = ["Cid, the Helpful Adventurer", "Treebeast", "Ivan, the Drunken Brawler", "Brittany, Beach Princess", "The Wandering Fisherman", "Betty Clicker", "The Masked Samurai", "Leon", "The Great Forest Seer", "Alexa, Assassin", "Natalia, Ice Apprentice", "Mercedes, Duchess of Blades", "Bobby, Bounty Hunter", "Broyle Lindeoven, Fire Mage", "Sir George II, King's Guard", "King Midas", "Referi Jerator, Ice Wizard", "Abbadon", "Ma Zhu", "Amenhotep", "Beastlord", "Athena, Goddess of War", "Aphrodite, Goddess of Love", "Shinatobe, Wind Deity", "Grant, the General", "Frostleaf"]; //List of Hero Names
var basecosts = [5e0,5e1,2.5e2,1e3,4e3,2e4,1e5,4e5,2.5e6,1.5e7,1e8,8e8,6.5e9,5e10,4.5e11,4e12,3.6e13,3.2e14,2.7e15,2.4e16,3e17,9e18,3.5e20,1.4e22,4.2e24,2.1e27]; //Base Cost for each Hero
var upgradenames = [["Big Clicks", "Clickstorm", "Huge Clicks", "Massive Clicks", "Titanic Clicks", "Colossal Clicks", "Monumental Clicks"],["Fertilizer", "Thorns", "Megastick", "Ultrastick", "Lacquer"],["Hard Cider", "Pint of Ale", "Pitcher", "Powersurge", "Embalming Fluid", "Pint of Pig's Whiskey"],["Combat Makeup", "Brand Name Equipment", "Eliixir of Deditzification", "Vegan Meat"],["Spear Training", "Crab Net", "Whetstone", "Fish Cooking", "State of the Art Fishing Gear"],["Wilderburr Dumplings", "Braised Flamingogo", "Truffed Trolgre with Bloop", "Foomgus Risotto", "World Famous Cookbook"],["Jutsu I", "Jutsu II", "Jutsu III", "Jutsu IV"],["Courage Tonic", "Stronger Claws", "Lionheart Potion", "Lion's Roar"],["Forest Creatures", "Insight", "Dark Lore", "Swarm"],["Critical Strike", "Clairvoyance", "Poisoned Blades", "Invisible Strikes", "Lucky Strikes"],["Magic 101", "Below Zero", "Frozen Warfare", "The Book of Frost"],["Mithril Edge", "Enchanted Blade", "Quickblade", "Blessed Sword", "Art of Swordfighting"],["Impressive Moves", "Acrobatic Jetpack", "Jetpack Dance", "Whirling Skyblade", "Sweeping Strikes"],["Roast Monsters", "Combustible Air", "Inner Fire", "The Floor is Lava", "Metal Detector"],["Abandoned Regret", "Offensive Strategies", "Combat Strategy", "Burning Blade", "King's Pardon"],["Bag of Holding", "Heart of Gold", "Touch of Gold", "Golden Dimension", "Golden Clicks", "Gold Blade"],["Defrosting", "Headbashing", "Iceberg Rain", "Glacierstorm", "Icy Touch"],["Rise of the Dead", "Curse of the Dark God", "Epidemic Evil", "The Dark Ritual"],["Heaven's Hand", "Plasma Arc", "Ancient Wrath", "Pet Dragon"],["Smite", "Genesis Research", "Prepare the Rebeginning", "ASCENSION"],["Eye In The Sky", "Critters", "Beastmode", "Sacrificial Lamb's Blood", "Super Clicks"],["Hand-to-Head Combat", "Warscream", "Bloodlust", "Boiling Blood"],["Lasso of Love", "Love Potion", "Love Hurts", "Energize", "Kiss of Death"],["Dancing Blades", "Annoying Winds", "Bladestorm", "Eye of the Storm", "Reload"],["Red Whip", "Art of War", "Battle Plan", "Top of the Line Gear"],["Ice Age", "Book of Winter", "Frozen Stare", "Frigid Enchant"]]; //List of Upgrade Names
var upgradetypes = [[1,2,1,1,1,1,1],[0,0,0,0,3],[0,0,0,2,3,0],[0,0,0,0],[0,0,0,4,3],[4,4,4,4,3],[0,0,0,0],[0,0,0,4],[0,0,0,0],[5,0,0,6,2],[0,0,0,0],[0,0,0,0,3],[0,0,0,0,5],[4,0,0,0,2],[0,0,0,0,3],[7,7,7,7,2,5],[0,0,0,0,6],[0,0,0,2],[0,0,0,0],[0,4,4,8],[0,0,0,4,2],[0,0,0,0],[0,0,0,2,0],[0,4,0,0,2],[4,0,4,0],[0,0,4,5]]; //0 - Increases Individual Heroes DPS, 1 - Increases Cid's Click Damage, 2 - Unlocks Skill, 3 - Increases Click Damage, 4 - Increase All Heroes DPS, 5 - Increases Critical Click Chance, 6 - Increases Critical Click Damage Multiplier, 7 - Increases Gold Found, 8 - Ascension
	
var achievementdata = Array();								//The data for all achievements in an associated array
var achievementnames = ["Frugal", "Stingy", "Miserly", "Greedy", "Zone Explorer", "Zone Warrior", "Zone Master", "Zone Lord", "Zone King", "Zone God", "Zone Owner", "Lethal", "Ruinous", "Calamitious", "Cataclysmic", "A lot of Damage", "Frantic", "Frenetic", "Frenzied", "Convulsions", "Deadly", "Assassin", "Restarter", "Neverending", "Again and Again", "Is this real life?", "Master of Reincarnations", "Boss Slaughter", "Boss Massacre", "Boss Exterminator", "Boss Murderer", "Boss Genocide", "Proficient Clicking", "Sore Finger", "Carpal Tunnel", "Broken Mouse", "Uptown", "Fat Cat", "Loaded", "The 1%", "The 0.01%", "Buffett", "Gates", "Rockefeller", "Guide", "Coach", "Teacher", "Mentor", "Levelupper", "Super Levelupper", "Killer", "Butcher", "Executioner", "Monster Genocide", "Terminator", "Considerate", "Generous", "Benevolent", "Magnanimous"]; //List of Achievement Names
var achievementtypes = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //0 - Adds DPS, 1 - Click Damage, 2 - Starting Click Damage
var achievementrewards = [1, 2, 3, 5, 1, 2, 3, 5, 5, 5, 5, 1, 2, 3, 5, 5, 1, 3, 3, 5, 3, 5, 10, 50, 250, 1000, 2500, 1, 2, 3, 5, 5, 1, 2, 3, 5, 1, 2, 3, 5, 5, 5, 5, 5, 1, 2, 3, 5, 5, 5, 1, 2, 3, 5, 5, 1, 2, 3, 5]; //Rewards for Achievement

var totalDPS = 0;

//Functions for PreInit Phase - Loading all the data from local storage and parsing it
function loadLocalStorage() {								//Will grab the data from local storage
	if (typeof(Storage)!="undefined") {
		savedata = localStorage.getItem("savedata");
	}
}

function parseSave(data) {									//Will convert the savedata into something more readable
	//parsedsavedata = 
}

function preInit() {												//PreInit Phase
	loadLocalStorage();
	//parseSave(savedata);
}

preInit();

//Functions For Init Phase - Assigning loaded data to variables, Calculating values for variables
function calculateBaseDPS(cost, id) {						//The base DPS for a hero is calculated by a formula of the cost and its ID. ID for Cid is 1, ID for Treebeast is 2 and so on.
	return Math.ceil((cost/10)*Math.pow(1-(0.0188*Math.min(id,14)),id));
}

function calculateAll() {										//Will be called initially to calculate everything and whenever
	
}

function init() {													//Init Phase
	for (i=0; i < 26; i++) {										//Fills herodata with known values
		herodata[i] = Array();
		herodata[i]["name"] = heronames[i];
		herodata[i]["basecost"] = basecosts[i];
		if (i != 0) {
			herodata[i]["baseDPS"] = calculateBaseDPS(basecosts[i], i+1);
		} else {
			herodata[i]["baseDPS"] = 0;
		}
	}
	console.log(herodata); 											//For Debugging purposes
	for (i=0; i < 59; i++) {
		achievementdata[i] = Array();
		achievementdata[i]["name"] = achievementnames[i];
		achievementdata[i]["type"] = achievementtypes[i];
		achievementdata[i]["reward"] = achievementrewards[i];
		achievementdata[i]["owned"] = false; 				//Change this to actual value of imported save data when data parser is made
	}
	console.log(achievementdata);								//For Debugging purposes
}

init();

//Functions for PostInit Phase - Updating DOM elements, Adding Event Listeners
function numberWithCommas(number) {					//Converts 1234567 into 1,234,567. Also is compatible with decimals: 1234567.8910 -> 1,234,567.8910
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function formatNumber(num) {								//Converts a number into what is shown InGame
	var sign = num && num/Math.abs(num);
	var number = Math.abs(num);
	var SIunits = ["","","K","M","B","T","q","Q","s","S","O","N","d","D","!","@","#","$","%","^","%","*"];
	var digitcount = 	number && Math.floor(1+(Math.log(number)/Math.LN10));
	var digitsshown = 0;
	var symbol = "";
	if (digitcount > 64) {
		symbol = "*";
		digitsshown = digitcount - 59
	} else if (digitcount < 6) {
		digitsshown = digitcount
	} else {
		symbol = SIunits[Math.floor(digitcount/3)];
		digitsshown = 3 + (digitcount % 3);
	}
	var truncNumber = Math.floor(number/Math.pow(10,digitcount-digitsshown));
	if (sign == 1) {
		return numberWithCommas(truncNumber) + symbol;
	} else if (sign == -1) {
		return "-" + numberWithCommas(truncNumber) + symbol;
	} else {
		return 0;
	}
}

function saveSaveData() {									//Will save the data to local storage
	if (typeof(Storage)!="undefined" && saveData != null) {
		localStorage.setItem("saveData", saveData);
	}
}

function updateDOM() {										//Will put calculated elements onto their respective DOM elements
	
}

function addEventListeners() {								//Everything that requires waiting for user input goes here
	
}

function postInit() {											//PostInit Phase
	updateDOM();
	addEventListeners();
}

postInit();