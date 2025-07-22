class WorldObject {
    #collisionCallback = null;
    #boundsCallback = null;
    #context = null;
    
    constructor(world, x, y, type, parent = null){
        this.x = x;
        this.y = y;
        this.world = world;
        this.collision = [];
        this.world.add(this);
        this.type = type;

        this.parent = parent;

        this.checkCollisions = false;
    }

    destroy(){
        this.world.remove(this);
    }

    move(new_x, new_y){
        this.x = new_x;
        this.y = new_y;
    }

    subscribeToCollision(callback, context){
        this.#collisionCallback = callback;
        this.#context = context;
    }

    collide(otherObject){
        if (this.#collisionCallback != null)
            this.#collisionCallback(this, otherObject, this.#context);
    }

    subscribeToOutOfBounds(callback, context){
        this.#boundsCallback = callback;
        this.#context = context;
    }

    outOfBounds(){
        if (this.#boundsCallback != null)
            this.#boundsCallback(this, this.#context);
    }

    sceneX(){
        return (this.x + .5) * BLOCK_SIZE; 
    }
    sceneY(){
        return (this.y + .5) * BLOCK_SIZE;
    }
}