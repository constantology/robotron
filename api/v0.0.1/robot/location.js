module.exports = function* location(next) {
    var data = this.data;

    if (this.data instanceof Error) {
        this.status = 400;
    }

    yield next;
};
