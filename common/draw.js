const draw = {};

draw.path = (ctx, path, color) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(...path[0]);
    for (let i = 1; i < path.length; i++) {
        ctx.lineTo(...path[i]);
    }
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
};

draw.paths = (ctx, paths, color) => {
    for (const path of paths) {
        draw.path(ctx, path, color);
    }
};


// Export the draw object
if(typeof module !== 'undefined'){
module.exports = draw;
}