module.exports = function() {
    var Alien = function(name) {
        this.species = 'Wookie';
        this.homeplanet = 'Kashyyyk';
        this.name = name ? name : 'Rug Beast';
    };

    Alien.prototype.changeName = function(name) {
        this.name = name;
    };

    Alien.prototype.getName = function() {
        return this.name;
    };

    Alien.prototype.greeting = function() {
        return 'GGGGaaaaaaaaaaaaaaaaa';
    };

    var chewie = new Alien();

    chewie.changeName('Chewie');
};