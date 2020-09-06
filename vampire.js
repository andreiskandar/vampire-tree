class Vampire {
	constructor(name, yearConverted) {
		this.name = name;
		this.yearConverted = yearConverted;
		this.offspring = [];
		this.creator = null;
	}

	/** Simple tree methods **/

	// Adds the vampire as an offspring of this vampire
	addOffspring(vampire) {
		this.offspring.push(vampire);
		vampire.creator = this;
	}

	// Returns the total number of vampires created by that vampire
	get numberOfOffspring() {
		return this.offspring.length;
	}

	// Returns the number of vampires away from the original vampire this vampire is
	get numberOfVampiresFromOriginal() {
		let numberOfVampires = 0;
		let currentVampire = this;
		while (currentVampire.creator) {
			currentVampire = currentVampire.creator;
			numberOfVampires++;
		}
		return numberOfVampires;
	}

	// Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
	isMoreSeniorThan(vampire) {
		return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
	}

	// Returns the vampire object with that name, or null if no vampire exists with that name
	vampireWithName(name) {
		let found = null;

		if (this.name === name) {
			found = this;
			return found;
		}
		for (const os of this.offspring) {
			console.log('=======');
			console.log(os);
			found = os.vampireWithName(name);
		}

		return found;
	}

	// Returns the total number of vampires that exist
	get totalDescendents() {
		let totalDescendants = 0;
		const vampire = this;

		const countAllDescendants = (vampire) => {
			for (const descendant of vampire.offspring) {
				totalDescendants += 1;
				countAllDescendants(descendant);
			}
		};

		countAllDescendants(vampire);
		return totalDescendants;
	}

	// Returns an array of all the vampires that were converted after 1980
	get allMillennialVampires() {
		let millenialVampires = [];

		if (this.yearConverted > 1980) {
			millenialVampires.push(this);
		}

		// for (const os of this.offspring) {
		// 	const osMillenial = os.allMillennialVampires;
		// 	millenialVampires = millenialVampires.concat(osMillenial);
		// }
		this.offspring.forEach((os) => {
			millenialVampires = millenialVampires.concat(os.allMillennialVampires);
		});

		return millenialVampires;
	}

	/** Stretch **/

	// Returns the closest common ancestor of two vampires.
	// The closest common anscestor should be the more senior vampire if a direct ancestor is used.
	// For example:
	// * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
	// * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
	closestCommonAncestor(vampire) {
		// this.creator.numberOfVampiresFromOriginal = 3
		// vampire.creator.numberOfVampiresFromOriginal = 4
		// 			A
		// 		/		\
		// 	 B		 C
		// 	/ \   / \
		// D   E F   G
		// 			/			\
		// 		 J			 H
		// 						 /
		// 						I
		// J.closestCommonAncestor(I)
		let senior;
		let junior;
		if (this.isMoreSeniorThan(vampire)) {
			senior = this;
			junior = vampire;
		} else {
			senior = vampire;
			junior = this;
		}
		while (junior) {
			if (!junior.creator) {
				return junior;
			} else if (junior === senior) {
				return junior;
			} else if (junior.creator === senior) {
				return senior;
			} else if (junior.creator === senior.creator) {
				return senior.creator;
			}
			junior = junior.creator;
		}
	}
}

// const sarah = new Vampire('Sarah', 2000);
// const elgort = new Vampire('Elgort', 2001);
// const hansel = new Vampire('Hansel', 2010);
const rootVampire = new Vampire('rv');
offspring1 = new Vampire('a', 1980);
offspring2 = new Vampire('b', 1960);
offspring3 = new Vampire('c', 1970);
offspring4 = new Vampire('d', 1981);
offspring5 = new Vampire('e', 1972);
offspring6 = new Vampire('f', 1975);
offspring7 = new Vampire('g', 1985);
offspring8 = new Vampire('h', 2010);

rootVampire.addOffspring(offspring1);
rootVampire.addOffspring(offspring2);
rootVampire.addOffspring(offspring3);
offspring3.addOffspring(offspring4);
offspring3.addOffspring(offspring5);
offspring5.addOffspring(offspring6);
offspring6.addOffspring(offspring7);
offspring2.addOffspring(offspring8);

// console.log(rootVampire.allMillennialVampires);

console.log(rootVampire.vampireWithName('h'));

module.exports = Vampire;
