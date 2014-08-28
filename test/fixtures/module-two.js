module.exports = function() {
    var Character = function(name) {
        this.species = 'monster';
        this.homeplanet = 'The other place.';
        this.name = name ? name : 'Frank';
    };

    Character.prototype.changeName = function(name) {
        this.name = name;
    };

    Character.prototype.getName = function() {
        return this.name;
    };

    Character.prototype.greeting = function() {
        return 'Why are you wearing that stupid man suite.';
    };

    var frank = new Character();

    frank.greeting();
};