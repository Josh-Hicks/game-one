(function() {
    'use strict';

    const ctx = document.getElementById('ctx').getContext('2d');
    const HEIGHT = 500;
    const WIDTH = 500;
    const MESSAGE = 'THE MESSAGE';

    let playerList = [];
    let enemyList = [];

    let Entity = (name, x, y, spdX, spdY, type) => {
        let newEntity = {
            name: name,
            x: x,
            y: y,
            spdX: spdX,
            spdY: spdY,
            type: type
        }

        if (newEntity.type === 'player') {
            playerList.push(newEntity);
        } else {
            enemyList.push(newEntity);
        }
    }

    let updateEntity = entity => {
        // update the location of pixel coordinates
        entity.x += entity.spdX;
        entity.y += entity.spdY;

        // draw the new entity
        ctx.font = '30px Arial';
        ctx.fillText(entity.name, entity.x, entity.y);

        // make sure it's in bounds
        if(entity.x < 0 || entity.x > WIDTH) {
            entity.spdX = -entity.spdX;
        }

        if(entity.y < 0 || entity.y > WIDTH) {
            entity.spdY = -entity.spdY;
        }
    }

    // recreate new entities based on setInterval timer
    let update = () => {
        // clear the screen each time to avoid trails
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        enemyList.forEach(enemy => updateEntity(enemy));
        playerList.forEach(player => updateEntity(player));
    }

    // get distance for collision detection
    let getDistanceBetweenEntity = (entity1, entity2) => {
        let xDistance = entity1.x - entity2.x;
        let yDistance = entity1.y - entity2.y;
        return Math.sqrt((xDistance * xDistance) + (yDistance * yDistance));
    }

    // find out if entities are colliding
    let testCollisionEntity = (entity1, entity2) => {
        return getDistanceBetweenEntity(entity1, entity2) < 10;
    }

    // create all game entities
    Entity('p1', 150, 150, 10, 15, 'player');
    Entity('e1', 250, 350, 10, -15, 'enemy');
    Entity('e2', 350, 200, 15, -8, 'enemy');

    // show at 25 fps
    setInterval(update, 40);
}());