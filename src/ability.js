export class Ability {
    constructor(description = ""){
        this.description = description;
    }

    take(game){
        //pass
    }

}

export class CompositeAbility extends Ability {
    constructor(abilityArray, description = ""){
        super(description);
        this.abilities = abilityArray;
    }
    
    take(game){
        for (let i =0; i < this.abilities.length; i++){
            this.abilities[i].take(game);
        }
    }
}

export class PointsAbility extends Ability {
    constructor(add, multiply, description = ""){
        super(description);
        this.add = add;
        this.multiply = multiply;
    }

    take(game){
        game.updatePoints(this.multiply * game.points + this.add);
    }
}

export class PointFormula extends Ability {
    constructor(callback, description = ""){
        super(description);
        this.callback = callback;
    }

    take(game){
        game.points = this.callback(game.points);
    }
}

export class SpawnEgg extends Ability {

    take(game){
        game.spawnEgg();
    }
}

export class EggsPerAbility extends Ability {
    constructor(change, description = ""){
        super(description);
        this.change = change;
    }

    take(game){
        game.eggsPerAbility += this.change;
        if (game.eggsPerAbility < 1)
            game.eggsPerAbility = 1;
    }
}

export class TimeChange extends Ability {
    constructor (multiplier, description = ""){
        super(description);
        this.multiplier = multiplier;
    }

    take(game){
        game.timeScale *= this.multiplier;
    }
}

export class ExtraAbilities extends Ability {
    constructor(number, description = ""){
        super(description);
        this.number = number;
    }

    take(game){
        for (var i = 0; i < this.number; i ++){
            let ability = game.getRandomAbility();
            game.takeAbility(ability);
        }
    }
}

export class AddLength extends Ability {
    constructor (amount, description = "") {
        super(description);
        this.amount = amount;
    }

    take(game){
        for (var i = 0; i < this.amount; i++){
            game.snake.addPiece();
        }
    }
}

export class RemoveLength extends Ability {
    constructor (amount, description = "") {
        super(description);
        this.amount = amount;
    }

    take(game){
        for (var i = 0; i < this.amount; i++){
            game.snake.removePiece();
        }
    }
}


export class EggValue extends Ability {
    constructor (add, mult, description = ""){
        super(description);
        this.add = add;
        this.mult = mult;
    }

    take(game){
        game.pointsPerEgg *= this.mult;
        game.pointsPerEgg += this.add;
    }
}

export class ValuePerEggPerEgg extends Ability {
    constructor (amount, description = ""){
        super(description);
        this.amount = amount;
    }

    take(game){
        game.eggValueIncreasePerEgg += this.amount;
    }
}


export class NumberOfAbilitiesPerCostIncrease extends Ability {
    constructor (amount, description = ""){
        super(description);
        this.amount = amount;
    }

    take(game){
        game.abilitiesPerIncreaseInEggRequirement += this.amount;
    }
}

export class EggsPerLength extends Ability {
    constructor (amount, description = ""){
        super(description);
        this.amount = amount;
    }

    take(game){
        game.eggsPerLength += this.amount;
    }
}

export class RandomAbilitiesPerEgg extends Ability {
    constructor (amount, description = ""){
        super(description);
        this.amount = amount;
    }

    take(game){
        game.randomAbilitiesPerEgg += this.amount;
    }
}

export class ExtraLives extends Ability {
    constructor (amount, description = ""){
        super(description);
        this.amount = amount;
    }

    take(game){
        game.extraLives += this.amount;
    }
}

export class PointsPerMove extends Ability {
    constructor (amount, description = ""){
        super(description);
        this.amount = amount;
    }

    take(game){
        game.pointsPerMove += this.amount;
    }
}