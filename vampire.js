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
// const rootVampire = new Vampire('rv');
// offspring1 = new Vampire('a');
// offspring2 = new Vampire('b');
// offspring3 = new Vampire('c');
// offspring4 = new Vampire('d');
// offspring5 = new Vampire('e');
// offspring6 = new Vampire('f');
// offspring7 = new Vampire('g');
// offspring8 = new Vampire('h');

// rootVampire.addOffspring(offspring1);
// rootVampire.addOffspring(offspring2);
// rootVampire.addOffspring(offspring3);
// offspring3.addOffspring(offspring4);
// offspring3.addOffspring(offspring5);
// offspring5.addOffspring(offspring6);
// offspring6.addOffspring(offspring7);
// offspring2.addOffspring(offspring8);

// console.log(offspring4.closestCommonAncestor(offspring7));

module.exports = Vampire;
