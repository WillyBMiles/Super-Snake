//World controls collisions
class World extends Phaser.GameObjects.GameObject {
    constructor(scene, x_min, y_min, x_max, y_max){
        super(scene, "world");
        this.objects = [];
        this.x_min = x_min;
        this.x_max = x_max;
        this.y_min = y_min;
        this.y_max = y_max;
    }
    

    add(worldObject){
        this.objects.push(worldObject);
    }

    remove(worldObject){
        var index = this.objects.indexOf(worldObject);
        this.objects.splice(index, 1);
    }

    step(){
        this.checkCollisions();
        this.checkBounds();
    }

    checkCollisions(){
        //Though this is O(n^2), the checks are small
        // especially because most of them are not set with checkCollisions
        for (let i = 0; i < this.objects.length; i++){
            let obj = this.objects[i];
            if (obj.checkCollisions){
                for (let j = 0; j < this.objects.length; j ++){
                    let other = this.objects[j];
                    if (other != obj && obj.x == other.x && obj.y == other.y){
                        obj.collide(other);
                        other.collide(obj);
                    }
                }
            }
        }
    }

    checkBounds(){
        for (let i = 0; i < this.objects.length; i++){
            let obj = this.objects[i];
            if (obj.checkCollisions){
                if (obj.x < this.x_min || obj.x > this.x_max-1 || obj.y < this.y_min || obj.y > this.y_max - 2){
                    obj.outOfBounds();
                }
            }
        }
    }

    checkPos(x,y){
        for (let i =0; i < this.objects.length; i++){
            let obj = this.objects[i];
            if (x == obj.x && y == obj.y){
                return true;
            }
        }
        return false;
    }
}