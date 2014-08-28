module.exports = function() {
    var Person = function(name) {
        this.species = 'human';
        this.homeplanet = 'earth';
        this.name = name ? name : 'Donnie';
    };

    Person.prototype.changeName = function(name) {
        this.name = name;
    };

    Person.prototype.getName = function() {
        return this.name;
    };

    Person.prototype.greeting = function() {
        return 'Why are you wearing that stupid bunny suit.';
    };

    var scott = new Person();

    scott.changeName('Scott');
};