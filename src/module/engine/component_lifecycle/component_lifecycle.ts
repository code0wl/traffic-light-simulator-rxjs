export default class ComponentLifeCycle {
    constructor() {
        this.render();
    }

    update() {
        // subscribe to changes
        console.log("component updating");
    }

    destroyed() {
        // find instance of the created class and destroy it
        console.log("component destroyed");
    }

    render() {
        console.log("component rendering");
    }
}